import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    emoji: "🧭",
    title: "Choose Your Journey",
    description: "Find the Valiyo experience that fits your needs.",
  },
  {
    number: "02",
    emoji: "🌱",
    title: "Learn & Explore",
    description: "Interact with content designed for your learning journey.",
  },
  {
    number: "03",
    emoji: "🚀",
    title: "Grow",
    description: "Build knowledge, confidence, skills, and understanding.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="How it works"
        title="Three simple steps."
        align="center"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-[28px] bg-surface p-7 text-center shadow-sm shadow-black/5"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Step {step.number}
            </span>
            <div className="mt-3 text-3xl" aria-hidden="true">
              {step.emoji}
            </div>
            <p className="mt-3 font-display text-base font-semibold text-text">
              {step.title}
            </p>
            <p className="mt-1 text-sm text-text-muted">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
