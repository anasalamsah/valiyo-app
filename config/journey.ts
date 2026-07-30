import type { GrowPillar, JourneyStep } from "@/types/journey";
import { PRODUCT_URLS } from "@/config/products";

export const journeySteps: JourneyStep[] = [
  {
    id: "discovery",
    slug: "discovery",
    emoji: "🧠",
    label: "Discovery",
    eyebrow: "Start here",
    description:
      "Understand your child's learning profile before starting their learning journey.",
    status: "start",
    ctaLabel: "Open Discovery",
    href: PRODUCT_URLS.discovery,
  },
  {
    id: "learn",
    slug: "learn",
    emoji: "📚",
    label: "Learn",
    eyebrow: "Next step",
    description: "Build coding and AI skills through personalized learning.",
    status: "next",
    ctaLabel: "Open Learn",
    href: PRODUCT_URLS.learn,
  },
  {
    id: "ai-tutor",
    slug: "ai-tutor",
    emoji: "🤖",
    label: "AI Tutor",
    eyebrow: "Coming soon",
    description: "A gentle guide for learning moments, arriving soon.",
    status: "soon",
    ctaLabel: "Coming soon",
    href: "#",
  },
  {
    id: "parent-hub",
    slug: "parent-hub",
    emoji: "👨‍👩‍👧",
    label: "Parent Hub",
    eyebrow: "Coming soon",
    description: "A calm home for context, progress and next steps.",
    status: "soon",
    ctaLabel: "Coming soon",
    href: "#",
  },
];

export const growPillars: GrowPillar[] = [
  {
    id: "understand",
    emoji: "🌱",
    title: "Understand",
    description: "The starting point.",
  },
  {
    id: "discover",
    emoji: "🧠",
    title: "Discover",
    description: "See their profile.",
  },
  {
    id: "learn-grow",
    emoji: "📚",
    title: "Learn → Grow",
    description: "Build skills, over time.",
  },
];
