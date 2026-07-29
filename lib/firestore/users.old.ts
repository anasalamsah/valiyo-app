import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { UserProfile } from "@/types/user";

const COLLECTION = "users";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

/**
 * Ensures `users/{uid}` exists.
 * - First login: creates the document with role "parent" and both
 *   createdAt/lastLoginAt set.
 * - Subsequent logins: refreshes displayName/photoURL (in case the Google
 *   account changed them) and bumps lastLoginAt, leaving role/createdAt
 *   untouched.
 */
export async function ensureUserProfile(user: User): Promise<UserProfile> {
  const db = requireFirestore();
  const ref = doc(db, COLLECTION, user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: "parent",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });
  } else {
    await setDoc(
      ref,
      {
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  const fresh = await getDoc(ref);
  return fresh.data() as UserProfile;
}
