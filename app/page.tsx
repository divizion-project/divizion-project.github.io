'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import ImageLightbox from './components/ImageLightbox'
import { useLanguage } from './i18n/LanguageContext'
import { MessageCircle, Download, ExternalLink, Package, Map, Paintbrush, Sparkles, Database } from 'lucide-react'

const featureKeys = [
  { media: '/homesceensources/activitymanager.webp', type: 'image' as const, titleKey: 'activityCenter', descKey: 'activityCenterDesc', gridClass: 'portrait', ratio: '339/629' },
  { media: '/homesceensources/ezinstancemonitor.webp', type: 'image' as const, titleKey: 'liveLogs', descKey: 'liveLogsDesc', gridClass: 'landscape', ratio: '840/576' },
  { media: '/homesceensources/Ezofflineaccount.webm', type: 'video' as const, titleKey: 'freeForAll', descKey: 'freeForAllDesc', gridClass: 'landscape', ratio: '16/9' },
  { media: '/homesceensources/installmodpackeasly.webp', type: 'image' as const, titleKey: 'easyInstall', descKey: 'easyInstallDesc', gridClass: 'wide', ratio: '958/539' },
  { media: '/homesceensources/Instancefastlaunch.webm', type: 'video' as const, titleKey: 'quickLaunch', descKey: 'quickLaunchDesc', gridClass: 'wide', ratio: '16/9' },
  { media: '/homesceensources/multipleinstance.webp', type: 'image' as const, titleKey: 'multiInstance', descKey: 'multiInstanceDesc', gridClass: 'landscape', ratio: '958/553' },
  { media: '/homesceensources/sidebar_and_instancesview.webm', type: 'video' as const, titleKey: 'customUI', descKey: 'customUIDesc', gridClass: 'landscape', ratio: '16/9' },
  { media: '/homesceensources/storagemanager.webp', type: 'image' as const, titleKey: 'storageManager', descKey: 'storageManagerDesc', gridClass: 'wide', ratio: '958/553' },
]

const migrationLaunchers = [
  { name: 'MultiMC / Prism', desc: 'MultiMC, PrismLauncher, PolyMC' },
  { name: 'CurseForge', desc: 'CurseForge App instances' },
  { name: 'ATLauncher', desc: 'ATLauncher instances' },
  { name: 'Minecraft Launcher', desc: 'Official Mojang instance' },
  { name: 'Technic Launcher', desc: 'Technic modpacks' },
  { name: 'GDLauncher', desc: 'GDLauncher instances' },
  { name: 'Modrinth', desc: 'Modrinth App / .mrpack' },
]

export default function HomePage() {
  const { t } = useLanguage()
  const launcherNames = ['MultiMC', 'PolyMC', 'Prism Launcher', t('home.typewriterLast')]

  const [currentText, setCurrentText] = useState('')
  const [nameIndex, setNameIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')
  const lightboxRef = useRef<HTMLImageElement | null>(null)
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null)

  const [modrinthActiveIndex, setModrinthActiveIndex] = useState(0)
  const [modrinthHoverIndex, setModrinthHoverIndex] = useState<number | null>(null)
  const [modrinthProgress, setModrinthProgress] = useState(0)
  const [modrinthInstalledIndex, setModrinthInstalledIndex] = useState<number | null>(null)
  const modrinthTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/divizion-project/Divizion-Launcher/releases')
      .then(res => res.json())
      .then((releases: Array<{ assets: Array<{ download_count: number }> }>) => {
        let count = 0
        for (const release of releases) {
          for (const asset of release.assets) {
            count += asset.download_count
          }
        }
        setTotalDownloads(count)
      })
      .catch(() => setTotalDownloads(0))
  }, [])

  useEffect(() => {
    const currentName = launcherNames[nameIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (charIndex < currentName.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentName.substring(0, charIndex + 1))
          setCharIndex((prev) => prev + 1)
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2200)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentName.substring(0, charIndex - 1))
          setCharIndex((prev) => prev - 1)
        }, 50)
      } else {
        setIsDeleting(false)
        setNameIndex((prev) => (prev + 1) % launcherNames.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, nameIndex])

  useEffect(() => {
    const cycleDuration = 3000
    const progressDuration = 1500
    const progressSteps = 30
    const stepInterval = progressDuration / progressSteps

    const cycle = () => {
      setModrinthProgress(0)
      setModrinthInstalledIndex(null)

      let step = 0
      const progressTimer = setInterval(() => {
        step++
        setModrinthProgress(Math.min((step / progressSteps) * 100, 100))
        if (step >= progressSteps) {
          clearInterval(progressTimer)
          setModrinthInstalledIndex(modrinthActiveIndex)
          modrinthTimerRef.current = setTimeout(() => {
            setModrinthActiveIndex((prev) => (prev + 1) % 5)
          }, 800)
        }
      }, stepInterval)

      return () => clearInterval(progressTimer)
    }

    const cleanup = cycle()

    return () => {
      cleanup()
      if (modrinthTimerRef.current) clearTimeout(modrinthTimerRef.current)
    }
  }, [modrinthActiveIndex])

  useEffect(() => {
    if (modrinthHoverIndex !== null) {
      setModrinthActiveIndex(modrinthHoverIndex)
      setModrinthProgress(0)
      setModrinthInstalledIndex(null)
      if (modrinthTimerRef.current) clearTimeout(modrinthTimerRef.current)
    }
  }, [modrinthHoverIndex])

  return (
    <>
      <Header />

      <main className="page-content">
        {/* ===== HERO SECTION ===== */}
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-content">
            <span className="hero-badge">{t('home.badge')}</span>
            <h1 className="hero-title">
              {t('home.title')}<br />
              <span className="hero-title-accent">{t('home.titleAccent')}</span> {t('home.titleEnd')}
            </h1>
            <p className="hero-typewriter-line">
              {t('home.typewriterPrefix')}<br />
              <span className="typewriter-text">{currentText}<span className="typewriter-caret" /></span>
            </p>
            <p className="hero-description">
              {t('home.description')}
            </p>
            <Link href="/download" className="hero-cta">
              {t('home.cta')}
            </Link>
            <div className="hero-platforms">
              <span>Windows</span>
              <span>·</span>
              <span>macOS</span>
              <span>·</span>
              <span>Linux</span>
            </div>
          </div>

          <div className="hero-video-embed">
            <iframe
              src="https://www.youtube.com/embed/aXHfVidjMoU?autoplay=1&mute=1&loop=1&playlist=aXHfVidjMoU&controls=0&showinfo=0&modestbranding=1&rel=0"
              title="Divizion Launcher"
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </section>

        {/* ===== FEATURES BENTO GRID ===== */}
        <section className="section" id="features">
          <div className="section-header">
            <h2 className="section-title">{t('home.featuresTitle')}</h2>
            <p className="section-subtitle">
              {t('home.featuresSubtitle')}
            </p>
            <div className="section-divider" />
          </div>

          <div className="bento-grid">
            {featureKeys.map((feature, index) => (
              <div
                key={index}
                className={`bento-card ${feature.gridClass}`}
              >
                <div className="bento-media" style={{ aspectRatio: feature.ratio }}>
                  {feature.type === 'video' ? (
                    <video autoPlay loop muted playsInline>
                      <source src={feature.media} type="video/webm" />
                    </video>
                  ) : (
                    <img
                      src={feature.media}
                      alt={t(`home.features.${feature.titleKey}`)}
                      loading="lazy"
                      className="clickable-image"
                      onClick={(e) => {
                        lightboxRef.current = e.currentTarget
                        setLightboxSrc(feature.media)
                        setLightboxAlt(t(`home.features.${feature.titleKey}`))
                      }}
                    />
                  )}
                </div>
                <div className="bento-content">
                  <h3 className="bento-title">{t(`home.features.${feature.titleKey}`)}</h3>
                  <p className="bento-description">{t(`home.features.${feature.descKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MODRINTH NATIVE INTEGRATION ===== */}
        <section className="section modrinth-section" id="modrinth">
          <div className="section-header">
            <h2 className="section-title">{t('home.modrinthTitle')} <span className="modrinth-accent">{t('home.modrinthTitleAccent')}</span></h2>
            <p className="section-subtitle">
              {t('home.modrinthSubtitle')}
            </p>
            <div className="section-divider modrinth-divider" />
          </div>

          <div className="modrinth-showcase">
            <div className="modrinth-showcase-left">
              <div className="modrinth-native-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#1bd96a"/>
                  <path d="M12 6l-5 2.8v5.6L12 17.2l5-2.8V8.8L12 6z" fill="#000"/>
                </svg>
                {t('home.modrinthNative')}
              </div>
              <h3 className="modrinth-showcase-title">{t('home.modrinthShowcaseTitle')}</h3>
              <p className="modrinth-showcase-desc">{t('home.modrinthShowcaseDesc')}</p>

              <div className="modrinth-features-list">
                {[
                  { icon: Package, key: 'mods' },
                  { icon: Map, key: 'maps' },
                  { icon: Paintbrush, key: 'resourcePacks' },
                  { icon: Sparkles, key: 'shaders' },
                  { icon: Database, key: 'dataPacks' },
                ].map((item, i) => (
                  <div
                    key={item.key}
                    className={`modrinth-feature-item ${modrinthActiveIndex === i ? 'active' : ''}`}
                    onMouseEnter={() => setModrinthHoverIndex(i)}
                    onMouseLeave={() => setModrinthHoverIndex(null)}
                  >
                    <div className="modrinth-feature-icon">
                      <item.icon size={20} />
                    </div>
                    <div className="modrinth-feature-text">
                      <span className="modrinth-feature-name">{t(`home.modrinthFeature.${item.key}`)}</span>
                      <span className="modrinth-feature-desc">{t(`home.modrinthFeature.${item.key}Desc`)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modrinth-showcase-right">
              <div className="modrinth-install-demo">
                <div className="modrinth-demo-header">
                  <div className="modrinth-demo-dots">
                    <span /><span /><span />
                  </div>
                  <span className="modrinth-demo-title">{t('home.modrinthDemoTitle')}</span>
                </div>
                <div className="modrinth-demo-body">
                  <div className="modrinth-demo-search">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <span className="modrinth-demo-search-placeholder">{t('home.modrinthSearchPlaceholder')}</span>
                  </div>
                  <div className="modrinth-demo-results">
                    {[0, 1, 2, 3, 4].map((i) => {
                      const items = [
                        { icon: Package, name: t('home.modrinthFeature.mods'), color: '#1bd96a' },
                        { icon: Map, name: t('home.modrinthFeature.maps'), color: '#1bd96a' },
                        { icon: Paintbrush, name: t('home.modrinthFeature.resourcePacks'), color: '#1bd96a' },
                        { icon: Sparkles, name: t('home.modrinthFeature.shaders'), color: '#1bd96a' },
                        { icon: Database, name: t('home.modrinthFeature.dataPacks'), color: '#1bd96a' },
                      ]
                      const item = items[i]
                      const isActive = modrinthActiveIndex === i
                      return (
                        <div
                          key={i}
                          className={`modrinth-demo-result ${isActive ? 'installing' : ''} ${modrinthInstalledIndex === i ? 'installed' : ''}`}
                        >
                          <div className="modrinth-demo-result-icon" style={{ borderColor: isActive ? item.color : undefined }}>
                            <item.icon size={16} color={isActive ? item.color : undefined} />
                          </div>
                          <div className="modrinth-demo-result-info">
                            <span className="modrinth-demo-result-name">{item.name}</span>
                            <span className="modrinth-demo-result-meta">{t('home.modrinthDemoMeta')}</span>
                          </div>
                          <div className="modrinth-demo-result-action">
                            {modrinthInstalledIndex === i ? (
                              <span className="modrinth-demo-installed">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1bd96a" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                              </span>
                            ) : isActive ? (
                              <div className="modrinth-demo-progress">
                                <div className="modrinth-demo-progress-bar" style={{ width: `${modrinthProgress}%` }} />
                              </div>
                            ) : (
                              <span className="modrinth-demo-install-btn">{t('home.modrinthInstall')}</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MIGRATION SECTION ===== */}
        <section className="section" id="migration">
          <div className="section-header">
            <h2 className="section-title">{t('home.migrationTitle')} <span className="accent">{t('home.migrationTitleAccent')}</span></h2>
            <p className="section-subtitle">
              {t('home.migrationSubtitle')}
            </p>
            <div className="section-divider" />
          </div>

          <div className="migration-grid">
            {migrationLaunchers.map((launcher, i) => (
              <div key={i} className="migration-card">
                <h4 className="migration-card-name">{launcher.name}</h4>
                <p className="migration-card-desc">{launcher.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== COMMUNITY & STATS SECTION ===== */}
        <section className="section" id="community">
          <div className="community-stats-grid">
            {/* Discord Card */}
            <div className="community-card discord-card">
              <div className="community-card-icon">
                <svg width="48" height="48" viewBox="0 0 127.14 96.36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53.07S36,40.45,42.45,40.45s11.56,5.78,11.43,12.62S48.86,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53.07s5-12.62,11.44-12.62S96.23,47.18,96.1,53.07,91,65.69,84.69,65.69Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="community-card-title">{t('home.communityTitle')} <span className="accent">{t('home.communityTitleAccent')}</span></h3>
              <p className="community-card-desc">{t('home.communitySubtitle')}</p>
              <p className="community-card-members">
                <MessageCircle size={14} />
                {t('home.communityMembers')}
              </p>
              <a
                href="https://discord.gg/h4JPfGNGhc"
                target="_blank"
                rel="noopener noreferrer"
                className="community-card-btn discord-btn"
              >
                {t('home.communityJoin')}
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Download Stats Card */}
            <div className="community-card stats-card">
              <div className="community-card-icon">
                <Download size={48} strokeWidth={1.5} />
              </div>
              <h3 className="community-card-title">{t('home.downloadsTitle')} <span className="accent">{t('home.downloadsTitleAccent')}</span></h3>
              <p className="community-card-desc">{t('home.downloadsSubtitle')}</p>
              <div className="stats-number">
                {totalDownloads !== null ? (
                  <span className="stats-count">{totalDownloads.toLocaleString()}</span>
                ) : (
                  <span className="stats-loading">{t('home.downloadsLoading')}</span>
                )}
              </div>
              <p className="stats-label">{t('home.downloadsCount')}</p>
            </div>
          </div>
        </section>

        {/* ===== CALL-TO-ACTION BOTTOM ===== */}
        <section className="section" style={{ textAlign: 'center', paddingBottom: '140px' }}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            {t('home.readyTitle')} <span className="accent">{t('home.readyTitleAccent')}</span> ?
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '48px' }}>
            {t('home.readySubtitle')}
          </p>
          <Link href="/download" className="hero-cta">
            {t('home.readyCta')}
          </Link>
        </section>
      </main>

      <Footer />

      {/* Image Lightbox */}
      {lightboxSrc && (
        <div
          className="image-lightbox-overlay"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt={lightboxAlt}
            className="image-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
