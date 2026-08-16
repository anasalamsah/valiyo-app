import { SectionHeader } from "@/components/ui/SectionHeader";

const concepts = [
  {
    emoji: "🌱",
    title: "Learn",
    description: "Build knowledge through experiences designed to stick.",
  },
  {
    emoji: "🧭",
    title: "Discover",
    description: "Understand strengths, style, and where to go next.",
  },
  {
    emoji: "🛠️",
    title: "Build",
    description: "Turn understanding into real, practical skill.",
  },
  {
    emoji: "🚀",
    title: "Grow",
    description: "Keep moving forward, at every stage of life.",
  },
] as const;

export function WhatIsValiyo() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="What is Valiyo?"
        title="A digital learning platform for every stage of growth."
        description="Valiyo supports people at different stages of learning and growth — from children discovering how they learn, to students, teachers, and professionals using technology to learn and work smarter."
        align="center"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((concept) => (
          <div
            key={concept.title}
            className="rounded-[24px] bg-surface p-6 text-center shadow-sm shadow-black/5"
          >
            <span className="text-2xl" aria-hidden="true">
              {concept.emoji}
            </span>
            <p className="mt-3 font-display text-base font-semibold text-text">
              {concept.title}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {concept.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
