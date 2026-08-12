"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, Home, RefreshCw, Trophy, XCircle, Zap } from "lucide-react";
import { audioManager } from "@/lib/learn/audioManager";
import { getQuestionImage } from "@/lib/learn/imageMapper";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { Confetti } from "@/components/learn/Confetti";
import type { Achievement } from "@/lib/learn/gamification/achievements";
import type { Category, Level } from "@/types/learnAcademy";

type AnswerHistoryItem = {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

function getMotivationalMessage(val: number) {
  if (val >= 90)
    return { title: "🌟 Luar biasa!", desc: "Hebat sekali! Kamu sudah sangat menguasai materi ini!", bg: "bg-accent/15 text-text", emoji: "👑" };
  if (val >= 80)
    return { title: "Hebat!", desc: "Hasil yang sangat bagus! Teruskan perjuanganmu!", bg: "bg-accent/10 text-text", emoji: "🔥" };
  if (val >= 70)
    return { title: "Bagus sekali!", desc: "Sudah bagus! Sedikit latihan lagi kamu pasti bisa dapat 100!", bg: "bg-grow-bg text-text", emoji: "👍" };
  if (val >= 50)
    return { title: "Tetap semangat belajar!", desc: "Jangan menyerah, ya! Teruskan membaca dan berlatih!", bg: "bg-secondary/20 text-text", emoji: "💪" };
  return { title: "Ayo latihan lagi!", desc: "Belajar lagi bersama Ayah dan Ibu, lalu coba lagi ya!", bg: "bg-red-50 text-text", emoji: "📚" };
}

export function QuizResultScreen({
  childName,
  level,
  category,
  score,
  correctAnswersCount,
  incorrectAnswersCount,
  answersHistory,
  xpEarned,
  currentStreakDays,
  newAchievements,
  onRestartSession,
  onGoHome,
}: {
  childName: string;
  level: Level;
  category: Category;
  score: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  answersHistory: AnswerHistoryItem[];
  /** Optional — only set when the gamificationXp feature flag is on. */
  xpEarned?: number;
  /** Optional — only set when the gamificationXp feature flag is on. */
  currentStreakDays?: number;
  /** Optional — only set when the gamificationXp feature flag is on. */
  newAchievements?: Achievement[];
  onRestartSession: () => void;
  onGoHome: () => void;
}) {
  useEffect(() => {
    audioManager.playComplete();
  }, []);

  const percentage =
    Math.round((correctAnswersCount / (correctAnswersCount + incorrectAnswersCount)) * 100) || 0;
  const motivation = getMotivationalMessage(percentage);
  const animatedScore = useCountUp(score);
  const animatedXp = useCountUp(xpEarned ?? 0, 1200);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
      {percentage >= 90 && <Confetti />}

      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: 2 }}
          className="mb-4 inline-flex rounded-full border-4 border-white bg-gradient-to-r from-secondary to-secondary/70 p-5 text-text shadow-lg"
        >
          <Trophy size={48} />
        </motion.div>
        <h1 className="font-display text-4xl font-extrabold text-text">Latihan Selesai!</h1>
        <p className="mt-1 text-lg font-bold text-primary">Selamat kepada sang juara kecil!</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 rounded-[28px] border-2 border-border bg-surface p-6 shadow-sm shadow-black/5 md:p-10"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-text-muted">Skor Akhir</p>
          <div className="mt-2 flex items-baseline justify-center gap-1">
            <span className="font-display text-6xl font-extrabold text-primary sm:text-7xl">{animatedScore}</span>
            <span className="text-2xl font-bold text-text-muted">/ 100</span>
          </div>
          {typeof xpEarned === "number" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-secondary/20 px-4 py-1.5 text-sm font-bold text-text"
            >
              <Zap size={14} className="text-secondary" fill="currentColor" />
              +{animatedXp} XP
            </motion.div>
          )}
          {typeof currentStreakDays === "number" && currentStreakDays >= 2 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.15, 1] }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-2 text-sm font-bold text-orange-500"
            >
              🔥 {currentStreakDays} hari beruntun belajar!
            </motion.p>
          )}
        </div>

        {newAchievements && newAchievements.length > 0 && (
          <div className="space-y-2">
            {newAchievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1 + idx * 0.15, type: "spring", stiffness: 260, damping: 18 }}
                className="flex items-center gap-3 rounded-2xl border-2 border-secondary/40 bg-secondary/10 p-3"
              >
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-secondary">
                    Lencana Baru!
                  </p>
                  <p className="font-display text-sm font-extrabold text-text">{achievement.title}</p>
                  <p className="text-xs text-text-muted">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`rounded-[24px] p-4 text-center ${motivation.bg}`}
        >
          <div className="mb-1 text-3xl">{motivation.emoji}</div>
          <h3 className="font-display text-xl font-extrabold">{motivation.title}</h3>
          <p className="mt-1 text-xs font-semibold opacity-90 sm:text-sm">{motivation.desc}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="rounded-2xl border-2 border-border bg-bg p-4 text-center">
            <p className="text-xs font-bold text-text-muted">👦 Nama Peserta</p>
            <p className="mt-1 truncate text-lg font-extrabold text-text">{childName}</p>
          </div>
          <div className="rounded-2xl border-2 border-border bg-bg p-4 text-center">
            <p className="text-xs font-bold text-text-muted">📚 Level & Kategori</p>
            <p className="mt-1 truncate text-sm font-extrabold text-text">
              {level} • {category}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="border-t border-border pt-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="flex items-center gap-2 font-display text-base font-extrabold text-text">
              <BarChart3 size={18} className="text-primary" /> Statistik Jawaban
            </h4>
            <span className="rounded-pill bg-grow-bg px-3 py-1 text-xs font-extrabold text-primary">
              Total: {correctAnswersCount + incorrectAnswersCount} Soal
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-xs font-bold text-text-muted sm:text-sm">
                Benar ({correctAnswersCount})
              </span>
              <div className="h-6 flex-1 overflow-hidden rounded-full border border-border bg-bg">
                <div
                  className="flex h-full items-center justify-end rounded-full bg-accent px-3 transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 10 && <span className="text-[10px] font-extrabold text-white">{percentage}%</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-xs font-bold text-text-muted sm:text-sm">
                Salah ({incorrectAnswersCount})
              </span>
              <div className="h-6 flex-1 overflow-hidden rounded-full border border-border bg-bg">
                <div
                  className="flex h-full items-center justify-end rounded-full bg-red-300 px-3 transition-all duration-1000"
                  style={{ width: `${100 - percentage}%` }}
                >
                  {100 - percentage > 10 && (
                    <span className="text-[10px] font-extrabold text-white">{100 - percentage}%</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
          <button
            type="button"
            onClick={onRestartSession}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-display text-lg font-extrabold text-white transition-transform hover:-translate-y-0.5"
          >
            <RefreshCw size={18} /> Acak Soal & Main Lagi
          </button>
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-border bg-surface py-4 font-display text-lg font-extrabold text-text-muted transition-transform hover:-translate-y-0.5"
          >
            <Home size={18} /> Kembali ke Akademi
          </button>
        </div>
      </motion.div>

      <div className="mt-8 rounded-[28px] border-2 border-border bg-surface p-6 shadow-sm shadow-black/5">
        <h4 className="mb-4 border-b border-border pb-3 font-display text-lg font-extrabold text-text">
          📝 Tinjau Jawaban Soal
        </h4>
        <p className="mb-4 text-xs font-semibold leading-relaxed text-text-muted">
          Berikut rincian jawaban untuk latihan kali ini — baik untuk ditinjau bersama Ayah, Ibu, atau Guru.
        </p>
        <div className="max-h-96 space-y-4 divide-y divide-border overflow-y-auto pr-2">
          {answersHistory.map((item, index) => {
            const qImg = getQuestionImage(item.questionText, category);
            return (
              <div key={item.questionId} className={index === 0 ? "pt-0" : "pt-3"}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">
                      {item.isCorrect ? (
                        <CheckCircle2 size={18} className="text-accent" />
                      ) : (
                        <XCircle size={18} className="text-red-500" />
                      )}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-extrabold text-text">
                        Soal {index + 1}: {item.questionText}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold">
                        <span className={item.isCorrect ? "text-accent" : "text-red-500"}>
                          Jawabanmu:{" "}
                          <span className="font-semibold">{item.selectedAnswer || "(Waktu habis)"}</span>
                        </span>
                        {!item.isCorrect && (
                          <span className="text-accent">
                            Jawaban Benar: <span className="font-semibold">{item.correctAnswer}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {qImg && (
                    // eslint-disable-next-line @next/next/no-img-element -- remote Unsplash URLs
                    <img
                      src={qImg}
                      alt="Miniatur Soal"
                      className="h-12 w-12 shrink-0 rounded-2xl border-2 border-border object-cover sm:h-14 sm:w-14"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
