"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import styles from "./WaitlistModal.module.css";

type Status = "idle" | "submitting" | "joined" | "already";

interface WaitlistModalProps {
  onClose: () => void;
}

export default function WaitlistModal({ onClose }: WaitlistModalProps) {
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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          postalCode: form.get("postalCode"),
          role: form.get("role"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        setStatus("idle");
        return;
      }
      setStatus(data.status === "already" ? "already" : "joined");
    } catch {
      setError("Couldn't reach the server — please try again.");
      setStatus("idle");
    }
  }

  const done = status === "joined" || status === "already";

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
        aria-labelledby="waitlist-title"
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close waitlist form"
        >
          ×
        </button>

        {done ? (
          <div className={styles.success}>
            <h2 className={`display ${styles.heading}`} id="waitlist-title">
              {status === "already" ? (
                <>
                  YOU&apos;RE ALREADY
                  <br />
                  <span className={styles.accent}>IN THE CIRCLE.</span>
                </>
              ) : (
                <>
                  YOU&apos;RE IN
                  <br />
                  <span className={styles.accent}>THE CIRCLE.</span>
                </>
              )}
            </h2>
            <p className={styles.copy}>
              {status === "already"
                ? "This email is already on the waitlist — we'll be in touch the moment the first rescues go live."
                : "We'll email you the moment the first rescues go live. Too good to bin."}
            </p>
            <Button variant="primary" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <h2 className={`display ${styles.heading}`} id="waitlist-title">
              JOIN THE
              <br />
              <span className={styles.accent}>WAITLIST.</span>
            </h2>
            <p className={styles.copy}>
              Be first in line when the rescues start. No spam — just launch
              news.
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
                <span className={styles.label}>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.label}>
                    Postal code <em>(optional)</em>
                  </span>
                  <input
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    autoComplete="postal-code"
                    placeholder="e.g. 138600"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>I am a…</span>
                  <select name="role" defaultValue="shopper">
                    <option value="shopper">Shopper</option>
                    <option value="supermarket">Supermarket</option>
                    <option value="partner">Partner</option>
                  </select>
                </label>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <Button
                variant="primary"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Joining…" : "Join Waitlist"}
              </Button>
            </form>
            <p className={styles.finePrint}>
              We use your postal code only to prioritise supermarkets near
              you.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
