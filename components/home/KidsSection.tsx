import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LearnIllustration } from "@/components/home/LearnIllustration";
import { DiscoveryIllustration } from "@/components/home/DiscoveryIllustration";
import { PRODUCT_URLS } from "@/config/products";

const learnHighlights = [
  "Age 2–12",
  "Educational games",
  "Interactive missions",
  "Logic and problem solving",
  "Reward and progression system",
];

const discoveryHighlights = [
  "Potential exploration",
  "Learning style",
  "Development areas",
  "Parent insights",
  "Recommended activities",
];

export function KidsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="Live today"
        title="Valiyo Kids"
        description="Learning that feels like an adventure."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Valiyo Learn */}
        <div className="flex flex-col overflow-hidden rounded-[28px] bg-surface shadow-sm shadow-black/5">
          <div className="p-5 pb-0">
            <LearnIllustration />
          </div>
          <div className="flex flex-1 flex-col p-7">
            <h3 className="font-display text-xl font-semibold text-text">
              Valiyo Learn
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Game edukasi &amp; latihan olimpiade yang bikin anak ketagihan
              belajar.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {learnHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-text-muted"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={PRODUCT_URLS.learn}
              className="mt-6 inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Explore Learn
            </Link>
          </div>
        </div>

        {/* Valiyo Discovery */}
        <div className="flex flex-col overflow-hidden rounded-[28px] bg-surface shadow-sm shadow-black/5">
          <div className="p-5 pb-0">
            <DiscoveryIllustration />
          </div>
          <div className="flex flex-1 flex-col p-7">
            <h3 className="font-display text-xl font-semibold text-text">
              Valiyo Discovery
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Kenali potensi unik anak.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {discoveryHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-text-muted"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={PRODUCT_URLS.discovery}
              className="mt-6 inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Explore Discovery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
