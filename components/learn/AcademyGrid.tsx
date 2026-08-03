"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { ACADEMIES } from "@/config/learnAcademies";
import { cn } from "@/lib/utils/cn";
import type { AcademyData } from "@/types/learnAcademy";

export function AcademyGrid({ onSelect }: { onSelect: (academy: AcademyData) => void }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Learn</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-text">Pilih Akademi</h1>
          <p className="mt-1 text-sm text-text-muted">
            Setiap akademi punya misi belajar sendiri, sesuai minat anak.
          </p>
        </div>
        <Link
          href="/learn/progress"
          className="shrink-0 text-xs font-semibold text-text-muted transition-colors hover:text-primary"
        >
          Lihat Progres
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACADEMIES.map((academy) => (
          <button
            key={academy.id}
            type="button"
            disabled={academy.isComingSoon}
            onClick={() => onSelect(academy)}
            className={cn(
              "group relative overflow-hidden rounded-[28px] border-2 bg-surface p-6 text-left shadow-sm shadow-black/5 transition-transform",
              academy.isComingSoon
                ? "cursor-not-allowed border-border opacity-70"
                : "border-border hover:-translate-y-1 hover:border-primary/40"
            )}
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-20 bg-gradient-to-r opacity-90",
                academy.gradientBg
              )}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-md">
                  {academy.icon}
                </span>
                {academy.isComingSoon && (
                  <span className="flex items-center gap-1 rounded-pill bg-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Lock size={10} /> Segera Hadir
                  </span>
                )}
              </div>

              <p className="mt-4 font-display text-lg font-semibold text-text">
                {academy.title}
              </p>
              <p className="mt-1 text-xs font-medium text-text-muted">{academy.tagline}</p>
              <p className="mt-2 text-xs text-text-muted">{academy.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {academy.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-pill bg-grow-bg px-2 py-0.5 text-[10px] font-semibold text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
