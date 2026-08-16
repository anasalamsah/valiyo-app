import Link from "next/link";
import { EcosystemStatusBadge } from "@/components/home/EcosystemStatusBadge";
import type { EcosystemProduct } from "@/types/ecosystem";

/**
 * A product isn't actually explorable yet unless it has a real internal
 * route. `href === "#"` covers both "coming-soon" and "b2b" products that
 * don't have a page built yet — rendering those as a plain label instead
 * of a dead link, so nothing on the homepage points at a page that
 * doesn't exist.
 */
export function ProductLineCard({ product }: { product: EcosystemProduct }) {
  const isLinkable = product.href.startsWith("/");

  return (
    <div className="flex h-full flex-col rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5 transition-transform duration-200 hover:-translate-y-1">
      <EcosystemStatusBadge status={product.status}>
        {product.statusLabel}
      </EcosystemStatusBadge>

      <h3 className="mt-4 font-display text-lg font-semibold text-text">
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {product.tagline}
      </p>

      {product.subProducts && product.subProducts.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {product.subProducts.map((sub) => (
            <span
              key={sub}
              className="rounded-pill bg-bg px-3 py-1 text-[11px] font-semibold text-text-muted"
            >
              {sub}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex-1" />

      {isLinkable ? (
        <Link
          href={product.href}
          className="inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          {product.ctaLabel}
        </Link>
      ) : (
        <span className="inline-block text-sm font-semibold text-text-muted">
          {product.ctaLabel}
        </span>
      )}
    </div>
  );
}
