import { Sparkles } from "lucide-react";

export function AnalyzingStep() {
  return (
    <div className="rounded-[28px] bg-surface p-10 text-center shadow-sm shadow-black/5">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-grow-bg text-primary">
        <Sparkles size={20} className="animate-pulse" />
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-text">
        Menganalisis jawaban…
      </p>
      <p className="mt-2 text-sm text-text-muted">
        AI sedang menyusun laporan personal. Biasanya butuh beberapa detik.
      </p>
      <div className="mx-auto mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-border">
        <div className="h-full w-1/2 animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-primary" />
      </div>
    </div>
  );
}
