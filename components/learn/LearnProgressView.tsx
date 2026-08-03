"use client";

import { useCallback, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { listLearnProgressForParent } from "@/lib/firestore/reports";
import { useAsyncData } from "@/lib/hooks/useAsyncData";

/**
 * Real Student Dashboard reading actual learn_progress data — no invented
 * course catalog, game list, or leaderboard here. Those need real content
 * (or a migrated learn.valiyo.id app) before they can be built honestly;
 * this shows exactly what's really recorded for this family, including an
 * accurate empty state when nothing has been recorded yet.
 */
export function LearnProgressView() {
  const { user, childProfiles } = useAuth();
  const [childFilter, setChildFilter] = useState<string>("all");

  const fetcher = useCallback(() => {
    if (!user) return Promise.resolve([]);
    return listLearnProgressForParent(user.uid);
  }, [user]);

  const { data: progress, loading, error } = useAsyncData(fetcher, [user?.uid], Boolean(user));

  const childNameById = useMemo(
    () => new Map(childProfiles.map((c) => [c.id, c.name])),
    [childProfiles]
  );

  const filtered = useMemo(() => {
    if (!progress) return [];
    if (childFilter === "all") return progress;
    return progress.filter((p) => p.childId === childFilter);
  }, [progress, childFilter]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Learn</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-text">
          Progres Belajar
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Aktivitas kursus untuk semua anak di akun ini.
        </p>
      </div>

      {childProfiles.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setChildFilter("all")}
            className={`rounded-pill px-4 py-2 text-xs font-semibold transition-colors ${
              childFilter === "all" ? "bg-primary text-white" : "bg-surface text-text-muted"
            }`}
          >
            Semua anak
          </button>
          {childProfiles.map((child) => (
            <button
              key={child.id}
              type="button"
              onClick={() => setChildFilter(child.id)}
              className={`rounded-pill px-4 py-2 text-xs font-semibold transition-colors ${
                childFilter === child.id ? "bg-primary text-white" : "bg-surface text-text-muted"
              }`}
            >
              {child.avatarEmoji} {child.name}
            </button>
          ))}
        </div>
      )}

      <div className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
        {loading ? (
          <div className="space-y-2">
            <div className="h-16 animate-pulse rounded-2xl bg-bg" />
            <div className="h-16 animate-pulse rounded-2xl bg-bg" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-grow-bg text-primary">
              <BookOpen size={20} />
            </span>
            <p className="mt-3 text-sm font-semibold text-text">Belum ada aktivitas belajar</p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-text-muted">
              Progres kursus akan muncul di sini begitu tersedia. Konten kursus, permainan, dan
              latihan olimpiade masih dalam pengembangan.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((item) => (
              <li key={item.id} className="rounded-2xl border border-border bg-bg px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">{item.courseTitle}</p>
                    {childFilter === "all" && (
                      <p className="text-xs text-text-muted">{childNameById.get(item.childId) ?? "Anak"}</p>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    {item.progressPercent}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.min(100, Math.max(0, item.progressPercent))}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
