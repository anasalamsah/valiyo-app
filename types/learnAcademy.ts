/**
 * Ported from the (now-retired) external Learn app's types.ts — the
 * academy/mission structure, not the gamification-on-users-doc parts
 * (see lib/firestore/learnProgress.ts for why that's handled differently
 * here).
 */

export type Category =
  | "Matematika"
  | "Sains"
  | "Bahasa Inggris"
  | "Pengetahuan Umum"
  | "Coding Quest";

export type Level =
  | "Preschool 1 (2 thn)"
  | "Preschool 2 (3 thn)"
  | "TK A"
  | "TK A (Advanced)"
  | "TK B"
  | "TK B (Advanced)"
  | "SD Kelas 1"
  | "SD Kelas 2"
  | "SD Kelas 3"
  | "SD Kelas 4"
  | "SD Kelas 5"
  | "SD Kelas 6";

export type MissionType = "easy" | "normal" | "challenge" | "olympiad" | "daily" | "ai_quest";

/** A single multiple-choice quiz question. */
export interface Question {
  id: string;
  level: Level;
  category: Category;
  question: string;
  options: string[];
  answer: string;
}

export type CodingActivityType =
  | "arrange_steps"
  | "find_pattern"
  | "follow_robot"
  | "odd_one_out"
  | "fix_mistake"
  | "build_algorithm"
  | "complete_sequence";

export type DirectionCommand = "UP" | "DOWN" | "LEFT" | "RIGHT" | "➡" | "⬅" | "⬆" | "⬇";

export type CodingSkillType =
  | "Sequencing"
  | "Pattern Recognition"
  | "Logical Thinking"
  | "Problem Solving"
  | "Computational Thinking"
  | "Decision Making"
  | "Planning"
  | "Navigation & Planning"
  | "Categorization"
  | "Debugging"
  | "Loops & Sequences";

/** A single interactive coding-quest mini-game activity (7 variants). */
export interface CodingActivity {
  id: string;
  type: CodingActivityType;
  level: Level;
  title: string;
  prompt: string;
  skill: CodingSkillType;

  // Arrange steps & build algorithm
  stepItems?: { id: string; text: string; icon: string }[];
  correctStepOrder?: string[];

  // Patterns & Sequences & Odd One Out
  patternSequence?: string[];
  patternOptions?: { text: string; icon: string; isCorrect: boolean }[];
  oddOptions?: { id: string; text: string; icon: string; category: string; isCorrect: boolean }[];

  // Follow Robot Grid Navigation
  gridSize?: { rows: number; cols: number };
  robotStart?: { r: number; c: number };
  robotFacing?: DirectionCommand;
  starGoal?: { r: number; c: number };
  obstacles?: { r: number; c: number }[];
  availableCommands?: DirectionCommand[];
  correctCommandSequence?: DirectionCommand[];

  // Fix the Mistake (Debugging)
  faultyCommands?: DirectionCommand[];
  faultyIndex?: number;
  correctCommand?: DirectionCommand;

  successFeedback: string;
}

export type MissionData = {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  starsReward: number;
  questionCount: number;
  estimatedMinutes: number;
  difficultyRating: string;
  badgeIcon: string;
  isUnlocked: boolean;
};

export type AcademyData = {
  id: string;
  title: string;
  category: Category;
  themeColor: string;
  icon: string;
  illustration: string;
  tagline: string;
  description: string;
  skills: string[];
  gradientBg: string;
  cardBorder: string;
  accentColor: string;
  btnBg: string;
  isComingSoon?: boolean;
};
