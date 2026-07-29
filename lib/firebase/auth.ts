import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";
import { getFirebaseApp, isFirebaseConfigured } from "./config";

let auth: Auth | undefined;

function getFirebaseAuth(): Auth | undefined {
  if (!isFirebaseConfigured) return undefined;
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!auth) auth = getAuth(app);
  return auth;
}

export async function signInWithGoogle(): Promise<User | null> {
  const authInstance = getFirebaseAuth();
  if (!authInstance) {
    throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars first.");
  }
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(authInstance, provider);
  return result.user;
}

export async function signOut(): Promise<void> {
  const authInstance = getFirebaseAuth();
  if (!authInstance) return;
  await firebaseSignOut(authInstance);
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  const authInstance = getFirebaseAuth();
  if (!authInstance) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(authInstance, callback);
}

export { isFirebaseConfigured };
