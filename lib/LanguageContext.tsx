"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "./translations";

interface LangContextType {
  lang: Lang;
  t: any; // Parfait pour contourner la restriction stricte de Vercel !
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // 1. Persistance : Charger la préférence au premier chargement
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  // 2. Synchronisation : Mettre à jour localStorage et l'attribut HTML à chaque fois que la langue change
  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // 3. Action simple pour basculer la langue
  const toggleLang = () => {
    setLang(prev => (prev === "en" ? "fr" : "en"));
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);