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
import {
  createUserIfNotExists,
  getCurrentUserProfile,
  updateLastLogin,
} from "@/lib/firestore/users";
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
  /** True while the users/{uid} doc is being created/updated after sign-in. */
  profileLoading: boolean;
  error: string | null;
  isFirebaseConfigured: boolean;
  selectChild: (childId: string | null) => void;
  refreshChildren: () => Promise<void>;
  refreshAccess: () => Promise<void>;
  refreshProfile: () => Promise<void>;
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
  refreshProfile: async () => {},
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

  /**
   * Runs right after Firebase confirms a signed-in user. Creates
   * users/{uid} on first login, or bumps lastLoginAt on every login after
   * that — this is the step requirement 7 needs completed before the app
   * (specifically anything reading `profile`) renders. Access/children are
   * loaded afterwards and fail independently, so a missing Firestore index
   * on those never blocks the profile sync above from completing.
   */
  const syncUserProfile = useCallback(async (firebaseUser: User) => {
    setProfileLoading(true);
    setError(null);

    try {
      const created = await createUserIfNotExists(firebaseUser);
      if (!created) {
        await updateLastLogin(firebaseUser.uid);
      }
      setProfile(await getCurrentUserProfile(firebaseUser.uid));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sync your profile."
      );
      setProfileLoading(false);
      return;
    }

    try {
      const [accessResult, childrenResult] = await Promise.all([
        getUserAccess(firebaseUser.uid),
        listChildren(firebaseUser.uid),
      ]);
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
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      setUser(nextUser);
      setLoading(false);
      setSessionMarker(Boolean(nextUser));

      if (nextUser) {
        void syncUserProfile(nextUser);
      } else {
        setProfile(null);
        setAccess(null);
        setChildProfiles([]);
        selectChild(null);
      }
    });
    return unsubscribe;
  }, [syncUserProfile, selectChild]);

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

  /**
   * Re-fetches users/{uid} without a full page reload — so a parent whose
   * access was just granted/removed by an admin can see it update in the
   * same session if this is called (e.g. from a manual refresh action),
   * in addition to it always being current after any page reload.
   */
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    setProfile(await getCurrentUserProfile(user.uid));
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
      refreshProfile,
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
      refreshProfile,
      signOut,
    ]
  );

  // Requirement: the Firestore profile must be created/updated before the
  // app renders. This only gates the brief window right after sign-in
  // (or on reload, right after Firebase restores a persisted session) —
  // signed-out visitors never see it, since `user` is null and this branch
  // is skipped entirely.
  const blockingInitialProfileSync = Boolean(user) && profileLoading && !profile && !error;

  return (
    <AuthContext.Provider value={value}>
      {blockingInitialProfileSync ? <ProfileSyncScreen /> : children}
    </AuthContext.Provider>
  );
}

function ProfileSyncScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      <p className="text-sm text-text-muted">Setting up your account…</p>
    </div>
  );
}
