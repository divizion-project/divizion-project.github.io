'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { latest, allReleases, getReleasePlatforms } from '../lib/releases'

export default function VersionsPage() {
  const { locale, t } = useLanguage()

  const latestPlatforms = getReleasePlatforms(latest)

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
            <h2 className="version-number">v{latest.version}</h2>
            <p className="version-date">
              {t('versions.publishedOn')} {latest.releaseDateFormatted[locale]}
            </p>

            <div className="version-downloads-grid">
              {latestPlatforms.map((platform, index) => (
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
            {allReleases.slice(1).map((release) => (
              <div key={release.version} className="version-entry">
                <div className="version-entry-left">
                  <span className="version-entry-number">v{release.version}</span>
                  <span className="version-entry-date">{release.releaseDateFormatted[locale]}</span>
                </div>
                <a
                  href={release.githubReleaseUrl}
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
