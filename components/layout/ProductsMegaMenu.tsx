"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ecosystemProducts } from "@/config/ecosystem";
import { EcosystemStatusBadge } from "@/components/home/EcosystemStatusBadge";

export function ProductsMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex items-center gap-1 text-sm font-medium text-text transition-colors hover:text-primary"
      >
        Products
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 rounded-[24px] border border-border bg-surface p-4 shadow-lg shadow-black/10">
          <div className="grid grid-cols-2 gap-2">
            {ecosystemProducts.map((product) => {
              const isLinkable = product.href.startsWith("/");
              const content = (
                <div className="rounded-2xl p-3 transition-colors hover:bg-bg">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-sm font-semibold text-text">
                      {product.name}
                    </p>
                    <EcosystemStatusBadge status={product.status}>
                      {product.statusLabel}
                    </EcosystemStatusBadge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {product.tagline}
                  </p>
                </div>
              );

              return isLinkable ? (
                <Link
                  key={product.id}
                  href={product.href}
                  onClick={() => setIsOpen(false)}
                >
                  {content}
                </Link>
              ) : (
                <div key={product.id}>{content}</div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
