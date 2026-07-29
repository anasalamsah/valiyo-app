"use client";

import { useCallback } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import { listLearnProgress } from "@/lib/firestore/reports";
import { useAsyncData } from "@/lib/hooks/useAsyncData";
import { LockedSection } from "@/components/dashboard/LockedSection";

export function ContinueLearning() {
  const { access, selectedChild } = useAuth();
  const unlocked = hasProductAccess(access, "learn");

  const fetcher = useCallback(() => {
    if (!selectedChild) return Promise.resolve([]);
    return listLearnProgress(selectedChild.id);
  }, [selectedChild]);

  const { data, loading, error } = useAsyncData(
    fetcher,
    [selectedChild?.id],
    unlocked && Boolean(selectedChild)
  );

  if (!unlocked) {
    return (
      <LockedSection
        eyebrow="Continue learning"
        title="Coding & AI skills, unlocked with Learn"
        description="Once Learn is active, your child's in-progress courses will show up here."
      />
    );
  }

  return (
    <section className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Continue learning
      </p>
      <h2 className="mt-1 font-display text-lg font-semibold text-text">
        {selectedChild ? `${selectedChild.name}'s courses` : "Pick a child to see courses"}
      </h2>

      {!selectedChild ? (
        <p className="mt-4 text-sm text-text-muted">
          Select or add a child above to see their learning progress.
        </p>
      ) : loading ? (
        <div className="mt-4 space-y-2">
          <div className="h-14 animate-pulse rounded-2xl bg-bg" />
          <div className="h-14 animate-pulse rounded-2xl bg-bg" />
        </div>
      ) : error ? (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      ) : !data || data.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">
          No courses started yet — {selectedChild.name}&rsquo;s first lesson will appear here.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {data.map((progress) => (
            <li
              key={progress.id}
              className="rounded-2xl border border-border bg-bg px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text">{progress.courseTitle}</p>
                <span className="text-xs font-semibold text-primary">
                  {progress.progressPercent}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(100, Math.max(0, progress.progressPercent))}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
