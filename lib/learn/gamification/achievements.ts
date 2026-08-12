import type { ChildGamification } from "@/types/gamification";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * Fixed, small set of achievements for Batch 6 — all deterministic from
 * stats already being tracked in child_gamification (missionsCompleted,
 * currentStreakDays, totalXp), so unlocking them needs no new signals
 * threaded in from QuizFlow/CodingQuestFlow beyond what recordMissionCompletion
 * already computes. No "perfect score" or other achievement requiring
 * extra parameters yet — keeping this batch's surface area small.
 */
export const ACHIEVEMENTS: readonly Achievement[] = [
  { id: "first_mission", title: "Misi Pertama", description: "Selesaikan 1 misi belajar", icon: "🎯" },
  { id: "five_missions", title: "Rajin Belajar", description: "Selesaikan 5 misi belajar", icon: "🏅" },
  { id: "twenty_missions", title: "Juara Belajar", description: "Selesaikan 20 misi belajar", icon: "🏆" },
  { id: "streak_3", title: "3 Hari Beruntun", description: "Belajar 3 hari berturut-turut", icon: "🔥" },
  { id: "streak_7", title: "Seminggu Penuh!", description: "Belajar 7 hari berturut-turut", icon: "⭐" },
  { id: "xp_100", title: "100 XP Pertama", description: "Kumpulkan 100 XP", icon: "⚡" },
  { id: "xp_500", title: "Kolektor XP", description: "Kumpulkan 500 XP", icon: "💎" },
];

const ACHIEVEMENT_CONDITIONS: Record<string, (stats: ChildGamification) => boolean> = {
  first_mission: (s) => s.missionsCompleted >= 1,
  five_missions: (s) => s.missionsCompleted >= 5,
  twenty_missions: (s) => s.missionsCompleted >= 20,
  streak_3: (s) => s.currentStreakDays >= 3,
  streak_7: (s) => s.currentStreakDays >= 7,
  xp_100: (s) => s.totalXp >= 100,
  xp_500: (s) => s.totalXp >= 500,
};

/**
 * Pure function: given the child's stats *after* this mission's XP/streak/
 * mission-count updates, and the IDs already unlocked before this mission,
 * returns the achievements that just became newly true. Never re-returns
 * an already-unlocked achievement, and never mutates its inputs.
 */
export function checkNewAchievements(
  statsAfterUpdate: ChildGamification,
  alreadyUnlockedIds: readonly string[]
): Achievement[] {
  const unlockedSet = new Set(alreadyUnlockedIds);
  return ACHIEVEMENTS.filter(
    (a) => !unlockedSet.has(a.id) && ACHIEVEMENT_CONDITIONS[a.id](statsAfterUpdate)
  );
}
