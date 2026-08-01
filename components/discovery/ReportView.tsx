"use client";

import Link from "next/link";
import { Sparkles, TrendingUp, TrendingDown, Rocket } from "lucide-react";
import { useAsyncData } from "@/lib/hooks/useAsyncData";
import { getAssessmentById } from "@/lib/firestore/discovery";
import { useCallback } from "react";

export function ReportView({ id }: { id: string }) {
  const fetcher = useCallback(() => getAssessmentById(id), [id]);
  const { data: report, loading, error } = useAsyncData(fetcher, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-[28px] bg-surface" />
        <div className="h-64 animate-pulse rounded-[28px] bg-surface" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="rounded-[28px] bg-surface p-7 text-center shadow-sm shadow-black/5">
        <p className="text-sm text-red-500">
          {error ?? "Laporan tidak ditemukan."}
        </p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-grow-bg p-7">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Laporan Discovery
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-text">
          {report.childProfileSnapshot?.name ?? "Anak"}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Usia {report.childProfileSnapshot?.age} tahun · {report.childProfileSnapshot?.school}
        </p>
      </div>

      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">Ringkasan AI</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text">{report.aiSummary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
          <div className="flex items-center gap-2 text-accent">
            <TrendingUp size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Kekuatan Utama</p>
          </div>
          <ul className="mt-3 space-y-3">
            {report.topStrengths?.map((s, i) => (
              <li key={i} className="rounded-2xl border border-border bg-bg px-4 py-3">
                <p className="text-sm font-semibold text-text">{s.title}</p>
                <p className="mt-1 text-xs text-text-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
          <div className="flex items-center gap-2 text-secondary">
            <TrendingDown size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Area Bertumbuh</p>
          </div>
          <ul className="mt-3 space-y-3">
            {report.skillsToDevelop?.map((s, i) => (
              <li key={i} className="rounded-2xl border border-border bg-bg px-4 py-3">
                <p className="text-sm font-semibold text-text">{s.title}</p>
                <p className="mt-1 text-xs text-text-muted">{s.guidance}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {report.roadmap && (
        <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
          <div className="flex items-center gap-2 text-primary">
            <Rocket size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Langkah Cepat Minggu Ini</p>
          </div>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-text">
            {report.roadmap.quickWins.map((win, i) => (
              <li key={i}>{win}</li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/dashboard"
        className="inline-block text-sm font-semibold text-primary hover:text-primary-hover"
      >
        ← Kembali ke Dashboard
      </Link>
    </div>
  );
}
