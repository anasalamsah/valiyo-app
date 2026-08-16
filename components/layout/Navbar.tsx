import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";
import { AuthButton } from "@/components/ui/AuthButton";
import { AdminNavLink } from "@/components/layout/AdminNavLink";
import { ProductsMegaMenu } from "@/components/layout/ProductsMegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl font-semibold text-primary">
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-text md:flex">
          <li>
            <ProductsMegaMenu />
          </li>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-5 md:flex">
            <AdminNavLink />
            <AuthButton />
          </div>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}