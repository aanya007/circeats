"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import styles from "../Waitlist/WaitlistModal.module.css";

type Status = "idle" | "submitting" | "booked" | "already";

interface DemoModalProps {
  onClose: () => void;
}

export default function DemoModal({ onClose }: DemoModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          outlets: form.get("outlets"),
          phone: form.get("phone"),
          notes: form.get("notes"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        setStatus("idle");
        return;
      }
      setStatus(data.status === "already" ? "already" : "booked");
    } catch {
      setError("Couldn't reach the server — please try again.");
      setStatus("idle");
    }
  }

  const done = status === "booked" || status === "already";

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close demo form"
        >
          ×
        </button>

        {done ? (
          <div className={styles.success}>
            <h2 className={`display ${styles.heading}`} id="demo-title">
              {status === "already" ? (
                <>
                  YOU&apos;RE ALREADY
                  <br />
                  <span className={styles.accent}>ON OUR LIST.</span>
                </>
              ) : (
                <>
                  DEMO
                  <br />
                  <span className={styles.accent}>REQUESTED.</span>
                </>
              )}
            </h2>
            <p className={styles.copy}>
              {status === "already"
                ? "We already have a demo request from this email — we'll be in touch shortly to schedule it."
                : "We'll reach out within one working day to schedule your 20-minute walkthrough — with your inventory, not a slide deck."}
            </p>
            <Button variant="primary" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <h2 className={`display ${styles.heading}`} id="demo-title">
              BOOK A
              <br />
              <span className={styles.accent}>DEMO.</span>
            </h2>
            <p className={styles.copy}>
              A 20-minute walkthrough with your inventory. Tell us where to
              find you and we&apos;ll set it up.
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span className={styles.label}>Name</span>
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Work email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@yourstore.com"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Supermarket / chain</span>
                <input
                  name="company"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="organization"
                  placeholder="e.g. FreshMart"
                />
              </label>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>Outlets</span>
                  <select name="outlets" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2-5">2–5</option>
                    <option value="6-20">6–20</option>
                    <option value="20+">20+</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>
                    Phone <em>(optional)</em>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    maxLength={20}
                    autoComplete="tel"
                    placeholder="+65 9123 4567"
                  />
                </label>
              </div>
              <label className={styles.field}>
                <span className={styles.label}>
                  Anything we should know? <em>(optional)</em>
                </span>
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. mostly fresh produce, POS system, timeline…"
                />
              </label>

              {error && <p className={styles.error}>{error}</p>}

              <Button
                variant="orange"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Request Demo"}
              </Button>
            </form>
            <p className={styles.finePrint}>
              We only use these details to schedule your demo. No spam.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
