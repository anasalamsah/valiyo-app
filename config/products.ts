/**
 * Canonical URLs for Valiyo's external product apps. Learn and Discovery
 * are separate deployments on their own subdomains — every CTA that opens
 * either product should point here rather than hardcoding the URL.
 */
export const PRODUCT_URLS = {
  learn: "https://learn.valiyo.id",
  discovery: "https://discovery.valiyo.id",
} as const;
