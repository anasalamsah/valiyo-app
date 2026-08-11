"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, LogOut, Sparkles, Volume2, VolumeX } from "lucide-react";
import { audioManager } from "@/lib/learn/audioManager";
import { speechManager } from "@/lib/learn/speechManager";
import { getQuestionImage } from "@/lib/learn/imageMapper";
import { QuizProgressBar } from "@/components/learn/quiz/QuizProgressBar";
import { getInteractionMode } from "@/lib/learn/games/tapCompatibleQuestions";
import { TapGame } from "@/components/learn/games/TapGame";
import { MatchGame } from "@/components/learn/games/MatchGame";
import { cn } from "@/lib/utils/cn";
import type { Category, Level, Question } from "@/types/learnAcademy";

type Feedback = "correct" | "incorrect" | "timeout" | null;

export function QuizSession({
  childName,
  level,
  category,
  questions,
  currentQuestionIndex,
  score,
  onAnswerSubmit,
  onExit,
}: {
  childName: string;
  level: Level;
  category: Category;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  onAnswerSubmit: (isCorrect: boolean, selectedAnswer: string, correctAnswer: string) => void;
  onExit: () => void;
}) {
  const currentQuestion = questions[currentQuestionIndex];
  const imageUrl = getQuestionImage(currentQuestion.question, currentQuestion.category);
  const interactionMode = getInteractionMode(currentQuestion);

  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isMuted, setIsMuted] = useState(audioManager.getMute());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechToast, setSpeechToast] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const optionLabels = ["A", "B", "C", "D"];

  function handleSpeak(id: string, text: string) {
    if (isMuted) return;
    if (speakingId === id) {
      speechManager.stop();
      setSpeakingId(null);
      return;
    }
    speechManager.speak(
      id,
      text,
      () => setSpeakingId(id),
      () => setSpeakingId(null),
      (errMsg) => {
        setSpeakingId(null);
        if (errMsg) {
          setSpeechToast(errMsg);
          setTimeout(() => setSpeechToast(null), 3000);
        }
      }
    );
  }

  function handleMuteToggle() {
    const nextMute = !isMuted;
    audioManager.setMute(nextMute);
    setIsMuted(nextMute);
    if (nextMute) {
      speechManager.stop();
      setSpeakingId(null);
    } else {
      audioManager.playCorrect();
    }
  }

  function handleAnswerSelect(option: string) {
    if (selectedAnswer !== null || feedback !== null) return;
    speechManager.stop();
    setSpeakingId(null);
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) {
      setFeedback("correct");
      audioManager.playCorrect();
    } else {
      setFeedback("incorrect");
      audioManager.playIncorrect();
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      onAnswerSubmit(isCorrect, option, currentQuestion.answer);
    }, 1250);
  }

  function handleTimeout() {
    speechManager.stop();
    setSpeakingId(null);
    setSelectedAnswer("");
    setFeedback("timeout");
    audioManager.playIncorrect();
    feedbackTimeoutRef.current = setTimeout(() => {
      onAnswerSubmit(false, "", currentQuestion.answer);
    }, 1250);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: resets timer/answer/feedback state whenever the question index changes, before starting that question's countdown.
    setTimeLeft(30);
    setSelectedAnswer(null);
    setFeedback(null);
    speechManager.stop();
    setSpeakingId(null);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedAnswer !== null || feedback !== null) return;
      const key = e.key;
      if (["1", "2", "3", "4"].includes(key)) {
        const optionIndex = parseInt(key, 10) - 1;
        if (optionIndex < currentQuestion.options.length) {
          handleAnswerSelect(currentQuestion.options[optionIndex]);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, selectedAnswer, feedback]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      speechManager.stop();
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-2xl px-4 py-4 md:py-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-2 rounded-pill border border-border bg-surface px-5 py-2 text-sm font-bold text-text-muted transition-colors hover:border-primary/40"
        >
          <LogOut size={14} /> Beranda
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-pill bg-secondary/25 px-5 py-2 text-sm font-bold text-text">
            <Sparkles size={14} className="text-secondary" />
            Skor: <span className="font-display text-base">{score}</span>
          </div>
          <button
            type="button"
            onClick={handleMuteToggle}
            className="rounded-2xl border border-border bg-surface p-2.5 text-text-muted transition-colors hover:border-primary/40"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      <QuizProgressBar
        current={currentQuestionIndex + 1}
        total={questions.length}
        childName={childName}
        level={level}
        category={category}
      />

      <div className="relative overflow-hidden rounded-[28px] border-2 border-border bg-surface p-6 shadow-sm shadow-black/5 sm:p-8">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <span className="font-display text-sm font-extrabold uppercase tracking-wider text-primary sm:text-base">
            Soal Ke-{currentQuestionIndex + 1}
          </span>
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-pill border-2 px-4 py-1 font-display text-lg font-extrabold transition-all",
              timeLeft <= 5
                ? "scale-105 animate-pulse border-red-300 bg-red-50 text-red-600"
                : "border-secondary/40 bg-secondary/20 text-text"
            )}
          >
            <Clock size={16} className={timeLeft <= 5 ? "text-red-500" : "text-primary"} />
            {timeLeft} dtk
          </div>
        </div>

        <div className="my-6 flex flex-col items-center gap-3">
          <AnimatePresence>
            {speechToast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-pill border border-secondary/40 bg-secondary/20 px-4 py-1.5 text-xs font-bold text-text"
              >
                ⚠️ {speechToast}
              </motion.div>
            )}
          </AnimatePresence>

          {(() => {
            const fullText = `${currentQuestion.question}. ${currentQuestion.options
              .map((opt, i) => `${optionLabels[i]}: ${opt}`)
              .join(". ")}`;
            const isSpeaking = speakingId === "question-full";
            return (
              <button
                type="button"
                onClick={() => handleSpeak("question-full", fullText)}
                className={cn(
                  "flex items-center gap-2 rounded-pill border-2 px-5 py-2.5 text-xs font-bold transition-all sm:text-sm",
                  isSpeaking
                    ? "scale-105 border-secondary bg-secondary/30 text-text"
                    : "border-grow-bg bg-grow-bg text-primary hover:bg-grow-bg/70"
                )}
              >
                <Volume2 size={16} className={isSpeaking ? "animate-bounce" : ""} />
                {isSpeaking ? "Sedang Membaca Soal..." : "🔊 Baca Soal & Pilihan"}
              </button>
            );
          })()}

          <h2 className="px-2 text-center font-display text-2xl font-extrabold leading-relaxed text-text sm:text-3xl">
            {currentQuestion.question}
          </h2>
        </div>

        {imageUrl && (
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border-2 border-border bg-bg p-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote Unsplash URLs; next/image would need domain config for a source we don't control */}
              <img
                src={imageUrl}
                alt={currentQuestion.question}
                className="h-40 w-full rounded-2xl object-cover sm:h-48"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {interactionMode === "tap" ? (
          <TapGame
            options={currentQuestion.options}
            correctAnswer={currentQuestion.answer}
            selectedAnswer={selectedAnswer}
            disabled={feedback !== null}
            onSelect={handleAnswerSelect}
          />
        ) : interactionMode === "match" ? (
          <MatchGame
            question={currentQuestion.question}
            options={currentQuestion.options}
            correctAnswer={currentQuestion.answer}
            selectedAnswer={selectedAnswer}
            disabled={feedback !== null}
            onSelect={handleAnswerSelect}
          />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((option, idx) => {
              const isThisSelected = selectedAnswer === option;
              const isThisCorrect = option === currentQuestion.answer;
              const hasChosen = selectedAnswer !== null;

              let optionStyle = "border-border bg-bg hover:border-primary/40 text-text";
              if (hasChosen) {
                if (isThisCorrect) optionStyle = "border-accent bg-accent/15 text-text";
                else if (isThisSelected) optionStyle = "border-red-300 bg-red-50 text-text";
                else optionStyle = "border-border bg-bg/60 text-text-muted opacity-50 cursor-not-allowed";
              }

              const isThisOptionSpeaking = speakingId === `option-${idx}`;

              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={hasChosen ? -1 : 0}
                  onClick={() => !hasChosen && handleAnswerSelect(option)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && !hasChosen) handleAnswerSelect(option);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 p-4 text-left font-bold transition-all focus:outline-none",
                    hasChosen ? "cursor-default" : "cursor-pointer",
                    optionStyle
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-primary font-display text-lg font-extrabold text-white">
                    {optionLabels[idx]}
                  </div>
                  <span className="flex-1 text-base leading-tight">{option}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(`option-${idx}`, `${optionLabels[idx]}: ${option}`);
                    }}
                    className={cn(
                      "shrink-0 rounded-xl border-2 p-2 transition-all",
                      isThisOptionSpeaking
                        ? "scale-110 border-secondary bg-secondary/30"
                        : "border-border bg-surface text-text-muted hover:bg-bg"
                    )}
                  >
                    <Volume2 size={14} className={isThisOptionSpeaking ? "animate-bounce" : ""} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {interactionMode === "classic" && (
          <div className="mt-6 flex justify-center gap-4 text-center text-xs font-bold text-text-muted">
            <span>Tombol: [1] A</span>
            <span>[2] B</span>
            <span>[3] C</span>
            <span>[4] D</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          >
            {feedback === "correct" && (
              <div className="w-full max-w-sm rounded-[28px] border-4 border-accent bg-accent/15 p-8 text-center shadow-2xl">
                <div className="mb-3 animate-bounce text-6xl">🎉</div>
                <h3 className="font-display text-3xl font-extrabold text-text">Benar!</h3>
                <p className="mt-1 text-sm font-bold text-text-muted">Kamu pintar sekali! 🌟</p>
              </div>
            )}
            {(feedback === "incorrect" || feedback === "timeout") && (
              <div className="w-full max-w-sm rounded-[28px] border-4 border-red-300 bg-red-50 p-8 text-center shadow-2xl">
                <div className="mb-3 text-6xl">{feedback === "timeout" ? "⏰" : "❌"}</div>
                <h3 className="font-display text-3xl font-extrabold text-text">
                  {feedback === "timeout" ? "Waktu Habis!" : "Kurang Tepat"}
                </h3>
                <p className="mt-1 text-sm font-bold text-text-muted">
                  Jawaban: <span className="underline">{currentQuestion.answer}</span>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
