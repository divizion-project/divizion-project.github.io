'use client'

import { useState, useEffect } from 'react'
import { Home, ArrowLeft, Download, Search, FileQuestion, MapPin, Compass } from 'lucide-react'
import { useLanguage } from './i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

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
              <span>{t('notFound.errorDetails')}</span>
            </div>
            
            <h1 className="not-found-title">{t('notFound.title')}</h1>
            <h2 className="not-found-subtitle">{t('notFound.subtitle')}</h2>
            <p className="not-found-description">{t('notFound.description')}</p>
            
            <div className="not-found-path-info">
              <span className="not-found-path-label">{t('notFound.pathLabel')}</span>
              <span className="not-found-path-value">{currentPath}</span>
            </div>

            <div className="not-found-actions">
              <a href="/" className="not-found-btn-primary">
                <Home size={16} strokeWidth={1.5} />
                {t('notFound.backHome')}
              </a>
              <button onClick={() => window.history.back()} className="not-found-btn-secondary">
                <ArrowLeft size={16} strokeWidth={1.5} />
                {t('notFound.goBack')}
              </button>
            </div>
          </div>

          <div className="not-found-right">
            <div className="not-found-suggestions-card">
              <div className="not-found-suggestions-header">
                <Compass size={18} strokeWidth={1.5} />
                <span>{t('notFound.suggestions')}</span>
              </div>
              <ul className="not-found-suggestions-list">
                <li>
                  <span className="not-found-suggestion-number">01</span>
                  <span>{t('notFound.suggestion1')}</span>
                </li>
                <li>
                  <span className="not-found-suggestion-number">02</span>
                  <span>{t('notFound.suggestion2')}</span>
                </li>
                <li>
                  <span className="not-found-suggestion-number">03</span>
                  <span>{t('notFound.suggestion3')}</span>
                </li>
              </ul>
            </div>

            <div className="not-found-links-section">
              <span className="not-found-links-title">{t('notFound.helpfulLinks')}</span>
              <div className="not-found-links-grid">
                <a href="/" className="not-found-link-card">
                  <div className="not-found-link-icon">
                    <Home size={20} strokeWidth={1.5} />
                  </div>
                  <div className="not-found-link-content">
                    <span className="not-found-link-title">{t('notFound.homePage')}</span>
                    <span className="not-found-link-desc">divizion.app</span>
                  </div>
                </a>
                <a href="/download" className="not-found-link-card">
                  <div className="not-found-link-icon">
                    <Download size={20} strokeWidth={1.5} />
                  </div>
                  <div className="not-found-link-content">
                    <span className="not-found-link-title">{t('notFound.downloadPage')}</span>
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
