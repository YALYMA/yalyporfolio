"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, MapPin, Sparkles, Download, ArrowRight, Star } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { STATS } from "@/lib/data";

const TYPED_EN = ["Software Engineer","AI Engineer","Cloud & MLOps Specialist","Open Source Contributor"] as const;
const TYPED_FR = ["Software Engineer","AI Engineer","Spécialiste Cloud & MLOps","Contributeur Open Source"] as const;

function downloadCV() {
  try {
    const a = document.createElement("a");
    a.href = "mamadouyaly.pdf";
    a.download = "mamadouyaly.pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  } catch { /* ignore */ }
}

function useTyping(strings: readonly string[], speed = 75, pause = 2400) {
  const [text, setText] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[si % strings.length];
    if (!del && ci < cur.length) { const t = setTimeout(() => setCi(c => c+1), speed); return () => clearTimeout(t); }
    if (!del && ci === cur.length) { const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t); }
    if (del && ci > 0) { const t = setTimeout(() => setCi(c => c-1), speed/2); return () => clearTimeout(t); }
    if (del && ci === 0) { setDel(false); setSi(i => (i+1) % strings.length); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ci, del, si, speed, pause]);
  useEffect(() => { setText(strings[si % strings.length].slice(0, ci)); }, [ci, si, strings]);
  return text;
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60; let cur = 0; const inc = target / steps;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(timer); return; }
      setCount(Math.floor(cur));
    }, 1600 / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={spanRef}
      style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 900,
        background: "linear-gradient(135deg,#d946ef,#8b5cf6)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        display: "inline-block" }}>
      {count}{suffix}
    </span>
  );
}

export default function Hero() {
  const { lang, t } = useLang();
  const strings = lang === "fr" ? TYPED_FR : TYPED_EN;
  const typed = useTyping(strings);
  const [activeTag, setActiveTag] = useState(0);

  useEffect(() => {
    setActiveTag(0);
  }, [lang]);

  useEffect(() => {
    const timer = setInterval(() => setActiveTag(a => (a+1) % t.openTo.length), 2500);
    return () => clearInterval(timer);
  }, [t.openTo.length]);

  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center",
        position:"relative", overflow:"hidden", paddingTop:64 }}>
      <div className="dot-grid" style={{ position:"absolute", inset:0, opacity:0.5 }} />
      <div className="blob" style={{ width:"clamp(250px,45vw,580px)", height:"clamp(250px,45vw,580px)", background:"rgba(139,92,246,0.12)", top:"-12%", right:"-2%" }} />
      <div className="blob" style={{ width:"clamp(180px,32vw,400px)", height:"clamp(180px,32vw,400px)", background:"rgba(217,70,239,0.10)", bottom:"5%", left:"-4%" }} />
      <div className="blob" style={{ width:"clamp(120px,20vw,260px)", height:"clamp(120px,20vw,260px)", background:"rgba(6,182,212,0.09)", top:"38%", right:"26%" }} />

      <div className="container" style={{ position:"relative", zIndex:10 }}>
        <div className="hero-grid">

          {/* LEFT */}
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>

            <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.05 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:22,
                  padding:"6px 14px 6px 10px", borderRadius:999,
                  background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.22)" }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e",
                    boxShadow:"0 0 0 3px rgba(34,197,94,0.25)", flexShrink:0, animation:"pulse 2s infinite" }} />
                <AnimatePresence mode="wait">
                  <motion.span key={`avail-${lang}`}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    transition={{ duration:0.2 }}
                    style={{ fontSize:12.5, fontWeight:700, color:"#15803d" }}>
                    {t.hero.available}
                  </motion.span>
                </AnimatePresence>
                <Sparkles size={12} color="#22c55e" aria-hidden="true" />
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
              style={{ fontFamily:"Outfit,sans-serif", fontSize:"clamp(42px,7.5vw,80px)",
                fontWeight:900, lineHeight:1.03, letterSpacing:"-0.035em", marginBottom:6, color:"var(--text-primary)" }}>
              Mamadou<br />
              <span className="text-gradient">Yaly</span>
            </motion.h1>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28 }}
              style={{ minHeight:38, marginBottom:18 }}>
              <p style={{ fontSize:"clamp(16px,2.8vw,22px)", fontWeight:600, color:"var(--text-secondary)", letterSpacing:"-0.01em" }}>
                {typed}
                <span aria-hidden="true" style={{ display:"inline-block", width:2.5, height:"0.95em",
                    background:"#8b5cf6", marginLeft:3, verticalAlign:"middle", animation:"pulse 1s step-end infinite" }} />
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.p key={`bio-${lang}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ delay:0.38, duration:0.3 }}
                style={{ fontSize:"clamp(14px,1.7vw,16.5px)", color:"var(--text-muted)", lineHeight:1.8, maxWidth:500, marginBottom:10 }}>
                {t.hero.bio}
              </motion.p>
            </AnimatePresence>

            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.43 }}
              style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"var(--text-subtle)", marginBottom:30 }}>
              <MapPin size={13} color="#8b5cf6" aria-hidden="true" />
              {t.hero.location}
            </motion.p>

            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
              style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:32 }}>
              <motion.button type="button" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                onClick={() => { try { document.querySelector("#projects")?.scrollIntoView({ behavior:"smooth" }); } catch { /**/ } }}
                className="btn-primary">
                {t.hero.viewWork} <ArrowRight size={15} aria-hidden="true" />
              </motion.button>
              <motion.button type="button" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                onClick={downloadCV} className="btn-ghost">
                <Download size={14} aria-hidden="true" /> {t.hero.downloadCV}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.62 }}
              style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              {[{ Icon:Github, href:"https://github.com/YALYMA/-projet-progammation-fonctionnel-M1", label:"GitHub" },
                { Icon:Linkedin, href:"https://linkedin.com", label:"LinkedIn" }]
                .map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-muted)",
                      textDecoration:"none", fontSize:13, fontWeight:600, transition:"color 0.2s" }}
                    onMouseOver={e => ((e.currentTarget as HTMLElement).style.color="#8b5cf6")}
                    onMouseOut={e => ((e.currentTarget as HTMLElement).style.color="var(--text-muted)")}>
                    <Icon size={17} aria-hidden="true" /> {label}
                  </a>
                ))}
              <span style={{ width:1, height:18, background:"var(--border-base)" }} aria-hidden="true" />
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" aria-hidden="true" />)}
                <span style={{ fontSize:12, color:"var(--text-muted)", fontWeight:500, marginLeft:4 }}>5.0 / 12 reviews</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity:0, x:32 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7, delay:0.25 }}
            style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:5.5, repeat:Infinity, ease:"easeInOut" }}
              className="card" style={{ padding:"clamp(20px,3vw,30px)" }}>

              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22,
                  paddingBottom:18, borderBottom:"1px solid var(--border-base)" }}>
                <div style={{ width:58, height:58, borderRadius:16, flexShrink:0,
                    background:"linear-gradient(135deg,#8b5cf6,#d946ef)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontFamily:"Outfit,sans-serif", fontWeight:900, fontSize:21,
                    boxShadow:"0 8px 24px rgba(139,92,246,0.38)" }} aria-label="Avatar Mamadou Yaly">MY</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <h2 style={{ fontFamily:"Outfit,sans-serif", fontWeight:800, fontSize:18, color:"var(--text-primary)", margin:"0 0 2px" }}>Mamadou Yaly</h2>
                  <p style={{ color:"var(--text-muted)", fontSize:12.5, margin:"0 0 6px" }}>Software · AI · MLOps — 5 YOE</p>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    <span className="pill pill-emerald" style={{ fontSize:10 }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e" }} />
                      Open to Work
                    </span>
                    <span className="pill pill-violet" style={{ fontSize:10 }}>Remote OK</span>
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
                {[
                  { label: lang==="fr" ? "Localisation" : "Location",      value:"Sénégal.Sn" },
                  { label: lang==="fr" ? "Disponibilité" : "Availability",  value: lang==="fr" ? "Immédiate" : "Immediate" },
                  { label: lang==="fr" ? "Expérience" : "Experience",       value: lang==="fr" ? "5 ans" : "5 Years" },
                  { label: lang==="fr" ? "Langues" : "Languages",           value:"FR / EN (C1)" },
                ].map(item => (
                  <div key={item.label} style={{ background:"var(--bg-muted)", borderRadius:9, padding:"9px 10px", border:"1px solid var(--border-base)" }}>
                    <p style={{ fontSize:9, color:"var(--text-subtle)", margin:"0 0 2px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em" }}>{item.label}</p>
                    <p style={{ fontSize:12, fontWeight:700, color:"var(--text-secondary)", margin:0 }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom:18 }}>
                <p style={{ fontSize:9, color:"var(--text-subtle)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:8 }}>{t.hero.openTo}</p>
                <div style={{ minHeight:26 }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={`${lang}-${activeTag}`}
                      initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0, y:-6 }} transition={{ duration:0.25 }}
                      className="pill pill-violet" style={{ fontSize:11 }}>
                      {t.openTo[activeTag]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div style={{ marginBottom:18 }}>
                <p style={{ fontSize:9, color:"var(--text-subtle)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:7 }}>{t.hero.coreStack}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {["React","Next.js","TypeScript","Node.js","Python","AWS","Docker","LLMs"].map(tech => (
                    <span key={tech} className="pill pill-primary" style={{ fontSize:10 }}>{tech}</span>
                  ))}
                </div>
              </div>

              <motion.button type="button" onClick={downloadCV} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                aria-label="Download Resume PDF"
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  padding:"11px 16px", borderRadius:11,
                  background:"linear-gradient(135deg,#8b5cf6,#d946ef)",
                  color:"#fff", border:"none", cursor:"pointer",
                  fontFamily:"Plus Jakarta Sans,sans-serif", fontWeight:700, fontSize:13.5,
                  boxShadow:"0 4px 16px rgba(139,92,246,0.35)" }}>
                <Download size={14} aria-hidden="true" />
                {t.hero.downloadBtn}
              </motion.button>
            </motion.div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {STATS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.5+i*0.09 }} className="card" style={{ padding:"16px 12px", textAlign:"center" }}>
                  <Counter target={s.value} suffix={s.suffix} />
                  <AnimatePresence mode="wait">
                    <motion.p key={`${lang}-stat-${i}`}
                      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      transition={{ duration:0.2 }}
                      style={{ fontSize:10, color:"var(--text-muted)", marginTop:3, lineHeight:1.4 }}>
                      {t.stats[i]?.label ?? s.label}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}
          aria-hidden="true" style={{ marginTop:44, display:"flex", flexDirection:"column", alignItems:"center", gap:5, color:"var(--text-subtle)" }}>
          <span style={{ fontSize:9.5, textTransform:"uppercase", letterSpacing:"0.14em" }}>Scroll</span>
          <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.6, repeat:Infinity }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero-grid { display:grid; grid-template-columns:1fr; gap:36px; align-items:center; padding:28px 0 20px; }
        @media (min-width:900px) { .hero-grid { grid-template-columns:1.1fr 0.9fr; gap:60px; padding:0; } }
      `}</style>
    </section>
  );
}