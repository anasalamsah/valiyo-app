import { journeySteps } from "@/config/journey";
import { StatusBadge } from "@/components/ui/Badge";
import { JourneyCardCta } from "@/components/home/JourneyCardCta";

export function JourneyCards() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Start your journey
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-text sm:text-4xl">
        Every child grows differently.
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {journeySteps.map((step) => {
          const isComingSoon = step.status === "soon";
          return (
            <div
              key={step.id}
              className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5"
            >
              <StatusBadge status={step.status}>
                {step.status === "start"
                  ? "Start here"
                  : step.status === "next"
                    ? "Next step"
                    : "Coming soon"}
              </StatusBadge>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  {step.emoji}
                </span>
                <h3 className="font-display text-lg font-semibold text-text">
                  {step.label}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>

              {isComingSoon ? (
                <span className="mt-5 inline-block text-sm font-semibold text-text-muted">
                  {step.ctaLabel}
                </span>
              ) : (
                <JourneyCardCta step={step} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
