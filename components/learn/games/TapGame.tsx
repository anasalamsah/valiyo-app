"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Large, tap-friendly alternative to the classic 4-option answer grid.
 *
 * Purely presentational/interaction — it has no idea what Firestore, XP,
 * or mission progress even are. It receives the same shape of state its
 * caller (QuizSession) already tracks for the classic grid (selected
 * answer, correct answer, whether a choice has been locked in) and a
 * single `onSelect` callback. All correctness evaluation, scoring,
 * feedback-modal timing, and session progression stay exactly where they
 * already are in QuizSession — this component only reports which option
 * was tapped.
 */
export function TapGame({
  options,
  correctAnswer,
  selectedAnswer,
  disabled,
  onSelect,
}: {
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  disabled: boolean;
  onSelect: (option: string) => void;
}) {
  const hasChosen = selectedAnswer !== null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {options.map((option, idx) => {
        const isThisSelected = selectedAnswer === option;
        const isThisCorrect = option === correctAnswer;

        let tileStyle =
          "border-border bg-bg text-text hover:border-primary/50 hover:bg-primary/5";
        if (hasChosen) {
          if (isThisCorrect) {
            tileStyle = "border-accent bg-accent/20 text-text";
          } else if (isThisSelected) {
            tileStyle = "border-red-300 bg-red-50 text-text";
          } else {
            tileStyle = "border-border bg-bg/50 text-text-muted opacity-40";
          }
        }

        return (
          <motion.button
            key={idx}
            type="button"
            disabled={disabled || hasChosen}
            onClick={() => onSelect(option)}
            whileTap={!hasChosen ? { scale: 0.92 } : undefined}
            animate={
              hasChosen && isThisSelected
                ? isThisCorrect
                  ? { scale: [1, 1.08, 1] }
                  : { x: [0, -6, 6, -6, 0] }
                : {}
            }
            transition={{ duration: 0.4 }}
            className={cn(
              "relative flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-[24px] border-2 p-4 text-center transition-colors focus:outline-none",
              hasChosen ? "cursor-default" : "cursor-pointer active:scale-95",
              tileStyle
            )}
          >
            {hasChosen && isThisCorrect && (
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                <Check size={14} strokeWidth={3} />
              </span>
            )}
            {hasChosen && isThisSelected && !isThisCorrect && (
              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-white">
                <X size={14} strokeWidth={3} />
              </span>
            )}
            <span className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              {option}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
