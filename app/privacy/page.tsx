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
    privacy: {
      title: "Politique de confidentialité",
      lastUpdate: "Dernière mise à jour : Mars 2026",
      intro: "Nous accordons une grande importance à votre vie privée. Cette politique explique quelles données sont collectées par Divizion Launcher et comment elles sont utilisées.",
      sections: {
        principle: {
          title: "Notre principe",
          content: "Divizion Launcher est conçu pour respecter votre vie privée. Nous ne collectons aucune donnée personnelle identifiable. Aucune information sensible n'est stockée sur nos serveurs."
        },
        analytics: {
          title: "Google Analytics",
          content: "Le launcher utilise Google Analytics avec nos propres balises personnalisées. Ces données sont exclusivement utilisées à des fins statistiques internes et non à des fins publicitaires.",
          details: [
            "Nous mesurons uniquement le nombre de lancements du launcher et des instances",
            "Aucune donnée personnelle ou identifiable n'est collectée",
            "Les statistiques sont totalement anonymisées",
            "Aucun profil utilisateur n'est créé",
            "Aucune publicité ciblée n'est diffusée"
          ]
        },
        discord: {
          title: "Discord RPC",
          content: "Le launcher intègre le support Discord RPC (Rich Presence) pour afficher votre activité Minecraft sur votre profil Discord. Cette fonctionnalité est optionnelle et peut être désactivée dans les paramètres.",
          details: [
            "La communication s'effectue uniquement entre votre ordinateur et Discord",
            "Aucune donnée n'est transmise à nos serveurs",
            "Vous gardez le contrôle total sur cette fonctionnalité"
          ]
        },
        local: {
          title: "Données locales",
          content: "Toutes vos données de jeu, configurations et instances sont stockées exclusivement sur votre ordinateur. Rien n'est synchronisé ou envoyé vers des serveurs externes sans votre consentement explicite."
        },
        thirdParty: {
          title: "Services tiers",
          content: "Le launcher peut interagir avec des services tiers pour fonctionner correctement :",
          details: [
            "Mojang / Microsoft pour l'authentification Minecraft (uniquement si vous utilisez un compte officiel)",
            "Modrinth, CurseForge et autres plateformes pour le téléchargement de mods et modpacks",
            "GitHub pour les mises à jour du launcher"
          ]
        },
        control: {
          title: "Votre contrôle",
          content: "Vous avez un contrôle total sur vos données. Vous pouvez à tout moment désactiver les statistiques anonymes et Discord RPC depuis les paramètres du launcher."
        },
        changes: {
          title: "Modifications",
          content: "Cette politique de confidentialité peut être mise à jour occasionnellement. Les modifications seront notifiées via le launcher ou notre GitHub."
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
    privacy: {
      title: "Privacy Policy",
      lastUpdate: "Last updated: March 2026",
      intro: "We take your privacy seriously. This policy explains what data is collected by Divizion Launcher and how it is used.",
      sections: {
        principle: {
          title: "Our Principle",
          content: "Divizion Launcher is designed to respect your privacy. We do not collect any personally identifiable information. No sensitive data is stored on our servers."
        },
        analytics: {
          title: "Google Analytics",
          content: "The launcher uses Google Analytics with our own custom tags. This data is exclusively used for internal statistical purposes and not for advertising.",
          details: [
            "We only measure the number of launcher and instance launches",
            "No personal or identifiable data is collected",
            "Statistics are completely anonymized",
            "No user profile is created",
            "No targeted advertising is displayed"
          ]
        },
        discord: {
          title: "Discord RPC",
          content: "The launcher includes Discord RPC (Rich Presence) support to display your Minecraft activity on your Discord profile. This feature is optional and can be disabled in settings.",
          details: [
            "Communication occurs only between your computer and Discord",
            "No data is transmitted to our servers",
            "You retain full control over this feature"
          ]
        },
        local: {
          title: "Local Data",
          content: "All your game data, configurations, and instances are stored exclusively on your computer. Nothing is synchronized or sent to external servers without your explicit consent."
        },
        thirdParty: {
          title: "Third-Party Services",
          content: "The launcher may interact with third-party services to function properly:",
          details: [
            "Mojang / Microsoft for Minecraft authentication (only if you use an official account)",
            "Modrinth, CurseForge, and other platforms for downloading mods and modpacks",
            "GitHub for launcher updates"
          ]
        },
        control: {
          title: "Your Control",
          content: "You have full control over your data. You can disable anonymous statistics and Discord RPC at any time from the launcher settings."
        },
        changes: {
          title: "Changes",
          content: "This privacy policy may be updated occasionally. Changes will be notified via the launcher or our GitHub."
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

function PrivacyContent() {
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
              <h1 className="legal-title">{t.privacy.title}</h1>
              <p className="legal-update">{t.privacy.lastUpdate}</p>
            </div>

            <div className="legal-content">
              <p className="legal-intro">{t.privacy.intro}</p>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.principle.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.principle.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.analytics.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.analytics.content}</p>
                <ul className="legal-list">
                  {t.privacy.sections.analytics.details.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.discord.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.discord.content}</p>
                <ul className="legal-list">
                  {t.privacy.sections.discord.details.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.local.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.local.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.thirdParty.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.thirdParty.content}</p>
                <ul className="legal-list">
                  {t.privacy.sections.thirdParty.details.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.control.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.control.content}</p>
              </div>

              <div className="legal-section">
                <h2 className="legal-section-title">{t.privacy.sections.changes.title}</h2>
                <p className="legal-section-text">{t.privacy.sections.changes.content}</p>
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
              <TransitionLink href="/legal" className="footer-link">{t.footer.legal}</TransitionLink>
              <TransitionLink href="/privacy" className="footer-link active">{t.footer.privacy}</TransitionLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <PrivacyContent />
    </PageWrapper>
  )
}
