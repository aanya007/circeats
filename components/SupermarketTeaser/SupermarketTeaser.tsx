import Button from "../ui/Button";
import styles from "./SupermarketTeaser.module.css";

export default function SupermarketTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div>
          <h3 className={`display ${styles.heading}`}>RUN A SUPERMARKET?</h3>
          <p className={styles.copy}>
            Turn near-expiry stock into revenue overnight. No new workflows.
            Track waste, stay RSA-compliant, and unlock ESG reporting — all
            from one dashboard.
          </p>
        </div>
        <Button variant="orange">Book a Demo →</Button>
      </div>
    </section>
  );
}
