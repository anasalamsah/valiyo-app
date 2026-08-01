import { Rocket, Calendar, Flag, Zap, Lightbulb } from "lucide-react";
import type { GrowthRoadmap } from "@/types/discoveryAssessment";

export function RoadmapSection({ roadmap }: { roadmap: GrowthRoadmap }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-primary">
          <Calendar size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">Minggu Ini</p>
        </div>
        <p className="mt-2 text-sm font-semibold text-text">{roadmap.phase1ThisWeek.goal}</p>
        <ul className="mt-3 space-y-1.5">
          {roadmap.phase1ThisWeek.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {action}
            </li>
          ))}
        </ul>
      </div>

      {roadmap.quickWins?.length > 0 && (
        <div className="rounded-[28px] bg-secondary/15 p-7">
          <div className="flex items-center gap-2 text-text">
            <Zap size={16} className="text-secondary" />
            <p className="text-xs font-bold uppercase tracking-wider">
              3 Quick Wins — Bisa Dimulai Hari Ini (&lt; 10 Menit)
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {roadmap.quickWins.map((win, i) => (
              <div key={i} className="rounded-2xl bg-surface p-4 shadow-sm shadow-black/5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/40 text-xs font-bold text-text">
                  {i + 1}
                </span>
                <p className="mt-2.5 text-sm text-text">{win}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-secondary">
          <Rocket size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">Bulan 1-3</p>
        </div>
        <p className="mt-2 text-sm font-semibold text-text">{roadmap.phase2Month1To3.goal}</p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {roadmap.phase2Month1To3.activities.map((item, i) => (
            <div key={i} className="rounded-2xl border border-border bg-bg p-3">
              <p className="text-sm font-semibold text-text">{item.activity}</p>
              <p className="mt-1 text-xs text-text-muted">{item.why}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-accent">
          <Flag size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">Bulan 4-6</p>
        </div>
        <p className="mt-2 text-sm font-semibold text-text">{roadmap.phase3Month4To6.goal}</p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {[
            { label: "Proyek", item: roadmap.phase3Month4To6.project },
            { label: "Tantangan", item: roadmap.phase3Month4To6.competitionOrChallenge },
            { label: "Skill Baru", item: roadmap.phase3Month4To6.newSkillToExplore },
            { label: "Akademi", item: roadmap.phase3Month4To6.recommendedAcademy },
          ].map(({ label, item }) => (
            <div key={label} className="rounded-2xl border border-border bg-bg p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{label}</p>
              <p className="mt-1 text-sm font-semibold text-text">{item.title}</p>
              <p className="mt-1 text-xs text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Rendered separately (and last) by ReportView — this is the closing
 * "AI Growth Insight & Kesimpulan" wrap-up, meant as a <3-minute-read
 * summary a busy parent can skim even if they don't read anything else.
 */
export function AiGrowthInsight({ roadmap }: { roadmap: GrowthRoadmap }) {
  return (
    <div className="rounded-[28px] bg-grow-bg p-7">
      <div className="flex items-center gap-2 text-primary">
        <Lightbulb size={16} />
        <p className="text-xs font-bold uppercase tracking-wider">
          AI Growth Insight & Kesimpulan
        </p>
      </div>
      <p className="mt-1 text-[11px] text-text-muted">Rangkuman taktis, kurang dari 3 menit baca.</p>
      <p className="mt-3 text-sm leading-relaxed text-text">{roadmap.aiInsight.summaryText}</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Kekuatan Terbesar</p>
          <p className="mt-1 text-xs text-text">{roadmap.aiInsight.biggestStrength}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Peluang Terbesar</p>
          <p className="mt-1 text-xs text-text">{roadmap.aiInsight.biggestOpportunity}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Langkah Terpenting</p>
          <p className="mt-1 text-xs text-text">{roadmap.aiInsight.mostImportantNextStep}</p>
        </div>
      </div>
    </div>
  );
}
