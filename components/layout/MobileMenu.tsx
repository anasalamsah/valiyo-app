"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";
import { ecosystemProducts } from "@/config/ecosystem";
import { AuthButton } from "@/components/ui/AuthButton";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full text-text"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-bg">
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-xl font-semibold text-primary">
              Valiyo
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-text"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col gap-8 px-6 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Products
              </p>
              <div className="mt-3 flex flex-col gap-4">
                {ecosystemProducts.map((product) => {
                  const isLinkable = product.href.startsWith("/");
                  return isLinkable ? (
                    <Link
                      key={product.id}
                      href={product.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-text"
                    >
                      {product.name}
                    </Link>
                  ) : (
                    <span
                      key={product.id}
                      className="text-base font-medium text-text-muted"
                    >
                      {product.name}{" "}
                      <span className="text-xs">({product.statusLabel})</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-text"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
