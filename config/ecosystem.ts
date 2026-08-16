import type { EcosystemProduct } from "@/types/ecosystem";

/**
 * The 5 Valiyo product lines shown on the homepage "Ecosystem" section.
 *
 * Only Valiyo Kids is live today (Learn + Discovery, both real routes —
 * see config/products.ts). The rest are not built yet; per the brief,
 * they must never be presented as already available. `status` drives the
 * badge and whether the CTA is a real link or a disabled label.
 */
export const ecosystemProducts: EcosystemProduct[] = [
  {
    id: "kids",
    name: "Valiyo Kids",
    tagline: "Learn, play, and discover potential.",
    status: "live",
    statusLabel: "Live",
    ctaLabel: "Explore Kids",
    href: "/learn",
    subProducts: ["Valiyo Learn", "Valiyo Discovery"],
  },
  {
    id: "students",
    name: "Valiyo Students",
    tagline: "Use AI to support study and career preparation.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    ctaLabel: "Coming Soon",
    href: "#",
  },
  {
    id: "skill",
    name: "Valiyo Skill",
    tagline: "Build practical digital skills for work and beyond.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    ctaLabel: "Coming Soon",
    href: "#",
  },
  {
    id: "teacher",
    name: "Valiyo Teacher",
    tagline: "Your digital assistant for everyday school administration.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    ctaLabel: "Coming Soon",
    href: "#",
  },
  {
    id: "ai-future-lab",
    name: "Valiyo AI Future Lab",
    tagline: "AI programs and solutions for schools and organizations.",
    status: "b2b",
    statusLabel: "B2B",
    ctaLabel: "Explore AI Future Lab",
    href: "#",
  },
];
