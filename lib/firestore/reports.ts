import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { DiscoveryResult, LearnProgress, ReportItem } from "@/types/learning";

/**
 * Course-by-course progress for a child, most recently active first.
 * Requires a composite index on (childId asc, lastActivityAt desc).
 */
export async function listLearnProgress(childId: string): Promise<LearnProgress[]> {
  const db = requireFirestore();
  const q = query(
    collection(db, "learn_progress"),
    where("childId", "==", childId),
    orderBy("lastActivityAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LearnProgress, "id">) }));
}

/**
 * Discovery test results for a child, most recently completed first.
 * Requires a composite index on (childId asc, completedAt desc).
 */
export async function listDiscoveryResults(childId: string): Promise<DiscoveryResult[]> {
  const db = requireFirestore();
  const q = query(
    collection(db, "discovery_results"),
    where("childId", "==", childId),
    orderBy("completedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<DiscoveryResult, "id">) }));
}

/**
 * Recent generated reports for a parent account (across all children),
 * used to power the dashboard's Recent Activity feed.
 * Requires a composite index on (uid asc, createdAt desc).
 */
export async function listRecentReports(uid: string, take = 5): Promise<ReportItem[]> {
  const db = requireFirestore();
  const q = query(
    collection(db, "reports"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(take)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ReportItem, "id">) }));
}
