'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { Locale, LOCALES, DEFAULT_LOCALE, FALLBACK_LOCALE, LocaleInfo } from './types';

import frTranslations from './locales/fr.json';
import enTranslations from './locales/en.json';

const TRANSLATIONS: Record<Locale, typeof frTranslations> = {
    fr: frTranslations,
    en: enTranslations,
};

const STORAGE_KEY = 'divizion-locale';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: (key: string, params?: Record<string, string>) => any;
    locales: LocaleInfo[];
    isCurrentLocale: (locale: Locale) => boolean;
    toggleLocale: () => void;
    currentLocaleInfo: LocaleInfo;
}

const I18nContext = createContext<I18nContextType | null>(null);

function detectBrowserLocale(): Locale {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;
    const browserLang = navigator.language.split('-')[0];
    const supportedLocale = LOCALES.find(l => l.code === browserLang);
    return supportedLocale?.code ?? DEFAULT_LOCALE;
}

function getSavedLocale(): Locale | null {
    if (typeof window === 'undefined') return null;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && LOCALES.some(l => l.code === saved)) {
            return saved as Locale;
        }
    } catch {
        // Storage might be unavailable
    }
    return null;
}

function saveLocale(locale: Locale): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(STORAGE_KEY, locale);
    } catch {
        // Storage might be unavailable
    }
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
        if (current && typeof current === 'object' && key in current) {
            return (current as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

function interpolate(text: string, params?: Record<string, string>): string {
    if (!params) return text;
    return Object.entries(params).reduce((result, [key, value]) => {
        const regex = new RegExp('\\{' + key + '\\}', 'g');
        return result.replace(regex, value);
    }, text);
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const savedLocale = getSavedLocale();
        const initialLocale = savedLocale ?? detectBrowserLocale();
        setLocaleState(initialLocale);
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            document.documentElement.lang = locale;
        }
    }, [locale, isHydrated]);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        saveLocale(newLocale);
    }, []);

    const toggleLocale = useCallback(() => {
        const currentIndex = LOCALES.findIndex(l => l.code === locale);
        const nextIndex = (currentIndex + 1) % LOCALES.length;
        setLocale(LOCALES[nextIndex].code);
    }, [locale, setLocale]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = useCallback((key: string, params?: Record<string, string>): any => {
        let value = getNestedValue(TRANSLATIONS[locale] as unknown as Record<string, unknown>, key);
        if (value === undefined && locale !== FALLBACK_LOCALE) {
            value = getNestedValue(TRANSLATIONS[FALLBACK_LOCALE] as unknown as Record<string, unknown>, key);
        }
        if (value === undefined) {
            console.warn('[i18n] Missing translation for key: "' + key + '" in locale: "' + locale + '"');
            return key;
        }
        if (typeof value !== 'string') {
            return value;
        }
        return interpolate(value, params);
    }, [locale]);

    const isCurrentLocale = useCallback((l: Locale) => l === locale, [locale]);

    const currentLocaleInfo = useMemo(() => {
        return LOCALES.find(l => l.code === locale) ?? LOCALES[0];
    }, [locale]);

    const contextValue = useMemo<I18nContextType>(() => ({
        locale,
        setLocale,
        t,
        locales: LOCALES,
        isCurrentLocale,
        toggleLocale,
        currentLocaleInfo,
    }), [locale, setLocale, t, isCurrentLocale, toggleLocale, currentLocaleInfo]);

    return React.createElement(
        I18nContext.Provider,
        { value: contextValue },
        children
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

export function useTranslation() {
    const { t, locale } = useI18n();
    return { t, locale };
}

export { LOCALES, DEFAULT_LOCALE } from './types';
export type { Locale, LocaleInfo } from './types';
