'use client'

import { useState, useEffect } from 'react'
import TransitionLink from '../components/TransitionLink'
import PageWrapper from '../components/PageWrapper'
import { usePageTransition } from '../components/PageTransition'

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      download: "Télécharger"
    },
    legal: {
      title: "Mentions légales",
      lastUpdate: "Dernière mise à jour : Mars 2026",
      sections: {
        editor: {
          title: "Éditeur",
          content: "Divizion Launcher est développé et édité par Seizure."
        },
        project: {
          title: "Le projet",
          content: "Divizion Launcher est un logiciel gratuit et open source, conçu pour simplifier la gestion de vos instances Minecraft. Le code source est disponible publiquement sur GitHub."
        },
        license: {
          title: "Licence",
          content: "Le logiciel est distribué sous licence open source. Vous êtes libre de l'utiliser, de l'étudier, de le modifier et de le redistribuer selon les termes de la licence."
        },
        trademarks: {
          title: "Marques déposées",
          content: "Minecraft est une marque déposée de Mojang Studios / Microsoft. Divizion Launcher n'est pas affilié, associé ou approuvé par Mojang Studios ou Microsoft."
        },
        responsibility: {
          title: "Responsabilité",
          content: "Le logiciel est fourni « en l'état », sans garantie d'aucune sorte. L'équipe de développement ne peut être tenue responsable des dommages directs ou indirects résultant de l'utilisation du logiciel."
        },
        contact: {
          title: "Contact",
          content: "Pour toute question concernant ces mentions légales, vous pouvez nous contacter via notre GitHub."
        }
      }
    },
    footer: {
      copyright: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité"
    }
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      download: "Download"
    },
    legal: {
      title: "Legal Notice",
      lastUpdate: "Last updated: March 2026",
      sections: {
        editor: {
          title: "Editor",
          content: "Divizion Launcher is developed and published by Seizure."
        },
        project: {
          title: "The Project",
          content: "Divizion Launcher is free and open source software, designed to simplify the management of your Minecraft instances. The source code is publicly available on GitHub."
        },
        license: {
          title: "License",
          content: "The software is distributed under an open source license. You are free to use, study, modify, and redistribute it according to the terms of the license."
        },
        trademarks: {
          title: "Trademarks",
          content: "Minecraft is a registered trademark of Mojang Studios / Microsoft. Divizion Launcher is not affiliated with, associated with, or endorsed by Mojang Studios or Microsoft."
        },
        responsibility: {
          title: "Liability",
          content: "The software is provided \"as is\", without warranty of any kind. The development team cannot be held responsible for any direct or indirect damages resulting from the use of the software."
        },
        contact: {
          title: "Contact",
          content: "For any questions regarding this legal notice, you can contact us via our GitHub."
        }
      }
    },
    footer: {
      copyright: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy"
    }
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

function LegalContent() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const { isFirstVisit } = usePageTransition()
  const t = translations[locale]

  useEffect(() => {
    setLocale(getBrowserLanguage())
  }, [])

  return (
    <div className="page-content visible page-enter">
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div className="logo-section">
              <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
              <span className="logo-text">Divizion Launcher</span>
            </div>
            <nav className="nav-links">
              <TransitionLink href="/" className="nav-link" direction="right">{t.nav.home}</TransitionLink>
              <TransitionLink href="/#features" className="nav-link" direction="right">{t.nav.features}</TransitionLink>
              <TransitionLink href="/download" className="nav-link" direction="right">{t.nav.download}</TransitionLink>
              <button 
                className="lang-toggle" 
                onClick={() => {
                  const newLocale = locale === 'fr' ? 'en' : 'fr'
                  setLocale(newLocale)
                  localStorage.setItem('divizion-locale', newLocale)
                }}
                title={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
              >
                {locale === 'fr' ? 'EN' : 'FR'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="legal-page">
          <div className="container">
            <div className="legal-header">
              <h1 className="legal-title">{t.legal.title}</h1>
              <p className="legal-update">{t.legal.lastUpdate}</p>
            </div>

            <div className="legal-content">
              <div className="legal-section">
                <h2 className="legal-section-title">{t.legal.sections.editor.title}</h2>
                <p className="legal-section-text">{t.legal.sections.editor.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.legal.sections.project.title}</h2>
                <p className="legal-section-text">{t.legal.sections.project.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.legal.sections.license.title}</h2>
                <p className="legal-section-text">{t.legal.sections.license.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.legal.sections.trademarks.title}</h2>
                <p className="legal-section-text">{t.legal.sections.trademarks.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.legal.sections.responsibility.title}</h2>
                <p className="legal-section-text">{t.legal.sections.responsibility.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.legal.sections.contact.title}</h2>
                <p className="legal-section-text">{t.legal.sections.contact.content}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-seizure">
              <span className="footer-by">by</span>
              <img src="/seizure-logo-black.webp" alt="Seizure" className="footer-seizure-logo" />
            </div>
            <div className="footer-links">
              <TransitionLink href="/legal" className="footer-link active">{t.footer.legal}</TransitionLink>
              <TransitionLink href="/privacy" className="footer-link">{t.footer.privacy}</TransitionLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function LegalPage() {
  return (
    <PageWrapper>
      <LegalContent />
    </PageWrapper>
  )
}
