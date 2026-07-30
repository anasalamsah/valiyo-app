"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

/**
 * Guards /admin/*. Requires both an authenticated user AND
 * profile.role === "admin". Signed-out visitors go to "/"; signed-in
 * non-admins go to "/dashboard" rather than a dead end.
 *
 * Like RouteGuard, this is the real (reactive) gate — proxy.ts only does a
 * best-effort cookie check to avoid a flash of content; the actual
 * enforcement for who can read/write as an admin lives in firestore.rules.
 */
export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, profileLoading, isFirebaseConfigured } = useAuth();
  const router = useRouter();

  const resolved = !loading && !profileLoading;
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    if (!isFirebaseConfigured || !resolved) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (!isAdmin) {
      router.replace("/dashboard");
    }
  }, [isFirebaseConfigured, resolved, user, isAdmin, router]);

  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center text-sm text-text-muted">
        Firebase isn&rsquo;t configured yet, so the admin panel can&rsquo;t load.
      </div>
    );
  }

  if (!resolved || !user || !isAdmin) {
    return <AdminSkeleton />;
  }

  return <>{children}</>;
}

function AdminSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-6 py-12">
      <div className="h-10 w-48 rounded-full bg-surface" />
      <div className="h-40 rounded-[28px] bg-surface" />
    </div>
  );
}
