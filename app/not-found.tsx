'use client'

import { useState, useEffect } from 'react'
import { Home, ArrowLeft, Download, Search, FileQuestion, MapPin, Compass } from 'lucide-react'

const translations = {
  fr: {
    title: "404",
    subtitle: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
    goBack: "Retour en arrière",
    helpfulLinks: "Liens utiles",
    downloadPage: "Téléchargements",
    homePage: "Page d'accueil",
    searchSuggestion: "Que recherchez-vous ?",
    errorDetails: "Erreur 404",
    pathLabel: "Chemin demandé",
    suggestions: "Suggestions",
    suggestion1: "Vérifiez l'orthographe de l'URL",
    suggestion2: "Utilisez la navigation ci-dessous",
    suggestion3: "Retournez à la page d'accueil"
  },
  en: {
    title: "404",
    subtitle: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home",
    goBack: "Go back",
    helpfulLinks: "Helpful links",
    downloadPage: "Downloads",
    homePage: "Home page",
    searchSuggestion: "What are you looking for?",
    errorDetails: "Error 404",
    pathLabel: "Requested path",
    suggestions: "Suggestions",
    suggestion1: "Check the URL spelling",
    suggestion2: "Use the navigation below",
    suggestion3: "Return to the home page"
  }
}

function getBrowserLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr'
  const saved = localStorage.getItem('divizion-locale')
  if (saved === 'fr' || saved === 'en') return saved
  const lang = navigator.language || (navigator as any).userLanguage || 'fr'
  const locale = lang.toLowerCase().split('-')[0]
  return locale === 'fr' ? 'fr' : 'en'
}

export default function NotFound() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setLocale(getBrowserLanguage())
    setCurrentPath(window.location.pathname)
  }, [])

  const t = translations[locale]

  return (
    <div className="not-found-container">
      <header className="not-found-header">
        <div className="not-found-logo-section">
          <img src="/divizion-logo.webp" alt="Divizion Launcher" className="not-found-logo-image" />
          <span className="not-found-logo-text">Divizion Launcher</span>
        </div>
      </header>

      <main className="not-found-main">
        <div className="not-found-grid">
          <div className="not-found-left">
            <div className="not-found-error-badge">
              <FileQuestion size={14} strokeWidth={1.5} />
              <span>{t.errorDetails}</span>
            </div>
            
            <h1 className="not-found-title">{t.title}</h1>
            <h2 className="not-found-subtitle">{t.subtitle}</h2>
            <p className="not-found-description">{t.description}</p>
            
            <div className="not-found-path-info">
              <span className="not-found-path-label">{t.pathLabel}</span>
              <span className="not-found-path-value">{currentPath}</span>
            </div>

            <div className="not-found-actions">
              <a href="/" className="not-found-btn-primary">
                <Home size={16} strokeWidth={1.5} />
                {t.backHome}
              </a>
              <button onClick={() => window.history.back()} className="not-found-btn-secondary">
                <ArrowLeft size={16} strokeWidth={1.5} />
                {t.goBack}
              </button>
            </div>
          </div>

          <div className="not-found-right">
            <div className="not-found-suggestions-card">
              <div className="not-found-suggestions-header">
                <Compass size={18} strokeWidth={1.5} />
                <span>{t.suggestions}</span>
              </div>
              <ul className="not-found-suggestions-list">
                <li>
                  <span className="not-found-suggestion-number">01</span>
                  <span>{t.suggestion1}</span>
                </li>
                <li>
                  <span className="not-found-suggestion-number">02</span>
                  <span>{t.suggestion2}</span>
                </li>
                <li>
                  <span className="not-found-suggestion-number">03</span>
                  <span>{t.suggestion3}</span>
                </li>
              </ul>
            </div>

            <div className="not-found-links-section">
              <span className="not-found-links-title">{t.helpfulLinks}</span>
              <div className="not-found-links-grid">
                <a href="/" className="not-found-link-card">
                  <div className="not-found-link-icon">
                    <Home size={20} strokeWidth={1.5} />
                  </div>
                  <div className="not-found-link-content">
                    <span className="not-found-link-title">{t.homePage}</span>
                    <span className="not-found-link-desc">divizion.app</span>
                  </div>
                </a>
                <a href="/download" className="not-found-link-card">
                  <div className="not-found-link-icon">
                    <Download size={20} strokeWidth={1.5} />
                  </div>
                  <div className="not-found-link-content">
                    <span className="not-found-link-title">{t.downloadPage}</span>
                    <span className="not-found-link-desc">divizion.app/download</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="not-found-decoration">
          <div className="not-found-grid-lines">
            <div className="not-found-grid-line"></div>
            <div className="not-found-grid-line"></div>
            <div className="not-found-grid-line"></div>
            <div className="not-found-grid-line"></div>
          </div>
        </div>
      </main>

      <footer className="not-found-footer">
        <div className="not-found-footer-seizure">
          <span className="not-found-footer-by">by</span>
          <img src="/seizure-logo-black.webp" alt="Seizure" className="not-found-footer-seizure-logo" />
        </div>
      </footer>
    </div>
  )
}
