import { Lock } from "lucide-react";

type LockedSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function LockedSection({ eyebrow, title, description }: LockedSectionProps) {
  return (
    <section className="rounded-[28px] border border-dashed border-border bg-surface/60 p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
      <div className="mt-3 flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-text-muted">
          <Lock size={14} />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-text">{title}</h2>
          <p className="mt-1 text-sm text-text-muted">{description}</p>
          <button
            type="button"
            disabled
            title="Checkout isn't connected yet"
            className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-secondary/70 px-3 py-1.5 text-xs font-semibold text-text/70 cursor-not-allowed"
          >
            Upgrade to unlock
          </button>
        </div>
      </div>
    </section>
  );
}
