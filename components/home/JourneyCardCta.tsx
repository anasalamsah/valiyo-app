"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import type { JourneyStep } from "@/types/journey";
import type { ProductId } from "@/types/access";

const PRODUCT_STEP_IDS: readonly string[] = ["learn", "discovery"];

function isProductStep(id: string): id is ProductId {
  return PRODUCT_STEP_IDS.includes(id);
}

/**
 * Renders the CTA for a non-"coming soon" journey step. For the two real
 * products (learn/discovery), this is the actual fix for "granted Learn
 * only, but Discovery was still reachable from the homepage": the plain
 * `<a>` that used to render here had no idea who was signed in or what
 * they'd been granted, so PRODUCT_URLS.discovery was just as clickable as
 * PRODUCT_URLS.learn regardless of entitlement.
 *
 * A signed-out visitor still sees a normal marketing link (we can't know
 * their entitlement before they've signed in, and the products describe
 * themselves fine to a prospective customer). Once someone IS signed in,
 * a product they don't have access to renders as a locked, non-clickable
 * label instead.
 */
export function JourneyCardCta({ step }: { step: JourneyStep }) {
  const { user, access, profile } = useAuth();

  if (isProductStep(step.id) && user && !hasProductAccess(access, profile, step.id)) {
    return (
      <span
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted"
        title={`${step.label} isn't included in your account yet`}
      >
        <Lock size={13} /> Locked
      </span>
    );
  }

  const className = "mt-5 inline-block text-sm font-semibold text-primary transition-colors hover:text-primary-hover";

  // Discovery is now an internal route; Learn is still an external
  // subdomain until it's migrated too — use client-side navigation for
  // the former, a plain anchor for the latter.
  if (step.href.startsWith("/")) {
    return (
      <Link href={step.href} className={className}>
        {step.ctaLabel}
      </Link>
    );
  }

  return (
    <a href={step.href} className={className}>
      {step.ctaLabel}
    </a>
  );
}
