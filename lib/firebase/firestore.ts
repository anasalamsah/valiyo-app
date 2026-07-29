import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseApp, isFirebaseConfigured } from "./config";

let firestore: Firestore | undefined;

/**
 * Lazily initialize (and memoize) the Firestore client instance. Returns
 * undefined when Firebase hasn't been configured yet — callers must check
 * before reading/writing.
 */
export function getFirebaseFirestore(): Firestore | undefined {
  if (!isFirebaseConfigured) return undefined;
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!firestore) firestore = getFirestore(app);
  return firestore;
}

export function requireFirestore(): Firestore {
  const db = getFirebaseFirestore();
  if (!db) {
    throw new Error(
      "Firestore is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars first."
    );
  }
  return db;
}
