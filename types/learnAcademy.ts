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

export type Level = "PAUD/TK" | "SD Kelas 1-2" | "SD Kelas 3-4" | "SD Kelas 5-6";

export type MissionType = "easy" | "normal" | "challenge" | "olympiad" | "daily" | "ai_quest";

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
