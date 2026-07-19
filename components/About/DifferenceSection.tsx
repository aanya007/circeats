"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./DifferenceSection.module.css";

const points = [
  {
    title: "No mystery bags",
    body: "You see every item before you reserve it — photo, price, expiry date. Item-level transparency, not surprise boxes.",
  },
  {
    title: "No delivery vans",
    body: "In-store pickup only. Zero logistics overhead is why the discounts stay deep and the food stays fresh.",
  },
  {
    title: "No one loses",
    body: "Supermarkets recover revenue, shoppers save 30–70%, and Singapore gets measurable landfill diversion.",
  },
];

export default function DifferenceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section}>
      <div className="section-head">
        <h2 className="display">
          NOT ANOTHER
          <br />
          FOOD APP.
        </h2>
      </div>
      <div
        ref={ref}
        className={[styles.grid, inView ? styles.inView : ""].join(" ")}
      >
        {points.map((p) => (
          <div className={styles.card} key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
