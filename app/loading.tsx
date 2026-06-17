export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-base, #f5f7ff)",
        gap: 20,
      }}
    >
      {/* Animated logo */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(139,92,246,0.35)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 900,
            fontSize: 20,
            color: "#fff",
          }}
        >
          AD
        </span>
      </div>

      {/* Skeleton shimmer bars */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 200 }}>
        {[80, 60, 70].map((w, i) => (
          <div
            key={i}
            style={{
              height: 10,
              width: `${w}%`,
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.18) 50%, rgba(139,92,246,0.08) 100%)",
              backgroundSize: "200% 100%",
              animation: `shimmer 1.5s linear infinite ${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.96); }
        }
      `}</style>
    </div>
  );
}
