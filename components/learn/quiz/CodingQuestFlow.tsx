"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { getCodingActivitiesByLevel } from "@/config/learnCodingQuestBank";
import { saveAcademyProgress } from "@/lib/firestore/learnProgress";
import { resolveChildLevel } from "@/lib/learn/levelResolution";
import { isFeatureEnabled } from "@/config/featureFlags";
import { calculateMissionXp } from "@/lib/learn/gamification/xpCalculator";
import { recordMissionCompletion } from "@/lib/firestore/gamification";
import type { Achievement } from "@/lib/learn/gamification/achievements";
import { CodingQuestSession } from "@/components/learn/quiz/CodingQuestSession";
import { CodingQuestResult } from "@/components/learn/quiz/CodingQuestResult";
import type { AcademyData, CodingSkillType, MissionData } from "@/types/learnAcademy";

type ResultData = {
  score: number;
  correctCount: number;
  totalCount: number;
  skillsProgress: Record<CodingSkillType, number>;
  puzzlePieces: number;
  starsEarned: number;
  unlockedRobots: string[];
};

export function CodingQuestFlow({
  academy,
  mission,
  childId,
  childName,
  childAge,
  onExit,
}: {
  academy: AcademyData;
  mission: MissionData;
  childId: string;
  childName: string;
  childAge: number;
  onExit: () => void;
}) {
  const { user } = useAuth();
  const level = resolveChildLevel(childId, childAge);

  const [activities] = useState(() =>
    getCodingActivitiesByLevel(level).slice(0, mission.questionCount)
  );
  const [result, setResult] = useState<ResultData | null>(null);
  const [saved, setSaved] = useState(false);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [currentStreakDays, setCurrentStreakDays] = useState<number | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  async function handleFinish(
    score: number,
    correctCount: number,
    totalCount: number,
    skillsProgress: Record<CodingSkillType, number>,
    puzzlePieces: number,
    starsEarned: number,
    unlockedRobots: string[]
  ) {
    setResult({ score, correctCount, totalCount, skillsProgress, puzzlePieces, starsEarned, unlockedRobots });

    if (user && !saved) {
      setSaved(true);
      try {
        await saveAcademyProgress(user.uid, childId, academy.id, academy.title, score);

        if (isFeatureEnabled("gamificationXp")) {
          try {
            const xp = calculateMissionXp(correctCount, totalCount);
            setXpEarned(xp);
            const result = await recordMissionCompletion(user.uid, childId, xp);
            setCurrentStreakDays(result.currentStreakDays);
            setNewAchievements(result.newlyUnlockedAchievements);
          } catch (xpErr) {
            console.error("Failed to award XP (non-fatal):", xpErr);
          }
        }
      } catch (err) {
        console.error("Failed to save academy progress:", err);
      }
    }
  }

  if (result) {
    return (
      <CodingQuestResult
        childName={childName}
        level={level}
        score={result.score}
        correctCount={result.correctCount}
        totalCount={result.totalCount}
        skillsProgress={result.skillsProgress}
        puzzlePieces={result.puzzlePieces}
        starsEarned={result.starsEarned}
        unlockedRobots={result.unlockedRobots}
        xpEarned={xpEarned ?? undefined}
        currentStreakDays={currentStreakDays ?? undefined}
        newAchievements={newAchievements}
        onRestartSession={onExit}
        onGoHome={onExit}
      />
    );
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-[28px] bg-surface p-7 text-center shadow-sm shadow-black/5">
        <p className="text-sm text-text-muted">
          Belum ada aktivitas Coding Quest untuk level ini.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-4 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <CodingQuestSession
      childName={childName}
      level={level}
      activities={activities}
      onFinish={handleFinish}
      onExit={onExit}
    />
  );
}
