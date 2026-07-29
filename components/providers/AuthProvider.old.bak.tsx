"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import {
  isFirebaseConfigured,
  signOut as firebaseSignOut,
  subscribeToAuthChanges,
} from "@/lib/firebase/auth";
import { ensureUserProfile } from "@/lib/firestore/users";
import { getUserAccess } from "@/lib/firestore/access";
import { listChildren } from "@/lib/firestore/children";
import type { UserProfile } from "@/types/user";
import type { ProductId, UserAccess } from "@/types/access";
import type { Child } from "@/types/child";

const SELECTED_CHILD_STORAGE_KEY = "valiyo:selectedChildId";
// Non-httpOnly marker cookie, set/cleared here purely so proxy.ts can
// avoid flashing the dashboard shell to signed-out visitors. It is NOT a
// security boundary — see proxy.ts and firestore.rules for the real
// enforcement.
const SESSION_MARKER_COOKIE = "valiyo_signed_in";

function setSessionMarker(present: boolean) {
  if (typeof document === "undefined") return;
  if (present) {
    document.cookie = `${SESSION_MARKER_COOKIE}=1; path=/; max-age=2592000; SameSite=Lax`;
  } else {
    document.cookie = `${SESSION_MARKER_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }
}

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  access: UserAccess | null;
  purchasedProducts: ProductId[];
  childProfiles: Child[];
  selectedChild: Child | null;
  selectedChildId: string | null;
  /** True until the initial Firebase Auth state has resolved. */
  loading: boolean;
  /** True while profile/access/children are being loaded after sign-in. */
  profileLoading: boolean;
  error: string | null;
  isFirebaseConfigured: boolean;
  selectChild: (childId: string | null) => void;
  refreshChildren: () => Promise<void>;
  refreshAccess: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  access: null,
  purchasedProducts: [],
  childProfiles: [],
  selectedChild: null,
  selectedChildId: null,
  loading: false,
  profileLoading: false,
  error: null,
  isFirebaseConfigured: false,
  selectChild: () => {},
  refreshChildren: async () => {},
  refreshAccess: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [access, setAccess] = useState<UserAccess | null>(null);
  const [childProfiles, setChildProfiles] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectChild = useCallback((childId: string | null) => {
    setSelectedChildIdState(childId);
    if (typeof window === "undefined") return;
    if (childId) window.localStorage.setItem(SELECTED_CHILD_STORAGE_KEY, childId);
    else window.localStorage.removeItem(SELECTED_CHILD_STORAGE_KEY);
  }, []);

  const loadUserData = useCallback(
    async (firebaseUser: User) => {
      setProfileLoading(true);
      setError(null);
      try {
        const [profileResult, accessResult, childrenResult] = await Promise.all([
          ensureUserProfile(firebaseUser),
          getUserAccess(firebaseUser.uid),
          listChildren(firebaseUser.uid),
        ]);
        setProfile(profileResult);
        setAccess(accessResult);
        setChildProfiles(childrenResult);

        const storedId =
          typeof window !== "undefined"
            ? window.localStorage.getItem(SELECTED_CHILD_STORAGE_KEY)
            : null;
        const nextSelectedId = childrenResult.some((c) => c.id === storedId)
          ? storedId
          : (childrenResult[0]?.id ?? null);
        setSelectedChildIdState(nextSelectedId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load your account data."
        );
      } finally {
        setProfileLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      setUser(nextUser);
      setLoading(false);
      setSessionMarker(Boolean(nextUser));

      if (nextUser) {
        void loadUserData(nextUser);
      } else {
        setProfile(null);
        setAccess(null);
        setChildProfiles([]);
        selectChild(null);
      }
    });
    return unsubscribe;
  }, [loadUserData, selectChild]);

  const refreshChildren = useCallback(async () => {
    if (!user) return;
    const result = await listChildren(user.uid);
    setChildProfiles(result);
    if (selectedChildId && !result.some((c) => c.id === selectedChildId)) {
      selectChild(result[0]?.id ?? null);
    } else if (!selectedChildId && result.length > 0) {
      selectChild(result[0].id);
    }
  }, [user, selectedChildId, selectChild]);

  const refreshAccess = useCallback(async () => {
    if (!user) return;
    setAccess(await getUserAccess(user.uid));
  }, [user]);

  const signOut = useCallback(async () => {
    await firebaseSignOut();
    setSessionMarker(false);
  }, []);

  const selectedChild = useMemo(
    () => childProfiles.find((c) => c.id === selectedChildId) ?? null,
    [childProfiles, selectedChildId]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      access,
      purchasedProducts: access?.products ?? [],
      childProfiles,
      selectedChild,
      selectedChildId,
      loading,
      profileLoading,
      error,
      isFirebaseConfigured,
      selectChild,
      refreshChildren,
      refreshAccess,
      signOut,
    }),
    [
      user,
      profile,
      access,
      childProfiles,
      selectedChild,
      selectedChildId,
      loading,
      profileLoading,
      error,
      selectChild,
      refreshChildren,
      refreshAccess,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
