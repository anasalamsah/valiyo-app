import type { Question } from "@/types/learnAcademy";

/**
 * Pilot set of existing question IDs suitable for Tap Game — hand-picked
 * from the real question bank (config/learnQuestions.ts), not a new
 * question source. Deliberately small (Batch 2 pilot scope): 2 numeric
 * counting questions (options are bare numbers — large number tiles) and
 * 3 short single-word English vocabulary questions (options are one word
 * each — large word tiles), all from Preschool 1, where big simple tap
 * targets suit the age group best.
 *
 * This is metadata *about* existing questions, kept entirely separate
 * from the question data itself — config/learnQuestions.ts and
 * types/learnAcademy.ts are untouched by this feature. Add more IDs here
 * as later batches expand the pilot; there is no need to touch the
 * question engine to do so.
 */
const TAP_COMPATIBLE_QUESTION_IDS: ReadonlySet<string> = new Set([
  "MATH_PS1_001", // "Ibu punya 1 apel..." — options: 1, 2, 3, 4
  "MATH_PS1_002", // "Ibu punya 1 bola..." — options: 1, 2, 3, 4
  "ENG_PS1_001", // "...dari 'Kucing'?" — options: Cat, Dog, Bird, Fish
  "ENG_PS1_002", // "...dari 'Anjing'?" — options: Dog, Cat, Bird, Fish
  "ENG_PS1_003", // "...dari 'Ikan'?" — options: Fish, Cat, Dog, Bird
]);

/**
 * Pilot set for Match Game — same idea as Tap Game above, a separate small
 * hand-picked list of real question IDs. Chosen from TK A Sains "animal
 * sound" questions: short, simple options that suit the question-in-the-
 * middle / options-around-it matching visual well.
 */
const MATCH_COMPATIBLE_QUESTION_IDS: ReadonlySet<string> = new Set([
  "SCI_TKA_001", // "Suara khas...Kucing?" — options: meong-meong, mbeek-mbeek, mooh-mooh, cit-cit
  "SCI_TKA_002", // "...Anjing?" — options: guk-guk, meong-meong, mooh-mooh, cit-cit
  "SCI_TKA_003", // "...Kambing?" — options: mbeek-mbeek, meong-meong, mooh-mooh, cit-cit
  "SCI_TKA_004", // "...Sapi?" — options: mooh-mooh, meong-meong, kukuruyuk, cit-cit
  "SCI_TKA_005", // "...Bebek?" — options: kwek-kwek, meong-meong, mooh-mooh, cit-cit
]);

export type InteractionMode = "classic" | "tap" | "match";

/**
 * A question with no entry in either set behaves exactly as it does
 * today: this always returns "classic" unless the question's id is
 * explicitly listed above. Neither "tap" nor "match" is ever the default.
 */
export function getInteractionMode(question: Question): InteractionMode {
  if (TAP_COMPATIBLE_QUESTION_IDS.has(question.id)) return "tap";
  if (MATCH_COMPATIBLE_QUESTION_IDS.has(question.id)) return "match";
  return "classic";
}
