'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import {
  Search, Filter, X, ChevronDown, FileText,
  Clock, User, ArrowRight
} from 'lucide-react'

interface DocMeta {
  id: string
  title: string | { fr: string; en: string }
  subtitle?: string | { fr: string; en: string }
  description: string | { fr: string; en: string }
  author?: string | { fr: string; en: string }
  lastUpdated?: string
  tags: string[] | { fr: string[]; en: string[] }
}

interface Documentation {
  meta: DocMeta
  slug: string
}

const sampleDocs: Documentation[] = [
  {
    meta: {
      id: "getting-started",
      title: "Démarrage rapide",
      subtitle: "Guide de démarrage rapide",
      description: "Apprenez à installer et configurer Divizion Launcher en quelques minutes. Ce guide couvre les bases pour démarrer rapidement.",
      author: "Pôle Ingénierie Divizion",
      lastUpdated: "2024-01-15",
      tags: ["guide", "débutant", "installation"]
    },
    slug: "getting-started"
  },
  {
    meta: {
      id: "mod-installation",
      title: "Installation de Mods",
      subtitle: "Gestion des modifications",
      description: "Découvrez comment installer, gérer et configurer vos mods préférés avec Divizion Launcher.",
      author: "Pôle Ingénierie Divizion",
      lastUpdated: "2024-01-10",
      tags: ["mods", "guide", "configuration"]
    },
    slug: "mod-installation"
  },
  {
    meta: {
      id: "instances",
      title: "Gestion des Instances",
      subtitle: "Organisation et configuration",
      description: "Maîtrisez la création et la gestion de vos instances Minecraft avec des configurations personnalisées.",
      author: "Pôle Ingénierie Divizion",
      lastUpdated: "2024-01-08",
      tags: ["instances", "avancé", "organisation"]
    },
    slug: "instances"
  },
  {
    meta: {
      id: "performance",
      title: "Optimisation des Performances",
      subtitle: "Maximiser l'efficacité",
      description: "Optimisez les performances de vos instances et du launcher pour une expérience fluide.",
      author: "Pôle Ingénierie Divizion",
      lastUpdated: "2024-01-05",
      tags: ["performance", "avancé", "configuration"]
    },
    slug: "performance"
  },
  {
    meta: {
      id: "import-export",
      title: "Import & Export",
      subtitle: "Migration de données",
      description: "Importez vos instances depuis d'autres launchers et exportez vos configurations.",
      author: "Pôle Ingénierie Divizion",
      lastUpdated: "2024-01-03",
      tags: ["migration", "guide", "import"]
    },
    slug: "import-export"
  },
  {
    meta: {
      id: "troubleshooting",
      title: "Résolution de Problèmes",
      subtitle: "Diagnostic et solutions",
      description: "Solutions aux problèmes courants et guide de diagnostic pour les erreurs fréquentes.",
      author: "Pôle Ingénierie Divizion",
      lastUpdated: "2024-01-01",
      tags: ["support", "dépannage", "erreurs"]
    },
    slug: "troubleshooting"
  }
]

export default function WikiPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [docs, setDocs] = useState<Documentation[]>(sampleDocs)
  const [loading, setLoading] = useState(true)
  const { locale, t } = useLanguage()

  useEffect(() => {
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
                  return { meta: content.meta, slug: file.name.replace('.json', '') }
                }
                return null
              } catch { return null }
            })
          const loadedDocs = (await Promise.all(docPromises)).filter(Boolean)
          if (loadedDocs.length > 0) setDocs(loadedDocs)
        }
      } catch {
        // fallback to sample docs
      } finally {
        setLoading(false)
      }
    }
    fetchDocs()
  }, [])

  const getStr = (value: string | { fr: string; en: string } | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    return value[locale]
  }

  const getArr = (value: string[] | { fr: string[]; en: string[] } | undefined): string[] => {
    if (!value) return []
    if (Array.isArray(value)) return value
    return value[locale]
  }

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    docs.forEach(doc => getArr(doc.meta.tags).forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [docs])

  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const title = getStr(doc.meta.title)
      const description = getStr(doc.meta.description)
      const subtitle = getStr(doc.meta.subtitle)
      const tags = getArr(doc.meta.tags)

      const matchesSearch = searchQuery === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subtitle?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [docs, searchQuery, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="page-hero">
          <h1 className="page-title">{t('wiki.title')}</h1>
          <p className="page-subtitle">
            {t('wiki.subtitle')}
          </p>
        </section>

        <div className="docs-page-content">
          {/* Search & Filter Controls */}
          <div className="docs-controls">
            <div className="docs-search-wrapper">
              <Search size={16} className="docs-search-icon" />
              <input
                type="text"
                className="docs-search-input"
                placeholder={t('wiki.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="docs-search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="docs-filter-wrapper">
              <button
                className={`docs-filter-btn ${showTagFilter ? 'active' : ''}`}
                onClick={() => setShowTagFilter(!showTagFilter)}
              >
                <Filter size={14} />
                <span>{t('wiki.tags')}</span>
                <ChevronDown
                  size={12}
                  style={{ transform: showTagFilter ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>
              {showTagFilter && (
                <div className="docs-tags-dropdown">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      className={`docs-tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Tags */}
          {selectedTags.length > 0 && (
            <div className="docs-active-tags">
              {selectedTags.map(tag => (
                <button key={tag} className="docs-active-tag" onClick={() => toggleTag(tag)}>
                  {tag} <X size={10} />
                </button>
              ))}
              <button className="docs-clear-btn" onClick={clearFilters}>
                {t('wiki.clearAll')}
              </button>
            </div>
          )}

          {/* Docs Grid */}
          {loading ? (
            <div className="docs-loading">{t('wiki.loading')}</div>
          ) : filteredDocs.length === 0 ? (
            <div className="docs-empty">
              <FileText size={48} strokeWidth={1} />
              <h3>{t('wiki.noResults')}</h3>
              <p>{t('wiki.noResultsHint')}</p>
              <button className="docs-empty-btn" onClick={clearFilters}>
                {t('wiki.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="docs-grid">
              {filteredDocs.map((doc) => (
                <Link
                  key={doc.meta.id}
                  href={`/docs/${doc.slug}`}
                  className="doc-card"
                >
                  <h3 className="doc-card-title">{getStr(doc.meta.title)}</h3>
                  {doc.meta.subtitle && (
                    <p className="doc-card-subtitle">{getStr(doc.meta.subtitle)}</p>
                  )}
                  <p className="doc-card-description">{getStr(doc.meta.description)}</p>
                  <div className="doc-card-tags">
                    {getArr(doc.meta.tags).slice(0, 3).map(tag => (
                      <span key={tag} className="doc-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="doc-card-meta">
                    {doc.meta.lastUpdated && (
                      <span><Clock size={10} /> {doc.meta.lastUpdated}</span>
                    )}
                    {doc.meta.author && (
                      <span><User size={10} /> {getStr(doc.meta.author)}</span>
                    )}
                  </div>
                  <div className="doc-card-action">
                    <span>{t('wiki.readMore')}</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
