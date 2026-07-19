"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { posts, formatPostDate } from "@/lib/data/posts";
import styles from "./PostGrid.module.css";

export default function PostGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={[styles.grid, inView ? styles.inView : ""].join(" ")}
      >
        {posts.map((p) => (
          <a href={`/blog/${p.slug}`} className={styles.card} key={p.slug}>
            <div className={styles.meta}>
              <span className={styles.tag}>{p.tag}</span>
              <span>
                {formatPostDate(p.date)} · {p.readTime}
              </span>
            </div>
            <h2 className={styles.title}>{p.title}</h2>
            <p className={styles.excerpt}>{p.excerpt}</p>
            <span className={styles.readMore}>Read →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
