"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { journeySteps } from "@/config/journey";

export function JourneyNav() {
  const [activeId, setActiveId] = useState(journeySteps[0].id);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-col gap-4 rounded-[28px] bg-surface px-6 py-5 shadow-sm shadow-black/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg" aria-hidden="true">
            🌱
          </span>
          <div>
            <p className="font-display text-base font-semibold text-text">Journey</p>
            <p className="text-xs text-text-muted">A calm path, growing step by step.</p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Journey steps"
          className="flex flex-wrap items-center gap-5"
        >
          {journeySteps.map((step) => {
            const isActive = step.id === activeId;
            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(step.id)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-text-muted hover:text-text"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full border",
                    isActive
                      ? "border-primary bg-primary"
                      : "border-text-muted/50 bg-transparent"
                  )}
                  aria-hidden="true"
                />
                {step.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
