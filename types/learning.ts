import type { Timestamp } from "firebase/firestore";

/** Mirrors a document in the `learn_progress` collection. */
export type LearnProgress = {
  id: string;
  uid: string;
  childId: string;
  courseId: string;
  courseTitle: string;
  progressPercent: number;
  lastActivityAt: Timestamp | null;
};

/** Mirrors a document in the `discovery_results` collection. */
export type DiscoveryResult = {
  id: string;
  uid: string;
  childId: string;
  status: "completed" | "in_progress";
  summary: string | null;
  topDomains: string[];
  completedAt: Timestamp | null;
};

/** Mirrors a document in the `reports` collection. */
export type ReportItem = {
  id: string;
  uid: string;
  childId: string | null;
  type: "discovery" | "learn" | "general";
  title: string;
  summary: string | null;
  createdAt: Timestamp | null;
};
