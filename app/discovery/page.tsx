import Link from "next/link";
import { Suspense } from "react";
import { History } from "lucide-react";
import { DiscoveryGate } from "@/components/discovery/DiscoveryGate";

export default function DiscoveryPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex justify-end">
        <Link
          href="/discovery/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted transition-colors hover:text-primary"
        >
          <History size={13} /> Riwayat Penilaian
        </Link>
      </div>
      <Suspense
        fallback={<div className="h-64 animate-pulse rounded-[28px] bg-surface shadow-sm shadow-black/5" />}
      >
        <DiscoveryGate />
      </Suspense>
    </div>
  );
}
