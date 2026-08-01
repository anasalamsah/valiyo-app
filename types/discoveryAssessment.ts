import type { Timestamp } from "firebase/firestore";

/**
 * The full internal Discovery assessment/report shape — modeled directly
 * on the proven AssessmentResult contract from the (now-retired) external
 * Discovery app's Gemini prompt, since that JSON structure is already
 * tested against real Gemini output and already matches ~90% of what the
 * platform brief asks for.
 *
 * This is intentionally a SEPARATE, richer type from `DiscoveryResult` in
 * types/learning.ts — that narrower type stays exactly as-is so the
 * existing dashboard widget (components/dashboard/DiscoveryReports.tsx)
 * keeps compiling untouched. Both types describe documents in the same
 * `discovery_results` collection; Firestore doesn't enforce a single
 * shape per collection, and reconciling the dashboard widget to render
 * the full report is deferred to the Report Page milestone.
 */

export type ChildGenderLabel = "Laki-laki" | "Perempuan" | "Tidak ingin menyebutkan";

/** Snapshot of the child's profile at assessment time (frozen, not a live join). */
export type AssessmentChildProfile = {
  name: string;
  age: number;
  gender?: ChildGenderLabel;
  school: string;
  className: string;
  favoriteActivities: string;
};

export type AssessmentDomain =
  | "Observation"
  | "Memory"
  | "Creativity"
  | "Communication"
  | "Leadership"
  | "Logic"
  | "Mathematics"
  | "Language"
  | "Science"
  | "Motor Skills"
  | "Curiosity"
  | "Focus"
  | "Problem Solving"
  | "Persistence"
  | "Collaboration"
  | "Independence"
  | "Pattern Recognition"
  | "Computational Thinking";

export type AssessmentAnswerValue = 1 | 2 | 3 | 4;

export type AssessmentAnswer = {
  questionId: string;
  domain: AssessmentDomain;
  value: AssessmentAnswerValue;
};

export type StrengthItem = { title: string; domain: string; description: string; score: number };
export type GrowthSkillItem = { title: string; domain: string; guidance: string };
export type LearningStyleInfo = {
  primary: string;
  secondary: string;
  description: string;
  tips: string[];
};
export type ActivityRecommendation = {
  title: string;
  category: string;
  description: string;
  impact: string;
};
export type AcademySuggestion = { name: string; type: string; reason: string };
export type DomainReadiness = { level: string; traitOrFocus: string; commentary: string };
export type HomeActivity = {
  title: string;
  itemNeeded: string;
  instruction: string;
  benefit: string;
};
export type SchoolRecommendation = { area: string; suggestion: string };
export type RadarDataPoint = { subject: string; score: number; fullMark: number };

export type GrowthRoadmap = {
  phase1ThisWeek: { goal: string; actions: string[] };
  phase2Month1To3: { goal: string; activities: { activity: string; why: string }[] };
  phase3Month4To6: {
    goal: string;
    project: { title: string; description: string };
    competitionOrChallenge: { title: string; description: string };
    newSkillToExplore: { title: string; description: string };
    recommendedAcademy: { title: string; description: string };
  };
  quickWins: string[];
  aiInsight: {
    biggestStrength: string;
    biggestOpportunity: string;
    mostImportantNextStep: string;
    summaryText: string;
  };
};

/** Mirrors a full document in the `discovery_results` collection. */
export type DiscoveryAssessment = {
  id: string;
  uid: string;
  childId: string;
  status: "in_progress" | "completed";

  childProfileSnapshot: AssessmentChildProfile;
  answers: AssessmentAnswer[];
  domainScores: Record<string, number>;

  topStrengths: StrengthItem[];
  skillsToDevelop: GrowthSkillItem[];
  learningStyle: LearningStyleInfo;

  olympiadReadiness: DomainReadiness;
  codingReadiness: DomainReadiness;
  creativityPotential: DomainReadiness;
  scienceCuriosity: DomainReadiness;
  mathematicalThinking: DomainReadiness;
  languageDevelopment: DomainReadiness;

  recommendedActivities: ActivityRecommendation[];
  suggestedAcademy: AcademySuggestion[];
  homeActivities: HomeActivity[];
  schoolRecommendations: SchoolRecommendation[];

  aiSummary: string;
  radarData: RadarDataPoint[];
  nextMonthGoals: string[];
  parentTips: string[];
  teacherTips: string[];
  roadmap: GrowthRoadmap | null;

  /** Set once PDF export (a later milestone) generates a file in Storage. */
  pdfUrl: string | null;

  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  completedAt: Timestamp | null;
};
