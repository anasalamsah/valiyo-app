"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { getCodingActivitiesByLevel } from "@/config/learnCodingQuestBank";
import { saveAcademyProgress } from "@/lib/firestore/learnProgress";
import { CodingQuestSession } from "@/components/learn/quiz/CodingQuestSession";
import { CodingQuestResult } from "@/components/learn/quiz/CodingQuestResult";
import type { AcademyData, CodingSkillType, Level, MissionData } from "@/types/learnAcademy";

/**
 * Maps a child's age to their content level. Kept in sync with the copy in
 * QuizFlow.tsx. TK B (Advanced) is intentionally not an age-mapped tier —
 * its content still exists in the bank but isn't auto-assigned. Coding
 * Quest activities currently only exist for TK A/A(Adv)/B/B(Adv), so ages
 * mapping into SD Kelas 1-6 will see the graceful "not available yet"
 * state below until that content is authored in a future batch.
 */
function levelForAge(age: number): Level {
  if (age <= 2) return "Preschool 1 (2 thn)";
  if (age === 3) return "Preschool 2 (3 thn)";
  if (age === 4) return "TK A";
  if (age === 5) return "TK A (Advanced)";
  if (age === 6) return "TK B";
  if (age >= 12) return "SD Kelas 6";
  return `SD Kelas ${age - 6}` as Level;
}

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
  const level = levelForAge(childAge);

  const [activities] = useState(() =>
    getCodingActivitiesByLevel(level).slice(0, mission.questionCount)
  );
  const [result, setResult] = useState<ResultData | null>(null);
  const [saved, setSaved] = useState(false);

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
