"use client";

import { useCallback } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { listRecentReports } from "@/lib/firestore/reports";
import { useAsyncData } from "@/lib/hooks/useAsyncData";

const TYPE_EMOJI: Record<string, string> = {
  discovery: "🧠",
  learn: "📚",
  general: "🌱",
};

export function RecentActivity() {
  const { user } = useAuth();

  const fetcher = useCallback(() => {
    if (!user) return Promise.resolve([]);
    return listRecentReports(user.uid);
  }, [user]);

  const { data, loading, error } = useAsyncData(fetcher, [user?.uid], Boolean(user));

  return (
    <section className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Recent activity
      </p>
      <h2 className="mt-1 font-display text-lg font-semibold text-text">
        What&rsquo;s new for your family
      </h2>

      {loading ? (
        <div className="mt-4 space-y-2">
          <div className="h-12 animate-pulse rounded-2xl bg-bg" />
          <div className="h-12 animate-pulse rounded-2xl bg-bg" />
          <div className="h-12 animate-pulse rounded-2xl bg-bg" />
        </div>
      ) : error ? (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      ) : !data || data.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">
          Nothing yet — updates from Learn and Discovery will show up here.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {data.map((report) => (
            <li
              key={report.id}
              className="flex items-start gap-3 rounded-2xl border border-border bg-bg px-4 py-3"
            >
              <span className="text-base" aria-hidden="true">
                {TYPE_EMOJI[report.type] ?? "🌱"}
              </span>
              <div>
                <p className="text-sm font-semibold text-text">{report.title}</p>
                {report.summary && (
                  <p className="mt-0.5 text-xs text-text-muted">{report.summary}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
