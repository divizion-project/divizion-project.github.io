"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LANGUAGES, LOADERS, Language } from "@/lib/translations";
import { FR } from "@/lib/locales/fr";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: (key: string, defaultValue?: string) => any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("fr");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [translations, setTranslations] = useState<any>(FR);

    // Load language from local storage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage && LANGUAGES.some((l) => l.code === savedLanguage)) {
            setLanguage(savedLanguage);
        } else {
            // Detect browser language
            const browserLang = navigator.language.split("-")[0] as Language;
            if (LANGUAGES.some((l) => l.code === browserLang)) {
                setLanguage(browserLang);
            }
        }
    }, []);

    // Load translations and update html lang when language changes
    useEffect(() => {
        // Update HTML lang attribute
        document.documentElement.lang = language;

        async function loadTranslations() {
            if (language === "fr") {
                setTranslations(FR);
                return;
            }

            try {
                const loaded = await LOADERS[language]();
                setTranslations(loaded);
            } catch (error) {
                console.error(`Failed to load translations for ${language}`, error);
            }
        }
        loadTranslations();
    }, [language]);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (path: string, defaultValue?: string) => {
        const keys = path.split(".");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = translations;

        // Fallback to FR if translations are not loaded yet
        if (!current) {
            current = FR;
        }

        for (const key of keys) {
            if (current[key] === undefined) {
                // Try fallback to FR
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let fallback: any = FR;
                for (const k of keys) {
                    if (fallback && fallback[k] !== undefined) {
                        fallback = fallback[k];
                    } else {
                        fallback = undefined;
                        break;
                    }
                }
                if (fallback !== undefined) return fallback as string;

                if (defaultValue !== undefined) return defaultValue;

                console.warn(
                    `Translation missing for key: ${path} in language: ${language}`
                );
                return path;
            }
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
