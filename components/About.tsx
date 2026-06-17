"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Zap, Shield, Cloud, Cpu, DollarSign, Users } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { useLang } from "@/lib/LanguageContext";

// Icons + colors mapped by index — titles/descriptions come from translations
const VALUE_STYLES = [
  { icon: Zap,        color: "#8b5cf6", bg: "rgba(139,92,246,0.09)" },
  { icon: Shield,     color: "#22c55e", bg: "rgba(34,197,94,0.09)"  },
  { icon: Cloud,      color: "#06b6d4", bg: "rgba(6,182,212,0.09)"  },
  { icon: Cpu,        color: "#d946ef", bg: "rgba(217,70,239,0.09)" },
  { icon: DollarSign, color: "#f59e0b", bg: "rgba(245,158,11,0.09)" },
  { icon: Users,      color: "#06b6d4", bg: "rgba(6,182,212,0.07)"  },
];

const fade = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.52 } } };
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function About() {
  const { t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.07 });

  return (
    <section id="about" className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ width: "clamp(180px,30vw,380px)", height: "clamp(180px,30vw,380px)", background: "rgba(139,92,246,0.08)", top: "15%", left: "-8%" }} />

      <div className="container" ref={ref}>
        <motion.div variants={container} initial="hidden" animate={inView ? "visible" : "hidden"}>

          {/* Header */}
          <motion.div variants={fade} style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,64px)" }}>
            <span className="section-label">{t.about.sectionLabel}</span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px,4.5vw,52px)",
                fontWeight: 800, letterSpacing: "-0.02em", margin: "10px 0 16px", color: "var(--text-primary)" }}>
              {t.about.heading}{" "}
              <span className="text-gradient">{t.about.headingGradient}</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(14px,1.8vw,17px)", maxWidth: 600, margin: "0 auto", lineHeight: 1.75 }}>
              {t.about.intro}
            </p>
          </motion.div>

          {/* Two-column */}
          <div className="about-grid">
            {/* Left — story */}
            <div>
              <motion.div variants={fade} className="card" style={{ padding: "clamp(22px,3vw,34px)", marginBottom: 18 }}>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(16px,2vw,20px)", marginBottom: 20, color: "var(--text-primary)" }}>
                  {t.about.storyTitle}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, color: "var(--text-muted)", lineHeight: 1.8, fontSize: "clamp(13px,1.5vw,15px)" }}>
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                  <p>{t.about.p3}</p>
                </div>
              </motion.div>

              <motion.div variants={fade} style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {t.about.tags.map((tag: string) => (
                  <span key={tag} className="card-flat" style={{ padding: "6px 13px", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", borderRadius: 999 }}>
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — Values */}
            <div className="values-grid">
              {/* Correction ici : ajout de 'v: any' pour satisfaire le compilateur de Vercel */}
              {t.about.values.map((v: any, i: number) => {
                const style = VALUE_STYLES[i] ?? VALUE_STYLES[0];
                const Icon = style.icon;
                return (
                  <motion.div key={v.title} variants={fade} whileHover={{ scale: 1.025, y: -3 }} className="card" style={{ padding: "clamp(14px,2vw,20px)" }}>
                    <div aria-hidden="true" style={{ width: 38, height: 38, borderRadius: 11, background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 11 }}>
                      <Icon size={17} color={style.color} />
                    </div>
                    <h4 style={{ fontSize: "clamp(11px,1.2vw,13px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 5, lineHeight: 1.4 }}>{v.title}</h4>
                    <p style={{ fontSize: "clamp(10px,1.1vw,11.5px)", color: "var(--text-muted)", lineHeight: 1.6 }}>{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <motion.div variants={fade} style={{ marginTop: "clamp(36px,5vw,60px)" }}>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "clamp(16px,2vw,20px)", textAlign: "center", color: "var(--text-primary)", marginBottom: 24 }}>
              {t.about.testimonialsTitle}
            </h3>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((item, i) => (
                <motion.div key={item.author} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }} className="card"
                  style={{ padding: "clamp(18px,2.5vw,26px)", position: "relative" }}>
                  <span aria-hidden="true" style={{ position: "absolute", top: 16, left: 22, fontSize: 32, color: "rgba(139,92,246,0.18)", fontFamily: "Outfit, sans-serif", lineHeight: 1 }}>&ldquo;</span>
                  <p style={{ fontSize: "clamp(12px,1.4vw,13.5px)", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 16, paddingTop: 16, fontStyle: "italic" }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 12, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>
                      {item.avatar}
                    </div>
                    <div>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{item.author}</p>
                      <p style={{ fontSize: 11, color: "var(--text-subtle)", margin: 0 }}>{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 640px) { .testimonials-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .testimonials-grid { grid-template-columns: 1fr 1fr 1fr; } }
        @media (min-width: 900px) { .about-grid { grid-template-columns: 1fr 1fr; gap: 48px; } }
        @media (max-width: 480px) { .values-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}