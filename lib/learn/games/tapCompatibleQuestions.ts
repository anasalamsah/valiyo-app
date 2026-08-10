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

export type InteractionMode = "classic" | "tap";

/**
 * A question with no entry here behaves exactly as it does today: this
 * always returns "classic" unless the question's id is explicitly listed
 * above. Tap is never the default.
 */
export function getInteractionMode(question: Question): InteractionMode {
  return TAP_COMPATIBLE_QUESTION_IDS.has(question.id) ? "tap" : "classic";
}
