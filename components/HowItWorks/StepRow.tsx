"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./HowItWorks.module.css";

interface StepRowProps {
  num: string;
  title: string;
  body: string;
}

export default function StepRow({ num, title, body }: StepRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={[styles.stepRow, inView ? styles.inView : ""].join(" ")}
    >
      <div className={styles.ghostNum} aria-hidden="true">
        {num}
      </div>
      <div className={styles.stepText}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}
