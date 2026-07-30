import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { requireFirestore } from "@/lib/firebase/firestore";
import type { UserProfile } from "@/types/user";
import type { ProductId } from "@/types/access";

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
 * Lists every registered user, newest first. Powers the /admin/access
 * roster so an admin can browse and grant/remove access for anyone
 * without knowing their email in advance. Requires the `isAdmin()`
 * Firestore rule (only admins may `list` the `users` collection).
 */
export async function listAllUsers(): Promise<UserProfile[]> {
  const db = requireFirestore();
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as UserProfile);
}

/**
 * Looks up a single user by their exact, trimmed email. Kept for
 * programmatic/API use; the /admin/access UI itself filters the roster
 * from `listAllUsers` client-side instead of querying per keystroke.
 * Requires the caller to satisfy the `isAdmin()` Firestore rule (only
 * admins may `list`/query the `users` collection) — anyone else gets a
 * permission-denied error from Firestore itself.
 */
export async function findUserByEmail(email: string): Promise<UserProfile | null> {
  const db = requireFirestore();
  const trimmed = email.trim();
  if (!trimmed) return null;

  const q = query(collection(db, COLLECTION), where("email", "==", trimmed), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as UserProfile;
}

/**
 * Grants or removes a single product on `users/{uid}.products`, e.g.
 * `setProductAccess(uid, "learn", true)`. Uses a dot-path update so it
 * creates the `products` map on first use even for users who existed
 * before this field did — Firestore fills in intermediate objects for a
 * dotted field path automatically. Restricted server-side to admins by
 * the Firestore rule on `users/{uid}` (admins may only touch `products`,
 * nothing else on the document).
 */
export async function setProductAccess(
  uid: string,
  product: ProductId,
  granted: boolean
): Promise<void> {
  const db = requireFirestore();
  await updateDoc(doc(db, COLLECTION, uid), {
    [`products.${product}`]: granted,
  });
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
