import type { AssessmentChildProfile } from "@/types/discoveryAssessment";

/**
 * Dedicated prompt builder — never hardcode prompts inside components or
 * server actions. Ported from the (now-retired) external Discovery app's
 * already-tested prompt, kept versioned here so future tweaks are a
 * one-file change.
 */
export const DISCOVERY_PROMPT_VERSION = "v1-ported";

function ageStageGuidance(age: number): string {
  if (age <= 3) {
    return "SANGAT PENTING: Anak berusia 2-3 tahun (Batita/PAUD Dini). Rekomendasi aktivitas, akademi, kesiapan coding/olimpiade HARUS berfokus pada stimulasi sensori, motorik, pengenalan bentuk/warna, persepsi sebab-akibat fisik, serta eksplorasi tanpa gadget.";
  }
  if (age <= 6) {
    return "SANGAT PENTING: Anak berusia 4-6 tahun (PAUD/TK/Pra-SD). Rekomendasi aktivitas, akademi, kesiapan coding/olimpiade HARUS berfokus pada kesiapan pra-akademis, pola logika visual, Unplugged Coding, imajinasi bercerita, dan eksperimen sederhana.";
  }
  if (age <= 9) {
    return "SANGAT PENTING: Anak berusia 7-9 tahun (SD Kelas 1-3). Rekomendasi aktivitas, akademi, kesiapan coding/olimpiade HARUS berfokus pada penalaran matematika SD, block coding Scratch, eksperimen sains SD, literasi membaca, dan kebiasaan belajar mandiri.";
  }
  return "SANGAT PENTING: Anak berusia 10-12 tahun (SD Kelas 4-6). Rekomendasi aktivitas, akademi, kesiapan coding/olimpiade HARUS berfokus pada berpikir kritis (critical thinking), dasar algoritma/Python/logic puzzles, Olimpiade Matematika & Sains SD Atas, serta proyek inovasi mandiri.";
}

/**
 * Builds the structured prompt sent to Gemini. Requests JSON-only output
 * (no markdown, no free text) matching a fixed schema so the response can
 * be parsed straight into (most of) a DiscoveryAssessment document.
 */
export function buildDiscoveryPrompt(
  childProfile: AssessmentChildProfile,
  domainScores: Record<string, number>
): string {
  const age = Number(childProfile.age) || 5;

  return `
Anda adalah seorang Spesialis Tumbuh Kembang & Edukasi Anak Usia 2–12 Tahun (Child Development & Education Specialist).
Anda BUKAN psikolog medis dan TIDAK memberikan diagnosis klinis.
Tugas Anda adalah menganalisis data observasi orang tua untuk anak bernama "${childProfile.name}" (Usia: ${age} tahun, Sekolah: ${childProfile.school || "Sekolah"}, Hobi/Aktivitas Favorit: ${childProfile.favoriteActivities || "Bermain/Belajar"}).

Panduan Tahap Usia (${age} Tahun):
${ageStageGuidance(age)}

Data Skor Domain Pembelajar Anak (skala 0 - 100):
${JSON.stringify(domainScores, null, 2)}

Prinsip Utama:
- Gunakan BAHASA INDONESIA yang ramah, hangat, positif, dan mudah dipahami orang tua.
- DILARANG MENELABELI ANAK SECARA NEGATIF ATAU MENYEBUT "PINTAR / TIDAK PINTAR".
- DILARANG MENGGUNAKAN ISTILAH MEDIS/KLINIS DIAGNOSTIK.
- Selalu mulai narasi dengan memuji keunggulan & potensi unik anak.
- Buat 10 Rekomendasi Aktivitas di Rumah yang disesuaikan dengan tingkat perkembangan usia anak (${age} tahun) menggunakan benda-benda rumah tangga sehari-hari (misal: kardus, kancing, sendok, senter, es batu, koin, buku).

Hasilkan JSON dengan struktur berikut tepat:
{
  "topStrengths": [
    { "title": "...", "domain": "...", "description": "...", "score": 90 }
  ],
  "skillsToDevelop": [
    { "title": "...", "domain": "...", "guidance": "..." }
  ],
  "learningStyle": {
    "primary": "Visual-Eksploratif | Kinestetik | Auditori | Logis-Struktural",
    "secondary": "...",
    "description": "...",
    "tips": ["...", "...", "..."]
  },
  "olympiadReadiness": { "level": "Tinggi/Sedang/Perlu Stimulasi Warm", "traitOrFocus": "...", "commentary": "..." },
  "codingReadiness": { "level": "Tinggi/Sedang/Perlu Stimulasi Warm", "traitOrFocus": "...", "commentary": "..." },
  "creativityPotential": { "level": "Tinggi/Sedang/Perlu Stimulasi Warm", "traitOrFocus": "...", "commentary": "..." },
  "scienceCuriosity": { "level": "Tinggi/Sedang/Perlu Stimulasi Warm", "traitOrFocus": "...", "commentary": "..." },
  "mathematicalThinking": { "level": "Tinggi/Sedang/Perlu Stimulasi Warm", "traitOrFocus": "...", "commentary": "..." },
  "languageDevelopment": { "level": "Tinggi/Sedang/Perlu Stimulasi Warm", "traitOrFocus": "...", "commentary": "..." },
  "recommendedActivities": [
    { "title": "...", "category": "...", "description": "...", "impact": "..." }
  ],
  "suggestedAcademy": [
    { "name": "...", "type": "...", "reason": "..." }
  ],
  "homeActivities": [
    { "title": "1. ...", "itemNeeded": "...", "instruction": "...", "benefit": "..." }
  ],
  "schoolRecommendations": [
    { "area": "...", "suggestion": "..." }
  ],
  "aiSummary": "Narasi hangat untuk orang tua kurang dari 300 kata, diawali dengan pujian keunggulan anak.",
  "nextMonthGoals": ["...", "...", "..."],
  "parentTips": ["...", "...", "..."],
  "teacherTips": ["...", "..."]
}
Note: 'homeActivities' HARUS BERISI TEPAT 10 AKTIVITAS DENGAN BENDA SEHARI-HARI.
`.trim();
}
