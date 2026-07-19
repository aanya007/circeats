import { heroStats } from "@/lib/data/stats";
import styles from "./StatsStrip.module.css";

export default function StatsStrip() {
  return (
    <div className={styles.strip}>
      {heroStats.map((s) => (
        <div className={styles.statMini} key={s.label}>
          <div className={`mono-stat ${styles.num}`}>{s.value}</div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
