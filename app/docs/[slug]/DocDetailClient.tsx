'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
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

export default function DocDetailClient({ params }: { params: { slug: string } }) {
  const slug = params?.slug
  const [doc, setDoc] = useState<Documentation | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const getStr = (value: string | { fr: string; en: string } | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    return value.fr
  }

  const getArr = (value: string[] | { fr: string[]; en: string[] } | undefined): string[] => {
    if (!value) return []
    if (Array.isArray(value)) return value
    return value.fr
  }

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/divizion-project/divizion-docu/main/docs/${slug}.json`
        )
        if (response.ok) {
          const data = await response.json()
          setDoc(data)
        } else {
          setDoc(null)
        }
      } catch {
        setDoc(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchDoc()
    }
  }, [slug])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <>
      <Header />

      <main className="page-content">
        {loading ? (
          <div className="doc-detail-loading">
            <div className="doc-detail-spinner" />
            <span>Chargement de la documentation...</span>
          </div>
        ) : !doc ? (
          <div className="doc-detail-not-found">
            <AlertTriangle size={48} strokeWidth={1} />
            <h1>Documentation non trouvée</h1>
            <p>La documentation que vous recherchez n&apos;existe pas ou a été déplacée.</p>
            <Link href="/wiki" className="hero-cta" style={{ fontSize: 12, padding: '12px 32px' }}>
              Retour à la documentation
            </Link>
          </div>
        ) : (
          <>
            {doc.meta.coverImage && (
              <div className="doc-detail-cover">
                <img src={doc.meta.coverImage} alt={getStr(doc.meta.title)} />
              </div>
            )}

            <div className="doc-detail-wrapper">
              <Link href="/wiki" className="doc-detail-back">
                <ArrowLeft size={14} />
                Retour
              </Link>

              <div className="doc-detail-header">
                <div className="doc-detail-header-top">
                  <div className="doc-detail-tags">
                    {getArr(doc.meta.tags).map(tag => (
                      <span key={tag} className="doc-tag">{tag}</span>
                    ))}
                  </div>
                  <button className="doc-detail-share" onClick={handleShare}>
                    {copied ? <Check size={14} /> : <Share2 size={14} />}
                    {copied ? 'Copié !' : 'Partager'}
                  </button>
                </div>

                <h1 className="doc-detail-title">{getStr(doc.meta.title)}</h1>
                {doc.meta.subtitle && (
                  <p className="doc-detail-subtitle">{getStr(doc.meta.subtitle)}</p>
                )}

                <div className="doc-detail-meta">
                  {doc.meta.lastUpdated && (
                    <span>
                      <Clock size={12} />
                      Dernière mise à jour : {doc.meta.lastUpdated}
                    </span>
                  )}
                  {doc.meta.author && (
                    <span>
                      <User size={12} />
                      par {getStr(doc.meta.author)}
                    </span>
                  )}
                </div>
              </div>

              <div className="doc-detail-body">
                {doc.blocks?.map((block, index) => (
                  <DocBlockRenderer key={index} block={block} locale="fr" />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}
