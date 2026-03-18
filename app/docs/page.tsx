'use client'

import { useState, useEffect, useMemo } from 'react'
import TransitionLink from '../components/TransitionLink'
import PageWrapper from '../components/PageWrapper'
import { 
  Search, Filter, Tag, Clock, User, ArrowRight,
  FileText, X, ChevronDown
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

interface Documentation {
  meta: DocMeta
  slug: string
}

const translations = {
  fr: {
    title: "Documentation",
    subtitle: "Ressources techniques et guides pour maîtriser Divizion Launcher",
    search: "Rechercher dans la documentation...",
    allTags: "Tous les tags",
    noResults: "Aucune documentation trouvée",
    noResultsDesc: "Essayez de modifier vos critères de recherche",
    lastUpdate: "Dernière mise à jour",
    by: "par",
    read: "Lire"
  },
  en: {
    title: "Documentation",
    subtitle: "Technical resources and guides to master Divizion Launcher",
    search: "Search in documentation...",
    allTags: "All tags",
    noResults: "No documentation found",
    noResultsDesc: "Try adjusting your search criteria",
    lastUpdate: "Last updated",
    by: "by",
    read: "Read"
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

const sampleDocs: Documentation[] = [
  {
    meta: {
      id: "getting-started",
      title: { fr: "Démarrage rapide", en: "Getting Started" },
      subtitle: { fr: "Guide de démarrage rapide", en: "Quick start guide" },
      description: { 
        fr: "Apprenez à installer et configurer Divizion Launcher en quelques minutes. Ce guide couvre les bases pour démarrer rapidement.", 
        en: "Learn how to install and configure Divizion Launcher in minutes. This guide covers the basics to get started quickly." 
      },
      author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
      lastUpdated: "2024-01-15",
      tags: { fr: ["guide", "débutant", "installation"], en: ["guide", "beginner", "installation"] }
    },
    slug: "getting-started"
  },
  {
    meta: {
      id: "mod-installation",
      title: { fr: "Installation de Mods", en: "Mod Installation" },
      subtitle: { fr: "Gestion des modifications", en: "Mod management" },
      description: { 
        fr: "Découvrez comment installer, gérer et configurer vos mods préférés avec Divizion Launcher.", 
        en: "Discover how to install, manage and configure your favorite mods with Divizion Launcher." 
      },
      author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
      lastUpdated: "2024-01-10",
      tags: { fr: ["mods", "guide", "configuration"], en: ["mods", "guide", "configuration"] }
    },
    slug: "mod-installation"
  },
  {
    meta: {
      id: "instances",
      title: { fr: "Gestion des Instances", en: "Instance Management" },
      subtitle: { fr: "Organisation et configuration", en: "Organization and configuration" },
      description: { 
        fr: "Maîtrisez la création et la gestion de vos instances Minecraft avec des configurations personnalisées.", 
        en: "Master creating and managing your Minecraft instances with custom configurations." 
      },
      author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
      lastUpdated: "2024-01-08",
      tags: { fr: ["instances", "avancé", "organisation"], en: ["instances", "advanced", "organization"] }
    },
    slug: "instances"
  },
  {
    meta: {
      id: "performance",
      title: { fr: "Optimisation des Performances", en: "Performance Optimization" },
      subtitle: { fr: "Maximiser l'efficacité", en: "Maximize efficiency" },
      description: { 
        fr: "Optimisez les performances de vos instances et du launcher pour une expérience fluide.", 
        en: "Optimize the performance of your instances and launcher for a smooth experience." 
      },
      author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
      lastUpdated: "2024-01-05",
      tags: { fr: ["performance", "avancé", "configuration"], en: ["performance", "advanced", "configuration"] }
    },
    slug: "performance"
  },
  {
    meta: {
      id: "import-export",
      title: { fr: "Import & Export", en: "Import & Export" },
      subtitle: { fr: "Migration de données", en: "Data migration" },
      description: { 
        fr: "Importez vos instances depuis d'autres launchers et exportez vos configurations.", 
        en: "Import your instances from other launchers and export your configurations." 
      },
      author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
      lastUpdated: "2024-01-03",
      tags: { fr: ["migration", "guide", "import"], en: ["migration", "guide", "import"] }
    },
    slug: "import-export"
  },
  {
    meta: {
      id: "troubleshooting",
      title: { fr: "Résolution de Problèmes", en: "Troubleshooting" },
      subtitle: { fr: "Diagnostic et solutions", en: "Diagnosis and solutions" },
      description: { 
        fr: "Solutions aux problèmes courants et guide de diagnostic pour les erreurs fréquentes.", 
        en: "Solutions to common problems and diagnostic guide for frequent errors." 
      },
      author: { fr: "Pôle Ingénierie Divizion", en: "Divizion Engineering Team" },
      lastUpdated: "2024-01-01",
      tags: { fr: ["support", "dépannage", "erreurs"], en: ["support", "troubleshooting", "errors"] }
    },
    slug: "troubleshooting"
  }
]

function DocsContent() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [docs, setDocs] = useState<Documentation[]>(sampleDocs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLocale(getBrowserLanguage())
    
    const fetchDocs = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/divizion-project/divizion-docu/contents/docs')
        if (response.ok) {
          const data = await response.json()
          const docPromises = data
            .filter((file: any) => file.name.endsWith('.json'))
            .map(async (file: any) => {
              try {
                const contentResponse = await fetch(file.download_url)
                if (contentResponse.ok) {
                  const content = await contentResponse.json()
                  return {
                    meta: content.meta,
                    slug: file.name.replace('.json', '')
                  }
                }
                return null
              } catch {
                return null
              }
            })
          
          const loadedDocs = (await Promise.all(docPromises)).filter(Boolean)
          if (loadedDocs.length > 0) {
            setDocs(loadedDocs)
          }
        }
      } catch (error) {
        console.log('Using sample documentation')
      } finally {
        setLoading(false)
      }
    }

    fetchDocs()
  }, [])

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

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    docs.forEach(doc => {
      getLocalizedArray(doc.meta.tags).forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [docs, locale])

  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const title = getLocalizedValue(doc.meta.title)
      const description = getLocalizedValue(doc.meta.description)
      const subtitle = getLocalizedValue(doc.meta.subtitle)
      const tags = getLocalizedArray(doc.meta.tags)
      
      const matchesSearch = searchQuery === '' || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subtitle?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [docs, searchQuery, selectedTags, locale])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  return (
    <div className="docs-page">
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

      <main className="docs-main">
        <section className="docs-hero">
          <div className="container">
            <div className="docs-hero-content">
              <h1 className="docs-title">{t.title}</h1>
              <p className="docs-subtitle">{t.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="docs-controls">
          <div className="container">
            <div className="docs-controls-inner">
              <div className="search-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button className="search-clear" onClick={() => setSearchQuery('')}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="filter-container">
                <button 
                  className={`filter-toggle ${showTagFilter ? 'active' : ''}`}
                  onClick={() => setShowTagFilter(!showTagFilter)}
                >
                  <Filter size={16} />
                  <span>{t.allTags}</span>
                  <ChevronDown size={14} className={showTagFilter ? 'rotated' : ''} />
                </button>

                {showTagFilter && (
                  <div className="tag-dropdown">
                    <div className="tag-dropdown-inner">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          className={`tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`}
                          onClick={() => toggleTag(tag)}
                        >
                          <span className="tag-checkbox" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedTags.length > 0 && (
                <div className="active-tags">
                  {selectedTags.map(tag => (
                    <button key={tag} className="active-tag" onClick={() => toggleTag(tag)}>
                      {tag}
                      <X size={12} />
                    </button>
                  ))}
                  <button className="clear-all" onClick={clearFilters}>
                    {locale === 'fr' ? 'Effacer tout' : 'Clear all'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="docs-grid-section">
          <div className="container">
            {loading ? (
              <div className="docs-loading">
                <div className="loading-spinner" />
                <span>{locale === 'fr' ? 'Chargement...' : 'Loading...'}</span>
              </div>
            ) : filteredDocs.length === 0 ? (
              <div className="docs-empty">
                <FileText size={48} strokeWidth={1} />
                <h3>{t.noResults}</h3>
                <p>{t.noResultsDesc}</p>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  {locale === 'fr' ? 'Effacer les filtres' : 'Clear filters'}
                </button>
              </div>
            ) : (
              <div className="docs-grid">
                {filteredDocs.map((doc, index) => (
                  <TransitionLink 
                    key={doc.meta.id} 
                    href={`/docs/${doc.slug}`}
                    className="doc-card"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="doc-card-header">
                      <h3 className="doc-card-title">{getLocalizedValue(doc.meta.title)}</h3>
                      {doc.meta.subtitle && (
                        <p className="doc-card-subtitle">{getLocalizedValue(doc.meta.subtitle)}</p>
                      )}
                    </div>
                    <p className="doc-card-description">{getLocalizedValue(doc.meta.description)}</p>
                    <div className="doc-card-tags">
                      {getLocalizedArray(doc.meta.tags).slice(0, 3).map(tag => (
                        <span key={tag} className="doc-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="doc-card-meta">
                      {doc.meta.lastUpdated && (
                        <span className="doc-meta-item">
                          <Clock size={12} />
                          {t.lastUpdate}: {doc.meta.lastUpdated}
                        </span>
                      )}
                      {doc.meta.author && (
                        <span className="doc-meta-item">
                          <User size={12} />
                          {t.by} {getLocalizedValue(doc.meta.author)}
                        </span>
                      )}
                    </div>
                    <div className="doc-card-action">
                      <span>{t.read}</span>
                      <ArrowRight size={14} />
                    </div>
                  </TransitionLink>
                ))}
              </div>
            )}
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
              <TransitionLink href="/legal" className="footer-link">{locale === 'fr' ? 'Mentions légales' : 'Legal Notice'}</TransitionLink>
              <TransitionLink href="/privacy" className="footer-link">{locale === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</TransitionLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function DocsPage() {
  return (
    <PageWrapper>
      <DocsContent />
    </PageWrapper>
  )
}
