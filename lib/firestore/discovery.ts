import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
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
  await deleteDraftAssessment(childId);
  return ref.id;
}

/** Reads a single completed (or in-progress) assessment by its document ID. */
export async function getAssessmentById(id: string): Promise<DiscoveryAssessment | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<DiscoveryAssessment, "id">) };
}
