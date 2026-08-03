import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { LearnProgress } from "@/types/learning";

/**
 * Reads this child's progress on one academy (courseId = academy id) from
 * the existing `learn_progress` collection — the same collection the
 * dashboard's "Continue Learning" widget already reads. Unlike the
 * original external Learn app's localStorage-based stats (totalScore,
 * accuracy, starsCollected, etc.), our schema currently only tracks a
 * single `progressPercent` — richer per-academy stats can be added to
 * that collection later once the actual quiz/mission-scoring engine
 * exists to produce them. Returns null if nothing recorded yet (never
 * fabricated placeholder numbers).
 */
export async function getAcademyProgress(
  childId: string,
  academyId: string
): Promise<LearnProgress | null> {
  const db = requireFirestore();
  const q = query(
    collection(db, "learn_progress"),
    where("childId", "==", childId),
    where("courseId", "==", academyId)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...(snap.docs[0].data() as Omit<LearnProgress, "id">) };
}

/**
 * Records a quiz session result as this child's academy progress. Score
 * (0-100, correct-answer percentage) is stored as `progressPercent` — if
 * a record already exists, only overwrites it when the new score is
 * higher, so retrying a mission after a bad run doesn't regress a
 * previously-earned score. `lastActivityAt` always updates regardless.
 */
export async function saveAcademyProgress(
  uid: string,
  childId: string,
  academyId: string,
  academyTitle: string,
  score: number
): Promise<void> {
  const db = requireFirestore();
  const existing = await getAcademyProgress(childId, academyId);

  if (!existing) {
    await addDoc(collection(db, "learn_progress"), {
      uid,
      childId,
      courseId: academyId,
      courseTitle: academyTitle,
      progressPercent: score,
      lastActivityAt: serverTimestamp(),
    });
    return;
  }

  await updateDoc(doc(db, "learn_progress", existing.id), {
    progressPercent: Math.max(existing.progressPercent, score),
    lastActivityAt: serverTimestamp(),
  });
}
