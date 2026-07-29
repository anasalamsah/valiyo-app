import type { Timestamp } from "firebase/firestore";

export type ChildGender = "male" | "female" | "unspecified";

/** Mirrors a document in the `children` collection. */
export type Child = {
  id: string;
  parentUid: string;
  name: string;
  /** ISO date string ("YYYY-MM-DD"), optional. */
  birthDate: string | null;
  gender: ChildGender;
  avatarEmoji: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

/** Fields the parent controls when adding/editing a child. */
export type ChildInput = {
  name: string;
  birthDate?: string | null;
  gender?: ChildGender;
  avatarEmoji?: string;
};
