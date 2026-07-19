"use client";

import styles from "./Faq.module.css";

interface FaqItemProps {
  question: string;
  answer: string;
  idx: number;
  isOpen: boolean;
  onToggle: (idx: number) => void;
}

export default function FaqItem({
  question,
  answer,
  idx,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => onToggle(idx)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${idx}`}
      >
        <span>{question}</span>
        <span
          className={[styles.icon, isOpen ? styles.iconOpen : ""].join(" ")}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${idx}`}
        className={[styles.answer, isOpen ? styles.answerOpen : ""].join(" ")}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
