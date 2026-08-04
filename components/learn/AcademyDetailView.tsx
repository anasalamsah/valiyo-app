"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, Clock, Lock, Play, Star, Target } from "lucide-react";
import { getMissionsForAcademy } from "@/config/learnAcademies";
import { getAcademyProgress } from "@/lib/firestore/learnProgress";
import { useAsyncData } from "@/lib/hooks/useAsyncData";
import { QuizFlow } from "@/components/learn/quiz/QuizFlow";
import { CodingQuestFlow } from "@/components/learn/quiz/CodingQuestFlow";
import { cn } from "@/lib/utils/cn";
import type { AcademyData, MissionData } from "@/types/learnAcademy";

export function AcademyDetailView({
  academy,
  childId,
  childName,
  childAge,
  onBack,
}: {
  academy: AcademyData;
  childId: string;
  childName: string;
  childAge: number;
  onBack: () => void;
}) {
  const missions = getMissionsForAcademy(academy.category);
  const [activeMission, setActiveMission] = useState<MissionData | null>(null);

  const fetcher = useCallback(() => getAcademyProgress(childId, academy.id), [childId, academy.id]);
  const { data: progress, loading, refresh } = useAsyncData(fetcher, [childId, academy.id]);

  const isPlayable = !academy.isComingSoon;
  const isCodingQuest = academy.category === "Coding Quest";

  if (activeMission) {
    const exitProps = {
      onExit: () => {
        setActiveMission(null);
        refresh();
      },
    };
    return isCodingQuest ? (
      <CodingQuestFlow
        academy={academy}
        mission={activeMission}
        childId={childId}
        childName={childName}
        childAge={childAge}
        {...exitProps}
      />
    ) : (
      <QuizFlow
        academy={academy}
        mission={activeMission}
        childId={childId}
        childName={childName}
        childAge={childAge}
        {...exitProps}
      />
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-primary"
      >
        <ArrowLeft size={14} /> Kembali ke Peta Akademi
      </button>

      <div className={cn("relative overflow-hidden rounded-[28px] bg-gradient-to-r p-7 text-white", academy.gradientBg)}>
        <div className="absolute right-4 top-4 text-7xl opacity-20">{academy.illustration}</div>
        <div className="relative">
          <span className="rounded-pill bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {academy.icon} {academy.category}
          </span>
          <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{academy.title}</h1>
          <p className="mt-1 text-sm font-medium text-white/90">&ldquo;{academy.tagline}&rdquo;</p>
          <p className="mt-2 text-xs text-white/80">{academy.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-black/20 p-4 text-center sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase text-white/70">Untuk</p>
              <p className="text-sm font-bold">{childName}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-white/70">Progres Terbaik</p>
              <p className="text-sm font-bold">
                {loading ? "…" : `${progress?.progressPercent ?? 0}%`}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase text-white/70">Misi Tersedia</p>
              <p className="text-sm font-bold">{missions.length} Misi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-text">
          🎯 Daftar Misi Belajar ({academy.title})
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="flex flex-col justify-between rounded-[24px] border border-border bg-surface p-5 shadow-sm shadow-black/5"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{mission.badgeIcon}</span>
                  <span className="flex items-center gap-1 rounded-pill bg-secondary/25 px-2.5 py-1 text-[10px] font-bold text-text">
                    <Star size={10} /> +{mission.starsReward}
                  </span>
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-text">{mission.title}</p>
                <p className="mt-1 text-xs text-text-muted">{mission.description}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-semibold text-text">
                  <div className="flex items-center gap-1.5 rounded-xl bg-bg px-2 py-1.5">
                    <Target size={12} className="text-primary" /> {mission.questionCount} Soal
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-bg px-2 py-1.5">
                    <Clock size={12} className="text-primary" /> ~{mission.estimatedMinutes} Menit
                  </div>
                </div>
              </div>

              {isPlayable ? (
                <button
                  type="button"
                  onClick={() => setActiveMission(mission)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-pill bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  <Play size={12} /> Mulai Misi
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Mesin Coding Quest sedang dibangun — segera hadir"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-pill bg-secondary/70 px-4 py-2.5 text-xs font-semibold text-text/70 cursor-not-allowed"
                >
                  <Lock size={12} /> Segera Hadir
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
