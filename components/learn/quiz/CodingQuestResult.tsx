"use client";

import React from "react";
import type { Level, CodingSkillType } from "@/types/learnAcademy";
import { Bot, Star, Puzzle, Sparkles, RefreshCw, Home, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Confetti } from "@/components/learn/Confetti";
import { useCountUp } from "@/lib/hooks/useCountUp";

interface CodingQuestResultProps {
  childName: string;
  level: Level;
  score: number;
  correctCount: number;
  totalCount: number;
  skillsProgress: Record<CodingSkillType, number>;
  puzzlePieces: number;
  starsEarned: number;
  unlockedRobots: string[];
  /** Optional — only set when the gamificationXp feature flag is on. */
  xpEarned?: number;
  /** Optional — only set when the gamificationXp feature flag is on. */
  currentStreakDays?: number;
  onRestartSession: () => void;
  onGoHome: () => void;
}

export function CodingQuestResult({
  childName,
  level,
  score,
  correctCount,
  totalCount,
  skillsProgress,
  puzzlePieces,
  starsEarned,
  unlockedRobots,
  xpEarned,
  currentStreakDays,
  onRestartSession,
  onGoHome,
}: CodingQuestResultProps) {
  const animatedScore = useCountUp(score);
  const animatedStars = useCountUp(starsEarned, 700);
  const animatedPuzzle = useCountUp(puzzlePieces, 700);
  const animatedXp = useCountUp(xpEarned ?? 0, 1200);

  // Skill list with display icons & labels
  const skillList: { key: CodingSkillType; label: string; icon: string }[] = [
    { key: "Sequencing", label: "Urutan Langkah (Sequencing)", icon: "🟣" },
    { key: "Pattern Recognition", label: "Pengenalan Pola (Pattern)", icon: "🔵" },
    { key: "Logical Thinking", label: "Pemikiran Logis", icon: "🟢" },
    { key: "Problem Solving", label: "Penyelesaian Masalah", icon: "🟡" },
    { key: "Computational Thinking", label: "Berpikir Komputasional", icon: "🔴" },
    { key: "Decision Making", label: "Pengambilan Keputusan", icon: "🟠" },
    { key: "Planning", label: "Perencanaan Steps", icon: "🧭" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-10">
      <Confetti />

      {/* Main Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 p-5 rounded-full shadow-xl mb-4 text-white border-4 border-white"
        >
          <Bot className="w-14 h-14" />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-purple-950 font-display leading-tight drop-shadow-sm">
          🎉 Misi Coding Quest Selesai!
        </h1>
        <p className="text-lg md:text-xl text-purple-700 font-bold mt-2 flex items-center justify-center gap-2">
          Hebat sekali, <span className="text-purple-900 underline">{childName}</span>! <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
        </p>
      </motion.div>

      {/* Score Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[36px] border-4 border-purple-200 p-6 md:p-8 shadow-xl space-y-8 relative overflow-hidden"
      >
        {/* Top Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-purple-50 border-2 border-purple-200 p-3 rounded-2xl"
          >
            <span className="text-xs text-purple-700 font-bold block font-display">Skor Quest</span>
            <span className="text-2xl font-extrabold font-display text-purple-950">{animatedScore} Poin</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-amber-50 border-2 border-amber-200 p-3 rounded-2xl"
          >
            <span className="text-xs text-amber-800 font-bold block font-display">Bintang Coding</span>
            <div className="flex items-center justify-center gap-1 text-2xl font-extrabold font-display text-amber-950">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>{animatedStars}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-indigo-50 border-2 border-indigo-200 p-3 rounded-2xl"
          >
            <span className="text-xs text-indigo-800 font-bold block font-display">Keping Puzzle</span>
            <div className="flex items-center justify-center gap-1 text-2xl font-extrabold font-display text-indigo-950">
              <Puzzle className="w-5 h-5 text-indigo-500 fill-indigo-400" />
              <span>{animatedPuzzle}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-2xl"
          >
            <span className="text-xs text-emerald-800 font-bold block font-display">Misi Berhasil</span>
            <span className="text-2xl font-extrabold font-display text-emerald-950">
              {correctCount}/{totalCount}
            </span>
          </motion.div>
        </div>

        {typeof xpEarned === "number" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 15 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-bold text-purple-950">
              <Zap size={14} className="text-secondary" fill="currentColor" />
              +{animatedXp} XP
            </div>
          </motion.div>
        )}
        {typeof currentStreakDays === "number" && currentStreakDays >= 2 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.15, 1] }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center text-sm font-bold text-orange-500"
          >
            🔥 {currentStreakDays} hari beruntun belajar!
          </motion.p>
        )}

        {/* AI Summary Section */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl p-6 shadow-md border-2 border-purple-700">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <h3 className="font-display font-extrabold text-lg text-amber-300">Ringkasan AI Programmer Cilik</h3>
          </div>
          <p className="text-sm md:text-base leading-relaxed font-medium text-purple-100">
            &ldquo;Ananda <strong className="text-white">{childName}</strong> menunjukkan pemikiran logis dan kemampuan penyelesaian masalah yang sangat luar biasa! Mampu memahami urutan algoritma, mengenali pola berulang, dan memandu robot navigasi dengan tepat tanpa ragu.&rdquo;
          </p>
        </div>

        {/* Skill Improvement Breakdown */}
        <div>
          <h3 className="text-xl font-extrabold font-display text-purple-950 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" /> Perkembangan Skill Komputasional
          </h3>

          <div className="space-y-3">
            {skillList.map((s) => {
              const val = skillsProgress[s.key] || 0;
              const skillPercent = Math.min(100, Math.max(20, val * 35 + 20));

              return (
                <div key={s.key} className="bg-purple-50 p-3 rounded-2xl border border-purple-100">
                  <div className="flex justify-between items-center mb-1 text-xs font-bold font-display text-purple-900">
                    <span className="flex items-center gap-1.5">
                      <span>{s.icon}</span> {s.label}
                    </span>
                    <span className="text-purple-700">{val} Aktivitas Selesai</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${skillPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unlocked Robot Characters */}
        <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200">
          <h3 className="text-lg font-extrabold font-display text-amber-950 mb-3 flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-600" /> Karakter Robot Terbuka ({unlockedRobots.length})
          </h3>
          <div className="flex flex-wrap gap-3">
            {unlockedRobots.map((bot, i) => (
              <span
                key={i}
                className="bg-white border-2 border-amber-300 text-amber-950 px-4 py-2 rounded-2xl font-display font-bold text-sm shadow-2xs flex items-center gap-1.5 animate-bounce"
              >
                <span>✨</span> {bot}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Next Mission */}
        <div className="bg-indigo-50 rounded-3xl p-5 border-2 border-indigo-200 text-center">
          <span className="text-xs font-bold font-display text-indigo-600 block mb-1">
            🚀 Misi Berikutnya Yang Direkomendasikan:
          </span>
          <p className="text-base font-extrabold font-display text-indigo-950">
            {level === "TK A"
              ? "Tingkatkan ke TK A (Advanced) untuk Tantangan Labirin Robot 2D!"
              : level === "TK A (Advanced)"
              ? "Lanjut ke TK B untuk Tantangan Algoritma & Perbaikan Bug!"
              : "Coba Tantangan Master TK B (Advanced) untuk Menjadi Programmer Handal!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={onRestartSession}
            className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white font-display font-extrabold text-lg rounded-2xl shadow-[0_6px_0_#6B21A8] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="btn-restart-quest"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Misi Baru / Acak Ulang</span>
          </button>

          <button
            onClick={onGoHome}
            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-extrabold text-lg rounded-2xl border-2 border-slate-300 shadow-[0_6px_0_#CBD5E1] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="btn-home-quest"
          >
            <Home className="w-5 h-5" />
            <span>Menu Utama</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
