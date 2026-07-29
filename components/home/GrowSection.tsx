import { growPillars } from "@/config/journey";

export function GrowSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-[32px] bg-grow-bg px-8 py-14 sm:px-14">
        <h2 className="max-w-lg font-display text-3xl font-semibold text-text sm:text-4xl">
          A journey designed to grow with them.
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {growPillars.map((pillar) => (
            <div key={pillar.id}>
              <span className="text-xl" aria-hidden="true">
                {pillar.emoji}
              </span>
              <p className="mt-3 font-semibold text-text">{pillar.title}</p>
              <p className="mt-1 text-sm text-text-muted">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
