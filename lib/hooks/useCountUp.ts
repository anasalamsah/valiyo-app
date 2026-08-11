"use client";

import { useEffect, useState } from "react";

/**
 * Animates a number counting up from 0 to `target` over `durationMs`,
 * eased out (fast start, gentle settle). Pure React state +
 * requestAnimationFrame — no animation library needed beyond what's
 * already used elsewhere (framer-motion animates transforms/opacity well,
 * but doesn't have a built-in "animate this number's text content"
 * primitive, so this small hook fills that specific gap).
 *
 * Re-runs whenever `target` changes, so it's safe to reuse across
 * remounts (e.g. a fresh result screen after "Main Lagi").
 */
export function useCountUp(target: number, durationMs: number = 900): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target <= 0) return; // nothing to animate — avoid a synchronous setState in the effect

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return target <= 0 ? 0 : value;
}
