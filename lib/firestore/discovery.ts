import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type {
  AssessmentAnswer,
  AssessmentChildProfile,
  DiscoveryAssessment,
} from "@/types/discoveryAssessment";

const COLLECTION = "discovery_results";

/**
 * Drafts use a deterministic doc ID (one in-progress draft per child at a
 * time) so autosave can just repeatedly overwrite the same document rather
 * than accumulating duplicates. Once a draft is submitted for analysis
 * (Milestone 4), that flow creates a separate auto-ID "completed" document
 * and deletes this draft — so a child's assessment history (Milestone 7)
 * only ever lists finished reports, never half-filled drafts.
 */
function draftDocId(childId: string): string {
  return `draft_${childId}`;
}

export type DiscoveryDraft = {
  uid: string;
  childId: string;
  status: "in_progress";
  childProfileSnapshot: Partial<AssessmentChildProfile>;
  answers: AssessmentAnswer[];
  updatedAt: unknown;
};

/**
 * Autosave: upserts the in-progress draft for this child. Safe to call on
 * every answer change — Firestore setDoc is idempotent and this always
 * targets the same deterministic doc ID.
 */
export async function saveDraftAssessment(
  uid: string,
  childId: string,
  answers: AssessmentAnswer[],
  childProfileSnapshot: Partial<AssessmentChildProfile>
): Promise<void> {
  const db = requireFirestore();
  await setDoc(doc(db, COLLECTION, draftDocId(childId)), {
    uid,
    childId,
    status: "in_progress",
    childProfileSnapshot,
    answers,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Resumes an in-progress draft for this child, if one exists. Used so a
 * parent who navigates away mid-assessment doesn't lose their answers.
 */
export async function getDraftAssessment(childId: string): Promise<DiscoveryDraft | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, draftDocId(childId)));
  if (!snap.exists()) return null;
  return snap.data() as DiscoveryDraft;
}

/** Discards the in-progress draft, e.g. when the parent chooses to start over. */
export async function deleteDraftAssessment(childId: string): Promise<void> {
  const db = requireFirestore();
  await deleteDoc(doc(db, COLLECTION, draftDocId(childId)));
}

/**
 * Saves a finished analysis as a new, auto-ID document (status
 * "completed") and removes the in-progress draft. Auto-ID (rather than
 * the draft's deterministic ID) means a child can accumulate multiple
 * completed assessments over time — each a permanent, independent report
 * — which is what the assessment history (a later milestone) needs.
 * Returns the new document's ID so the caller can navigate to its report.
 */
export async function completeAssessment(
  uid: string,
  childId: string,
  answers: AssessmentAnswer[],
  analysis: Omit<
    DiscoveryAssessment,
    "id" | "uid" | "childId" | "status" | "answers" | "createdAt" | "updatedAt" | "completedAt" | "pdfUrl"
  >
): Promise<string> {
  const db = requireFirestore();
  const ref = await addDoc(collection(db, COLLECTION), {
    ...analysis,
    uid,
    childId,
    status: "completed",
    answers,
    pdfUrl: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    completedAt: serverTimestamp(),
  });

  // Best-effort cleanup: the report above is already saved and valid at
  // this point, so a failure here (e.g. a transient rules/network hiccup)
  // must never surface as "analysis failed" to the caller — that would be
  // wrong and confusing, since the real work already succeeded.
  try {
    await deleteDraftAssessment(childId);
  } catch (err) {
    console.error("Failed to clean up discovery draft (non-fatal):", err);
  }

  return ref.id;
}

/** Reads a single completed (or in-progress) assessment by its document ID. */
export async function getAssessmentById(id: string): Promise<DiscoveryAssessment | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<DiscoveryAssessment, "id">) };
}

/**
 * Records where the generated PDF for this report landed in Storage, so a
 * second visit to the report can link straight to the existing file
 * instead of regenerating and re-uploading it.
 */
export async function savePdfUrl(id: string, pdfUrl: string): Promise<void> {
  const db = requireFirestore();
  await updateDoc(doc(db, COLLECTION, id), { pdfUrl, updatedAt: serverTimestamp() });
}

/**
 * Every completed assessment across all of this parent's children, most
 * recent first. No server-side `orderBy` (same reasoning as everywhere
 * else in this app — see lib/firestore/reports.ts): avoids needing a
 * manually-created composite index, sorts the — typically small —
 * result set in JS instead. Drafts (status "in_progress") are excluded;
 * history only ever shows finished reports.
 */
export async function listAssessmentHistory(uid: string): Promise<DiscoveryAssessment[]> {
  const db = requireFirestore();
  const q = query(
    collection(db, COLLECTION),
    where("uid", "==", uid),
    where("status", "==", "completed")
  );
  const snap = await getDocs(q);
  const results = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<DiscoveryAssessment, "id">),
  }));
  return results.sort(
    (a, b) => (b.completedAt?.toMillis() ?? 0) - (a.completedAt?.toMillis() ?? 0)
  );
}

/**
 * "Duplicate Assessment": seeds a new in-progress draft for the same
 * child from a past completed report's answers and profile snapshot, so
 * the parent can quickly re-run an assessment (e.g. to track progress
 * over time) by tweaking a few answers instead of starting all 30
 * questions from scratch. Reuses saveDraftAssessment — the parent lands
 * back in the normal /discovery flow to review/adjust before analyzing.
 */
export async function duplicateAssessmentAsDraft(report: DiscoveryAssessment): Promise<void> {
  await saveDraftAssessment(
    report.uid,
    report.childId,
    report.answers,
    report.childProfileSnapshot
  );
}

/** Permanently deletes a completed assessment. Does not touch its PDF in
 * Storage (if any) — callers that also want that cleaned up should call
 * deleteDiscoveryPdf from lib/pdf/generateDiscoveryPdf separately. */
export async function deleteCompletedAssessment(id: string): Promise<void> {
  const db = requireFirestore();
  await deleteDoc(doc(db, COLLECTION, id));
}
