/**
 * Canonical URLs for Valiyo's products.
 *
 * Both now point to internal routes — Discovery's full flow (M3-M7) is
 * complete; Learn's academy browsing (child picker → 8 academies →
 * mission list) is live, though actual mission gameplay is still
 * "Segera Hadir" pending the quiz/coding-quest engine milestone. Neither
 * points at an external subdomain anymore.
 */
export const PRODUCT_URLS = {
  learn: "/learn",
  discovery: "/discovery",
} as const;
