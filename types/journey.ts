export type JourneyStatus = "start" | "next" | "soon";

export type JourneyStep = {
  id: string;
  slug: string;
  emoji: string;
  label: string;
  eyebrow: string;
  description: string;
  status: JourneyStatus;
  ctaLabel: string;
  href: string;
};

export type GrowPillar = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
};
