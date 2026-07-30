"use client";

import { useCallback } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import { listDiscoveryResults } from "@/lib/firestore/reports";
import { useAsyncData } from "@/lib/hooks/useAsyncData";
import { LockedSection } from "@/components/dashboard/LockedSection";

export function DiscoveryReports() {
  const { access, profile, selectedChild } = useAuth();
  const unlocked = hasProductAccess(access, profile, "discovery");

  const fetcher = useCallback(() => {
    if (!selectedChild) return Promise.resolve([]);
    return listDiscoveryResults(selectedChild.id);
  }, [selectedChild]);

  const { data, loading, error } = useAsyncData(
    fetcher,
    [selectedChild?.id],
    unlocked && Boolean(selectedChild)
  );

  if (!unlocked) {
    return (
      <LockedSection
        eyebrow="Discovery reports"
        title="See their strengths, unlocked with Discovery"
        description="Once Discovery is active, your child's profile and results will show up here."
      />
    );
  }

  return (
    <section className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Discovery reports
      </p>
      <h2 className="mt-1 font-display text-lg font-semibold text-text">
        {selectedChild ? `${selectedChild.name}'s profile` : "Pick a child to see reports"}
      </h2>

      {!selectedChild ? (
        <p className="mt-4 text-sm text-text-muted">
          Select or add a child above to see their Discovery results.
        </p>
      ) : loading ? (
        <div className="mt-4 h-24 animate-pulse rounded-2xl bg-bg" />
      ) : error ? (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      ) : !data || data.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">
          {selectedChild.name} hasn&rsquo;t completed a Discovery assessment yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {data.map((result) => (
            <li key={result.id} className="rounded-2xl border border-border bg-bg px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text">
                  {result.status === "completed" ? "Completed assessment" : "In progress"}
                </p>
                {result.topDomains.length > 0 && (
                  <span className="text-xs text-text-muted">
                    {result.topDomains.slice(0, 2).join(" · ")}
                  </span>
                )}
              </div>
              {result.summary && (
                <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                  {result.summary}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
