"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, TRANSLATIONS, Translations } from "./i18n";

interface LangContextType {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "pt",
  t: TRANSLATIONS.pt,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lt-lang") as Lang) || "pt";
    }
    return "pt";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lt-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useT = () => useContext(LangContext);
