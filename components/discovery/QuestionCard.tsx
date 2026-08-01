"use client";

import { DomainIcon } from "@/components/discovery/domainIcon";
import { cn } from "@/lib/utils/cn";
import type { AnswerOption, DiscoveryQuestion } from "@/types/discoveryQuestion";

export function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect,
}: {
  question: DiscoveryQuestion;
  options: AnswerOption[];
  selectedValue: number | null;
  onSelect: (value: AnswerOption["value"]) => void;
}) {
  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grow-bg text-primary">
          <DomainIcon name={question.iconName} />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {question.domainLabelIndo}
        </span>
      </div>

      <p className="mt-4 text-lg font-semibold leading-snug text-text">{question.text}</p>
      <p className="mt-2 text-sm text-text-muted">{question.example}</p>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left transition-colors",
                isSelected
                  ? "border-primary bg-grow-bg"
                  : "border-border bg-bg hover:border-primary/30"
              )}
            >
              <p
                className={cn(
                  "text-sm font-semibold",
                  isSelected ? "text-primary" : "text-text"
                )}
              >
                {option.label}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">{option.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
