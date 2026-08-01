"use client";

import { useState } from "react";
import { DISCOVERY_QUESTIONS, ANSWER_OPTIONS } from "@/config/discoveryQuestions";
import { QuestionCard } from "@/components/discovery/QuestionCard";
import { Button } from "@/components/ui/Button";
import type { AssessmentAnswer, AssessmentAnswerValue } from "@/types/discoveryAssessment";

export function QuestionnaireStep({
  answers,
  initialIndex = 0,
  onAnswer,
  onBack,
  onComplete,
}: {
  answers: Record<string, AssessmentAnswerValue>;
  initialIndex?: number;
  onAnswer: (questionId: string, domain: AssessmentAnswer["domain"], value: AssessmentAnswerValue) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const question = DISCOVERY_QUESTIONS[index];
  const total = DISCOVERY_QUESTIONS.length;
  const isLast = index === total - 1;
  const currentAnswer = answers[question.id] ?? null;

  function goNext() {
    if (isLast) {
      onComplete();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (index === 0) {
      onBack();
    } else {
      setIndex((i) => i - 1);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs font-semibold text-text-muted">
        <span>
          Pertanyaan {index + 1} dari {total}
        </span>
        <span>{Math.round(((index + 1) / total) * 100)}%</span>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={question}
        options={ANSWER_OPTIONS}
        selectedValue={currentAnswer}
        onSelect={(value) => onAnswer(question.id, question.domain, value)}
      />

      <div className="mt-5 flex gap-3">
        <Button type="button" variant="outline" onClick={goBack} className="flex-1">
          Kembali
        </Button>
        <Button type="button" onClick={goNext} disabled={!currentAnswer} className="flex-1">
          {isLast ? "Lihat Ringkasan" : "Lanjut"}
        </Button>
      </div>
    </div>
  );
}
