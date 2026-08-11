import type { Timestamp } from "firebase/firestore";

/**
 * Mirrors a document in the `child_gamification` collection, one per
 * child, keyed by childId (see lib/firestore/gamification.ts). This is a
 * new, isolated progression layer alongside — not a replacement for —
 * `learn_progress`'s `progressPercent` (see types/learning.ts).
 *
 * Batch 1 shipped totalXp/starsBalance. Batch 4 adds streak fields
 * additively — existing documents/readers are unaffected; a document
 * created before this batch simply reads `currentStreakDays`/
 * `lastActivityDate` as undefined until its next mission completion.
 * avatar/pets/achievements remain out of scope for their own later
 * batches.
 */
export type ChildGamification = {
  uid: string;
  childId: string;
  totalXp: number;
  starsBalance: number;
  /** Consecutive days (by local calendar date) with at least one completed mission. */
  currentStreakDays: number;
  /** Local "YYYY-MM-DD" of the most recent mission completion, or null if none yet. */
  lastActivityDate: string | null;
  updatedAt: Timestamp | null;
};
