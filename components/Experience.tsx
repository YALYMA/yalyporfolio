"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EXPERIENCES, EDUCATION, CERTIFICATIONS } from "@/lib/data";
import { MapPin, CheckCircle2, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Experience() {
  const { t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 });

  // Merge static experience data with translated content (role, company, location, description, achievements)
  const experiences = EXPERIENCES.map(exp => {
    const content = (t.experienceContent as Record<number, {
      role: string; company: string; location: string; description: string; achievements: readonly string[];
    }>)[exp.id];
    return { ...exp, ...content };
  });

  // Merge static EDUCATION data with translated degree titles
  const education = EDUCATION.map(e => {
    const content = (t.educationContent as Record<number, { degree: string }>)[e.id];
    return { ...e, ...content };
  });

  return (
    <section id="experience" className="section-padding" style={{ background: "var(--bg-muted)", position: "relative" }}>
      <div className="blob" style={{ width: "clamp(160px,28vw,380px)", height: "clamp(160px,28vw,380px)", background: "rgba(217,70,239,0.06)", top: "8%", right: "-5%" }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,64px)" }}>
          <span className="section-label">{t.experience.sectionLabel}</span>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(26px,4vw,52px)",
              fontWeight: 800, letterSpacing: "-0.025em", margin: "10px 0 14px", color: "var(--text-primary)" }}>
            {t.experience.heading} <span className="text-gradient">{t.experience.headingGradient}</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(13px,1.6vw,16px)", maxWidth: 500, margin: "0 auto" }}>
            {t.experience.subheading}
          </p>
        </motion.div>

        <div className="exp-grid">
          {/* ── Timeline ── */}
          <div>
            <ol style={{ position: "relative", paddingLeft: 40, listStyle: "none", margin: 0 }}>
              <div className="timeline-line" aria-hidden="true" />

              {experiences.map((exp, i) => (
                <motion.li key={exp.id}
                  initial={{ opacity: 0, x: -22 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.18 + i * 0.14 }}
                  style={{ position: "relative", marginBottom: i < experiences.length - 1 ? 28 : 0 }}>

                  <div aria-hidden="true" className={`timeline-dot${exp.current ? " timeline-dot-active" : ""}`}
                    style={{ position: "absolute", left: -28, top: 12 }} />

                  <div className="card" style={{ padding: "clamp(16px,2.5vw,26px)" }}>
                    {/* Period + badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                        marginBottom: 10, flexWrap: "wrap", gap: 7 }}>
                      <time style={{ fontSize: 11, fontWeight: 700, color: "#8b5cf6",
                          background: "rgba(139,92,246,0.10)", padding: "3px 10px",
                          borderRadius: 6, border: "1px solid rgba(139,92,246,0.20)" }}>
                        {exp.period}
                      </time>
                      {exp.current && (
                        <span className="pill pill-emerald" style={{ fontSize: 10 }}>
                          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "pulse 2s infinite" }} />
                          {t.experience.current}
                        </span>
                      )}
                    </div>

                    {/* Role + company */}
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(15px,1.9vw,18px)",
                        fontWeight: 800, color: "var(--text-primary)", margin: "0 0 3px" }}>
                      {exp.role}
                    </h3>
                    <p style={{ fontSize: "clamp(13px,1.5vw,14.5px)", fontWeight: 700, color: "#8b5cf6", margin: "0 0 5px" }}>
                      {exp.company}
                    </p>
                    <p style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12,
                        color: "var(--text-subtle)", margin: "0 0 14px" }}>
                      <MapPin size={11} aria-hidden="true" />{exp.location}
                    </p>

                    {/* Description */}
                    <p style={{ fontSize: "clamp(12px,1.4vw,13.5px)", color: "var(--text-muted)",
                        lineHeight: 1.7, marginBottom: 14,
                        paddingBottom: 14, borderBottom: "1px solid var(--border-base)" }}>
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0,
                        display: "flex", flexDirection: "column", gap: 8 }}>
                      {exp.achievements.map(a => (
                        <li key={a} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                          <CheckCircle2 size={13} color="#22c55e" aria-hidden="true"
                            style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: "clamp(11.5px,1.3vw,13px)",
                              color: "var(--text-secondary)", lineHeight: 1.65 }}>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* ── Right column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Education */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }} className="card" style={{ padding: "clamp(18px,2.5vw,28px)" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(14px,1.8vw,16px)",
                  fontWeight: 700, color: "var(--text-primary)", marginBottom: 18 }}>
                🎓 {t.experience.education}
              </h3>
              {education.map((e, i) => (
                <div key={e.id} style={{
                  paddingBottom: i < education.length - 1 ? 14 : 0,
                  marginBottom: i < education.length - 1 ? 14 : 0,
                  borderBottom: i < education.length - 1 ? "1px solid var(--border-base)" : "none" }}>
                  <p style={{ fontSize: "clamp(12px,1.4vw,13.5px)", fontWeight: 700,
                      color: "var(--text-primary)", margin: "0 0 3px" }}>{e.degree}</p>
                  <p style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 600, margin: "0 0 2px" }}>{e.school}</p>
                  <time style={{ fontSize: 11, color: "var(--text-subtle)" }}>{e.year}</time>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.44 }} className="card" style={{ padding: "clamp(18px,2.5vw,28px)" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(14px,1.8vw,16px)",
                  fontWeight: 700, color: "var(--text-primary)", marginBottom: 18 }}>
                🏆 {t.experience.certifications}
              </h3>
              {CERTIFICATIONS.map((c, i) => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 11,
                  paddingBottom: i < CERTIFICATIONS.length - 1 ? 13 : 0,
                  marginBottom: i < CERTIFICATIONS.length - 1 ? 13 : 0,
                  borderBottom: i < CERTIFICATIONS.length - 1 ? "1px solid var(--border-base)" : "none" }}>
                  <span aria-hidden="true" style={{ fontSize: 20 }}>{c.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "clamp(11.5px,1.3vw,12.5px)", fontWeight: 700,
                        color: "var(--text-primary)", margin: "0 0 2px",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</p>
                    <p style={{ fontSize: 10.5, color: "var(--text-subtle)", margin: 0 }}>{c.issuer}</p>
                  </div>
                  <time style={{ fontSize: 10.5, fontWeight: 700, color: "#8b5cf6",
                      background: "rgba(139,92,246,0.10)", padding: "2px 8px",
                      borderRadius: 5, flexShrink: 0 }}>{c.year}</time>
                </div>
              ))}
            </motion.div>

            {/* Stat card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.58 }}
              style={{ padding: "clamp(20px,3vw,28px)", borderRadius: 22,
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", color: "#fff",
                boxShadow: "0 12px 40px rgba(139,92,246,0.30)" }}
              aria-label="Career highlights in numbers">
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 13.5, fontWeight: 700, marginBottom: 18, opacity: 0.92 }}>
                {t.experience.inNumbers}
              </p>
              <dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(10px,2vw,18px)" }}>
                {t.experience.stats.map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <dt style={{ fontFamily: "Outfit, sans-serif",
                        fontSize: "clamp(24px,3.5vw,30px)", fontWeight: 900,
                        letterSpacing: "-0.025em", lineHeight: 1 }}>{s.val}</dt>
                    <dd style={{ fontSize: 10.5, opacity: 0.78, margin: "4px 0 0", fontWeight: 500, lineHeight: 1.4 }}>{s.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* LinkedIn CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.68 }}>
              <a href="https://linkedin.com/in/alexdupont" target="_blank" rel="noopener noreferrer"
                className="card"
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "clamp(14px,2vw,18px)",
                  textDecoration: "none", transition: "all 0.2s" }}
                onMouseOver={e => ((e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6")}
                onMouseOut={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-base)")}>
                <span aria-hidden="true" style={{ fontSize: 22 }}>💼</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 2px" }}>
                    {t.experience.linkedinCta}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>
                    {t.experience.linkedinSub}
                  </p>
                </div>
                <ExternalLink size={14} color="var(--text-subtle)" aria-hidden="true" />
              </a>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        .exp-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
        @media (min-width: 900px) { .exp-grid { grid-template-columns: 3fr 2fr; gap: 44px; } }
      `}</style>
    </section>
  );
}
