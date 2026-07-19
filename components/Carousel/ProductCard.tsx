import { Product } from "@/lib/data/products";
import styles from "./Carousel.module.css";

function ShapeSvg({ shape, color }: Pick<Product, "shape" | "color">) {
  if (shape === "round") {
    return (
      <svg width="90" height="90" viewBox="0 0 90 90">
        <ellipse cx="45" cy="82" rx="24" ry="5" fill="#000" opacity="0.08" />
        <circle cx="45" cy="45" r="32" fill={color} stroke="#0F0F0F" strokeWidth="2.5" />
        <path
          d="M45 12 Q49 3 56 8"
          stroke="#0F0F0F"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (shape === "bread") {
    return (
      <svg width="100" height="90" viewBox="0 0 100 90">
        <ellipse cx="50" cy="78" rx="34" ry="5" fill="#000" opacity="0.08" />
        <path
          d="M15 60 Q10 25 50 18 Q90 25 85 60 Q85 70 50 70 Q15 70 15 60Z"
          fill={color}
          stroke="#0F0F0F"
          strokeWidth="2.5"
        />
        <path
          d="M30 30 Q50 25 70 30"
          stroke="#0F0F0F"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>
    );
  }
  return (
    <svg width="80" height="95" viewBox="0 0 80 95">
      <ellipse cx="40" cy="88" rx="24" ry="5" fill="#000" opacity="0.08" />
      <rect x="14" y="24" width="52" height="60" rx="6" fill={color} stroke="#0F0F0F" strokeWidth="2.5" />
      <path
        d="M14 24 L40 8 L66 24"
        fill={color}
        stroke="#0F0F0F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ProductCardProps {
  product: Product;
  isActive: boolean;
}

export default function ProductCard({ product, isActive }: ProductCardProps) {
  return (
    <div
      className={[styles.card, isActive ? styles.isActive : ""].join(" ")}
    >
      <div className={styles.discountBadge}>{product.discount}</div>
      <div className={styles.visual} aria-hidden="true">
        <ShapeSvg shape={product.shape} color={product.color} />
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <div className={styles.priceRow}>
        <span className={styles.priceNew}>{product.newPrice}</span>
        <span className={styles.priceOld}>{product.oldPrice}</span>
      </div>
      <div className={styles.expiry}>{product.expiry}</div>
    </div>
  );
}
