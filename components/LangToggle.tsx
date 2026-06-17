"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

export default function LangToggle() {
  const { lang, t, toggleLang } = useLang();

  return (
    <motion.button
      type="button"
      onClick={toggleLang}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.94 }}
      aria-label={`Switch language to ${t.lang.switchTo}`}
      title={`Switch to ${t.lang.switchTo}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 99,
        border: "1.5px solid var(--border-strong)",
        background: "var(--bg-surface)",
        cursor: "pointer",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontWeight: 700,
        fontSize: 12.5,
        color: "var(--text-secondary)",
        boxShadow: "var(--shadow-sm)",
        transition: "border-color 0.2s, background 0.2s",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6";
        (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.06)";
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)";
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          style={{ fontSize: 15, lineHeight: 1 }}
          aria-hidden="true"
        >
          {t.lang.flag}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={`${lang}-label`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {t.lang.switchTo}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
