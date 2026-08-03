"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import { LockedSection } from "@/components/dashboard/LockedSection";
import { LearnFlow } from "@/components/learn/LearnFlow";

/** Entitlement gate for /learn — same pattern as DiscoveryGate, reusing
 * the same hasProductAccess check and LockedSection component so a parent
 * without Learn access sees a consistent locked state everywhere. */
export function LearnGate() {
  const { access, profile, profileLoading } = useAuth();

  if (profileLoading) {
    return <div className="h-64 animate-pulse rounded-[28px] bg-surface shadow-sm shadow-black/5" />;
  }

  if (!hasProductAccess(access, profile, "learn")) {
    return (
      <LockedSection
        eyebrow="Learn"
        title="Learn belum aktif di akun ini"
        description="Hubungi admin untuk mengaktifkan akses Learn."
      />
    );
  }

  return <LearnFlow />;
}
