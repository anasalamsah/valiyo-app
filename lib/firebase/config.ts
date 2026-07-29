import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

/**
 * Firebase is optional at build/runtime. Until every NEXT_PUBLIC_FIREBASE_*
 * env var is set, `isFirebaseConfigured` stays false and the app renders in
 * a "not configured" state (see components/ui/AuthButton.tsx) instead of
 * crashing. This lets the landing page ship before auth, database, and AI
 * features are wired up.
 */
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | undefined;

/**
 * Lazily initialize (and memoize) the Firebase app. Returns undefined when
 * Firebase hasn't been configured yet, so callers must check before using
 * auth/firestore/etc.
 */
export function getFirebaseApp(): FirebaseApp | undefined {
  if (!isFirebaseConfigured) return undefined;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}
