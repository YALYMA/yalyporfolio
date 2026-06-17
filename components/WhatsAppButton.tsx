"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "+221789092108"; // ← Remplacer par votre numéro (format international sans +)
const MESSAGE = encodeURIComponent("Bonjour YALY ! Je vous contacte depuis votre portfolio.");

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  // Afficher le bouton après 2 secondes
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000);
    // Pulse d'attention après 5 secondes
    const t2 = setTimeout(() => setPulsed(true), 5000);
    const t3 = setTimeout(() => setPulsed(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const waUrl = `https://wa.me/${PHONE}?text=${MESSAGE}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{
            position: "fixed",
            bottom: 28,
            right: 24,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexDirection: "row-reverse",
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "#111827",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 14px",
                  borderRadius: 10,
                  whiteSpace: "nowrap",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                  pointerEvents: "none",
                }}
              >
                Discutons sur WhatsApp 💬
                {/* Arrow */}
                <span style={{
                  position: "absolute",
                  right: -6,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "6px solid #111827",
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <div style={{ position: "relative" }}>
            {/* Pulse ring */}
            {pulsed && (
              <motion.div
                animate={{ scale: [1, 1.7, 1.7], opacity: [0.6, 0, 0] }}
                transition={{ duration: 1.4, repeat: 3, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#25d366",
                  zIndex: -1,
                }}
              />
            )}

            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter Alex sur WhatsApp"
              whileHover={{ scale: 1.10 }}
              whileTap={{ scale: 0.93 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
                boxShadow: "0 6px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.12)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {/* WhatsApp SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="30"
                height="30"
                fill="#fff"
                aria-hidden="true"
              >
                <path d="M16.002 2C8.28 2 2 8.28 2 16c0 2.478.664 4.8 1.822 6.8L2 30l7.378-1.794A13.94 13.94 0 0016.002 30C23.72 30 30 23.72 30 16S23.72 2 16.002 2zm0 25.6a11.55 11.55 0 01-5.892-1.61l-.422-.252-4.378 1.064 1.1-4.264-.276-.438A11.558 11.558 0 014.4 16c0-6.398 5.204-11.6 11.602-11.6C22.4 4.4 27.6 9.602 27.6 16S22.4 27.6 16.002 27.6zM22.8 19.04c-.348-.174-2.06-1.016-2.38-1.132-.322-.116-.556-.174-.79.174-.232.348-.9 1.132-1.104 1.366-.202.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.936-2.408-.202-.348-.022-.536.152-.71.156-.154.348-.406.522-.608.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.608-.086-.174-.79-1.904-1.082-2.608-.284-.684-.574-.59-.79-.6l-.672-.012c-.232 0-.608.086-.926.434-.318.348-1.214 1.186-1.214 2.892 0 1.706 1.242 3.354 1.416 3.586.174.232 2.444 3.73 5.922 5.232.828.358 1.474.572 1.978.732.832.264 1.588.226 2.186.138.668-.1 2.06-.842 2.35-1.656.292-.814.292-1.512.204-1.658-.086-.144-.32-.232-.668-.406z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
