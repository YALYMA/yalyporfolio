"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        top: -40,
        left: 0,
        zIndex: 9999,
        padding: "8px 16px",
        background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 14,
        textDecoration: "none",
        borderRadius: "0 0 8px 0",
        transition: "top 0.2s",
      }}
      onFocus={(e) => { e.currentTarget.style.top = "0"; }}
      onBlur={(e)  => { e.currentTarget.style.top = "-40px"; }}
    >
      Aller au contenu principal
    </a>
  );
}
