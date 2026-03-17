'use client'

import { useState, useEffect } from 'react'
import { Home } from 'lucide-react'

const translations = {
  fr: {
    title: "404",
    subtitle: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil"
  },
  en: {
    title: "404",
    subtitle: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home"
  }
}

function getBrowserLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr'
  const lang = navigator.language || (navigator as any).userLanguage || 'fr'
  const locale = lang.toLowerCase().split('-')[0]
  return locale === 'fr' ? 'fr' : 'en'
}

export default function NotFound() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')

  useEffect(() => {
    setLocale(getBrowserLanguage())
  }, [])

  const t = translations[locale]

  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
          <span className="logo-text">Divizion Launcher</span>
        </div>
      </header>

      <main className="main">
        <div className="error-container">
          <div className="error-content">
            <h1 className="error-title">{t.title}</h1>
            <h2 className="error-subtitle">{t.subtitle}</h2>
            <p className="error-description">{t.description}</p>
            <a href="/" className="error-button">
              <Home size={18} strokeWidth={1.5} />
              {t.backHome}
            </a>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-seizure">
          <span className="footer-by">by</span>
          <img src="/seizure-logo-black.webp" alt="Seizure" className="footer-seizure-logo" />
        </div>
      </footer>
    </div>
  )
}
