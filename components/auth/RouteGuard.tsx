"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

/**
 * Client-side guard for protected routes. This is the real redirect
 * decision-maker (proxy.ts only does a best-effort cookie check to
 * avoid a flash of content) — it reacts to actual Firebase Auth state.
 */
export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isFirebaseConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, isFirebaseConfigured, router]);

  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center text-sm text-text-muted">
        Firebase isn&rsquo;t configured yet, so the dashboard can&rsquo;t load.
        Set the <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5">NEXT_PUBLIC_FIREBASE_*</code>
        environment variables to enable it.
      </div>
    );
  }

  if (loading || !user) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6 px-6 py-12">
      <div className="h-28 rounded-[28px] bg-surface" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-40 rounded-[28px] bg-surface" />
        <div className="h-40 rounded-[28px] bg-surface" />
      </div>
      <div className="h-52 rounded-[28px] bg-surface" />
    </div>
  );
}
