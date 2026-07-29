import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
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
 * Requires a composite index on (parentUid asc, createdAt asc) — Firestore
 * will surface a console link to create it the first time this runs
 * against a fresh project.
 */
export async function listChildren(parentUid: string): Promise<Child[]> {
  const db = requireFirestore();
  const q = query(
    collection(db, COLLECTION),
    where("parentUid", "==", parentUid),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Child, "id">) }));
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
