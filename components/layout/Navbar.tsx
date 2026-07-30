import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";
import { AuthButton } from "@/components/ui/AuthButton";
import { AdminNavLink } from "@/components/layout/AdminNavLink";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl font-semibold text-primary">
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-text md:flex">
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

        <div className="flex items-center gap-5">
          <AdminNavLink />
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}
