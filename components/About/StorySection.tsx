"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { heroStats } from "@/lib/data/stats";
import styles from "./StorySection.module.css";

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.inner, inView ? styles.inView : ""].join(" ")}
      >
        <h2 className={`display ${styles.heading}`}>WHY WE EXIST.</h2>
        <div className={styles.body}>
          <p>
            Singapore throws away 755,000 tonnes of food a year — and almost
            half of everything we import ends up as waste. Not because
            it&apos;s bad. Because there&apos;s no smart system to sell it
            before the clock runs out.
          </p>
          <p>
            Our landfill capacity is projected to run out by 2035. The food
            being binned today isn&apos;t scraps — it&apos;s tomorrow&apos;s
            dinner, priced wrong.
          </p>
          <p>
            CircEats is that system. Supermarkets list near-expiry stock at
            30–70% off, shoppers reserve exactly what they want, and
            everything is collected in-store — no vans, no warehouses, no
            waste.
          </p>
        </div>
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
