/**
 * Deterministic XP calculation for a completed mission session. Entirely
 * separate from the existing score formula (score = correct/total * 100,
 * computed in QuizFlow.tsx/CodingQuestFlow.tsx and unchanged by this
 * batch) — XP is an additional progression number, not a replacement for
 * or derivation of the mission's score/progressPercent.
 *
 * Baseline model (Batch 1 — intentionally simple, no multipliers yet):
 *   - 10 XP per correctly answered question
 *   - +20 XP completion bonus for finishing the mission
 *   - +10 XP perfect-score bonus if every question was answered correctly
 *
 * Examples:
 *   10 questions, 10 correct  -> 100 + 20 + 10 = 130 XP
 *   5 questions, 5 correct    -> 50 + 20 + 10 = 80 XP
 *   5 questions, 3 correct    -> 30 + 20 = 50 XP
 *
 * Never returns a negative value — there is no penalty for wrong answers,
 * and a degenerate 0-question mission earns 0 XP (no completion bonus is
 * given for a mission with no questions to complete).
 */
export function calculateMissionXp(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0 || correctCount <= 0) return 0;

  const safeCorrect = Math.min(correctCount, totalQuestions);
  const baseXp = safeCorrect * 10;
  const completionBonus = 20;
  const perfectBonus = safeCorrect === totalQuestions ? 10 : 0;

  return baseXp + completionBonus + perfectBonus;
}
