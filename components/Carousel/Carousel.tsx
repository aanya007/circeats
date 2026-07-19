"use client";

import { useRef } from "react";
import { products } from "@/lib/data/products";
import { useActiveCarouselCard } from "@/lib/hooks/useActiveCarouselCard";
import ProductCard from "./ProductCard";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIdx = useActiveCarouselCard(trackRef, products.length);

  return (
    <section className={styles.section}>
      <div className="section-head">
        <h2 className="display">
          EVERY ITEM.
          <br />
          FULL TRANSPARENCY.
        </h2>
        <p>See the exact product, price, and expiry date. No surprise bags.</p>
      </div>
      <div
        className={styles.track}
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Sample rescued products carousel"
      >
        {products.map((p, i) => (
          <ProductCard key={p.name} product={p} isActive={i === activeIdx} />
        ))}
      </div>
      <div className={styles.dots} aria-hidden="true">
        {products.map((p, i) => (
          <div
            key={p.name}
            className={[styles.dot, i === activeIdx ? styles.dotActive : ""].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
