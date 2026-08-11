"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * "Matching" alternative to the classic answer grid: the question sits in
 * a card at the top with a pulsing connector dot, and each option is a
 * bubble below with its own connector dot. Tapping an option animates
 * both the question card and that option's dot together (a synchronized
 * glow/pulse) to read as "these two are connected" — correct connections
 * glow green with a checkmark, incorrect ones flash red gently.
 *
 * Same contract as TapGame: purely presentational, no Firestore/XP/
 * mission knowledge, reports the tapped option via `onSelect` and lets
 * the caller (QuizSession) own all correctness/progression logic.
 */
export function MatchGame({
  question,
  options,
  correctAnswer,
  selectedAnswer,
  disabled,
  onSelect,
}: {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  disabled: boolean;
  onSelect: (option: string) => void;
}) {
  const hasChosen = selectedAnswer !== null;
  const chosenCorrectly = hasChosen && selectedAnswer === correctAnswer;

  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      {/* Question card with its connector dot */}
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-[24px] border-2 border-primary/30 bg-primary/5 px-6 py-4 text-center">
          <span className="font-display text-lg font-bold text-text sm:text-xl">{question}</span>
        </div>
        <motion.span
          animate={
            hasChosen
              ? { scale: [1, 1.6, 1], backgroundColor: chosenCorrectly ? "#22c55e" : "#f87171" }
              : { scale: [1, 1.25, 1] }
          }
          transition={
            hasChosen ? { duration: 0.5 } : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
          }
          className="h-3 w-3 rounded-full bg-primary"
        />
      </div>

      {/* Option bubbles, each with its own connector dot */}
      <div className="grid w-full grid-cols-2 gap-4">
        {options.map((option, idx) => {
          const isThisSelected = selectedAnswer === option;
          const isThisCorrect = option === correctAnswer;

          let bubbleStyle = "border-border bg-bg text-text hover:border-primary/50";
          let dotColor = "bg-border";
          if (hasChosen) {
            if (isThisCorrect) {
              bubbleStyle = "border-accent bg-accent/20 text-text";
              dotColor = "bg-accent";
            } else if (isThisSelected) {
              bubbleStyle = "border-red-300 bg-red-50 text-text";
              dotColor = "bg-red-400";
            } else {
              bubbleStyle = "border-border bg-bg/50 text-text-muted opacity-40";
            }
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <motion.span
                animate={hasChosen && isThisSelected ? { scale: [1, 1.6, 1] } : {}}
                transition={{ duration: 0.5 }}
                className={cn("h-3 w-3 rounded-full transition-colors", dotColor)}
              />
              <motion.button
                type="button"
                disabled={disabled || hasChosen}
                onClick={() => onSelect(option)}
                whileTap={!hasChosen ? { scale: 0.94 } : undefined}
                animate={
                  hasChosen && isThisSelected && !isThisCorrect ? { x: [0, -6, 6, -6, 0] } : {}
                }
                transition={{ duration: 0.4 }}
                className={cn(
                  "relative flex min-h-[76px] w-full items-center justify-center rounded-[20px] border-2 p-3 text-center font-bold transition-colors focus:outline-none",
                  hasChosen ? "cursor-default" : "cursor-pointer",
                  bubbleStyle
                )}
              >
                {hasChosen && isThisCorrect && (
                  <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
                {hasChosen && isThisSelected && !isThisCorrect && (
                  <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-white">
                    <X size={12} strokeWidth={3} />
                  </span>
                )}
                <span className="text-base leading-tight sm:text-lg">{option}</span>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
