import type { AssessmentDomain } from "@/types/discoveryAssessment";

/** Shared across the prompt builder, fallback analysis, and roadmap generator. */
export const DOMAIN_LABEL_ID: Record<AssessmentDomain, string> = {
  Observation: "Pengamatan & Observasi",
  Memory: "Daya Ingat & Memori",
  Creativity: "Kreativitas & Imajinasi",
  Communication: "Komunikasi Verbal",
  Leadership: "Jiwa Kepemimpinan",
  Logic: "Penalaran & Logika",
  Mathematics: "Berpikir Matematis",
  Language: "Kemampuan Bahasa",
  Science: "Eksplorasi Sains",
  "Motor Skills": "Motorik & Koordinasi",
  Curiosity: "Rasa Ingin Tahu",
  Focus: "Atensi & Konsentrasi",
  "Problem Solving": "Pemecahan Masalah",
  Persistence: "Kegigihan & Ketahanan",
  Collaboration: "Kerjasama & Sosialisasi",
  Independence: "Kemandirian",
  "Pattern Recognition": "Pengenalan Pola",
  "Computational Thinking": "Berpikir Komputasional",
};

/** Average answer value (1-4) per domain, scaled to 0-100. */
export function computeDomainScores(
  answers: { domain: string; value: number }[]
): Record<string, number> {
  const totals: Record<string, { sum: number; count: number }> = {};
  for (const answer of answers) {
    if (!totals[answer.domain]) totals[answer.domain] = { sum: 0, count: 0 };
    totals[answer.domain].sum += answer.value;
    totals[answer.domain].count += 1;
  }
  const scores: Record<string, number> = {};
  for (const domain of Object.keys(totals)) {
    const avg = totals[domain].sum / totals[domain].count; // 1..4
    scores[domain] = Math.round((avg / 4) * 100);
  }
  return scores;
}
