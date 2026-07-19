"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface CountUpOptions {
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/**
 * Counts from 0 to `target` with cubic-out easing once `start` becomes true.
 * Mirrors the wireframe's animateStats(): eased = 1 - (1-p)^3 over 1800ms,
 * formatted with toLocaleString() plus prefix/suffix.
 */
export function useCountUp(
  target: number,
  start: boolean,
  { prefix = "", suffix = "", duration = 1800 }: CountUpOptions = {}
): string {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);

  return prefix + value.toLocaleString() + suffix;
}
