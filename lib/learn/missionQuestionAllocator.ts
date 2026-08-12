import { getFullDatabase, type SessionQuestionsResult } from "@/config/learnQuestions";
import { CODING_QUEST_BANK } from "@/config/learnCodingQuestBank";
import { getMissionsForAcademy } from "@/config/learnAcademies";
import type {
  Category,
  CodingActivity,
  Level,
  MissionType,
  Question,
} from "@/types/learnAcademy";

/**
 * Fixes a real reported bug: different missions within the same academy
 * (Easy/Normal/Challenge/Olympiad/Daily/AI Quest) each independently drew
 * a fresh random sample from the *same* level+category question pool via
 * getRandomSessionQuestions()/getCodingActivitiesByLevel(). Two
 * independent random draws from one pool very often overlap — a child
 * picking "Petualangan Standar" right after "Misi Jelajah Ringan" could
 * (and did, per the report) see repeated questions.
 *
 * This file does NOT touch the question engine (config/learnQuestions.ts,
 * config/learnCodingQuestBank.ts) or its strict level/category filtering
 * and no-cross-level-fallback guarantees at all — both stay exactly as
 * they are. It only decides *which slice* of an already-correctly-filtered
 * pool a given mission draws from, by giving each mission type a
 * different, stable starting point in a deterministically-shuffled
 * version of that pool (shuffled once per level+category using a seeded
 * PRNG, not Math.random() — same level+category always shuffles into the
 * same order, so the six missions' windows stay consistently
 * non-overlapping across sessions instead of shifting around).
 *
 * When a pool has at least as many questions as all six missions need
 * combined, this guarantees zero overlap between any two missions. When a
 * pool is thinner than that (some older/thin level+category combos still
 * are), perfect non-overlap for all six simultaneously is mathematically
 * impossible — this still spreads missions across the pool as evenly as
 * possible rather than defaulting back to fully-independent random draws,
 * which is what caused the reported repeats in the first place.
 *
 * A single mission's own session is still guaranteed to never repeat a
 * question within itself, exactly like before.
 */

const MISSION_ORDER: MissionType[] = ["easy", "normal", "challenge", "olympiad", "daily", "ai_quest"];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/** Small seeded PRNG (mulberry32) — deterministic, no new dependency. */
function mulberry32(seed: number): () => number {
  let state = seed | 0;
  return function () {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates shuffle using a seeded PRNG — same seed always produces the same order. */
function seededShuffle<T>(items: T[], seedStr: string): T[] {
  const rng = mulberry32(hashString(seedStr));
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Sum of questionCount for every mission before `missionType` in the fixed mission order. */
function computeMissionStartOffset(category: Category, missionType: MissionType): number {
  const missions = getMissionsForAcademy(category);
  const orderedMissions = [...missions].sort(
    (a, b) => MISSION_ORDER.indexOf(a.type) - MISSION_ORDER.indexOf(b.type)
  );
  let offset = 0;
  for (const m of orderedMissions) {
    if (m.type === missionType) return offset;
    offset += m.questionCount;
  }
  return 0;
}

/**
 * Drop-in replacement for calling getRandomSessionQuestions() directly
 * from a mission flow — same strict "fail rather than fall back" result
 * shape, but allocates a mission-specific, non-overlapping-when-possible
 * slice instead of an independent random draw.
 */
export function allocateQuizMissionQuestions(
  level: Level,
  category: Category,
  missionType: MissionType,
  requestedCount: number
): SessionQuestionsResult {
  const pool = getFullDatabase().filter((q) => q.level === level && q.category === category);

  if (pool.length === 0 || requestedCount > pool.length) {
    return {
      ok: false,
      reason: "insufficient_questions",
      level,
      category,
      requested: requestedCount,
      available: pool.length,
    };
  }

  const shuffled = seededShuffle(pool, `${level}|${category}`);
  const startIndex = computeMissionStartOffset(category, missionType) % shuffled.length;

  const questions: Question[] = [];
  for (let i = 0; i < requestedCount; i++) {
    questions.push(shuffled[(startIndex + i) % shuffled.length]);
  }

  return { ok: true, questions };
}

/**
 * Same idea for Coding Quest — drop-in replacement for calling
 * getCodingActivitiesByLevel() directly. Coding Quest activities aren't
 * split by Category the way quiz questions are, so the pool is level-only,
 * matching getCodingActivitiesByLevel()'s own signature. Empty array means
 * "not enough activities for this mission", same as before.
 */
export function allocateCodingQuestActivities(
  level: Level,
  missionType: MissionType,
  requestedCount: number
): CodingActivity[] {
  const pool = CODING_QUEST_BANK.filter((a) => a.level === level);

  if (pool.length === 0 || requestedCount > pool.length) return [];

  const shuffled = seededShuffle(pool, `coding-quest|${level}`);
  const startIndex = computeMissionStartOffset("Coding Quest", missionType) % shuffled.length;

  const activities: CodingActivity[] = [];
  for (let i = 0; i < requestedCount; i++) {
    activities.push(shuffled[(startIndex + i) % shuffled.length]);
  }

  return activities;
}
