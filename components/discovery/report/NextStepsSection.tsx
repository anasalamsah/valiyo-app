import { Heart, Target } from "lucide-react";

export function NextStepsSection({
  nextMonthGoals,
  parentTips,
}: {
  nextMonthGoals: string[];
  parentTips: string[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-primary">
          <Target size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">
            Target Eksplorasi Bulan Depan
          </p>
        </div>
        <ul className="mt-4 space-y-2.5">
          {nextMonthGoals?.map((goal, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-text"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-grow-bg text-[10px] font-bold text-primary">
                {i + 1}
              </span>
              {goal}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-secondary">
          <Heart size={16} />
          <p className="text-xs font-bold uppercase tracking-wider">
            Tips Parenting Mendukung Talenta
          </p>
        </div>
        <ul className="mt-4 space-y-2.5">
          {parentTips?.map((tip, i) => (
            <li
              key={i}
              className="rounded-2xl border border-border bg-bg px-4 py-3 text-sm text-text"
            >
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
