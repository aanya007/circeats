"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { heroStats } from "@/lib/data/stats";
import styles from "./ImpactBand.module.css";

export default function ImpactBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.inner, inView ? styles.inView : ""].join(" ")}
      >
        <div className={`eyebrow ${styles.eyebrow}`}>
          The problem you&apos;re sitting on
        </div>
        <h2 className={`display ${styles.heading}`}>
          755,000 TONNES A YEAR.
          <br />
          <span className={styles.lime}>SOMEONE HAS TO MOVE FIRST.</span>
        </h2>
        <div className={styles.statsRow}>
          {heroStats.map((s) => (
            <div className={styles.stat} key={s.label}>
              <div className={`mono-stat ${styles.num}`}>{s.value}</div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
