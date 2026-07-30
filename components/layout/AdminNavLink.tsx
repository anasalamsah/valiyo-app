"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

/**
 * Small entry point into /admin/access, shown in the Navbar only for
 * signed-in users whose Firestore profile has role === "admin". Renders
 * nothing for everyone else (including while profile is still loading),
 * so this never flashes for regular parents.
 */
export function AdminNavLink() {
  const { profile } = useAuth();

  if (profile?.role !== "admin") return null;

  return (
    <Link
      href="/admin/access"
      className="hidden items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-primary md:flex"
    >
      <ShieldCheck size={16} />
      Admin
    </Link>
  );
}
