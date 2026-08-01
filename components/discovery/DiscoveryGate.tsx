"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import { LockedSection } from "@/components/dashboard/LockedSection";
import { DiscoveryFlow } from "@/components/discovery/DiscoveryFlow";

/** Entitlement gate for /discovery — reuses the exact same hasProductAccess
 * check and LockedSection component already used on the dashboard, so a
 * parent without Discovery access sees the same locked state everywhere,
 * not a different one invented just for this route. */
export function DiscoveryGate() {
  const { access, profile, profileLoading } = useAuth();

  if (profileLoading) {
    return <div className="h-64 animate-pulse rounded-[28px] bg-surface shadow-sm shadow-black/5" />;
  }

  if (!hasProductAccess(access, profile, "discovery")) {
    return (
      <LockedSection
        eyebrow="Discovery"
        title="Discovery belum aktif di akun ini"
        description="Hubungi admin untuk mengaktifkan akses Discovery sebelum memulai penilaian."
      />
    );
  }

  return <DiscoveryFlow />;
}
