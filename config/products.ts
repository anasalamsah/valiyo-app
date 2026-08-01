/**
 * Canonical URLs for Valiyo's products.
 *
 * - `discovery` now points to the internal `/discovery` route — the
 *   full observation-form → AI-analysis → report flow (M3-M5) is
 *   complete, so this replaces the old external discovery.valiyo.id.
 * - `learn` still points to the external subdomain. It hasn't been
 *   migrated into this app yet (planned for a later milestone) — do
 *   NOT change this to an internal path until /learn actually exists
 *   here, or this CTA will dead-end.
 */
export const PRODUCT_URLS = {
  learn: "https://learn.valiyo.id",
  discovery: "/discovery",
} as const;
