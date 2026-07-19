"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./BeliefBand.module.css";

export default function BeliefBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.inner, inView ? styles.inView : ""].join(" ")}
      >
        <h2 className={`display ${styles.heading}`}>
          JOIN THE CIRCLE.
          <br />
          <span className={styles.lime}>SAVE THE FOOD.</span>
        </h2>
        <p className={styles.para}>
          Every reservation keeps groceries on a dinner table and out of the
          landfill. Supermarkets recover revenue, you save money, Singapore
          buys time. That&apos;s the circle.
        </p>
      </div>
    </section>
  );
}
