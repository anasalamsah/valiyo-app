import { doc, getDoc, runTransaction, serverTimestamp } from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import { calculateNextStreak, getLocalDateString } from "@/lib/learn/gamification/streakCalculator";
import type { ChildGamification } from "@/types/gamification";

const COLLECTION = "child_gamification";

/**
 * One document per child, keyed directly by childId (not queried) — reads
 * here are a single `getDoc` by document ID, which is a different security
 * shape than `learn_progress`'s `where("uid", ...)`-scoped list queries
 * (see lib/firestore/learnProgress.ts and the Batch 0 audit for why that
 * scoping matters for *list* queries specifically). A `get` by a known
 * document ID doesn't have that failure mode: Firestore evaluates the
 * security rule directly against that one document's `uid` field, so no
 * `where` clause is needed to prove the read is scoped — firestore.rules
 * still requires `resource.data.uid == request.auth.uid` to actually
 * enforce it, this just means the client-side query shape can't
 * accidentally get the whole read rejected the way an unscoped `list`
 * would.
 */
export async function getChildGamification(childId: string): Promise<ChildGamification | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, childId));
  if (!snap.exists()) return null;
  return snap.data() as ChildGamification;
}

/**
 * Records a completed mission's gamification effects — XP and daily
 * streak — in a single transaction against the same document, so both
 * stay consistent even if two awards land in quick succession. Creates
 * the document on first-ever completion.
 *
 * (Batch 1 called this `awardXp` and only touched totalXp; Batch 4 renamed
 * it and folded streak in, since both are decided at the exact same
 * "mission completed" trigger point — a second, separate transaction for
 * streak alone would just be extra round-trips against the same document
 * for no benefit. `starsBalance` is still untouched here — see Batch 1's
 * note on `starsReward` being a separate, later decision.)
 *
 * Streak counts a completed mission regardless of score — a child who
 * tries and gets everything wrong still showed up today, so their streak
 * (see lib/learn/gamification/streakCalculator.ts) isn't gated on
 * `xpToAward > 0`. Negative XP is never applied.
 */
export async function recordMissionCompletion(
  uid: string,
  childId: string,
  xpToAward: number
): Promise<{ totalXp: number; currentStreakDays: number }> {
  const db = requireFirestore();
  const ref = doc(db, COLLECTION, childId);
  const today = getLocalDateString();
  const safeXp = Math.max(xpToAward, 0);

  return runTransaction(db, async (transaction) => {
    const snap = await transaction.get(ref);

    if (!snap.exists()) {
      transaction.set(ref, {
        uid,
        childId,
        totalXp: safeXp,
        starsBalance: 0,
        currentStreakDays: 1,
        lastActivityDate: today,
        updatedAt: serverTimestamp(),
      });
      return { totalXp: safeXp, currentStreakDays: 1 };
    }

    const current = snap.data() as ChildGamification;
    const { streakDays, activityDate } = calculateNextStreak(
      current.currentStreakDays ?? 0,
      current.lastActivityDate ?? null,
      today
    );
    const totalXp = (current.totalXp ?? 0) + safeXp;

    transaction.update(ref, {
      totalXp,
      currentStreakDays: streakDays,
      lastActivityDate: activityDate,
      updatedAt: serverTimestamp(),
    });

    return { totalXp, currentStreakDays: streakDays };
  });
}