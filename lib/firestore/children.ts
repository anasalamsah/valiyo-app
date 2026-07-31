import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { Child, ChildInput } from "@/types/child";

const COLLECTION = "children";

/**
 * Lists a parent's children, oldest-added first.
 *
 * Deliberately NOT `orderBy("createdAt")` server-side: combined with the
 * `where("parentUid", ...)` filter, that requires a composite index that
 * doesn't exist until someone manually creates it in the Firebase console
 * (this is what caused the "query requires an index" error). A family's
 * child list is small, so sorting the already-fetched results in JS is
 * effectively free and needs zero Firestore configuration.
 */
export async function listChildren(parentUid: string): Promise<Child[]> {
  const db = requireFirestore();
  const q = query(collection(db, COLLECTION), where("parentUid", "==", parentUid));
  const snap = await getDocs(q);
  const children = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Child, "id">) }));
  return children.sort(
    (a, b) => (a.createdAt?.toMillis() ?? 0) - (b.createdAt?.toMillis() ?? 0)
  );
}

export async function addChild(parentUid: string, input: ChildInput): Promise<string> {
  const db = requireFirestore();
  const ref = await addDoc(collection(db, COLLECTION), {
    parentUid,
    name: input.name.trim(),
    birthDate: input.birthDate ?? null,
    gender: input.gender ?? "unspecified",
    avatarEmoji: input.avatarEmoji ?? "🧒",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateChild(childId: string, input: Partial<ChildInput>): Promise<void> {
  const db = requireFirestore();
  const payload: Record<string, unknown> = { updatedAt: serverTimestamp() };
  if (input.name !== undefined) payload.name = input.name.trim();
  if (input.birthDate !== undefined) payload.birthDate = input.birthDate;
  if (input.gender !== undefined) payload.gender = input.gender;
  if (input.avatarEmoji !== undefined) payload.avatarEmoji = input.avatarEmoji;

  await updateDoc(doc(db, COLLECTION, childId), payload);
}

export async function deleteChild(childId: string): Promise<void> {
  const db = requireFirestore();
  await deleteDoc(doc(db, COLLECTION, childId));
}
