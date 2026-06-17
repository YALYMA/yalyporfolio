"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CONTACT_LINKS } from "@/lib/data";
import { Send, CheckCircle, Clock, Globe } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

type FormData = { name: string; email: string; company: string; message: string };
type FormField = keyof FormData;

export default function Contact() {
  const { lang, t } = useLang();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.07 });
  const [form, setForm]     = useState<FormData>({ name: "", email: "", company: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const FIELDS: { key: FormField; label: string; type: string; placeholder: string; half?: boolean }[] = [
    { key: "name",  label: t.contact.name,  type: "text",  placeholder: t.contact.namePlaceholder,  half: true  },
    { key: "email", label: t.contact.email, type: "email", placeholder: t.contact.emailPlaceholder, half: true  },
  ];

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSent(true);
        setForm({ name: "", email: "", company: "", message: "" });
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [form]);

  const handleChange = useCallback(
    (field: FormField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value })), []);

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: `1.5px solid ${focused === field ? "#8b5cf6" : "var(--border-base)"}`,
    background: "var(--bg-muted)", color: "var(--text-primary)", fontSize: 14,
    outline: "none", transition: "border-color 0.2s",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    boxShadow: focused === field ? "0 0 0 3px rgba(139,92,246,0.08)" : "none",
  });

  return (
    <section id="contact" className="section-padding" style={{ position: "relative" }}>
      <div className="blob" style={{ width: "clamp(180px,35vw,500px)", height: "clamp(180px,35vw,500px)", background: "rgba(139,92,246,0.08)", top: "-5%", right: "-10%" }} />
      <div className="blob" style={{ width: "clamp(120px,22vw,300px)", height: "clamp(120px,22vw,300px)", background: "rgba(217,70,239,0.06)", bottom: "8%", left: "-5%" }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,56px)" }}>
          <span className="section-label">{t.contact.sectionLabel}</span>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(26px,4vw,52px)",
              fontWeight: 800, letterSpacing: "-0.025em", margin: "10px 0 14px", color: "var(--text-primary)" }}>
            {t.contact.heading} <span className="text-gradient">{t.contact.headingGradient}</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(13px,1.6vw,16px)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            {t.contact.subheading}
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Contact links */}
            {CONTACT_LINKS.map(link => (
              <motion.a key={link.label} href={link.href} whileHover={{ x: 5 }} className="card"
                style={{ padding: "clamp(14px,2vw,18px) clamp(16px,2.5vw,22px)",
                  display: "flex", alignItems: "center", gap: 14,
                  textDecoration: "none", transition: "all 0.25s" }}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onMouseOver={e => ((e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6")}
                onMouseOut={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-base)")}>
                <span style={{ fontSize: 22, flexShrink: 0 }} aria-hidden="true">{link.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)",
                      textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>{link.label}</p>
                  <p style={{ fontSize: "clamp(12px,1.4vw,13.5px)", fontWeight: 600,
                      color: "var(--text-secondary)", margin: "2px 0 0",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.value}</p>
                </div>
                <span style={{ color: "#8b5cf6", fontSize: 16, opacity: 0.42, flexShrink: 0 }} aria-hidden="true">→</span>
              </motion.a>
            ))}

            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="card-flat" style={{ padding: 16, borderRadius: 14 }}>
                <Clock size={16} color="#8b5cf6" aria-hidden="true" style={{ marginBottom: 8 }} />
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px" }}>{t.contact.responseTime}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>{t.contact.responseVal}</p>
              </div>
              <div className="card-flat" style={{ padding: 16, borderRadius: 14 }}>
                <Globe size={16} color="#06b6d4" aria-hidden="true" style={{ marginBottom: 8 }} />
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 3px" }}>{t.contact.timezone}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>{t.contact.timezoneVal}</p>
              </div>
            </div>

            {/* Open to */}
            <div style={{ padding: "clamp(16px,2.5vw,22px)", borderRadius: 18,
                background: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(217,70,239,0.04))",
                border: "1.5px solid rgba(139,92,246,0.18)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: "50%",
                    background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.5)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>{t.contact.availableTitle}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 12 }}>
                {t.contact.openTo}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {t.openTo.map((item: string) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8b5cf6", flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}>
            <div className="card" style={{ padding: "clamp(22px,3vw,38px)" }}>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "clamp(32px,5vw,52px) 16px" }}>
                  <CheckCircle size={52} color="#22c55e" style={{ margin: "0 auto 18px", display: "block" }} aria-hidden="true" />
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(18px,2.5vw,24px)",
                      fontWeight: 800, color: "var(--text-primary)", marginBottom: 10 }}>
                    {t.contact.successTitle}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7 }}>
                    {t.contact.successSub}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(15px,2vw,19px)",
                      fontWeight: 700, color: "var(--text-primary)", marginBottom: "clamp(18px,3vw,28px)" }}>
                    {t.contact.formTitle}
                  </h3>

                  {/* Name + Email side by side on desktop */}
                  <div className="form-row">
                    {FIELDS.filter(f => f.half).map(field => (
                      <div key={field.key} style={{ flex: 1, minWidth: 0 }}>
                        <label htmlFor={`contact-${field.key}`}
                          style={{ display: "block", fontSize: 12, fontWeight: 700,
                            color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em" }}>
                          {field.label}
                        </label>
                        <input id={`contact-${field.key}`} type={field.type}
                          placeholder={field.placeholder} value={form[field.key as FormField]}
                          onChange={handleChange(field.key as FormField)} required
                          onFocus={() => setFocused(field.key)}
                          onBlur={() => setFocused(null)}
                          style={inputStyle(field.key)}
                          autoComplete={field.key === "email" ? "email" : "name"} />
                      </div>
                    ))}
                  </div>

                  {/* Company */}
                  <div style={{ marginBottom: 16, marginTop: 16 }}>
                    <label htmlFor="contact-company"
                      style={{ display: "block", fontSize: 12, fontWeight: 700,
                        color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em" }}>
                      {t.contact.company} <span style={{ opacity: 0.5, fontWeight: 400 }}>{t.contact.optional}</span>
                    </label>
                    <input id="contact-company" type="text" placeholder={t.contact.companyPlaceholder}
                      value={form.company} onChange={handleChange("company")}
                      onFocus={() => setFocused("company")} onBlur={() => setFocused(null)}
                      style={inputStyle("company")} autoComplete="organization" />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 24 }}>
                    <label htmlFor="contact-message"
                      style={{ display: "block", fontSize: 12, fontWeight: 700,
                        color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em" }}>
                      {t.contact.message}
                    </label>
                    <textarea id="contact-message"
                      placeholder={t.contact.messagePlaceholder}
                      value={form.message} onChange={handleChange("message")} required rows={5}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120 }} />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: "12px 16px", borderRadius: 10, marginBottom: 16,
                        background: "rgba(244,63,94,0.08)",
                        border: "1px solid rgba(244,63,94,0.25)",
                        display: "flex", alignItems: "flex-start", gap: 10,
                      }}
                      role="alert"
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }} aria-hidden="true">⚠️</span>
                      <p style={{ fontSize: 13, color: "#be123c", margin: 0, lineHeight: 1.6 }}>{error}</p>
                    </motion.div>
                  )}

                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="btn-primary" aria-busy={loading}
                    style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.72 : 1 }}>
                    {loading
                      ? <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)",
                              borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} aria-hidden="true" />
                          {t.contact.sending}
                        </span>
                      : <><Send size={14} aria-hidden="true" /> {t.contact.send}</>
                    }
                  </motion.button>

                  <p style={{ fontSize: 11, color: "var(--text-subtle)", textAlign: "center", marginTop: 12 }}>
                    {t.contact.noSpam}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
        @media (min-width: 768px) { .contact-grid { grid-template-columns: 1fr 1.35fr; gap: 36px; } }
        .form-row { display: flex; flex-direction: column; gap: 14px; }
        @media (min-width: 480px) { .form-row { flex-direction: row; gap: 12px; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
