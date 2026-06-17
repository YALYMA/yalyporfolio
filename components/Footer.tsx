"use client";
import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Twitter } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { NAV_LINKS } from "@/lib/data";

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/mamadouyaly.pdf";
  a.download = "mamadouyaly.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function Footer() {
  const { lang, t } = useLang();
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer style={{ borderTop: "1px solid var(--border-base)", background: "var(--bg-surface)",
        padding: "clamp(36px,5vw,52px) 0 clamp(24px,4vw,36px)" }}>
      <div className="container">

        {/* Main grid */}
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div aria-hidden="true" style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: "linear-gradient(135deg, #8b5cf6, #d946ef)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 14,
                  boxShadow: "0 4px 12px rgba(139,92,246,0.32)" }}>AD</div>
              <div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 15,
                    color: "var(--text-primary)", margin: 0 }}>
                  Alex<span style={{ color: "#8b5cf6" }}>.</span>dev
                </p>
                <p style={{ fontSize: 11, color: "var(--text-subtle)", margin: 0 }}>
                  {lang === "fr" ? "Software Engineer · AI Engineer · Cloud & MLOps" : "Software Engineer · AI Engineer · Cloud & MLOps"}
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 240, marginBottom: 16 }}>
              {t.footer.tagline}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" }].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 34, height: 34, borderRadius: 9, border: "1.5px solid var(--border-base)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6"; (e.currentTarget as HTMLElement).style.color = "#8b5cf6"; (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.07)"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-base)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase",
                letterSpacing: "0.1em", marginBottom: 14 }}>Navigation</p>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <motion.button type="button" onClick={() => scrollTo(link.href)}
                      whileHover={{ x: 3 }}
                      style={{ padding: 0, fontSize: 13.5, fontWeight: 600,
                        color: "var(--text-muted)", background: "none", border: "none",
                        cursor: "pointer", fontFamily: "Plus Jakarta Sans, sans-serif",
                        transition: "color 0.2s" }}
                      onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "#8b5cf6")}
                      onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase",
                letterSpacing: "0.1em", marginBottom: 14 }}>Quick links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: t.footer.download, action: downloadCV },
                { label: t.footer.viewGitHub, href: "https://https://github.com/YALYMA/-projet-progammation-fonctionnel-M1" },
                { label: t.footer.linkedin, href: "https://www.linkedin.com/in/mamadou-yaly-85284b294" },
                { label: t.footer.bookCall, href: "https://calendly.com" },
              ].map(item => (
                item.href
                  ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "#8b5cf6")}
                      onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                      {item.label}
                    </a>
                  : <button key={item.label} type="button" onClick={item.action}
                      style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-muted)",
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        fontFamily: "Plus Jakarta Sans, sans-serif", textAlign: "left", transition: "color 0.2s" }}
                      onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "#8b5cf6")}
                      onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}>
                      {item.label}
                    </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase",
                letterSpacing: "0.1em", marginBottom: 14 }}>Status</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ padding: "12px 14px", borderRadius: 12,
                  background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.20)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                  <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
                      boxShadow: "0 0 0 3px rgba(34,197,94,0.22)", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>Open to work</span>
                </div>
                <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>Immediate availability</p>
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 12,
                  background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#8b5cf6", margin: "0 0 3px" }}>📱 PWA Ready</p>
                <p style={{ fontSize: 10.5, color: "var(--text-subtle)", margin: 0 }}>Installable · Offline support</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border-base)", marginTop: "clamp(28px,4vw,40px)", paddingTop: 22,
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ fontSize: 12.5, color: "var(--text-subtle)", margin: 0,
              display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
            © {new Date().getFullYear()} Mamadou Yaly &mdash; Made with{" "}
            <Heart size={11} color="#d946ef" fill="#d946ef" aria-label="love" />{" "}
            Construisons le futur 
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[t.footer.privacy, t.footer.terms].map(t => (
              <a key={t} href="#" style={{ fontSize: 12, color: "var(--text-subtle)", textDecoration: "none",
                  transition: "color 0.2s" }}
                onMouseOver={e => ((e.currentTarget as HTMLElement).style.color = "#8b5cf6")}
                onMouseOut={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-subtle)")}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 560px)  { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px)  { .footer-grid { grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; } }
      `}</style>
    </footer>
  );
}
