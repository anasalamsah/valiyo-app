"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowUpDown, Copy, Trash2, FileText } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import { LockedSection } from "@/components/dashboard/LockedSection";
import {
  deleteCompletedAssessment,
  duplicateAssessmentAsDraft,
  listAssessmentHistory,
} from "@/lib/firestore/discovery";
import { cn } from "@/lib/utils/cn";
import type { DiscoveryAssessment } from "@/types/discoveryAssessment";

type SortOrder = "newest" | "oldest";

export function HistoryView() {
  const router = useRouter();
  const { user, access, profile, profileLoading, childProfiles } = useAuth();

  const [reports, setReports] = useState<DiscoveryAssessment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [childFilter, setChildFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const unlocked = hasProductAccess(access, profile, "discovery");

  async function loadHistory() {
    if (!user) return;
    setLoading(true);
    setLoadError(null);
    try {
      setReports(await listAssessmentHistory(user.uid));
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Gagal memuat riwayat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!unlocked || !user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: initial data load on mount, same pattern as lib/hooks/useAsyncData.ts.
    void loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked, user?.uid]);

  const filtered = useMemo(() => {
    if (!reports) return [];
    let list = reports;
    if (childFilter !== "all") {
      list = list.filter((r) => r.childId === childFilter);
    }
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter((r) => (r.childProfileSnapshot?.name ?? "").toLowerCase().includes(term));
    }
    const sorted = [...list].sort((a, b) => {
      const diff = (a.completedAt?.toMillis() ?? 0) - (b.completedAt?.toMillis() ?? 0);
      return sortOrder === "newest" ? -diff : diff;
    });
    return sorted;
  }, [reports, childFilter, searchTerm, sortOrder]);

  async function handleDuplicate(report: DiscoveryAssessment) {
    setPendingId(report.id);
    setActionError(null);
    try {
      await duplicateAssessmentAsDraft(report);
      router.push(`/discovery?childId=${report.childId}`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Gagal menduplikasi.");
      setPendingId(null);
    }
  }

  async function handleDelete(report: DiscoveryAssessment) {
    if (
      !window.confirm(
        `Hapus laporan ${report.childProfileSnapshot?.name ?? "ini"} tanggal ${formatDate(report)}? Tindakan ini tidak bisa dibatalkan.`
      )
    ) {
      return;
    }
    setPendingId(report.id);
    setActionError(null);
    try {
      await deleteCompletedAssessment(report.id);
      setReports((prev) => prev?.filter((r) => r.id !== report.id) ?? null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Gagal menghapus.");
    } finally {
      setPendingId(null);
    }
  }

  function formatDate(report: DiscoveryAssessment): string {
    const millis = report.completedAt?.toMillis?.();
    if (!millis) return "-";
    return new Date(millis).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (profileLoading) {
    return <div className="h-64 animate-pulse rounded-[28px] bg-surface shadow-sm shadow-black/5" />;
  }

  if (!unlocked) {
    return (
      <LockedSection
        eyebrow="Riwayat Discovery"
        title="Discovery belum aktif di akun ini"
        description="Hubungi admin untuk mengaktifkan akses Discovery."
      />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Discovery</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-text">Riwayat Penilaian</h1>
        <p className="mt-1 text-sm text-text-muted">
          Semua laporan yang sudah selesai dianalisis, untuk semua anak.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-[28px] bg-surface p-5 shadow-sm shadow-black/5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama anak"
            className="w-full rounded-2xl border border-border bg-bg py-2.5 pl-10 pr-4 text-sm text-text outline-none focus:border-primary"
          />
        </div>

        <select
          value={childFilter}
          onChange={(e) => setChildFilter(e.target.value)}
          className="rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-primary"
        >
          <option value="all">Semua anak</option>
          {childProfiles.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setSortOrder((s) => (s === "newest" ? "oldest" : "newest"))}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-bg px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary/40"
        >
          <ArrowUpDown size={14} />
          {sortOrder === "newest" ? "Terbaru" : "Terlama"}
        </button>
      </div>

      {actionError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {actionError}
        </p>
      )}
      {loadError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {loadError}
        </p>
      )}

      <div className="rounded-[28px] bg-surface p-3 shadow-sm shadow-black/5 sm:p-4">
        {loading ? (
          <div className="space-y-2 p-2">
            <div className="h-20 animate-pulse rounded-2xl bg-bg" />
            <div className="h-20 animate-pulse rounded-2xl bg-bg" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-4 text-sm text-text-muted">
            {reports && reports.length > 0
              ? "Tidak ada laporan yang cocok dengan pencarian/filter."
              : "Belum ada laporan Discovery yang selesai."}
          </p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((report) => {
              const isPending = pendingId === report.id;
              return (
                <li
                  key={report.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-bg px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text">
                      {report.childProfileSnapshot?.name ?? "Anak"}
                    </p>
                    <p className="text-xs text-text-muted">
                      {formatDate(report)} · {report.childProfileSnapshot?.age} tahun
                    </p>
                    {report.topStrengths?.[0] && (
                      <p className="mt-1 text-xs text-primary">
                        Kekuatan utama: {report.topStrengths[0].title}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/discovery/report/${report.id}`}
                      className="inline-flex items-center gap-1.5 rounded-pill bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                      <FileText size={12} /> Lihat Laporan
                    </Link>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDuplicate(report)}
                      className="inline-flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Copy size={12} /> Duplikat
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(report)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                        "border-border text-text hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                      )}
                    >
                      <Trash2 size={12} /> {isPending ? "Memproses…" : "Hapus"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
