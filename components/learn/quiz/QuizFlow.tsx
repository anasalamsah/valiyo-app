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
 * Only TK A / TK B levels have real question content so far (see
 * config/learnQuestions.ts) — approximated here from the child's age
 * until academies support an explicit grade-level picker.
 */
function levelForAge(age: number): Level {
  if (age <= 4) return "TK A";
  if (age === 5) return "TK A (Advanced)";
  if (age === 6) return "TK B";
  return "TK B (Advanced)";
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

  const [questions] = useState(() =>
    getRandomSessionQuestions(level, academy.category, mission.questionCount)
  );
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
