import { doc, getDoc } from "firebase/firestore";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { ProductId, UserAccess } from "@/types/access";

const COLLECTION = "user_access";

/**
 * Reads `user_access/{uid}`. This collection is written by the billing
 * layer (a future Lynk.id webhook using the Admin SDK), never by the
 * client — this function is read-only by design. A missing document just
 * means the parent hasn't purchased anything yet.
 */
export async function getUserAccess(uid: string): Promise<UserAccess> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, uid));
  if (!snap.exists()) {
    return { uid, products: [], updatedAt: null };
  }
  const data = snap.data();
  return {
    uid,
    products: Array.isArray(data.products) ? (data.products as ProductId[]) : [],
    updatedAt: data.updatedAt ?? null,
  };
}

export function hasProductAccess(access: UserAccess | null, product: ProductId): boolean {
  return access?.products.includes(product) ?? false;
}
