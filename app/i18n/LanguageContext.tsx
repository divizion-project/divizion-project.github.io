'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import fr from './fr.json'
import en from './en.json'

type Locale = 'fr' | 'en'

const translations: Record<Locale, typeof fr> = { fr, en }

function getNestedValue(obj: Record<string, any>, path: string): string {
  const result = path.split('.').reduce((acc, part) => acc?.[part], obj as any)
  return typeof result === 'string' ? result : path
}

interface LanguageContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'fr',
  setLocale: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('divizion-locale')
    if (saved === 'fr' || saved === 'en') {
      setLocaleState(saved)
      document.documentElement.lang = saved
    } else {
      const browserLang = navigator.language?.split('-')[0]
      const detected: Locale = browserLang === 'fr' ? 'fr' : 'en'
      setLocaleState(detected)
      document.documentElement.lang = detected
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('divizion-locale', l)
    document.documentElement.lang = l
  }, [])

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[locale], key)
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
