'use client'

import { useState, useEffect } from 'react'
import TransitionLink from '../../components/TransitionLink'
import PageWrapper from '../../components/PageWrapper'
import DocBlockRenderer from '../../components/DocBlockRenderer'
import { 
  ArrowLeft, Clock, User, Share2, Check,
  AlertTriangle
} from 'lucide-react'

interface DocMeta {
  id: string
  title: string | { fr: string; en: string }
  subtitle?: string | { fr: string; en: string }
  description: string | { fr: string; en: string }
  coverImage?: string
  author?: string | { fr: string; en: string }
  lastUpdated?: string
  tags: string[] | { fr: string[]; en: string[] }
}

interface DocBlock {
  type: string
  [key: string]: any
}

interface Documentation {
  meta: DocMeta
  blocks: DocBlock[]
}

const translations = {
  fr: {
    backToDocs: "Retour",
    lastUpdate: "Dernière mise à jour",
    by: "par",
    share: "Partager",
    copied: "Copié !",
    notFound: "Documentation non trouvée",
    notFoundDesc: "La documentation que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
    loading: "Chargement de la documentation..."
  },
  en: {
    backToDocs: "Back",
    lastUpdate: "Last updated",
    by: "by",
    share: "Share",
    copied: "Copied!",
    notFound: "Documentation not found",
    notFoundDesc: "The documentation you are looking for does not exist or has been moved.",
    backHome: "Back to home",
    loading: "Loading documentation..."
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

const sampleDoc: Documentation = {
  meta: {
    id: "sample-documentation",
    title: { fr: "Documentation de démonstration", en: "Demo Documentation" },
    subtitle: { fr: "Exemple de contenu", en: "Sample content" },
    description: { fr: "Ceci est un exemple de documentation pour démontrer le système de rendu.", en: "This is a sample documentation to demonstrate the rendering system." },
    author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
    lastUpdated: "2024-01-15",
    tags: { fr: ["exemple", "démonstration"], en: ["example", "demo"] }
  },
  blocks: [
    {
      type: "heading",
      level: 1,
      text: { fr: "Bienvenue dans la documentation", en: "Welcome to the documentation" }
    },
    {
      type: "paragraph",
      content: { 
        fr: [
          { text: "Cette documentation vous guide à travers les fonctionnalités de " },
          { text: "Divizion Launcher", "bold": true },
          { text: ". Vous trouverez ici toutes les informations nécessaires pour maîtriser l'application." }
        ],
        en: [
          { text: "This documentation guides you through the features of " },
          { text: "Divizion Launcher", "bold": true },
          { text: ". Here you will find all the information needed to master the application." }
        ]
      }
    },
    {
      type: "alert",
      variant: "info",
      title: { fr: "Information", en: "Information" },
      content: { 
        fr: [
          { text: "Cette documentation est générée dynamiquement à partir de fichiers JSON." }
        ],
        en: [
          { text: "This documentation is dynamically generated from JSON files." }
        ]
      }
    },
    {
      type: "heading",
      level: 2,
      text: { fr: "Installation", en: "Installation" }
    },
    {
      type: "paragraph",
      content: { 
        fr: [
          { text: "Pour installer Divizion Launcher, suivez ces étapes simples." }
        ],
        en: [
          { text: "To install Divizion Launcher, follow these simple steps." }
        ]
      }
    },
    {
      type: "step_list",
      title: { fr: "Procédure d'installation", en: "Installation procedure" },
      steps: {
        fr: [
          {
            step_number: 1,
            title: "Télécharger le launcher",
            description: "Rendez-vous sur la page de téléchargement et sélectionnez votre plateforme."
          },
          {
            step_number: 2,
            title: "Exécuter l'installateur",
            description: "Lancez le fichier téléchargé et suivez les instructions à l'écran."
          },
          {
            step_number: 3,
            title: "Configurer le launcher",
            description: "Au premier lancement, configurez vos préférences et ajoutez votre compte Minecraft."
          }
        ],
        en: [
          {
            step_number: 1,
            title: "Download the launcher",
            description: "Go to the download page and select your platform."
          },
          {
            step_number: 2,
            title: "Run the installer",
            description: "Launch the downloaded file and follow the on-screen instructions."
          },
          {
            step_number: 3,
            title: "Configure the launcher",
            description: "On first launch, configure your preferences and add your Minecraft account."
          }
        ]
      }
    },
    {
      type: "heading",
      level: 2,
      text: { fr: "Exemples de code", en: "Code examples" }
    },
    {
      type: "code",
      language: "bash",
      content: "npm install divizion-launcher\n# or\nyarn add divizion-launcher",
      showCopyButton: true
    },
    {
      type: "alert",
      variant: "warning",
      title: { fr: "Attention", en: "Warning" },
      content: { 
        fr: [
          { text: "Assurez-vous d'avoir Java 17 ou supérieur installé sur votre système." }
        ],
        en: [
          { text: "Make sure you have Java 17 or higher installed on your system." }
        ]
      }
    },
    {
      type: "button_group",
      alignment: "left",
      buttons: [
        {
          type: "text",
          label: { fr: "Télécharger", en: "Download" },
          action: "/download",
          variant: "primary"
        },
        {
          type: "text_icon",
          label: "GitHub",
          icon: "github",
          action: "https://github.com/divizion-project",
          variant: "outline"
        }
      ]
    }
  ]
}

export default function DocDetailClient({ params }: { params: { slug: string } }) {
  const slug = params?.slug
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const [doc, setDoc] = useState<Documentation | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const t = translations[locale]

  const getLocalizedValue = (value: string | { fr: string; en: string } | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    return value[locale] || value.fr
  }

  const getLocalizedArray = (value: string[] | { fr: string[]; en: string[] } | undefined): string[] => {
    if (!value) return []
    if (Array.isArray(value)) return value
    return value[locale] || value.fr
  }

  useEffect(() => {
    setLocale(getBrowserLanguage())
    
    const fetchDoc = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/divizion-project/divizion-docu/main/docs/${slug}.json`)
        if (response.ok) {
          const data = await response.json()
          setDoc(data)
        } else {
          setDoc(sampleDoc)
        }
      } catch (error) {
        setDoc(sampleDoc)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchDoc()
    }
  }, [slug])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy')
    }
  }

  if (loading) {
    return (
      <div className="doc-detail-page">
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <div className="logo-section">
                <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
                <span className="logo-text">Divizion Launcher</span>
              </div>
            </div>
          </div>
        </header>
        <main className="doc-detail-main">
          <div className="container">
            <div className="doc-loading">
              <div className="loading-spinner" />
              <span>{t.loading}</span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="doc-detail-page">
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <div className="logo-section">
                <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
                <span className="logo-text">Divizion Launcher</span>
              </div>
            </div>
          </div>
        </header>
        <main className="doc-detail-main">
          <div className="container">
            <div className="doc-not-found">
              <AlertTriangle size={48} strokeWidth={1} />
              <h1>{t.notFound}</h1>
              <p>{t.notFoundDesc}</p>
              <TransitionLink href="/docs" className="back-btn">
                <ArrowLeft size={16} />
                {t.backToDocs}
              </TransitionLink>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="doc-detail-page">
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div className="logo-section">
              <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
              <span className="logo-text">Divizion Launcher</span>
            </div>
            <nav className="nav-links">
              <TransitionLink href="/" className="nav-link">{locale === 'fr' ? 'Accueil' : 'Home'}</TransitionLink>
              <TransitionLink href="/docs" className="nav-link active">{locale === 'fr' ? 'Documentation' : 'Documentation'}</TransitionLink>
              <TransitionLink href="/download" className="nav-link">{locale === 'fr' ? 'Télécharger' : 'Download'}</TransitionLink>
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

      <main className="doc-detail-main">
        <div className="container">
          <div className="doc-detail-grid">
            <aside className="doc-sidebar">
              <TransitionLink href="/docs" className="doc-back-link">
                <ArrowLeft size={16} />
                {t.backToDocs}
              </TransitionLink>
            </aside>

            <article className="doc-content">
              <div className="doc-header">
                <div className="doc-header-top">
                  <div className="doc-tags">
                    {getLocalizedArray(doc.meta.tags).map(tag => (
                      <span key={tag} className="doc-tag">{tag}</span>
                    ))}
                  </div>
                  <button className="doc-share-btn" onClick={handleShare}>
                    {copied ? <Check size={16} /> : <Share2 size={16} />}
                    {copied ? t.copied : t.share}
                  </button>
                </div>
                
                <h1 className="doc-title">{getLocalizedValue(doc.meta.title)}</h1>
                {doc.meta.subtitle && (
                  <p className="doc-subtitle">{getLocalizedValue(doc.meta.subtitle)}</p>
                )}
                
                <div className="doc-meta">
                  {doc.meta.lastUpdated && (
                    <span className="doc-meta-item">
                      <Clock size={14} />
                      {t.lastUpdate}: {doc.meta.lastUpdated}
                    </span>
                  )}
                  {doc.meta.author && (
                    <span className="doc-meta-item">
                      <User size={14} />
                      {t.by} {getLocalizedValue(doc.meta.author)}
                    </span>
                  )}
                </div>
              </div>

              <div className="doc-body">
                {doc.blocks?.map((block, index) => (
                  <DocBlockRenderer key={index} block={block} locale={locale} />
                ))}
              </div>
            </article>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-seizure">
              <span className="footer-by">by</span>
              <img src="/seizure-logo-black.webp" alt="Seizure" className="footer-seizure-logo" />
            </div>
            <div className="footer-links">
              <TransitionLink href="/legal" className="footer-link">{locale === 'fr' ? 'Mentions légales' : 'Legal Notice'}</TransitionLink>
              <TransitionLink href="/privacy" className="footer-link">{locale === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</TransitionLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
