'use client'

import { useState, useEffect } from 'react'
import TransitionLink from '../components/TransitionLink'
import PageWrapper from '../components/PageWrapper'
import { usePageTransition } from '../components/PageTransition'
import { version, downloadsData } from '../lib/version'
import { 
  Download, X, Monitor, Terminal, Cpu, ChevronRight,
  ExternalLink, Sparkles
} from 'lucide-react'

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      docs: "Documentation",
      download: "Télécharger"
    },
    download: {
      title: "Télécharger",
      subtitle: "Choisissez votre plateforme pour commencer",
      version: "Version",
      size: "Taille",
      sha256: "SHA-256",
      downloadBtn: "Télécharger",
      recommended: "Recommandé pour vous"
    },
    modal: {
      mac: {
        title: "Télécharger pour macOS",
        armTitle: "Apple Silicon (M1/M2/M3)",
        armDesc: "Pour les Mac sortis après 2020 avec processeur Apple Silicon",
        intelTitle: "Intel (x64)",
        intelDesc: "Pour les Mac sortis avant 2020 avec processeur Intel"
      },
      windows: {
        title: "Télécharger pour Windows",
        x64Title: "Windows x64",
        x64Desc: "Pour les PC avec processeur AMD ou Intel (64 bits)"
      },
      linux: {
        title: "Télécharger pour Linux",
        armTitle: "ARM64",
        armDesc: "Pour les systèmes Linux sur architecture ARM",
        x64Title: "x64",
        x64Desc: "Pour les systèmes Linux sur architecture Intel/AMD"
      }
    },
    changelog: {
      title: "Dernières nouveautés",
      viewAll: "Voir tout sur GitHub",
      loading: "Chargement..."
    },
    versions: {
      title: "Versions précédentes",
      filterBy: "Filtrer par OS",
      all: "Tous"
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
      docs: "Documentation",
      download: "Download"
    },
    download: {
      title: "Download",
      subtitle: "Choose your platform to get started",
      version: "Version",
      size: "Size",
      sha256: "SHA-256",
      downloadBtn: "Download",
      recommended: "Recommended for you"
    },
    modal: {
      mac: {
        title: "Download for macOS",
        armTitle: "Apple Silicon (M1/M2/M3)",
        armDesc: "For Macs released after 2020 with Apple Silicon processor",
        intelTitle: "Intel (x64)",
        intelDesc: "For Macs released before 2020 with Intel processor"
      },
      windows: {
        title: "Download for Windows",
        x64Title: "Windows x64",
        x64Desc: "For PCs with AMD or Intel processor (64-bit)"
      },
      linux: {
        title: "Download for Linux",
        armTitle: "ARM64",
        armDesc: "For Linux systems on ARM architecture",
        x64Title: "x64",
        x64Desc: "For Linux systems on Intel/AMD architecture"
      }
    },
    changelog: {
      title: "Latest changes",
      viewAll: "View all on GitHub",
      loading: "Loading..."
    },
    versions: {
      title: "Previous versions",
      filterBy: "Filter by OS",
      all: "All"
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
  return lang.toLowerCase().split('-')[0] === 'fr' ? 'fr' : 'en'
}

function detectOS(): string {
  if (typeof window === 'undefined') return 'windows'
  const ua = navigator.userAgent
  if (ua.includes('Mac')) return 'mac'
  if (ua.includes('Linux') || ua.includes('X11')) return 'linux'
  if (ua.includes('Win')) return 'windows'
  return 'windows'
}

const previousVersions = [
  { version: '3.1.0', date: { fr: '18 mars 2026', en: 'Mar 18, 2026' }, os: ['windows', 'mac', 'linux'], tag: { fr: 'Précédente', en: 'Previous' } },
  { version: '3.0.1', date: { fr: '15 nov. 2025', en: 'Nov 15, 2025' }, os: ['windows', 'mac'], tag: { fr: 'Précédente', en: 'Previous' } },
  { version: '3.0.0', date: { fr: '28 oct. 2025', en: 'Oct 28, 2025' }, os: ['windows', 'mac', 'linux'], tag: { fr: 'Majeure', en: 'Major' } },
  { version: '2.5.0', date: { fr: '15 sep. 2025', en: 'Sep 15, 2025' }, os: ['windows', 'mac'], tag: { fr: 'Précédente', en: 'Previous' } },
  { version: '2.4.2', date: { fr: '01 aoû. 2025', en: 'Aug 1, 2025' }, os: ['windows', 'mac'], tag: { fr: 'Précédente', en: 'Previous' } },
  { version: '2.4.0', date: { fr: '15 jui. 2025', en: 'Jul 15, 2025' }, os: ['windows', 'mac'], tag: { fr: 'Précédente', en: 'Previous' } }
]

interface ReleaseData {
  body: string
  published_at: string
  tag_name: string
}

function DownloadContent() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const [osFilter, setOSFilter] = useState<string>('all')
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [detectedOS, setDetectedOS] = useState<string>('')
  const { isFirstVisit } = usePageTransition()

  useEffect(() => {
    setLocale(getBrowserLanguage())
    setDetectedOS(detectOS())
    
    fetch('https://api.github.com/repos/divizion-project/Divizion-Launcher/releases/latest')
      .then(res => res.json())
      .then(data => {
        setReleaseData(data)
      })
      .catch(() => {
        setReleaseData(null)
      })
  }, [])

  const t = translations[locale]
  const filteredVersions = osFilter === 'all' ? previousVersions : previousVersions.filter(v => v.os.includes(osFilter))

  const parseChangelog = (body: string) => {
    if (!body) return []
    
    const sections: Record<string, string[]> = {}
    let currentSection = 'Changes'
    
    const lines = body.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim()
      if (!trimmed || trimmed.startsWith('---')) continue
      
      if (trimmed.startsWith('## ')) {
        currentSection = trimmed.replace('## ', '').replace(/[#🔲✨🛠️📥📑🎮🎯🏷️🍎]/g, '').trim()
        if (!sections[currentSection]) sections[currentSection] = []
      } else if (trimmed.startsWith('### ')) {
        currentSection = trimmed.replace('### ', '').replace(/[#🔲✨🛠️📥📑🎮🎯🏷️🍎]/g, '').trim()
        if (!sections[currentSection]) sections[currentSection] = []
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        let item = trimmed.replace(/^[*-]\s+/, '')
        item = item.replace(/`([^`]+)`/g, '<code>$1</code>')
        item = item.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        item = item.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        item = item.trim()
        if (item && !item.startsWith('👉')) {
          if (!sections[currentSection]) sections[currentSection] = []
          sections[currentSection].push(item)
        }
      } else if (trimmed.length > 0 && !trimmed.startsWith('#')) {
        if (!sections[currentSection]) sections[currentSection] = []
        sections[currentSection].push(trimmed)
      }
    }
    
    return Object.entries(sections).map(([title, items]) => ({ title, items }))
  }

  const changelogSections = releaseData?.body ? parseChangelog(releaseData.body) : []

  const openModal = (platform: string) => {
    setActiveModal(platform)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const platforms = [
    { 
      id: 'windows', 
      name: 'Windows', 
      icon: Monitor,
      description: locale === 'fr' ? 'Windows 10/11 (64 bits)' : 'Windows 10/11 (64-bit)',
      size: downloadsData.windows.x64.size
    },
    { 
      id: 'mac', 
      name: 'macOS', 
      icon: Terminal,
      description: locale === 'fr' ? 'macOS 11+ (Intel & Apple Silicon)' : 'macOS 11+ (Intel & Apple Silicon)',
      size: downloadsData.mac.arm64.size
    },
    { 
      id: 'linux', 
      name: 'Linux', 
      icon: Cpu,
      description: locale === 'fr' ? 'AppImage (ARM64)' : 'AppImage (ARM64)',
      size: downloadsData.linux.arm64.size
    }
  ]

  return (
    <>
      <div className={`page-content visible page-enter-right`}>
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
                <TransitionLink href="/docs" className="nav-link" direction="right">{t.nav.docs}</TransitionLink>
                <TransitionLink href="/download" className="nav-link active">{t.nav.download}</TransitionLink>
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
          <section className="downloads-page">
            <div className="container">
              <div className="downloads-header">
                <div className="downloads-header-grid">
                  <div className="downloads-header-content">
                    <h1 className="downloads-title">{t.download.title}</h1>
                    <p className="downloads-subtitle">{t.download.subtitle}</p>
                  </div>
                  <div className="downloads-version-badge">
                    <span className="version-label">{t.download.version}</span>
                    <span className="version-number">{version.version}</span>
                  </div>
                </div>
              </div>

              <div className="platform-cards-grid">
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  const isRecommended = detectedOS === platform.id
                  return (
                    <div key={platform.id} className={`platform-card ${isRecommended ? 'recommended' : ''}`}>
                      {isRecommended && (
                        <div className="recommended-badge">
                          <Sparkles size={12} />
                          {t.download.recommended}
                        </div>
                      )}
                      <div className="platform-card-header">
                        <div className="platform-icon">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div className="platform-info">
                          <h3 className="platform-name">{platform.name}</h3>
                          <p className="platform-desc">{platform.description}</p>
                        </div>
                      </div>
                      <div className="platform-card-meta">
                        <div className="meta-item">
                          <span className="meta-label">{t.download.size}</span>
                          <span className="meta-value">{platform.size}</span>
                        </div>
                      </div>
                      <button 
                        className={`platform-download-btn ${isRecommended ? 'recommended' : ''}`}
                        onClick={() => openModal(platform.id)}
                      >
                        <Download size={16} />
                        {t.download.downloadBtn}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="changelog-section">
            <div className="container">
              <div className="changelog-card">
                <div className="changelog-header">
                  <div>
                    <h2 className="changelog-title">{t.changelog.title}</h2>
                    <p className="changelog-date">
                      {releaseData?.published_at 
                        ? new Date(releaseData.published_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                        : version.releaseDateFormatted[locale]}
                    </p>
                  </div>
                  <span className="changelog-version">{releaseData?.tag_name || `v${version.version}`}</span>
                </div>
                
                <div className="changelog-content">
                  {changelogSections.length > 0 ? (
                    changelogSections.map((section, idx) => (
                      <div key={idx} className="changelog-section-item">
                        <h4 className="changelog-section-title">{section.title}</h4>
                        <ul className="changelog-list">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="changelog-loading">
                      <p>{t.changelog.loading}</p>
                    </div>
                  )}

                  <a 
                    href="https://github.com/divizion-project/Divizion-Launcher/releases" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cta-secondary"
                    style={{ marginTop: '32px', display: 'inline-flex', gap: '8px' }}
                  >
                    {t.changelog.viewAll}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="all-versions-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">{t.versions.title}</h2>
              </div>

              <div className="versions-filter">
                <span className="versions-filter-label">{t.versions.filterBy}:</span>
                <div className="versions-filter-btns">
                  <button 
                    className={`filter-btn ${osFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setOSFilter('all')}
                  >
                    {t.versions.all}
                  </button>
                  <button 
                    className={`filter-btn ${osFilter === 'windows' ? 'active' : ''}`}
                    onClick={() => setOSFilter('windows')}
                  >
                    Windows
                  </button>
                  <button 
                    className={`filter-btn ${osFilter === 'mac' ? 'active' : ''}`}
                    onClick={() => setOSFilter('mac')}
                  >
                    macOS
                  </button>
                  <button 
                    className={`filter-btn ${osFilter === 'linux' ? 'active' : ''}`}
                    onClick={() => setOSFilter('linux')}
                  >
                    Linux
                  </button>
                </div>
              </div>

              <div className="versions-grid">
                {filteredVersions.map((version, index) => (
                  <div key={index} className="version-card">
                    <div className="version-card-header">
                      <span className="version-number">v{version.version}</span>
                      <span className="version-tag">{version.tag[locale]}</span>
                    </div>
                    <p className="version-date">{version.date[locale]}</p>
                    <div className="version-os-tags">
                      {version.os.includes('windows') && (
                        <span className="version-os-tag">Windows</span>
                      )}
                      {version.os.includes('mac') && (
                        <span className="version-os-tag">macOS</span>
                      )}
                      {version.os.includes('linux') && (
                        <span className="version-os-tag">Linux</span>
                      )}
                    </div>
                  </div>
                ))}
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
                <TransitionLink href="/privacy" className="footer-link">{t.footer.privacy}</TransitionLink>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {activeModal && (
        <div className="modal-overlay visible" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {activeModal === 'mac' && t.modal.mac.title}
                {activeModal === 'windows' && t.modal.windows.title}
                {activeModal === 'linux' && t.modal.linux.title}
              </h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={16} />
              </button>
            </div>
            
            <div className="modal-options">
              {activeModal === 'mac' && (
                <>
                  <a 
                    href={downloadsData.mac.arm64.url}
                    className="modal-option"
                  >
                    <div className="modal-option-icon">
                      <Cpu size={20} strokeWidth={1.5} />
                    </div>
                    <div className="modal-option-text">
                      <span className="modal-option-title">{t.modal.mac.armTitle}</span>
                      <span className="modal-option-desc">{t.modal.mac.armDesc}</span>
                      <span className="modal-option-size">{downloadsData.mac.arm64.size}</span>
                    </div>
                    <ChevronRight size={16} className="modal-option-arrow" />
                  </a>
                  <a 
                    href={downloadsData.mac.x64.url}
                    className="modal-option"
                  >
                    <div className="modal-option-icon">
                      <Monitor size={20} strokeWidth={1.5} />
                    </div>
                    <div className="modal-option-text">
                      <span className="modal-option-title">{t.modal.mac.intelTitle}</span>
                      <span className="modal-option-desc">{t.modal.mac.intelDesc}</span>
                      <span className="modal-option-size">{downloadsData.mac.x64.size}</span>
                    </div>
                    <ChevronRight size={16} className="modal-option-arrow" />
                  </a>
                </>
              )}
              
              {activeModal === 'windows' && (
                <a 
                  href={downloadsData.windows.x64.url}
                  className="modal-option"
                >
                  <div className="modal-option-icon">
                    <Monitor size={20} strokeWidth={1.5} />
                  </div>
                  <div className="modal-option-text">
                    <span className="modal-option-title">{t.modal.windows.x64Title}</span>
                    <span className="modal-option-desc">{t.modal.windows.x64Desc}</span>
                    <span className="modal-option-size">{downloadsData.windows.x64.size}</span>
                  </div>
                  <ChevronRight size={16} className="modal-option-arrow" />
                </a>
              )}
              
              {activeModal === 'linux' && (
                <a 
                  href={downloadsData.linux.arm64.url}
                  className="modal-option"
                >
                  <div className="modal-option-icon">
                    <Cpu size={20} strokeWidth={1.5} />
                  </div>
                  <div className="modal-option-text">
                    <span className="modal-option-title">{t.modal.linux.armTitle}</span>
                    <span className="modal-option-desc">{t.modal.linux.armDesc}</span>
                    <span className="modal-option-size">{downloadsData.linux.arm64.size}</span>
                  </div>
                  <ChevronRight size={16} className="modal-option-arrow" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function DownloadPage() {
  return (
    <PageWrapper>
      <DownloadContent />
    </PageWrapper>
  )
}
