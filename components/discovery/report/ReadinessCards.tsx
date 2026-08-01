"use client";

import { Trophy, Cpu, Palette, FlaskConical, Calculator, Languages } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { DomainReadiness } from "@/types/discoveryAssessment";

const CARDS: { key: keyof ReadinessCardsProps["readiness"]; label: string; icon: typeof Trophy }[] = [
  { key: "olympiadReadiness", label: "Kesiapan Olimpiade", icon: Trophy },
  { key: "codingReadiness", label: "Kesiapan Coding", icon: Cpu },
  { key: "creativityPotential", label: "Potensi Kreativitas", icon: Palette },
  { key: "scienceCuriosity", label: "Rasa Ingin Tahu Sains", icon: FlaskConical },
  { key: "mathematicalThinking", label: "Berpikir Matematis", icon: Calculator },
  { key: "languageDevelopment", label: "Perkembangan Bahasa", icon: Languages },
];

type ReadinessCardsProps = {
  readiness: {
    olympiadReadiness: DomainReadiness;
    codingReadiness: DomainReadiness;
    creativityPotential: DomainReadiness;
    scienceCuriosity: DomainReadiness;
    mathematicalThinking: DomainReadiness;
    languageDevelopment: DomainReadiness;
  };
};

const LEVEL_STYLES: Record<string, string> = {
  Tinggi: "bg-accent/15 text-accent",
  Sedang: "bg-secondary/25 text-text",
};

/** No numeric score exists for these domains (only a level label) — this
 * is a rendering-only approximation to draw the progress ring, never
 * stored back to Firestore. */
function levelToPercent(level: string): number {
  if (level === "Tinggi") return 88;
  if (level === "Sedang") return 62;
  return 38;
}

function ScoreRing({ percent, colorClass }: { percent: number; colorClass: string }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0 -rotate-90">
      <circle cx="20" cy="20" r={radius} fill="none" stroke="#ece6d8" strokeWidth="4" />
      <circle
        cx="20"
        cy="20"
        r={radius}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={colorClass}
        stroke="currentColor"
      />
    </svg>
  );
}

export function ReadinessCards({ readiness }: ReadinessCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CARDS.map(({ key, label, icon: Icon }) => {
        const item = readiness[key];
        if (!item) return null;
        const percent = levelToPercent(item.level);
        const ringColor = item.level === "Tinggi" ? "text-primary" : item.level === "Sedang" ? "text-accent" : "text-secondary";

        return (
          <div key={key} className="rounded-[24px] bg-surface p-5 shadow-sm shadow-black/5">
            <div className="flex items-center justify-between">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <ScoreRing percent={percent} colorClass={ringColor} />
                <span className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-grow-bg text-primary">
                  <Icon size={12} />
                </span>
              </div>
              <span
                className={cn(
                  "rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                  LEVEL_STYLES[item.level] ?? "bg-black/5 text-text-muted"
                )}
              >
                {item.level}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-text">{label}</p>
            <p className="mt-1 text-xs font-medium text-primary">{item.traitOrFocus}</p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">{item.commentary}</p>
          </div>
        );
      })}
    </div>
  );
}
