import StepRow from "./StepRow";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    num: "01",
    title: "List",
    body: "Supermarkets flag near-expiry stock with photos, condition, and price — powered by our AI discount engine.",
  },
  {
    num: "02",
    title: "Reserve",
    body: "You browse real inventory nearby. Reserve exactly what you want, no mystery bags.",
  },
  {
    num: "03",
    title: "Pick Up",
    body: "Collect in-store on your schedule. No delivery fees. No logistics overhead.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.inner}>
        <div className="section-head" style={{ marginBottom: 20 }}>
          <h2 className="display">
            THREE STEPS.
            <br />
            ZERO WASTE.
          </h2>
        </div>
        {steps.map((s) => (
          <StepRow key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
