"use client";

import { useState } from "react";
import { Check, Pencil, Sparkles } from "lucide-react";
import { DISCOVERY_QUESTIONS, ANSWER_OPTIONS } from "@/config/discoveryQuestions";
import { Button } from "@/components/ui/Button";
import type { AssessmentAnswerValue } from "@/types/discoveryAssessment";

export function ReviewStep({
  answers,
  saving,
  analyzeError,
  onEditAt,
  onBack,
  onSaveDraft,
  onAnalyze,
}: {
  answers: Record<string, AssessmentAnswerValue>;
  saving: boolean;
  analyzeError: string | null;
  onEditAt: (index: number) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onAnalyze: () => void;
}) {
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await onSaveDraft();
    setSaved(true);
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === DISCOVERY_QUESTIONS.length;

  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">Langkah 4 dari 4</p>
      <h2 className="mt-1 font-display text-xl font-semibold text-text">
        Ringkasan jawaban ({answeredCount}/{DISCOVERY_QUESTIONS.length})
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        Cek sekali lagi sebelum dianalisis. Ketuk sebuah pertanyaan untuk mengubah jawabannya.
      </p>

      <ul className="mt-5 max-h-96 space-y-2 overflow-y-auto pr-1">
        {DISCOVERY_QUESTIONS.map((question, index) => {
          const value = answers[question.id];
          const option = ANSWER_OPTIONS.find((o) => o.value === value);
          return (
            <li key={question.id}>
              <button
                type="button"
                onClick={() => onEditAt(index)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-bg px-4 py-3 text-left transition-colors hover:border-primary/30"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-text-muted">
                    {question.domainLabelIndo}
                  </p>
                  <p className="truncate text-sm text-text">{question.text}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs font-semibold text-primary">
                    {option?.label ?? "Belum dijawab"}
                  </span>
                  <Pencil size={12} className="text-text-muted" />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!allAnswered && (
        <p className="mt-4 text-xs text-text-muted">
          Selesaikan semua pertanyaan dulu sebelum memulai analisis AI.
        </p>
      )}

      {analyzeError && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          {analyzeError}
        </p>
      )}

      {saved && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-accent">
          <Check size={12} /> Draf tersimpan.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Kembali
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleSave}
          disabled={saving}
          className="flex-1"
        >
          {saving ? "Menyimpan…" : "Simpan Draf"}
        </Button>
        <Button
          type="button"
          onClick={onAnalyze}
          disabled={!allAnswered || saving}
          className="flex-1"
        >
          <Sparkles size={14} className="mr-1.5" />
          Mulai Analisis AI
        </Button>
      </div>
    </div>
  );
}
