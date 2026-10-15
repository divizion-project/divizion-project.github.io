"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import type { Language } from "@/lib/config";
import { ReleaseProvider } from "./release-provider";

const Context = createContext({
  lang: "fr" as Language,
  setLang: (_: Language) => {},
  t: (fr: string, en: string) => fr,
});
export function Provider({ children }: { children: React.ReactNode }) {
  const [lang, setLanguage] = useState<Language>("fr");
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("divizion-language");
    } catch {
      /* Device storage can be unavailable. */
    }
    setLanguage(
      stored === "en" || stored === "fr"
        ? stored
        : navigator.language.toLowerCase().startsWith("fr")
          ? "fr"
          : "en",
    );
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (value: Language) => {
    setLanguage(value);
    try {
      localStorage.setItem("divizion-language", value);
    } catch {
      /* Keep the choice in memory. */
    }
  };
  return (
    <Context.Provider
      value={{ lang, setLang, t: (fr, en) => (lang === "fr" ? fr : en) }}
    >
      <MotionConfig reducedMotion="user">
        <ReleaseProvider>{children}</ReleaseProvider>
      </MotionConfig>
    </Context.Provider>
  );
}
export const useLanguage = () => useContext(Context);
