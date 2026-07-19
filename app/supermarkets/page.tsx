import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

/* Phase 1 stub — the full B2B page is Phase 2 scope (see planning.md §8). */
export default function SupermarketsPage() {
  return (
    <main>
      <Nav />
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px 24px 80px",
          gap: 16,
        }}
      >
        <h1 className="display" style={{ fontSize: "clamp(32px,4.5vw,56px)" }}>
          FOR SUPERMARKETS
        </h1>
        <p style={{ color: "var(--gray-600)", maxWidth: 480 }}>
          The B2B page is coming soon. Turn near-expiry stock into revenue —
          book a demo to learn more.
        </p>
      </section>
      <Footer />
    </main>
  );
}
