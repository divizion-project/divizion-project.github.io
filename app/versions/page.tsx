'use client'

import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { version, downloadsData, BASE_URL } from '../lib/version'

const previousVersions = [
  { version: '3.1.6', date: { fr: '5 avril 2026', en: 'Apr 5, 2026' } },
  { version: '3.1.4', date: { fr: '18 mars 2026', en: 'March 18, 2026' } },
  { version: '3.1.3', date: { fr: '2 mars 2026', en: 'March 2, 2026' } },
  { version: '3.1.2', date: { fr: '14 février 2026', en: 'February 14, 2026' } },
  { version: '3.1.1', date: { fr: '28 janvier 2026', en: 'January 28, 2026' } },
  { version: '3.1.0', date: { fr: '10 janvier 2026', en: 'January 10, 2026' } },
  { version: '3.0.2', date: { fr: '15 décembre 2025', en: 'December 15, 2025' } },
  { version: '3.0.1', date: { fr: '1 décembre 2025', en: 'December 1, 2025' } },
  { version: '3.0.0', date: { fr: '15 novembre 2025', en: 'November 15, 2025' } },
]

export default function VersionsPage() {
  const { locale, t } = useLanguage()

  const platforms = [
    {
      name: 'Windows',
      arch: 'x64',
      size: downloadsData.windows.x64.size,
      url: downloadsData.windows.x64.url,
    },
    {
      name: 'macOS',
      arch: 'ARM64 (Apple Silicon)',
      size: downloadsData.mac.arm64.size,
      url: downloadsData.mac.arm64.url,
    },
    {
      name: 'macOS',
      arch: 'Intel x64',
      size: downloadsData.mac.x64.size,
      url: downloadsData.mac.x64.url,
    },
    {
      name: 'Linux',
      arch: 'ARM64',
      size: downloadsData.linux.arm64.size,
      url: downloadsData.linux.arm64.url,
    },
  ]

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="page-hero">
          <h1 className="page-title">{t('versions.title')}</h1>
          <p className="page-subtitle">
            {t('versions.subtitle')}
          </p>
        </section>

        <div className="versions-content">
          {/* Current Version */}
          <div className="version-current">
            <span className="version-current-badge">{t('versions.latest')}</span>
            <h2 className="version-number">v{version.version}</h2>
            <p className="version-date">
              {t('versions.publishedOn')} {version.releaseDateFormatted[locale]}
            </p>

            <div className="version-downloads-grid">
              {platforms.map((platform, index) => (
                <div key={index} className="version-dl-card">
                  <h3>{platform.name}</h3>
                  <p className="version-dl-card-arch">{platform.arch}</p>
                  <p>{platform.size}</p>
                  <a
                    href={platform.url}
                    className="version-dl-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('versions.download')}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Version History */}
          <h3 className="version-history-title">{t('versions.previous')}</h3>
          <div>
            {previousVersions.map((v) => (
              <div key={v.version} className="version-entry">
                <div className="version-entry-left">
                  <span className="version-entry-number">v{v.version}</span>
                  <span className="version-entry-date">{v.date[locale]}</span>
                </div>
                <a
                  href={`https://github.com/divizion-project/Divizion-Launcher/releases/tag/${v.version}`}
                  className="version-entry-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('versions.viewRelease')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
