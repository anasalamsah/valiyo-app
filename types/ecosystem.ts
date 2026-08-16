/**
 * Types for the homepage's "Valiyo Ecosystem" section — the 5 product
 * lines (Kids, Students, Skill, Teacher, AI Future Lab).
 *
 * Deliberately separate from `types/journey.ts` (`JourneyStep`,
 * `JourneyStatus`). That type powers the existing, auth-aware Kids
 * journey (Discovery → Learn → …) via `JourneyCardCta`, which checks
 * product entitlement for signed-in users. The ecosystem cards below are
 * pure marketing/navigation — no auth gating, no entitlement check — so
 * reusing `JourneyStatus` would either force unrelated statuses into that
 * enum or risk `JourneyCardCta`'s locked-state logic firing for products
 * that don't have entitlements at all (Students, Skill, Teacher).
 */
export type EcosystemStatus = "live" | "coming-soon" | "b2b";

export type EcosystemProduct = {
  id: string;
  name: string;
  tagline: string;
  status: EcosystemStatus;
  statusLabel: string;
  ctaLabel: string;
  href: string;
  /** Sub-products shown as small chips on the card, e.g. Kids -> Learn, Discovery */
  subProducts?: string[];
};
