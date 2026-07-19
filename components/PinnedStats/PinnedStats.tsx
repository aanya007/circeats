"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Button from "../ui/Button";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { pinnedStats, pinnedStatsSource, BigStat } from "@/lib/data/stats";
import styles from "./PinnedStats.module.css";

function BigStatItem({ stat, start }: { stat: BigStat; start: boolean }) {
  const value = useCountUp(stat.target, start, {
    suffix: stat.suffix,
  });
  return (
    <div className={styles.bigStat}>
      <div className={`mono-stat ${styles.num}`}>
        {stat.prefix && (
          <span
            className={stat.prefix === "=" ? styles.eqPrefix : undefined}
          >
            {stat.prefix}
          </span>
        )}
        {value}
      </div>
      <div className={styles.label}>{stat.label}</div>
    </div>
  );
}

export default function PinnedStats() {
  const contentRef = useRef<HTMLDivElement>(null);
  // once:true = counts up a single time, never re-triggers (wireframe behavior)
  const start = useInView(contentRef, { once: true, amount: 0.5 });

  return (
    <div className={styles.pinWrapper}>
      <div className={styles.pinContent} ref={contentRef}>
        <div className={`eyebrow ${styles.eyebrow}`}>
          Compared to throwing it away
        </div>
        <div className={styles.statsRow}>
          {pinnedStats.map((s) => (
            <BigStatItem key={s.label} stat={s} start={start} />
          ))}
        </div>
        <Button variant="lime">Join the rescue</Button>
        <div className={styles.src}>{pinnedStatsSource}</div>
      </div>
    </div>
  );
}
