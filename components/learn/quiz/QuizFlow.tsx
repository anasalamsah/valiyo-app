"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { getRandomSessionQuestions } from "@/config/learnQuestions";
import { saveAcademyProgress } from "@/lib/firestore/learnProgress";
import { QuizSession } from "@/components/learn/quiz/QuizSession";
import { QuizResultScreen } from "@/components/learn/quiz/QuizResultScreen";
import type { AcademyData, MissionData } from "@/types/learnAcademy";
import type { Level } from "@/types/learnAcademy";

type AnswerHistoryItem = {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

/**
 * Maps a child's age to their content level. TK B (Advanced) is
 * intentionally not an age-mapped tier (by product decision) — its
 * content still exists in the bank but isn't auto-assigned.
 */
function levelForAge(age: number): Level {
  if (age <= 2) return "Preschool 1 (2 thn)";
  if (age === 3) return "Preschool 2 (3 thn)";
  if (age === 4) return "TK A";
  if (age === 5) return "TK A (Advanced)";
  if (age === 6) return "TK B";
  if (age >= 12) return "SD Kelas 6";
  // age 7-11 -> SD Kelas 1-5
  return `SD Kelas ${age - 6}` as Level;
}

export function QuizFlow({
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

  const [sessionResult] = useState(() =>
    getRandomSessionQuestions(level, academy.category, mission.questionCount)
  );
  const questions = sessionResult.ok ? sessionResult.questions : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [history, setHistory] = useState<AnswerHistoryItem[]>([]);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);

  const sessionKey = `${academy.id}-${mission.id}`;

  async function handleAnswerSubmit(isCorrect: boolean, selected: string, correct: string) {
    const question = questions[currentIndex];
    const nextIndex = currentIndex + 1;
    const isOver = nextIndex >= questions.length;

    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    const newIncorrect = incorrectCount + (isCorrect ? 0 : 1);
    const newScore = Math.round((newCorrect / (questions.length || 1)) * 100);

    setHistory((prev) => [
      ...prev,
      {
        questionId: question.id,
        questionText: question.question,
        selectedAnswer: selected,
        correctAnswer: correct,
        isCorrect,
      },
    ]);
    setCorrectCount(newCorrect);
    setIncorrectCount(newIncorrect);
    setScore(newScore);

    if (isOver) {
      setFinished(true);
      if (user && !saved) {
        setSaved(true);
        try {
          await saveAcademyProgress(user.uid, childId, academy.id, academy.title, newScore);
        } catch (err) {
          console.error("Failed to save academy progress:", err);
        }
      }
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  if (!sessionResult.ok) {
    return (
      <div className="rounded-[28px] bg-surface p-7 text-center shadow-sm shadow-black/5">
        <p className="text-sm text-text-muted">
          Misi ini belum tersedia untuk level {level}. Coba pilih akademi atau misi lain ya! 😊
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

  if (finished) {
    return (
      <QuizResultScreen
        childName={childName}
        level={level}
        category={academy.category}
        score={score}
        correctAnswersCount={correctCount}
        incorrectAnswersCount={incorrectCount}
        answersHistory={history}
        onRestartSession={onExit}
        onGoHome={onExit}
      />
    );
  }

  return (
    <QuizSession
      key={sessionKey}
      childName={childName}
      level={level}
      category={academy.category}
      questions={questions}
      currentQuestionIndex={currentIndex}
      score={score}
      onAnswerSubmit={handleAnswerSubmit}
      onExit={onExit}
    />
  );
}
