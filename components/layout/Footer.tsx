import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";
import { ecosystemProducts } from "@/config/ecosystem";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#f6f0e2]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-primary">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-[220px] text-sm text-text-muted">
              Digital learning experiences for every stage of growth.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-text">
              <li>
                <Link href="#products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Products
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-text">
              {ecosystemProducts.map((product) => {
                const isLinkable = product.href.startsWith("/");
                return (
                  <li key={product.id}>
                    {isLinkable ? (
                      <Link href={product.href} className="hover:text-primary">
                        {product.name}
                      </Link>
                    ) : (
                      <span className="text-text-muted">{product.name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Connect
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-text">
              <li>
                <a
                  href="https://instagram.com/valiyo.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  Instagram — @valiyo.id
                </a>
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-text-muted">
          <p>
            {siteConfig.name} — {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
