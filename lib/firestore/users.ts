import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { UserProfile } from "@/types/user";

const COLLECTION = "users";

/**
 * Reads `users/{uid}` as-is. Returns null if it doesn't exist yet.
 */
export async function getCurrentUserProfile(uid: string): Promise<UserProfile | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

/**
 * Creates `users/{uid}` if it doesn't exist yet, using the signed-in
 * Firebase user's info. Does nothing if the document already exists —
 * call `updateLastLogin` for that case instead.
 *
 * Returns true if the document was created, false if it already existed.
 */
export async function createUserIfNotExists(user: User): Promise<boolean> {
  const db = requireFirestore();
  const ref = doc(db, COLLECTION, user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) return false;

  await setDoc(ref, {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: "parent",
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });

  return true;
}

/**
 * Bumps `lastLoginAt` on an existing `users/{uid}` document. Only that
 * field is touched — displayName/email/photoURL/role/createdAt are left
 * as-is.
 */
export async function updateLastLogin(uid: string): Promise<void> {
  const db = requireFirestore();
  await updateDoc(doc(db, COLLECTION, uid), {
    lastLoginAt: serverTimestamp(),
  });
}
