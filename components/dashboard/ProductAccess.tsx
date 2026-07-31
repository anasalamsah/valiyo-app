"use client";

import { Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { hasProductAccess } from "@/lib/firestore/access";
import { cn } from "@/lib/utils/cn";
import { PRODUCT_URLS } from "@/config/products";
import type { ProductId } from "@/types/access";

const PRODUCT_META: Record<
  ProductId,
  { label: string; emoji: string; description: string; href: string }
> = {
  learn: {
    label: "Learn",
    emoji: "📚",
    description: "Coding, AI and future-ready skills, paced for your child.",
    href: PRODUCT_URLS.learn,
  },
  discovery: {
    label: "Discovery",
    emoji: "🧠",
    description: "Understand your child's strengths and learning style.",
    href: PRODUCT_URLS.discovery,
  },
};

export function ProductAccess() {
  const { access, profile, profileLoading } = useAuth();

  return (
    <section className="rounded-[28px] bg-surface p-6 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Purchased products
      </p>
      <h2 className="mt-1 font-display text-lg font-semibold text-text">
        What&rsquo;s unlocked for your family
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {(Object.keys(PRODUCT_META) as ProductId[]).map((productId) => {
          const meta = PRODUCT_META[productId];
          const unlocked = hasProductAccess(access, profile, productId);

          return (
            <div
              key={productId}
              className={cn(
                "rounded-2xl border p-5",
                unlocked ? "border-accent/40 bg-bg" : "border-border bg-bg/60"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl" aria-hidden="true">
                  {meta.emoji}
                </span>
                {unlocked ? (
                  <span className="flex items-center gap-1 rounded-pill bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    <Sparkles size={10} /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-pill bg-black/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    <Lock size={10} /> Locked
                  </span>
                )}
              </div>

              <p className="mt-3 font-display text-base font-semibold text-text">
                {meta.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {meta.description}
              </p>

              {unlocked ? (
                <a
                  href={meta.href}
                  className="mt-4 inline-block text-xs font-semibold text-primary hover:text-primary-hover"
                >
                  Open Product →
                </a>
              ) : (
                <UpgradeCta productLabel={meta.label} />
              )}
            </div>
          );
        })}
      </div>

      {profileLoading && (
        <p className="mt-4 text-xs text-text-muted">Checking your access…</p>
      )}
    </section>
  );
}

function UpgradeCta({ productLabel }: { productLabel: string }) {
  return (
    <div className="mt-4">
      <button
        type="button"
        disabled
        title="Checkout isn't connected yet"
        className="inline-flex items-center gap-1.5 rounded-pill bg-secondary/70 px-3 py-1.5 text-xs font-semibold text-text/70 cursor-not-allowed"
      >
        <Lock size={11} /> Unlock Access
      </button>
      <p className="mt-1.5 text-[11px] text-text-muted">
        {productLabel} isn&rsquo;t active on this account yet.
      </p>
    </div>
  );
}
