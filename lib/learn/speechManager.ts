/**
 * Simplified port of the (now-retired) external Learn app's speech.ts.
 *
 * The original had a 3-tier fallback: local Indonesian browser voice →
 * Gemini Cloud TTS (via a /api/tts endpoint) → disabled. That endpoint
 * was never included in what was exported to this project, so rather
 * than fabricate a new Gemini-TTS server route that wasn't asked for,
 * this keeps tiers 1 and 3 exactly as designed: use a real local
 * Indonesian voice if the browser has one, otherwise disable narration
 * — never fall back to an English/wrong-accent voice.
 */

export function cleanTextForSpeech(text: string): string {
  let cleaned = text;

  cleaned = cleaned.replace(/\+/g, " tambah ");
  cleaned = cleaned.replace(/ - /g, " kurang ");
  cleaned = cleaned.replace(/=/g, " sama dengan ");
  cleaned = cleaned.replace(/×/g, " kali ");
  cleaned = cleaned.replace(/÷/g, " bagi ");
  cleaned = cleaned.replace(/1\/2/g, "satu per dua");
  cleaned = cleaned.replace(/1\/4/g, "satu per empat");
  cleaned = cleaned.replace(/\bTK A\b/g, "Teka A");
  cleaned = cleaned.replace(/\bTK B\b/g, "Teka B");

  cleaned = cleaned.replace(/=\s*\.\.\.\?/g, "sama dengan berapa?");
  cleaned = cleaned.replace(/=\s*\.\.\./g, "sama dengan berapa");

  const hasQuestionWord = /(berapa|mana|manakah|siapa|apa|kapan|mengapa|kenapa)/i.test(cleaned);
  if (hasQuestionWord) {
    cleaned = cleaned.replace(/\.\.\.\?/g, "?");
    cleaned = cleaned.replace(/\.\.\./g, "");
  } else {
    cleaned = cleaned.replace(/\.\.\.\?/g, " apa?");
    cleaned = cleaned.replace(/\.\.\./g, " apa");
  }

  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return cleaned;
}

function getIndonesianVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const idVoice = voices.find((v) => {
    const lang = (v.lang || "").toLowerCase().replace("_", "-");
    const name = (v.name || "").toLowerCase();
    const isIndonesianLang = lang === "id-id" || lang === "id" || lang.startsWith("id-");
    const isIndonesianName =
      name.includes("indonesi") ||
      name.includes("bahasa") ||
      name.includes("gadis") ||
      name.includes("damayanti") ||
      name.includes("ardi");
    return isIndonesianLang || isIndonesianName;
  });

  return idVoice || null;
}

class SpeechManager {
  private currentPlayingId: string | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  public speak(
    id: string,
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (msg?: string) => void
  ) {
    if (this.currentPlayingId === id) {
      this.stop();
      onEnd?.();
      return;
    }
    this.stop();

    const voice = getIndonesianVoice();
    if (!voice || typeof window === "undefined" || !("speechSynthesis" in window)) {
      onError?.("Suara Bahasa Indonesia tidak tersedia di perangkat ini.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(text));
    utterance.voice = voice;
    utterance.lang = voice.lang || "id-ID";
    utterance.rate = 0.85;
    utterance.pitch = 1.08;

    utterance.onstart = () => {
      this.currentPlayingId = id;
      onStart?.();
    };
    utterance.onend = () => {
      this.currentPlayingId = null;
      onEnd?.();
    };
    utterance.onerror = () => {
      this.currentPlayingId = null;
      onError?.();
    };

    this.currentPlayingId = id;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.currentPlayingId = null;
  }
}

export const speechManager = new SpeechManager();
