import { cn } from "@/lib/utils/cn";
import type { EcosystemStatus } from "@/types/ecosystem";

const statusStyles: Record<EcosystemStatus, string> = {
  live: "bg-accent/15 text-[#1f7a6c]",
  "coming-soon": "bg-black/5 text-text-muted",
  b2b: "bg-secondary/25 text-[#7a5e00]",
};

export function EcosystemStatusBadge({
  status,
  children,
}: {
  status: EcosystemStatus;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-pill px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
        statusStyles[status]
      )}
    >
      {children}
    </span>
  );
}
