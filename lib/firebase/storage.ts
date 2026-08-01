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

export function requireFirebaseStorage(): FirebaseStorage {
  const instance = getFirebaseStorage();
  if (!instance) {
    throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars first.");
  }
  return instance;
}
