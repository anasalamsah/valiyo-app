import type { Category, Level } from "@/types/learnAcademy";

export function QuizProgressBar({
  current,
  total,
  childName,
  level,
  category,
}: {
  current: number;
  total: number;
  childName: string;
  level: Level;
  category: Category;
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="mb-5 flex w-full flex-col">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-border bg-surface px-5 py-3 shadow-sm shadow-black/5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-grow-bg text-2xl">
            🧒
          </div>
          <div>
            <div className="max-w-[150px] truncate text-base font-extrabold leading-tight text-text sm:max-w-[200px]" title={childName}>
              {childName}
            </div>
            <div className="text-xs font-bold text-text-muted">
              Level: <span className="font-extrabold text-primary">{level}</span>
            </div>
          </div>
        </div>

        <div className="hidden text-center sm:block">
          <div className="flex items-center justify-center gap-1 font-display text-lg font-extrabold text-text">
            🏆 {category}
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between px-2 text-xs font-extrabold text-text-muted sm:text-sm">
        <span>
          Soal {current} dari {total}
        </span>
        <span>{percentage}% Selesai</span>
      </div>

      <div className="h-5 w-full overflow-hidden rounded-[10px] border-4 border-white bg-border">
        <div
          className="h-full rounded-[10px] bg-gradient-to-r from-secondary to-accent transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
