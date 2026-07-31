import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { ProductId } from "@/types/access";

const COLLECTION = "pending_access";

export type PendingAccess = {
  email: string;
  learn: boolean;
  discovery: boolean;
};

/**
 * Pre-authorizes a customer by email, before they've ever signed in —
 * used by /admin/access → "Add Purchased Customer" right after a Lynk.id
 * purchase. Document ID is the lowercased email, matching what
 * `consumePendingAccess` looks up on that email's first login.
 * Overwrites any existing pending entry for the same email/product combo
 * (last grant wins) rather than accumulating duplicates.
 */
export async function createPendingAccess(email: string, product: ProductId): Promise<void> {
  const db = requireFirestore();
  const normalizedEmail = email.trim().toLowerCase();
  const ref = doc(db, COLLECTION, normalizedEmail);
  const existing = await getDoc(ref);
  const existingData = existing.exists() ? (existing.data() as PendingAccess) : null;

  await setDoc(ref, {
    email: normalizedEmail,
    learn: product === "learn" ? true : (existingData?.learn ?? false),
    discovery: product === "discovery" ? true : (existingData?.discovery ?? false),
    createdAt: serverTimestamp(),
  });
}

/**
 * Called from createUserIfNotExists on a brand-new user's first login.
 * Looks up pending_access/{their lowercased email}; if found, returns
 * which products to apply to the new users/{uid}.products, and deletes
 * the pending doc (consumed — it only ever applies once). Returns null
 * if there was nothing pending, which is the normal case for most users.
 */
export async function consumePendingAccess(email: string | null): Promise<PendingAccess | null> {
  if (!email) return null;
  const db = requireFirestore();
  const normalizedEmail = email.trim().toLowerCase();
  const ref = doc(db, COLLECTION, normalizedEmail);

  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data() as PendingAccess;
  await deleteDoc(ref);
  return data;
}
