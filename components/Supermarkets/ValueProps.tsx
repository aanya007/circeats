"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./ValueProps.module.css";

const props = [
  {
    title: "Revenue overnight",
    body: "Stock that was headed for the bin sells the same day. No markdown guesswork — the AI discount engine prices each item by its expiry window.",
  },
  {
    title: "No new workflows",
    body: "Flag items from the dashboard in minutes. No repacking, no delivery prep — shoppers reserve online and collect in-store.",
  },
  {
    title: "Compliance built in",
    body: "Track diverted waste automatically, stay RSA-compliant, and unlock ESG reporting — all from one dashboard.",
  },
];

export default function ValueProps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.grid, inView ? styles.inView : ""].join(" ")}
      >
        {props.map((p) => (
          <div className={styles.card} key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
