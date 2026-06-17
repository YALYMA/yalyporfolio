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
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    if (saved === "fr" || saved === "en") setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const next: Lang = prev === "en" ? "fr" : "en";
      localStorage.setItem("portfolio-lang", next);
      // Update html lang attribute for screen readers
      document.documentElement.lang = next;
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
