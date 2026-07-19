"use client";

import { useState } from "react";
import { faqData } from "@/lib/data/faq";
import FaqItem from "./FaqItem";
import styles from "./Faq.module.css";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIdx((current) => (current === idx ? null : idx));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <h2 className="display" style={{ fontSize: "clamp(26px,3.4vw,38px)" }}>
            COMMON QUESTIONS
          </h2>
        </div>
        <div>
          {faqData.map((item, i) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              idx={i}
              isOpen={openIdx === i}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
