"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Menu } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import LangToggle from "./LangToggle";

const SECTION_COLORS: Record<string, { bg: string; soft: string; text: string; glow: string; glowSoft: string; pill: string }> = {
  home:       { bg: "rgba(139,92,246,0.14)", soft: "rgba(139,92,246,0.07)", text: "#8b5cf6", glow: "rgba(139,92,246,0.35)", glowSoft: "rgba(139,92,246,0.10)", pill: "linear-gradient(135deg,#8b5cf6,#d946ef)" },
  about:      { bg: "rgba(6,182,212,0.13)",  soft: "rgba(6,182,212,0.06)",  text: "#0891b2", glow: "rgba(6,182,212,0.30)",  glowSoft: "rgba(6,182,212,0.08)",  pill: "linear-gradient(135deg,#06b6d4,#8b5cf6)" },
  skills:     { bg: "rgba(217,70,239,0.13)", soft: "rgba(217,70,239,0.06)", text: "#a21caf", glow: "rgba(217,70,239,0.30)", glowSoft: "rgba(217,70,239,0.08)", pill: "linear-gradient(135deg,#d946ef,#8b5cf6)" },
  projects:   { bg: "rgba(245,158,11,0.13)", soft: "rgba(245,158,11,0.06)", text: "#b45309", glow: "rgba(245,158,11,0.30)", glowSoft: "rgba(245,158,11,0.08)", pill: "linear-gradient(135deg,#f59e0b,#f43f5e)" },
  experience: { bg: "rgba(34,197,94,0.12)",  soft: "rgba(34,197,94,0.06)",  text: "#15803d", glow: "rgba(34,197,94,0.28)",  glowSoft: "rgba(34,197,94,0.07)",  pill: "linear-gradient(135deg,#22c55e,#06b6d4)" },
  contact:    { bg: "rgba(244,63,94,0.12)",  soft: "rgba(244,63,94,0.06)",  text: "#be123c", glow: "rgba(244,63,94,0.28)",  glowSoft: "rgba(244,63,94,0.07)",  pill: "linear-gradient(135deg,#f43f5e,#d946ef)" },
};
const DEFAULT_COLOR = SECTION_COLORS.home;

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/mamadouyaly.pdf";
  a.download = "mamadouyaly.pdf";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  // FIX 1: Use a ref + CSS width instead of Framer Motion animate for scroll bar
  const progressRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { label: t.nav.about,      href: "#about",      id: "about"      },
    { label: t.nav.skills,     href: "#skills",     id: "skills"     },
    { label: t.nav.projects,   href: "#projects",   id: "projects"   },
    { label: t.nav.experience, href: "#experience", id: "experience" },
    { label: t.nav.contact,    href: "#contact",    id: "contact"    },
  ];

  useEffect(() => {
    const onScroll = () => {
      try {
        const scrollY = window.scrollY;
        const docH    = document.documentElement.scrollHeight - window.innerHeight;

        // FIX 1: Update progress bar via ref (no re-render, no Framer Motion on scroll)
        if (progressRef.current && docH > 0) {
          progressRef.current.style.width = `${Math.min((scrollY / docH) * 100, 100)}%`;
        }

        setScrolled(scrollY > 20);

        const ids = ["about","skills","projects","experience","contact"];
        let found = "home";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && scrollY >= el.offsetTop - 130) found = id;
        }
        setActive(found);
      } catch {
        // swallow any scroll errors silently
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      try {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch { /* ignore */ }
    }, mobileOpen ? 300 : 0);
  };

  const activeColor = SECTION_COLORS[active] ?? DEFAULT_COLOR;

  return (
    <>
      {/* FIX 1: Progress bar via ref — zero re-renders on scroll */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100,
          background: "rgba(139,92,246,0.10)" }}>
        <div
          ref={progressRef}
          style={{
            height: "100%",
            width: "0%",
            background: activeColor.pill,
            borderRadius: "0 3px 3px 0",
            boxShadow: `0 0 8px ${activeColor.glow}`,
            transition: "background 0.4s, box-shadow 0.4s",
          }}
        />
      </div>

      {/* Main header */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 3, left: 0, right: 0, zIndex: 50,
          transition: "background 0.35s, box-shadow 0.35s, border-color 0.35s",
          background: scrolled ? "rgba(250,250,250,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid ${activeColor.bg}` : "1px solid transparent",
          boxShadow: scrolled ? `0 4px 28px ${activeColor.glowSoft}` : "none",
        }}
      >
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64,
            display: "flex", alignItems: "center", gap: 8 }}>

          {/* Logo */}
          <button type="button"
            onClick={() => { try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch { window.scrollTo(0,0); } }}
            aria-label="Back to top"
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none",
              border: "none", cursor: "pointer", padding: 0, flexShrink: 0, marginRight: 12 }}>
            <div
              style={{ width: 36, height: 36, borderRadius: 11, flexShrink: 0,
                background: activeColor.pill,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 14,
                boxShadow: `0 4px 18px ${activeColor.glow}`,
                transition: "background 0.4s, box-shadow 0.4s" }}
              aria-hidden="true">
              MY
            </div>
            <div style={{ lineHeight: 1 }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 16,
                  color: "var(--text-primary)", display: "block" }}>
                Mamadou<span style={{ color: activeColor.text, transition: "color 0.4s" }}>.</span>dev
              </span>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: "var(--text-subtle)",
                  textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Portfolio
              </span>
            </div>
          </button>

          {/* Desktop nav links — FIX 2: removed layoutId to prevent Framer Motion crash */}
          <div className="nav-desktop" style={{ flex: 1 }}>
            {NAV_LINKS.map(link => {
              const isActive = active === link.id;
              const sColor   = SECTION_COLORS[link.id] ?? DEFAULT_COLOR;
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  style={{
                    position: "relative",
                    padding: "7px 14px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: 13.5,
                    background: isActive ? sColor.bg : "transparent",
                    color: isActive ? sColor.text : "var(--text-muted)",
                    transition: "background 0.25s, color 0.25s",
                  }}
                >
                  {/* FIX 2: Simple CSS underline instead of Framer Motion layoutId */}
                  {isActive && (
                    <span style={{
                      position: "absolute", bottom: 5, left: "50%",
                      transform: "translateX(-50%)",
                      width: "30%", height: 2.5, borderRadius: 999,
                      background: sColor.pill, display: "block",
                    }} />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="nav-desktop" style={{ gap: 8, flex: "none" }}>
            <LangToggle />
            <button type="button" onClick={downloadCV} aria-label="Download Resume"
              style={{ display: "flex", alignItems: "center", gap: 7,
                padding: "8px 18px", borderRadius: 10,
                background: activeColor.pill, transition: "background 0.4s, box-shadow 0.4s",
                color: "#fff", border: "none", cursor: "pointer",
                fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 13,
                boxShadow: `0 4px 14px ${activeColor.glowSoft}`,
                whiteSpace: "nowrap" }}>
              <Download size={13} aria-hidden="true" /> {t.nav.download}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="nav-mobile-only"
            style={{ display: "none", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <LangToggle />
            <button type="button"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{ width: 38, height: 38, borderRadius: 10, border: "none", cursor: "pointer",
                background: activeColor.bg, color: activeColor.text, transition: "background 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center" }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 48,
                background: "rgba(15,15,30,0.45)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              role="dialog" aria-label="Navigation menu"
              style={{ position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(320px, 90vw)", zIndex: 49, background: "#fff",
                boxShadow: "-8px 0 40px rgba(139,92,246,0.15)",
                display: "flex", flexDirection: "column", overflow: "hidden" }}>

              {/* Drawer header */}
              <div style={{ padding: "20px 24px 16px",
                  borderBottom: `1px solid ${activeColor.bg}`,
                  background: `linear-gradient(135deg, ${activeColor.soft}, transparent)` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9,
                        background: activeColor.pill, transition: "background 0.4s",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 13 }}>
                      MY
                    </div>
                    <div>
                      <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 15,
                          color: "var(--text-primary)", margin: 0 }}>Mamadou Yaly</p>
                      <p style={{ fontSize: 10, color: "var(--text-subtle)", margin: 0, fontWeight: 600 }}>
                        Software · AI · MLOps
                      </p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setMobileOpen(false)}
                    style={{ width: 32, height: 32, borderRadius: 8, border: "none",
                      background: "var(--bg-muted)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-muted)" }}>
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Nav links — FIX 2: no layoutId */}
              <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    padding: "0 8px", marginBottom: 8 }}>Navigation</p>
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.id;
                  const sColor   = SECTION_COLORS[link.id] ?? DEFAULT_COLOR;
                  return (
                    <button key={link.href} type="button"
                      onClick={() => scrollTo(link.href)}
                      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%",
                        textAlign: "left", padding: "13px 14px", borderRadius: 12,
                        border: isActive ? `1.5px solid ${sColor.bg}` : "1.5px solid transparent",
                        background: isActive ? sColor.bg : "transparent",
                        cursor: "pointer", marginBottom: 6,
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        fontWeight: isActive ? 700 : 600, fontSize: 15,
                        color: isActive ? sColor.text : "var(--text-secondary)",
                        transition: "all 0.2s" }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                          background: isActive ? sColor.pill : "var(--border-base)",
                          boxShadow: isActive ? `0 0 8px ${sColor.glow}` : "none",
                          transition: "all 0.3s" }} aria-hidden="true" />
                      {link.label}
                      {isActive && (
                        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700,
                            padding: "2px 8px", borderRadius: 999,
                            background: sColor.bg, color: sColor.text }}>
                          ●
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div style={{ padding: "16px 16px 28px",
                  borderTop: "1px solid var(--border-base)",
                  background: "var(--bg-muted)", display: "flex", flexDirection: "column", gap: 10 }}>
                <button type="button" onClick={() => { setMobileOpen(false); downloadCV(); }}
                  style={{ width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8, padding: "13px", borderRadius: 12,
                    background: activeColor.pill, transition: "background 0.4s",
                    color: "#fff", border: "none", cursor: "pointer",
                    fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 14,
                    boxShadow: `0 4px 16px ${activeColor.glow}` }}>
                  <Download size={15} aria-hidden="true" /> {t.nav.download}
                </button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                      boxShadow: "0 0 0 3px rgba(34,197,94,0.22)" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#15803d" }}>
                    {t.hero.available}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        .nav-mobile-only { display: none !important; }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-only { display: flex !important; }
        }
        @media (min-width: 861px) and (max-width: 1080px) {
          .nav-desktop button { padding: 6px 10px !important; font-size: 12.5px !important; }
        }
      `}</style>
    </>
  );
}
