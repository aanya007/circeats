import Button from "../ui/Button";
import styles from "./AboutCta.module.css";

export default function AboutCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`display ${styles.heading}`}>BE PART OF THE CIRCLE.</h2>
        <p className={styles.copy}>
          We&apos;re launching soon. Join the waitlist and be first in line
          when the rescues start.
        </p>
        <div className={styles.ctaRow}>
          <Button variant="primary">Join Waitlist</Button>
          <a href="/supermarkets" className={styles.linkUnderline}>
            Run a supermarket? →
          </a>
        </div>
      </div>
    </section>
  );
}
