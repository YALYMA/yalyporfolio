"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SKILLS, TECH_BARS, CERTIFICATIONS } from "@/lib/data";
import { useLang } from "@/lib/LanguageContext";

const LEVEL_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Expert:        { bg: "rgba(139,92,246,0.10)", color: "#5b21b6", border: "rgba(139,92,246,0.22)" },
  Avancé:        { bg: "rgba(6,182,212,0.10)",  color: "#0e7490", border: "rgba(6,182,212,0.22)"  },
  Intermédiaire: { bg: "rgba(245,158,11,0.10)", color: "#92400e", border: "rgba(245,158,11,0.22)" },
};

const CAT_ACCENT: Record<string, string> = {
  sky: "#06b6d4", violet: "#8b5cf6", amber: "#f59e0b",
  emerald: "#22c55e", pink: "#d946ef", slate: "#8b5cf6",
};

// Map certification accent colors (Tailwind-style classes from data.ts) to hex
const CERT_COLOR: Record<string, string> = {
  "bg-amber-500/10 border-amber-500/20":  "#f59e0b",
  "bg-pink-500/10 border-pink-500/20":    "#d946ef",
  "bg-blue-500/10 border-blue-500/20":    "#06b6d4",
  "bg-sky-500/10 border-sky-500/20":      "#8b5cf6",
};

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{name}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#8b5cf6", fontFamily: "Outfit, sans-serif" }}>{level}%</span>
      </div>
      <div className="skill-bar-track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={name}>
        <motion.div className="skill-bar-fill" initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();
  const [active, setActive] = useState("all");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const filters = ["all", ...SKILLS.map(s => s.category)];
  const filtered = active === "all" ? SKILLS : SKILLS.filter(s => s.category === active);

  const LANGS = [
    { lang: t.skills.french,  level: 100, label: t.skills.frenchLevel  },
    { lang: t.skills.english, level: 85,  label: t.skills.englishLevel },
  ];

  return (
    <section id="skills" className="section-padding" style={{ background: "var(--bg-muted)", position: "relative" }}>
      <div className="blob" style={{ width: "clamp(180px,35vw,450px)", height: "clamp(180px,35vw,450px)", background: "rgba(139,92,246,0.07)", top: "-5%", right: "-5%" }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,56px)" }}>
          <span className="section-label">{t.skills.sectionLabel}</span>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(26px,4vw,50px)",
              fontWeight: 800, letterSpacing: "-0.02em", margin: "10px 0 12px", color: "var(--text-primary)" }}>
            {t.skills.heading} <span className="text-gradient">{t.skills.headingGradient}</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(13px,1.6vw,16px)", maxWidth: 500, margin: "0 auto" }}>
            {t.skills.subheading}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          role="group" aria-label="Skill filters"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, marginBottom: 36 }}>
          {filters.map(f => (
            <motion.button key={f} type="button" onClick={() => setActive(f)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              aria-pressed={active === f}
              style={{ padding: "7px 15px", borderRadius: 999, border: "1.5px solid",
                borderColor: active === f ? "#8b5cf6" : "var(--border-base)",
                background: active === f ? "rgba(139,92,246,0.10)" : "var(--bg-surface)",
                color: active === f ? "#8b5cf6" : "var(--text-muted)",
                fontWeight: 600, fontSize: "clamp(11px,1.3vw,13px)", cursor: "pointer", transition: "all 0.2s",
                fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              {f === "all" ? t.skills.all : f}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills cards */}
        <div className="skills-grid" style={{ marginBottom: "clamp(32px,5vw,60px)" }}>
          {filtered.map((cat, i) => {
            const accent = CAT_ACCENT[cat.color] ?? "#8b5cf6";
            return (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06 }} className="card" style={{ padding: "clamp(16px,2.5vw,24px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
                  <span aria-hidden="true" style={{ fontSize: 20 }}>{cat.icon}</span>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text-primary)", margin: 0 }}>{cat.category}</h3>
                  <div aria-hidden="true" style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 7px ${accent}` }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map(item => {
                    const ls = LEVEL_STYLE[item.level] ?? LEVEL_STYLE["Intermédiaire"];
                    return (
                      <span key={item.name} title={item.level}
                        style={{ padding: "4px 9px", borderRadius: 7, fontSize: 11, fontWeight: 600,
                          background: ls.bg, color: ls.color, border: `1px solid ${ls.border}` }}>
                        {item.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bars + Certs */}
        <div className="bars-grid">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}
            className="card" style={{ padding: "clamp(18px,3vw,32px)" }}>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(14px,1.8vw,17px)", color: "var(--text-primary)", marginBottom: 22 }}>
              {t.skills.mastery}
            </h3>
            {TECH_BARS.map((b, i) => <SkillBar key={b.name} name={b.name} level={b.level} delay={0.5 + i * 0.08} />)}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ padding: "clamp(18px,3vw,32px)" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(14px,1.8vw,17px)", color: "var(--text-primary)", marginBottom: 18 }}>
                {t.skills.certifications}
              </h3>
              {CERTIFICATIONS.map((c, i) => {
                const color = CERT_COLOR[c.color] ?? "#8b5cf6";
                return (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 0", borderBottom: i < CERTIFICATIONS.length - 1 ? "1px solid var(--border-base)" : "none" }}>
                    <span aria-hidden="true" style={{ fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</p>
                      <p style={{ fontSize: 11, color: "var(--text-subtle)", margin: "2px 0 0" }}>{c.issuer}</p>
                    </div>
                    <time style={{ fontSize: 11, fontWeight: 700, color, background: `${color}18`, padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{c.year}</time>
                  </div>
                );
              })}
            </div>

            <div className="card" style={{ padding: "clamp(16px,2.5vw,24px)", background: "linear-gradient(135deg, rgba(139,92,246,0.04), rgba(217,70,239,0.04))" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(13px,1.6vw,15px)", color: "var(--text-primary)", marginBottom: 16 }}>
                {t.skills.languages}
              </h3>
              {LANGS.map(l => (
                <div key={l.lang} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{l.lang}</span>
                    <span style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 600 }}>{l.label}</span>
                  </div>
                  <div className="skill-bar-track" role="progressbar" aria-valuenow={l.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${l.lang} — ${l.label}`}>
                    <div className="skill-bar-fill" style={{ width: `${l.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .skills-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 560px)  { .skills-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .skills-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .bars-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 768px) { .bars-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
      `}</style>
    </section>
  );
}
