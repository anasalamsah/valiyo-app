"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const ADMIN_NAV = [{ label: "Grant Access", href: "/admin/access" }];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="rounded-[28px] bg-surface p-4 shadow-sm shadow-black/5">
        <p className="px-2 text-xs font-bold uppercase tracking-wider text-primary">
          Admin
        </p>
        <nav className="mt-3 space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-grow-bg text-primary"
                    : "text-text-muted hover:bg-black/5 hover:text-text"
                )}
              >
                <ShieldCheck size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
