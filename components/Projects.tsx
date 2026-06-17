"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/lib/data";
import { ExternalLink, Github, TrendingUp, Users, Star } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

const CARD_ACCENTS: Record<string, { from: string; to: string; pill: string }> = {
  software: { from: "#8b5cf6", to: "#06b6d4", pill: "pill-violet"  },
  ai:       { from: "#d946ef", to: "#8b5cf6", pill: "pill-fuchsia" },
  mlops:    { from: "#22c55e", to: "#06b6d4", pill: "pill-emerald" },
  cloud:    { from: "#f59e0b", to: "#d946ef", pill: "pill-amber"   },
};

function ImpactIcon({ impact }: { impact: string }) {
  if (impact.includes("star") || impact.includes("★")) return <Star size={11} color="#f59e0b" aria-hidden="true" />;
  if (impact.includes("user") || impact.includes("ARR")) return <Users size={11} color="#22c55e" aria-hidden="true" />;
  return <TrendingUp size={11} color="#22c55e" aria-hidden="true" />;
}

export default function Projects() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState("all");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });

  // Merge static project data with translated content (name, description, impact, badge)
  const projects = PROJECTS.map(p => {
    const content = (t.projectsContent as Record<number, { name: string; badge: string; description: string; impact: string }>)[p.id];
    return { ...p, ...content };
  });

  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  const FILTERS = [
    { label: t.projects.all,      value: "all"      },
    { label: t.projects.software, value: "software" },
    { label: t.projects.ai,       value: "ai"       },
    { label: t.projects.mlops,    value: "mlops"    },
    { label: t.projects.cloud,    value: "cloud"    },
  ];

  return (
    <section id="projects" className="section-padding" style={{ position: "relative" }}>
      <div className="blob" style={{ width: "clamp(180px,32vw,480px)", height: "clamp(180px,32vw,480px)", background: "rgba(6,182,212,0.07)", bottom: "0", left: "-7%" }} />
      <div className="blob" style={{ width: "clamp(120px,22vw,300px)", height: "clamp(120px,22vw,300px)", background: "rgba(217,70,239,0.06)", top: "10%", right: "-4%" }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,52px)" }}>
          <span className="section-label">{t.projects.sectionLabel}</span>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(26px,4vw,52px)",
              fontWeight: 800, letterSpacing: "-0.025em", margin: "10px 0 14px", color: "var(--text-primary)" }}>
            {t.projects.heading} <span className="text-gradient">{t.projects.headingGradient}</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(13px,1.6vw,16px)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            {t.projects.subheading}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          role="group" aria-label="Project filters"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, marginBottom: "clamp(24px,4vw,44px)" }}>
          {FILTERS.map(f => (
            <motion.button key={f.value} type="button" onClick={() => setActiveFilter(f.value)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} aria-pressed={activeFilter === f.value}
              style={{ padding: "8px 18px", borderRadius: 999, border: `1.5px solid ${activeFilter === f.value ? "#8b5cf6" : "var(--border-base)"}`,
                background: activeFilter === f.value ? "rgba(139,92,246,0.10)" : "var(--bg-surface)",
                color: activeFilter === f.value ? "#8b5cf6" : "var(--text-muted)",
                fontWeight: 600, fontSize: "clamp(11px,1.3vw,13px)", cursor: "pointer",
                transition: "all 0.2s", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const accent = CARD_ACCENTS[p.category] ?? CARD_ACCENTS["software"];
              return (
                <motion.article key={p.id} layout
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.32, delay: i * 0.05 }}
                  className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>

                  {/* Gradient strip */}
                  <div aria-hidden="true" style={{ height: 5, background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`, flexShrink: 0 }} />

                  <div style={{ padding: "clamp(16px,2.5vw,24px)", display: "flex", flexDirection: "column", flex: 1 }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span aria-hidden="true" style={{ fontSize: "clamp(24px,3vw,30px)" }}>{p.emoji}</span>
                        <div>
                          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(13.5px,1.8vw,16px)",
                              fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.25 }}>{p.name}</h3>
                          <span className={`pill ${accent.pill}`} style={{ marginTop: 5, fontSize: 10 }}>{p.badge}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        {[{ href: p.github, Icon: Github, label: `Source — ${p.name}` },
                          { href: p.demo,   Icon: ExternalLink, label: `Demo — ${p.name}` }].map(({ href, Icon, label }) => (
                          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            style={{ width: 30, height: 30, borderRadius: 8,
                              border: "1.5px solid var(--border-base)", background: "var(--bg-muted)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "var(--text-muted)", textDecoration: "none", transition: "all 0.2s",
                              flexShrink: 0 }}
                            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6"; (e.currentTarget as HTMLElement).style.color = "#8b5cf6"; }}
                            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-base)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                            <Icon size={12} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: "clamp(12px,1.4vw,13px)", color: "var(--text-muted)", lineHeight: 1.72, marginBottom: 12, flex: 1 }}>
                      {p.description}
                    </p>

                    {/* Impact badge */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, padding: "8px 11px",
                        borderRadius: 9, background: "rgba(34,197,94,0.07)",
                        border: "1px solid rgba(34,197,94,0.18)", marginBottom: 14 }}>
                      <ImpactIcon impact={p.impact} />
                      <p style={{ fontSize: 11, fontWeight: 600, color: "#166534", margin: 0, lineHeight: 1.5 }}>{p.impact}</p>
                    </div>

                    {/* Stack */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {p.stack.map(tech => (
                        <span key={tech} style={{ padding: "3px 8px", borderRadius: 6, fontSize: 10.5,
                            fontWeight: 600, background: "var(--bg-muted)", color: "var(--text-secondary)",
                            border: "1px solid var(--border-base)" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "clamp(28px,4vw,48px)" }}>
          <a href="https://https://github.com/YALYMA/-projet-progammation-fonctionnel-M1" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8,
              padding: "11px 24px", borderRadius: 12,
              border: "1.5px solid var(--border-strong)", color: "var(--text-secondary)",
              textDecoration: "none", fontWeight: 600, fontSize: 13.5,
              fontFamily: "Plus Jakarta Sans, sans-serif", transition: "all 0.2s" }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6"; (e.currentTarget as HTMLElement).style.color = "#8b5cf6"; (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.06)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Github size={15} aria-hidden="true" />
            {t.projects.viewAll}
          </a>
        </motion.div>
      </div>

      <style>{`
        .projects-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 600px)  { .projects-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .projects-grid { grid-template-columns: 1fr 1fr 1fr; gap: 20px; } }
      `}</style>
    </section>
  );
}
