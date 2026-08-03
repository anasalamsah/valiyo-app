import { collection, getDocs, query, where } from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { DiscoveryResult, LearnProgress, ReportItem } from "@/types/learning";

// None of the functions below use a server-side `orderBy` alongside their
// `where` filter. That combination requires a composite index that has to
// be manually created in the Firebase console — and until it exists, the
// query throws "The query requires an index" (this is exactly what broke
// the `children` list, and almost certainly why a completed Discovery
// assessment's final report wasn't showing up here either: the read was
// silently failing with that same error). Sorting the — typically small —
// result set in JS after fetching needs no Firestore configuration at all.

/**
 * Course-by-course progress for a child, most recently active first.
 */
export async function listLearnProgress(childId: string): Promise<LearnProgress[]> {
  const db = requireFirestore();
  const q = query(collection(db, "learn_progress"), where("childId", "==", childId));
  const snap = await getDocs(q);
  const results = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<LearnProgress, "id">),
  }));
  return results.sort(
    (a, b) => (b.lastActivityAt?.toMillis() ?? 0) - (a.lastActivityAt?.toMillis() ?? 0)
  );
}

/**
 * All course progress across every child belonging to this parent account,
 * most recently active first. Powers the /learn Student Dashboard so a
 * parent with multiple kids sees everyone's activity in one place, not
 * just whichever child happens to be selected.
 */
export async function listLearnProgressForParent(uid: string): Promise<LearnProgress[]> {
  const db = requireFirestore();
  const q = query(collection(db, "learn_progress"), where("uid", "==", uid));
  const snap = await getDocs(q);
  const results = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<LearnProgress, "id">),
  }));
  return results.sort(
    (a, b) => (b.lastActivityAt?.toMillis() ?? 0) - (a.lastActivityAt?.toMillis() ?? 0)
  );
}

/**
 * Discovery test results for a child, most recently completed first.
 */
export async function listDiscoveryResults(childId: string): Promise<DiscoveryResult[]> {
  const db = requireFirestore();
  const q = query(collection(db, "discovery_results"), where("childId", "==", childId));
  const snap = await getDocs(q);
  const results = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<DiscoveryResult, "id">),
  }));
  return results.sort(
    (a, b) => (b.completedAt?.toMillis() ?? 0) - (a.completedAt?.toMillis() ?? 0)
  );
}

/**
 * Recent generated reports for a parent account (across all children),
 * used to power the dashboard's Recent Activity feed.
 */
export async function listRecentReports(uid: string, take = 5): Promise<ReportItem[]> {
  const db = requireFirestore();
  const q = query(collection(db, "reports"), where("uid", "==", uid));
  const snap = await getDocs(q);
  const results = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ReportItem, "id">),
  }));
  return results
    .sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0))
    .slice(0, take);
}
