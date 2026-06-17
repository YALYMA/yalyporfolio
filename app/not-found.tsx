import Link from "next/link";

// Static 404 page — works without JS, always shows bilingual message
export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "var(--bg-base, #fafafa)", padding: "24px",
      fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
    }}>
      {/* Logo */}
      <div style={{ width: 72, height: 72, borderRadius: 20,
          background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 28, boxShadow: "0 12px 32px rgba(139,92,246,0.30)" }}>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 26, color: "#fff" }}>
          404
        </span>
      </div>

      {/* Bilingual heading */}
      <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px,5vw,48px)",
          fontWeight: 900, letterSpacing: "-0.03em", color: "var(--text-primary, #18181b)",
          marginBottom: 8, textAlign: "center" }}>
        Page not found
      </h1>
      <p style={{ fontSize: 16, color: "var(--text-muted, #71717a)", marginBottom: 4,
          textAlign: "center", fontStyle: "italic" }}>
        Page introuvable
      </p>

      {/* Description */}
      <p style={{ fontSize: 15, color: "var(--text-muted, #71717a)", maxWidth: 420,
          textAlign: "center", lineHeight: 1.75, marginBottom: 10, marginTop: 16 }}>
        This page doesn&apos;t exist or has been moved.
      </p>
      <p style={{ fontSize: 14, color: "var(--text-subtle, #a1a1aa)", maxWidth: 380,
          textAlign: "center", lineHeight: 1.7, marginBottom: 36 }}>
        Cette page n&apos;existe pas ou a été déplacée.
      </p>

      {/* Tip about translation tools */}
      <div style={{ padding: "12px 20px", borderRadius: 12, marginBottom: 28,
          background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)",
          maxWidth: 420, textAlign: "center" }}>
        <p style={{ fontSize: 12.5, color: "var(--text-muted, #71717a)", margin: 0, lineHeight: 1.65 }}>
          💡 Use the <strong style={{ color: "#8b5cf6" }}>EN/FR button</strong> on the portfolio for translation — browser translation tools may cause navigation errors.
        </p>
      </div>

      {/* Back button */}
      <Link href="/" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "12px 28px", borderRadius: 12,
        background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
        color: "#fff", fontWeight: 700, fontSize: 14.5, textDecoration: "none",
        boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
      }}>
        ← Back to portfolio / Retour
      </Link>
    </div>
  );
}
