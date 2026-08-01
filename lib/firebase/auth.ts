import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
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

function requireAuth(): Auth {
  const authInstance = getFirebaseAuth();
  if (!authInstance) {
    throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars first.");
  }
  return authInstance;
}

export async function signInWithGoogle(): Promise<User | null> {
  const authInstance = requireAuth();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(authInstance, provider);
  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const authInstance = requireAuth();
  const result = await signInWithEmailAndPassword(authInstance, email, password);
  return result.user;
}

/**
 * Creates an email/password account and applies `displayName` immediately
 * (awaited before returning) so it's set as early as possible. Note: Firebase
 * fires onAuthStateChanged as soon as the account exists — there's a small
 * window where AuthProvider's profile sync could run before this
 * updateProfile call resolves, in which case users/{uid}.displayName is
 * created as null and (per the existing "only touch lastLoginAt on repeat
 * logins" rule) never auto-corrects itself. Harmless — every screen that
 * shows displayName already falls back gracefully — but worth knowing if a
 * profile page/name-edit feature is needed later.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<User> {
  const authInstance = requireAuth();
  const result = await createUserWithEmailAndPassword(authInstance, email, password);
  if (displayName) {
    await updateProfile(result.user, { displayName });
  }
  return result.user;
}

export async function resetPassword(email: string): Promise<void> {
  const authInstance = requireAuth();
  await sendPasswordResetEmail(authInstance, email);
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
