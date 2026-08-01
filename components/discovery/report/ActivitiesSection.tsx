import { Home, School, GraduationCap, ListChecks } from "lucide-react";
import type {
  AcademySuggestion,
  ActivityRecommendation,
  HomeActivity,
  SchoolRecommendation,
} from "@/types/discoveryAssessment";

export function ActivitiesSection({
  recommendedActivities,
  homeActivities,
  schoolRecommendations,
  suggestedAcademy,
  teacherTips,
}: {
  recommendedActivities: ActivityRecommendation[];
  homeActivities: HomeActivity[];
  schoolRecommendations: SchoolRecommendation[];
  suggestedAcademy: AcademySuggestion[];
  teacherTips: string[];
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-primary">
          <ListChecks size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">Aktivitas yang Direkomendasikan</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {recommendedActivities?.map((activity, i) => (
            <div key={i} className="rounded-2xl border border-border bg-bg p-4">
              <p className="text-xs font-semibold text-primary">{activity.category}</p>
              <p className="mt-1 text-sm font-semibold text-text">{activity.title}</p>
              <p className="mt-1 text-xs text-text-muted">{activity.description}</p>
              <p className="mt-2 text-[11px] font-medium text-accent">{activity.impact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-secondary">
          <Home size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">10 Aktivitas di Rumah</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {homeActivities?.map((activity, i) => (
            <div key={i} className="rounded-2xl border border-border bg-bg p-4">
              <p className="text-sm font-semibold text-text">{activity.title}</p>
              <p className="mt-1 text-[11px] font-medium text-text-muted">
                Bahan: {activity.itemNeeded}
              </p>
              <p className="mt-1.5 text-xs text-text">{activity.instruction}</p>
              <p className="mt-1.5 text-[11px] text-accent">{activity.benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
          <div className="flex items-center gap-2 text-primary">
            <School size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Untuk Guru & Sekolah</p>
          </div>
          <ul className="mt-4 space-y-3">
            {schoolRecommendations?.map((rec, i) => (
              <li key={i} className="rounded-2xl border border-border bg-bg px-4 py-3">
                <p className="text-xs font-semibold text-primary">{rec.area}</p>
                <p className="mt-1 text-sm text-text">{rec.suggestion}</p>
              </li>
            ))}
          </ul>
          {teacherTips?.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
              {teacherTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Rekomendasi Akademi</p>
          </div>
          <ul className="mt-4 space-y-3">
            {suggestedAcademy?.map((academy, i) => (
              <li key={i} className="rounded-2xl border border-border bg-bg px-4 py-3">
                <p className="text-sm font-semibold text-text">{academy.name}</p>
                <p className="text-[11px] font-medium text-text-muted">{academy.type}</p>
                <p className="mt-1 text-xs text-text">{academy.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
