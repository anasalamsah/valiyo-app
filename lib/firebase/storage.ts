import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFirebaseApp, isFirebaseConfigured } from "./config";

let storage: FirebaseStorage | undefined;

export function getFirebaseStorage(): FirebaseStorage | undefined {
  if (!isFirebaseConfigured) return undefined;
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!storage) storage = getStorage(app);
  return storage;
}

/**
 * `isFirebaseConfigured` (see ./config) only checks apiKey/projectId/appId
 * — it doesn't require NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, since Auth and
 * Firestore both work fine without it. That means a deployment can be
 * "configured" by that check yet still be missing the storage bucket env
 * var (an easy thing to omit — it's not always copied along with the rest
 * of the Firebase web config snippet). Any Storage-only feature (PDF
 * export here) would then fail with an opaque Firebase SDK error instead
 * of a message that actually points at the missing env var. This check
 * catches that specific gap up front.
 */
export function requireFirebaseStorage(): FirebaseStorage {
  const instance = getFirebaseStorage();
  if (!instance) {
    throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars first.");
  }
  if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    throw new Error(
      "Firebase Storage bucket is not configured. Set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET " +
        "(from the Firebase Console's project settings) — Auth and Firestore can work without " +
        "it, but file uploads like PDF export need it."
    );
  }
  return instance;
}
