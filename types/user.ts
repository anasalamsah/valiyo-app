import type { Timestamp } from "firebase/firestore";

export type UserRole = "parent" | "admin";

/** Mirrors a document in the `users` collection, keyed by uid. */
export type UserProfile = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: Timestamp | null;
  lastLoginAt: Timestamp | null;
};
