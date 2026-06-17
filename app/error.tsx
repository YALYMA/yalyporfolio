"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base, #f5f7ff)",
        padding: "24px",
        fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: "linear-gradient(135deg, #f43f5e, #dc2626)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          boxShadow: "0 12px 32px rgba(244,63,94,0.3)",
          fontSize: 32,
        }}
      >
        ⚠️
      </div>

      <h1
        style={{
          fontFamily: "Outfit, sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "var(--text-primary, #0f0f2e)",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Une erreur s&apos;est produite
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "var(--text-muted, #7878a8)",
          maxWidth: 420,
          textAlign: "center",
          lineHeight: 1.7,
          marginBottom: 32,
        }}
      >
        Quelque chose s&apos;est mal passé lors du chargement de cette page.
        Veuillez réessayer.
      </p>

      {error.digest && (
        <code
          style={{
            fontSize: 11,
            background: "rgba(244,63,94,0.08)",
            border: "1px solid rgba(244,63,94,0.2)",
            color: "#a21caf",
            padding: "4px 10px",
            borderRadius: 6,
            marginBottom: 28,
          }}
        >
          Erreur: {error.digest}
        </code>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "11px 24px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(139,92,246,0.35)",
          }}
        >
          Réessayer
        </button>
        <a
          href="/"
          style={{
            padding: "11px 24px",
            borderRadius: 12,
            border: "1.5px solid rgba(139,92,246,0.25)",
            color: "var(--text-secondary, #3d3d6b)",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            background: "transparent",
          }}
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  );
}
