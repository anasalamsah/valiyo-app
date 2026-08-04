"use client";

import React, { useState, useEffect } from "react";
import type { Level, CodingActivity, CodingSkillType, DirectionCommand } from "@/types/learnAcademy";
import { audioManager } from "@/lib/learn/audioManager";
import { speechManager } from "@/lib/learn/speechManager";
import { Volume2, VolumeX, ArrowLeft, Bot, CheckCircle2, RotateCcw, Play, ChevronRight, Puzzle, Star, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Confetti } from "@/components/learn/Confetti";

interface CodingQuestSessionProps {
  childName: string;
  level: Level;
  activities: CodingActivity[];
  onFinish: (
    score: number,
    correctCount: number,
    totalCount: number,
    skillsProgress: Record<CodingSkillType, number>,
    puzzlePiecesEarned: number,
    starsEarned: number,
    unlockedRobots: string[]
  ) => void;
  onExit: () => void;
}

export function CodingQuestSession({
  childName,
  level,
  activities,
  onFinish,
  onExit,
}: CodingQuestSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [puzzlePieces, setPuzzlePieces] = useState(0);
  const [stars, setStars] = useState(0);
  const [isMuted, setIsMuted] = useState(audioManager.getMute());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechToast, setSpeechToast] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Skill scores tracker
  const [skillsTracker, setSkillsTracker] = useState<Record<CodingSkillType, number>>({
    Sequencing: 0,
    "Pattern Recognition": 0,
    "Logical Thinking": 0,
    "Problem Solving": 0,
    "Computational Thinking": 0,
    "Decision Making": 0,
    Planning: 0,
    "Navigation & Planning": 0,
    Categorization: 0,
    Debugging: 0,
    "Loops & Sequences": 0,
  });

  // State per activity
  const currentActivity = activities[currentIndex] || activities[0];

  // State for 'arrange_steps' & 'build_algorithm'
  const [orderedStepIds, setOrderedStepIds] = useState<string[]>([]);
  const [selectedStepIdx, setSelectedStepIdx] = useState<number | null>(null);

  // State for 'follow_robot'
  const [robotPos, setRobotPos] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [userCommands, setUserCommands] = useState<DirectionCommand[]>([]);
  const [isExecutingRobot, setIsExecutingRobot] = useState(false);

  // State for 'fix_mistake'
  const [selectedReplacement, setSelectedReplacement] = useState<DirectionCommand | null>(null);

  // Activity Status: 'pending' | 'correct' | 'try_again'
  const [feedbackState, setFeedbackState] = useState<"pending" | "correct" | "try_again">("pending");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Initialize interactive activity state when currentIndex changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: resets this activity's interaction state whenever currentIndex changes, same accepted pattern used elsewhere in this codebase.
    setFeedbackState("pending");
    setFeedbackMessage("");
    speechManager.stop();
    setSpeakingId(null);
    setSelectedStepIdx(null);

    if (!currentActivity) return;

    if (currentActivity.type === "arrange_steps" || currentActivity.type === "build_algorithm") {
      if (currentActivity.stepItems) {
        // Shuffle initial order
        const shuffled = [...currentActivity.stepItems].sort(() => Math.random() - 0.5);
        setOrderedStepIds(shuffled.map((item) => item.id));
      }
    } else if (currentActivity.type === "follow_robot") {
      setRobotPos(currentActivity.robotStart || { r: 0, c: 0 });
      setUserCommands([]);
      setIsExecutingRobot(false);
    } else if (currentActivity.type === "fix_mistake") {
      setSelectedReplacement(null);
    }
  }, [currentIndex, currentActivity]);

  const handleMuteToggle = () => {
    const nextMute = !isMuted;
    audioManager.setMute(nextMute);
    setIsMuted(nextMute);
  };

  const handleSpeak = (id: string, textToSpeak: string) => {
    if (isMuted) return;
    speechManager.speak(
      id,
      textToSpeak,
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
  };

  // Helper when user succeeds an activity
  const triggerSuccess = (feedbackStr: string, skill: CodingSkillType) => {
    audioManager.playCorrect();
    setFeedbackState("correct");
    setFeedbackMessage(feedbackStr);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);

    setScore((prev) => prev + 10);
    setCorrectCount((prev) => prev + 1);
    setPuzzlePieces((prev) => prev + 1);
    setStars((prev) => prev + 3);

    setSkillsTracker((prev) => ({
      ...prev,
      [skill]: (prev[skill] || 0) + 1,
    }));
  };

  // Helper when user needs another attempt
  const triggerTryAgain = () => {
    audioManager.playIncorrect();
    setFeedbackState("try_again");
    const tryAgainText = "Yuk, kita coba cara lain! 🤖💪";
    setFeedbackMessage(tryAgainText);
  };

  // Move to next activity or finish session
  const handleNextActivity = () => {
    speechManager.stop();
    const nextIdx = currentIndex + 1;
    if (nextIdx >= activities.length) {
      // Calculate unlocked robots
      const totalScore = score + (feedbackState === "correct" ? 0 : 0);
      const unlockedRobots: string[] = ["Bibo-Bot 🤖"];
      if (totalScore >= 60) unlockedRobots.push("Sparky-Mech ⚡");
      if (totalScore >= 80) unlockedRobots.push("Cyber-Kitty 🐱");
      if (totalScore >= 100) unlockedRobots.push("Astro-Robo 🚀");

      onFinish(
        totalScore,
        correctCount,
        activities.length,
        skillsTracker,
        puzzlePieces,
        stars,
        unlockedRobots
      );
    } else {
      setCurrentIndex(nextIdx);
    }
  };

  // -------------------------------------------------------------
  // Handlers for specific activity types
  // -------------------------------------------------------------

  // 1. Arrange Steps & Build Algorithm
  const handleStepCardClick = (index: number) => {
    if (feedbackState === "correct") return;

    if (selectedStepIdx === null) {
      setSelectedStepIdx(index);
      audioManager.playPop();
    } else if (selectedStepIdx === index) {
      setSelectedStepIdx(null);
      audioManager.playPop();
    } else {
      // Swap step card at selectedStepIdx with step card at index
      const newArr = [...orderedStepIds];
      const temp = newArr[selectedStepIdx];
      newArr[selectedStepIdx] = newArr[index];
      newArr[index] = temp;
      setOrderedStepIds(newArr);
      setSelectedStepIdx(null);
      audioManager.playPop();
    }
  };

  const moveStepItem = (fromIdx: number, toIdx: number) => {
    if (feedbackState === "correct") return;
    const newArr = [...orderedStepIds];
    const [moved] = newArr.splice(fromIdx, 1);
    newArr.splice(toIdx, 0, moved);
    setOrderedStepIds(newArr);
    setSelectedStepIdx(null);
    audioManager.playPop();
  };

  const resetStepOrder = () => {
    if (feedbackState === "correct" || !currentActivity.stepItems) return;
    audioManager.playPop();
    setSelectedStepIdx(null);
    const shuffled = [...currentActivity.stepItems].sort(() => Math.random() - 0.5);
    setOrderedStepIds(shuffled.map((item) => item.id));
  };

  const verifyStepOrder = () => {
    if (!currentActivity.correctStepOrder) return;
    const isCorrect = orderedStepIds.every(
      (id, index) => id === currentActivity.correctStepOrder![index]
    );

    if (isCorrect) {
      triggerSuccess(currentActivity.successFeedback, currentActivity.skill);
    } else {
      triggerTryAgain();
    }
  };

  // 2. Pattern Recognition & Sequence Completion
  const handlePatternChoice = (isCorrect: boolean) => {
    if (feedbackState === "correct") return;
    if (isCorrect) {
      triggerSuccess(currentActivity.successFeedback, currentActivity.skill);
    } else {
      triggerTryAgain();
    }
  };

  // 3. Odd One Out
  const handleOddChoice = (isCorrect: boolean) => {
    if (feedbackState === "correct") return;
    if (isCorrect) {
      triggerSuccess(currentActivity.successFeedback, currentActivity.skill);
    } else {
      triggerTryAgain();
    }
  };

  // 4. Follow Robot Navigation
  const addCommand = (cmd: DirectionCommand) => {
    if (feedbackState === "correct" || isExecutingRobot) return;
    if (userCommands.length >= 6) return;
    audioManager.playPop();
    setUserCommands((prev) => [...prev, cmd]);
  };

  const removeLastCommand = () => {
    if (feedbackState === "correct" || isExecutingRobot) return;
    audioManager.playPop();
    setUserCommands((prev) => prev.slice(0, -1));
  };

  const removeCommandAtIndex = (idx: number) => {
    if (feedbackState === "correct" || isExecutingRobot) return;
    audioManager.playPop();
    setUserCommands((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearAllCommands = () => {
    if (feedbackState === "correct" || isExecutingRobot) return;
    audioManager.playPop();
    setUserCommands([]);
  };

  const executeRobotSequence = async () => {
    if (!currentActivity.correctCommandSequence || isExecutingRobot) return;
    setIsExecutingRobot(true);

    const start = currentActivity.robotStart || { r: 0, c: 0 };
    let currR = start.r;
    let currC = start.c;
    setRobotPos({ r: currR, c: currC });

    let hitGoal = false;
    const obstacles = currentActivity.obstacles || [];
    const goal = currentActivity.starGoal || { r: 0, c: 0 };

    for (let i = 0; i < userCommands.length; i++) {
      const cmd = userCommands[i];
      audioManager.playPop();
      await new Promise((res) => setTimeout(res, 450));

      if (cmd === "RIGHT" || cmd === "➡") currC += 1;
      else if (cmd === "LEFT" || cmd === "⬅") currC -= 1;
      else if (cmd === "DOWN" || cmd === "⬇") currR += 1;
      else if (cmd === "UP" || cmd === "⬆") currR -= 1;

      // Bound checks
      const rows = currentActivity.gridSize?.rows || 1;
      const cols = currentActivity.gridSize?.cols || 3;
      currR = Math.max(0, Math.min(rows - 1, currR));
      currC = Math.max(0, Math.min(cols - 1, currC));

      setRobotPos({ r: currR, c: currC });

      // Obstacle hit?
      const isObstacle = obstacles.some((obs) => obs.r === currR && obs.c === currC);
      if (isObstacle) {
        break;
      }

      if (currR === goal.r && currC === goal.c) {
        hitGoal = true;
        break;
      }
    }

    setIsExecutingRobot(false);

    if (hitGoal) {
      triggerSuccess(currentActivity.successFeedback, currentActivity.skill);
    } else {
      triggerTryAgain();
    }
  };

  // 5. Fix the Mistake (Debugging)
  const verifyDebuggingFix = () => {
    if (!selectedReplacement || feedbackState === "correct") return;
    if (selectedReplacement === currentActivity.correctCommand) {
      triggerSuccess(currentActivity.successFeedback, currentActivity.skill);
    } else {
      triggerTryAgain();
    }
  };

  // Convert arrow direction to display symbol
  const arrowSymbol = (cmd: string) => {
    switch (cmd) {
      case "UP":
      case "⬆":
        return "⬆️";
      case "DOWN":
      case "⬇":
        return "⬇️";
      case "LEFT":
      case "⬅":
        return "⬅️";
      case "RIGHT":
      case "➡":
        return "➡️";
      default:
        return cmd;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 md:py-6">
      {showConfetti && <Confetti />}

      {/* Top Floating Dashboard Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-lg border-2 border-purple-200 mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Exit button & Level Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl border-2 border-purple-200 transition-all active:scale-95 flex items-center gap-1 font-display font-bold text-xs sm:text-sm"
            id="btn-coding-exit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Keluar</span>
          </button>

          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-display font-bold shadow-xs">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>
              {childName} · Coding Quest ({level})
            </span>
          </div>
        </div>

        {/* Center: Realtime Rewards */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-50 border-2 border-amber-200 text-amber-900 px-3 py-1 rounded-2xl text-xs font-bold font-display">
            <Puzzle className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{puzzlePieces} Puzzle</span>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 border-2 border-yellow-200 text-yellow-900 px-3 py-1 rounded-2xl text-xs font-bold font-display">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400 animate-pulse" />
            <span>{stars} Bintang</span>
          </div>
        </div>

        {/* Right: Sound toggle */}
        <button
          onClick={handleMuteToggle}
          className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl border-2 border-purple-200 transition-all active:scale-95"
          title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
          id="btn-coding-sound"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Progress Bar Header */}
      <div className="mb-6 bg-white/80 rounded-2xl p-3 border-2 border-purple-100 shadow-xs">
        <div className="flex justify-between items-center mb-1.5 font-display text-xs sm:text-sm font-bold text-purple-900">
          <span>🧩 Misi {currentIndex + 1} dari {activities.length}</span>
          <span>{Math.round(((currentIndex + 1) / activities.length) * 100)}% Selesai</span>
        </div>
        <div className="w-full bg-purple-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-purple-200">
          <div
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${((currentIndex + 1) / activities.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Speech Toast Notice */}
      <AnimatePresence>
        {speechToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 bg-amber-100 border-2 border-amber-400 text-amber-900 px-4 py-2 rounded-full text-xs font-bold font-display text-center shadow-xs"
          >
            ⚠️ {speechToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Activity Card */}
      <motion.div
        key={currentActivity.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-purple-200 shadow-xl relative overflow-hidden"
      >
        {/* Activity Tag & Read Voice Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-purple-300 font-display flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            Skill: {currentActivity.skill}
          </span>

          <button
            type="button"
            onClick={() =>
              handleSpeak(
                `act-${currentActivity.id}`,
                `${currentActivity.title}. ${currentActivity.prompt}`
              )
            }
            className={`px-4 py-2 rounded-full font-display font-bold text-xs sm:text-sm flex items-center gap-2 border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              speakingId === `act-${currentActivity.id}`
                ? "bg-purple-400 text-purple-950 border-purple-500 shadow-md animate-pulse scale-105"
                : "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
            }`}
            id="btn-speak-activity"
          >
            <Volume2 className="w-4 h-4 text-purple-600" />
            <span>
              {speakingId === `act-${currentActivity.id}` ? "Sedang Membaca..." : "🔊 Baca Misi"}
            </span>
          </button>
        </div>

        {/* Title & Prompt */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-950 font-display mb-2 flex items-center justify-center gap-2">
            <span>🧩</span> {currentActivity.title}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed max-w-xl mx-auto">
            {currentActivity.prompt}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE WORKSPACE PER TYPE                               */}
        {/* ------------------------------------------------------------- */}

        {/* TYPE 1 & 6: ARRANGE STEPS & BUILD ALGORITHM */}
        {(currentActivity.type === "arrange_steps" || currentActivity.type === "build_algorithm") && (
          <div className="my-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-purple-50 p-3 rounded-2xl border border-purple-200">
              <p className="text-xs text-purple-900 font-bold font-display flex items-center gap-1.5">
                <span>💡</span>
                <span>
                  {selectedStepIdx !== null
                    ? "PILIH KARTU KEDUA untuk menukar urutan!"
                    : "Ketuk kartu untuk memilih, lalu ketuk kartu lain untuk menukar posisi! (Atau gunakan panah ◄ ►)"}
                </span>
              </p>
              <button
                type="button"
                onClick={resetStepOrder}
                disabled={feedbackState === "correct"}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-white hover:bg-purple-100 border border-purple-300 px-3 py-1 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
              >
                🔄 Acak Ulang
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {orderedStepIds.map((stepId, index) => {
                const item = currentActivity.stepItems?.find((i) => i.id === stepId);
                if (!item) return null;
                const isSelected = selectedStepIdx === index;

                return (
                  <motion.div
                    key={stepId}
                    layout
                    onClick={() => handleStepCardClick(index)}
                    className={`border-3 rounded-2xl p-4 flex flex-col items-center justify-between text-center shadow-xs transition-all relative cursor-pointer select-none ${
                      isSelected
                        ? "bg-purple-100 border-purple-600 ring-4 ring-purple-400 scale-105 shadow-md z-10"
                        : "bg-gradient-to-b from-purple-50 to-indigo-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100/60"
                    }`}
                  >
                    <span className="absolute top-2 left-2 bg-purple-600 text-white w-6 h-6 rounded-full text-xs font-bold font-display flex items-center justify-center shadow-2xs">
                      {index + 1}
                    </span>

                    {isSelected && (
                      <span className="absolute top-2 right-2 bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold font-display animate-pulse">
                        Dipilih
                      </span>
                    )}

                    <span className="text-4xl my-2.5 transition-transform group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-display font-extrabold text-slate-800 text-sm mb-3 leading-snug">
                      {item.text}
                    </span>

                    {/* Left/Right or Up/Down move buttons */}
                    <div className="flex gap-2 mt-auto pt-2 border-t border-purple-200/80 w-full justify-center">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveStepItem(index, index - 1);
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-purple-200 border border-purple-300 rounded-xl text-purple-700 text-xs font-bold shadow-2xs active:scale-90 cursor-pointer"
                          title="Geser ke kiri"
                        >
                          ◄
                        </button>
                      )}
                      <span className="text-[10px] text-purple-400 font-bold self-center">
                        {isSelected ? "Ketuk Tukar" : "Pilih"}
                      </span>
                      {index < orderedStepIds.length - 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveStepItem(index, index + 1);
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-purple-200 border border-purple-300 rounded-xl text-purple-700 text-xs font-bold shadow-2xs active:scale-90 cursor-pointer"
                          title="Geser ke kanan"
                        >
                          ►
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {feedbackState !== "correct" && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={verifyStepOrder}
                  className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-display font-extrabold text-lg rounded-2xl shadow-[0_6px_0_#6B21A8] active:translate-y-1 transition-all cursor-pointer inline-flex items-center gap-2"
                  id="btn-verify-steps"
                >
                  <span>✨ Cek Urutan</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TYPE 2 & 7: FIND PATTERN & COMPLETE SEQUENCE */}
        {(currentActivity.type === "find_pattern" || currentActivity.type === "complete_sequence") && (
          <div className="my-6 space-y-6">
            {/* Pattern Board */}
            <div className="bg-purple-50 rounded-3xl p-6 border-3 border-purple-200 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {currentActivity.patternSequence?.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold font-display border-3 ${
                    item === "?"
                      ? "bg-amber-300 text-amber-950 border-amber-500 animate-pulse scale-105 shadow-md"
                      : "bg-white text-slate-800 border-purple-300 shadow-xs"
                  }`}
                >
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Pattern Options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentActivity.patternOptions?.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePatternChoice(opt.isCorrect)}
                  disabled={feedbackState === "correct"}
                  className="p-4 bg-white hover:bg-purple-50 border-3 border-purple-200 hover:border-purple-500 rounded-2xl font-display font-bold text-slate-800 flex flex-col items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span className="text-3xl sm:text-4xl">{opt.icon}</span>
                  <span className="text-sm sm:text-base">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TYPE 3: FOLLOW ROBOT NAVIGATION GRID */}
        {currentActivity.type === "follow_robot" && (
          <div className="my-6 space-y-6">
            {/* 2D Grid Canvas */}
            <div className="bg-slate-900 rounded-3xl p-4 border-4 border-slate-700 shadow-inner max-w-sm mx-auto">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${currentActivity.gridSize?.cols || 3}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: (currentActivity.gridSize?.rows || 1) * (currentActivity.gridSize?.cols || 3) }).map(
                  (_, cellIdx) => {
                    const cols = currentActivity.gridSize?.cols || 3;
                    const r = Math.floor(cellIdx / cols);
                    const c = cellIdx % cols;

                    const isRobot = robotPos.r === r && robotPos.c === c;
                    const isGoal = currentActivity.starGoal?.r === r && currentActivity.starGoal?.c === c;
                    const isObstacle = currentActivity.obstacles?.some((obs) => obs.r === r && obs.c === c);

                    return (
                      <div
                        key={cellIdx}
                        className={`h-16 sm:h-20 rounded-2xl border-2 flex items-center justify-center text-3xl sm:text-4xl relative transition-all ${
                          isRobot
                            ? "bg-purple-600 border-purple-400 shadow-[0_0_15px_#A855F7]"
                            : isGoal
                            ? "bg-amber-500/20 border-amber-400"
                            : isObstacle
                            ? "bg-slate-800 border-slate-700"
                            : "bg-slate-800/60 border-slate-700/80"
                        }`}
                      >
                        {isRobot && (
                          <motion.span
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="animate-bounce"
                          >
                            🤖
                          </motion.span>
                        )}
                        {!isRobot && isGoal && <span className="animate-pulse">⭐️</span>}
                        {!isRobot && isObstacle && <span>🪨</span>}
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Program Command Slot Bar */}
            <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
              <div className="flex justify-between items-center mb-2 font-display text-xs font-bold text-purple-900">
                <span>💻 Program Perintah Robot (Ketuk perintah untuk menghapus):</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={removeLastCommand}
                    disabled={userCommands.length === 0 || isExecutingRobot}
                    className="text-xs text-purple-700 hover:text-purple-900 font-bold disabled:opacity-40 cursor-pointer"
                  >
                    ⌫ Hapus Terakhir
                  </button>
                  <button
                    onClick={clearAllCommands}
                    disabled={userCommands.length === 0 || isExecutingRobot}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold disabled:opacity-40 cursor-pointer"
                  >
                    🗑️ Hapus Semua
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 min-h-12 items-center bg-white p-2.5 rounded-xl border border-purple-200">
                {userCommands.length === 0 ? (
                  <span className="text-xs text-slate-400 italic font-medium px-2">
                    Belum ada perintah. Pilih panah di bawah!
                  </span>
                ) : (
                  userCommands.map((cmd, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => removeCommandAtIndex(i)}
                      disabled={isExecutingRobot || feedbackState === "correct"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-purple-600 hover:bg-rose-600 text-white font-display font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer group"
                      title="Ketuk untuk menghapus perintah ini"
                    >
                      <span>{i + 1}.</span>
                      <span>{arrowSymbol(cmd)}</span>
                      <span className="text-[10px] bg-white/20 group-hover:bg-white/40 px-1 rounded-full ml-0.5">
                        ✕
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Command Direction Controls */}
            <div className="flex flex-wrap justify-center gap-3">
              {(currentActivity.availableCommands || ["➡", "⬆", "⬇", "⬅"]).map((cmd, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const normCmd = cmd === "➡" ? "RIGHT" : cmd === "⬅" ? "LEFT" : cmd === "⬆" ? "UP" : cmd === "⬇" ? "DOWN" : (cmd as DirectionCommand);
                    addCommand(normCmd);
                  }}
                  disabled={isExecutingRobot || feedbackState === "correct"}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-white hover:bg-purple-100 border-3 border-purple-300 rounded-2xl text-2xl font-bold flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer"
                >
                  {arrowSymbol(cmd)}
                </button>
              ))}
            </div>

            {/* Execute Button */}
            {feedbackState !== "correct" && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={executeRobotSequence}
                  disabled={userCommands.length === 0 || isExecutingRobot}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-display font-extrabold text-lg rounded-2xl shadow-[0_6px_0_#4C1D95] active:translate-y-1 transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
                  id="btn-run-robot"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>{isExecutingRobot ? "Robot Berjalan..." : "Jalankan Robot! 🚀"}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TYPE 4: ODD ONE OUT */}
        {currentActivity.type === "odd_one_out" && (
          <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentActivity.oddOptions?.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleOddChoice(opt.isCorrect)}
                disabled={feedbackState === "correct"}
                className="p-5 bg-white hover:bg-purple-50 border-3 border-purple-200 hover:border-purple-500 rounded-3xl font-display font-bold text-slate-800 flex flex-col items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span className="text-4xl sm:text-5xl">{opt.icon}</span>
                <span className="text-sm sm:text-base">{opt.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* TYPE 5: FIX THE MISTAKE (DEBUGGING) */}
        {currentActivity.type === "fix_mistake" && (
          <div className="my-6 space-y-6">
            <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl text-center">
              <span className="text-rose-800 font-display font-bold text-sm block mb-2">
                ⚠️ Kode Bermasalah Saat Ini:
              </span>
              <div className="flex items-center justify-center gap-2">
                {currentActivity.faultyCommands?.map((cmd, idx) => {
                  const isFaulty = idx === currentActivity.faultyIndex;
                  return (
                    <div
                      key={idx}
                      className={`px-4 py-2 rounded-xl font-display font-extrabold text-lg border-2 ${
                        isFaulty
                          ? "bg-rose-500 text-white border-rose-600 animate-pulse shadow-md"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      {arrowSymbol(cmd)} {isFaulty && "❌"}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Options to fix */}
            <div className="text-center">
              <p className="text-sm font-bold font-display text-purple-900 mb-3">
                Pilih panah yang benar untuk menggantikan {arrowSymbol(currentActivity.faultyCommands?.[currentActivity.faultyIndex || 0] || "")}:
              </p>
              <div className="flex justify-center gap-3">
                {(["UP", "RIGHT", "DOWN", "LEFT"] as const).map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => setSelectedReplacement(cmd)}
                    className={`w-14 h-14 rounded-2xl font-bold text-2xl border-3 transition-all cursor-pointer ${
                      selectedReplacement === cmd
                        ? "bg-purple-600 text-white border-purple-700 scale-105 shadow-md"
                        : "bg-white text-slate-800 border-purple-200 hover:bg-purple-50"
                    }`}
                  >
                    {arrowSymbol(cmd)}
                  </button>
                ))}
              </div>
            </div>

            {feedbackState !== "correct" && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={verifyDebuggingFix}
                  disabled={!selectedReplacement}
                  className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-display font-extrabold text-lg rounded-2xl shadow-[0_6px_0_#6B21A8] active:translate-y-1 transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
                  id="btn-fix-code"
                >
                  <span>🛠️ Perbaiki Perintah</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* FEEDBACK & NEXT MISSION BUTTON                                */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {feedbackState !== "pending" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-5 rounded-2xl border-3 font-display text-center ${
                feedbackState === "correct"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                  : "bg-amber-50 border-amber-400 text-amber-950"
              }`}
            >
              <div className="text-lg sm:text-xl font-extrabold mb-2 flex items-center justify-center gap-2">
                {feedbackState === "correct" ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Hebat Sekali! Misi Selesai! 🎉</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-6 h-6 text-amber-600" />
                    <span>Yuk, Coba Lagi! 💪</span>
                  </>
                )}
              </div>
              <p className="text-sm sm:text-base font-semibold">{feedbackMessage}</p>

              {feedbackState === "correct" && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleNextActivity}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-lg rounded-2xl shadow-[0_6px_0_#047857] active:translate-y-1 transition-all cursor-pointer inline-flex items-center gap-2"
                    id="btn-next-activity"
                  >
                    <span>Lanjut Misi Berikutnya</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
