"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "./translations";

interface LangContextType {
  lang: Lang;
  t: typeof translations.en;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Persist preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-lang") as Lang | null;
      if (saved === "fr" || saved === "en") setLang(saved);
    } catch { /* private browsing or storage blocked */ }
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const next: Lang = prev === "en" ? "fr" : "en";
      try {
        localStorage.setItem("portfolio-lang", next);
        document.documentElement.lang = next;
      } catch { /* ignore storage errors */ }
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as any, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);