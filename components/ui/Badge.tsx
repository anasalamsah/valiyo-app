import { cn } from "@/lib/utils/cn";
import type { JourneyStatus } from "@/types/journey";

const statusStyles: Record<JourneyStatus, string> = {
  start: "text-accent",
  next: "text-accent",
  soon: "text-text-muted",
};

export function StatusBadge({
  status,
  children,
  className,
}: {
  status: JourneyStatus;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[11px] font-bold uppercase tracking-wider",
        statusStyles[status],
        className
      )}
    >
      {children}
    </span>
  );
}
