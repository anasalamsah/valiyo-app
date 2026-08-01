import { Compass } from "lucide-react";
import type { LearningStyleInfo } from "@/types/discoveryAssessment";

export function LearningStyleCard({ style }: { style: LearningStyleInfo }) {
  return (
    <div className="rounded-[28px] bg-grow-bg p-7">
      <div className="flex items-center gap-2 text-primary">
        <Compass size={16} />
        <p className="text-xs font-bold uppercase tracking-wider">Gaya Belajar</p>
      </div>
      <p className="mt-2 font-display text-lg font-semibold text-text">
        {style.primary} <span className="text-sm font-normal text-text-muted">+ {style.secondary}</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text">{style.description}</p>
      {style.tips?.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {style.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
