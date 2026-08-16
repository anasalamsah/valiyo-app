import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Placeholder structure for testimonials / partner logos / usage stats.
 * No numbers, quotes, or logos are fabricated here — per the brief, this
 * stays an empty, clean shell until real, verified social proof exists
 * in the product. Populate by replacing the placeholder cards below.
 */
export function SocialProofSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Growing together"
        title="Built with families, schools, and educators."
        align="center"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex h-40 items-center justify-center rounded-[28px] border border-dashed border-border bg-surface/50 text-sm text-text-muted"
          >
            Stories &amp; partners coming soon
          </div>
        ))}
      </div>
    </section>
  );
}
