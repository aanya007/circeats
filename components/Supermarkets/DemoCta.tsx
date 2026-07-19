import Button from "../ui/Button";
import styles from "./DemoCta.module.css";

export default function DemoCta() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={`display ${styles.heading}`}>SEE IT IN YOUR STORE.</h2>
        <p className={styles.copy}>
          A 20-minute walkthrough with your inventory — not a slide deck. We
          set up your first listings live on the call.
        </p>
        <Button variant="orange">Book a Demo →</Button>
      </div>
    </section>
  );
}
