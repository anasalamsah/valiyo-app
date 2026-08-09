import type { Level } from "@/types/learnAcademy";

/**
 * Maps age (in whole years) to a content level. TK B (Advanced) is
 * intentionally not reachable through age alone (product decision) — its
 * content still exists in the question bank but isn't auto-assigned.
 */
export function levelForAge(age: number): Level {
  if (age <= 2) return "Preschool 1 (2 thn)";
  if (age === 3) return "Preschool 2 (3 thn)";
  if (age === 4) return "TK A";
  if (age === 5) return "TK A (Advanced)";
  if (age === 6) return "TK B";
  if (age >= 12) return "SD Kelas 6";
  // age 7-11 -> SD Kelas 1-5
  return `SD Kelas ${age - 6}` as Level;
}

/** Ages selectable in the manual override dropdown, 2 through 12+. */
export const OVERRIDE_AGE_OPTIONS: { age: number; label: string }[] = [
  { age: 2, label: "2 tahun" },
  { age: 3, label: "3 tahun" },
  { age: 4, label: "4 tahun" },
  { age: 5, label: "5 tahun" },
  { age: 6, label: "6 tahun" },
  { age: 7, label: "7 tahun" },
  { age: 8, label: "8 tahun" },
  { age: 9, label: "9 tahun" },
  { age: 10, label: "10 tahun" },
  { age: 11, label: "11 tahun" },
  { age: 12, label: "12+ tahun" },
];

function overrideKey(childId: string): string {
  return `valiyo_learn_level_override_${childId}`;
}

/**
 * Reads a parent-set age override for this child from localStorage, or
 * null if none is set (meaning: follow the birth-date-derived age as
 * usual). This lets a parent manually bump a child up to a harder level
 * (e.g. after a school-year promotion) without editing the child's actual
 * birth date, which is shared with other products (e.g. Discovery) and
 * shouldn't be touched just to unlock harder Learn content.
 */
export function getLevelOverrideAge(childId: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(overrideKey(childId));
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Sets (or clears, with `null`) the manual age override for this child. */
export function setLevelOverrideAge(childId: string, age: number | null): void {
  if (typeof window === "undefined") return;
  if (age === null) {
    window.localStorage.removeItem(overrideKey(childId));
  } else {
    window.localStorage.setItem(overrideKey(childId), String(age));
  }
}

/**
 * The single source of truth for "what level should this child see right
 * now" — a manual override if the parent set one, otherwise the level
 * derived from birth-date age. Both QuizFlow and CodingQuestFlow resolve
 * their level through this function so an override set from the academy
 * grid takes effect immediately without any prop-threading.
 */
export function resolveChildLevel(childId: string, birthDateAge: number): Level {
  const overrideAge = getLevelOverrideAge(childId);
  return levelForAge(overrideAge ?? birthDateAge);
}
