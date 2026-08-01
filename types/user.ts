import type { Timestamp } from "firebase/firestore";

export type UserRole = "parent" | "admin" | "teacher";

/**
 * Admin-managed product entitlements, stored inline on the user doc
 * (users/{uid}.products.*). Distinct from the `user_access` collection,
 * which is reserved for purchase-driven access (e.g. a future Lynk.id
 * webhook) — a product is unlocked if EITHER source grants it. See
 * `hasProductAccess` in lib/firestore/access.ts.
 */
export type ProductAccessMap = {
  learn: boolean;
  discovery: boolean;
};

/** Mirrors a document in the `users` collection, keyed by uid. */
export type UserProfile = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: Timestamp | null;
  lastLoginAt: Timestamp | null;
  /** Optional on older docs created before this field existed. */
  products?: ProductAccessMap;
};
