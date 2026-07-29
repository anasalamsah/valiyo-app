import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#f6f0e2]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {siteConfig.name} — {siteConfig.tagline}
        </p>
        <p>A long-term companion for growing futures.</p>
      </div>
    </footer>
  );
}
