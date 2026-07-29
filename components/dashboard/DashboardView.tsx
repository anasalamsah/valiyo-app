"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { ChildSelector } from "@/components/dashboard/ChildSelector";
import { ProductAccess } from "@/components/dashboard/ProductAccess";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { DiscoveryReports } from "@/components/dashboard/DiscoveryReports";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export function DashboardView() {
  const { error } = useAuth();

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <WelcomeCard />

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <ChildSelector />
      <ProductAccess />

      <div className="grid gap-6 lg:grid-cols-2">
        <ContinueLearning />
        <DiscoveryReports />
      </div>

      <RecentActivity />
    </div>
  );
}
