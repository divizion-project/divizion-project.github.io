'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import ImageLightbox from './components/ImageLightbox'
import { useLanguage } from './i18n/LanguageContext'

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
