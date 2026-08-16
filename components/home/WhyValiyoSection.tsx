import { SectionHeader } from "@/components/ui/SectionHeader";

const pillars = [
  {
    number: "01",
    title: "Child-Centered",
    description: "Designed around how people actually learn.",
  },
  {
    number: "02",
    title: "Interactive",
    description:
      "Learning experiences should encourage curiosity and participation.",
  },
  {
    number: "03",
    title: "Personal",
    description: "Different learners need different approaches.",
  },
  {
    number: "04",
    title: "Technology with Purpose",
    description:
      "Technology is used to make learning more useful, accessible, and engaging.",
  },
] as const;

export function WhyValiyoSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader eyebrow="Why Valiyo" title="Why Valiyo?" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <div key={pillar.number}>
            <span className="font-display text-2xl font-semibold text-primary/30">
              {pillar.number}
            </span>
            <p className="mt-2 font-display text-base font-semibold text-text">
              {pillar.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
