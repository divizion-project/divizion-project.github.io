'use client'

import { useState, useEffect } from 'react'
import { 
  Zap, Layers, Download, Settings, Users, 
  HardDrive, Gauge, Box, Loader, FileText, Play, Activity
} from 'lucide-react'

const translations = {
  fr: {
    hero: {
      badge: "Version 3.1",
      title: "Une nouvelle",
      titleAccent: "ère",
      titleEnd: "commence",
      description: "Divizion Launcher 3.1 arrive bientôt. Redesign complet axé sur la clarté, la vitesse et une expérience centrée sur les instances.",
      countdownLabel: "Lancement dans"
    },
    countdown: {
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes"
    },
    features: {
      redesign: {
        title: "Redesign Complet",
        description: "Page d'accueil retravaillée, interface entièrement responsive, nouvelle barre de titre unifiée"
      },
      usability: {
        title: "Amélioration de l'Utilisabilité",
        description: "Interactions fluides, support drag & drop, menu clic droit, support comptes Premium et Offline"
      },
      fabric: {
        title: "Support Fabric & Java Auto",
        description: "Installation automatique de Java, support complet de Fabric"
      },
      modsBrowser: {
        "title": "Navigateur de Mods Intégré",
        description: "Installez mods, modpacks et dépendances automatiquement"
      },
      import: {
        title: "Système d'Import Révisé",
        description: "Import depuis MultiMC, Prism Launcher, PolyMC et launcher officiel Minecraft"
      },
      multiInstance: {
        title: "Multi-Instances",
        description: "Lancez plusieurs instances simultanément, voire la même instance plusieurs fois"
      },
      activity: {
        title: "Centre d'Activité",
        description: "Suivez les téléchargements, actions du launcher et logs en temps réel"
      },
      performance: {
        title: "Performance Avancée",
        description: "Lancement jusqu'à 8× plus rapide, démarrage du launcher 2× plus rapide"
      },
      optimization: {
        title: "Système d'Optimisation",
        description: "Contrôle sur validation fichiers, cache bibliothèques natives, manifestes Mojang"
      },
      storage: {
        title: "Gestion du Stockage",
        description: "Analyse utilisation disque, gestion versions, composants et données prefetch"
      }
    },
    footer: {
      copyright: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      contact: "Contact"
    }
  },
  en: {
    hero: {
      badge: "Version 3.1",
      title: "A new",
      titleAccent: "era",
      titleEnd: "begins",
      description: "Divizion Launcher 3.1 is coming soon. A complete redesign focused on clarity, speed, and an instance-first experience.",
      countdownLabel: "Launch in"
    },
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    },
    features: {
      redesign: {
        title: "Complete Redesign",
        description: "Fully reworked home page, fully responsive interface, new unified title bar"
      },
      usability: {
        title: "Improved Usability",
        description: "Smoother interactions, drag & drop support, right-click menu, Premium and Offline account support"
      },
      fabric: {
        title: "Fabric Support & Auto Java",
        description: "Automatic Java installation, full Fabric support"
      },
      modsBrowser: {
        title: "Integrated Mods Browser",
        description: "Automatically install mods, modpacks and dependencies"
      },
      import: {
        title: "Revised Import System",
        description: "Import from MultiMC, Prism Launcher, PolyMC and official Minecraft Launcher"
      },
      multiInstance: {
        title: "Multi-Instances",
        description: "Launch multiple instances simultaneously, even the same instance multiple times"
      },
      activity: {
        title: "Activity Center",
        description: "Follow downloads, launcher actions and logs in real time"
      },
      performance: {
        title: "Advanced Performance",
        description: "Up to 8× faster launching, launcher startup up to 2× faster"
      },
      optimization: {
        title: "Optimization System",
        description: "Control over file validation, native library caching, Mojang manifests"
      },
      storage: {
        title: "Storage Management",
        description: "Disk usage analysis, version and component management, prefetch data"
      }
    },
    footer: {
      copyright: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      contact: "Contact"
    }
  }
}

function getBrowserLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr'
  const lang = navigator.language || (navigator as any).userLanguage || 'fr'
  const locale = lang.toLowerCase().split('-')[0]
  return locale === 'fr' ? 'fr' : 'en'
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const targetDate = new Date('2026-03-18T18:00:00+01:00')
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')

  useEffect(() => {
    setLocale(getBrowserLanguage())
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const t = translations[locale]

  const features = [
    { icon: FileText, key: 'redesign' },
    { icon: Settings, key: 'usability' },
    { icon: Layers, key: 'fabric' },
    { icon: Download, key: 'modsBrowser' },
    { icon: Box, key: 'import' },
    { icon: Play, key: 'multiInstance' },
    { icon: Activity, key: 'activity' },
    { icon: Zap, key: 'performance' },
    { icon: Gauge, key: 'optimization' },
    { icon: HardDrive, key: 'storage' },
  ]

  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
          <span className="logo-text">Divizion Launcher</span>
        </div>
      </header>

      <main className="main">
        <section className="hero-section">
          <div className="hero-content">
            <div className="badge">
              <span className="badge-dot"></span>
              {t.hero.badge}
            </div>

            <h1 className="hero-title">
              {t.hero.title}<br />
              <span className="accent">{t.hero.titleAccent}</span> {t.hero.titleEnd}
            </h1>

            <p className="hero-description">
              {t.hero.description}
            </p>

            <div className="countdown-section">
              <p className="countdown-label">{t.hero.countdownLabel}</p>
              <div className="countdown">
                <div className="countdown-item">
                  <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="countdown-unit">{t.countdown.days}</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                  <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="countdown-unit">{t.countdown.hours}</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                  <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="countdown-unit">{t.countdown.minutes}</span>
                </div>
                <span className="countdown-separator">:</span>
                <div className="countdown-item">
                  <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="countdown-unit">{t.countdown.seconds}</span>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="https://www.youtube.com/@divizionlauncher" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://discord.com/invite/2s69YumN8e" className="social-link" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              <a href="https://github.com/divizion-project" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="features-grid">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div className="feature-card" key={index}>
                    <div className="feature-card-icon">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div className="feature-card-text">
                      <h3 className="feature-card-title">{t.features[feature.key as keyof typeof t.features].title}</h3>
                      <p className="feature-card-desc">{t.features[feature.key as keyof typeof t.features].description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
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
