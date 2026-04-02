'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { version, downloadsData } from '../lib/version'
import { Download, ChevronDown, X, Copy, Check, Monitor, Cpu } from 'lucide-react'

function detectOS(): 'windows' | 'mac' | 'linux' {
  if (typeof window === 'undefined') return 'windows'
  const ua = navigator.userAgent
  if (ua.includes('Mac')) return 'mac'
  if (ua.includes('Linux') || ua.includes('X11')) return 'linux'
  return 'windows'
}

interface ArchOption {
  label: string
  desc: string
  size: string
  url: string
}

export default function DownloadPage() {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'linux'>('windows')
  const [showArchDropdown, setShowArchDropdown] = useState(false)
  const [showArchModal, setShowArchModal] = useState<string | null>(null)
  const [showMacPopup, setShowMacPopup] = useState(false)
  const [macDownloadUrl, setMacDownloadUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setDetectedOS(detectOS())
  }, [])

  const platformData: Record<string, { name: string; description: string; archs: ArchOption[] }> = {
    windows: {
      name: t('download.windowsName'),
      description: t('download.windowsDesc'),
      archs: [
        {
          label: t('download.windowsArchLabel'),
          desc: t('download.windowsArchDesc'),
          size: downloadsData.windows.x64.size,
          url: downloadsData.windows.x64.url,
        },
      ],
    },
    mac: {
      name: t('download.macName'),
      description: t('download.macDesc'),
      archs: [
        {
          label: t('download.macArmLabel'),
          desc: t('download.macArmDesc'),
          size: downloadsData.mac.arm64.size,
          url: downloadsData.mac.arm64.url,
        },
        {
          label: t('download.macIntelLabel'),
          desc: t('download.macIntelDesc'),
          size: downloadsData.mac.x64.size,
          url: downloadsData.mac.x64.url,
        },
      ],
    },
    linux: {
      name: t('download.linuxName'),
      description: t('download.linuxDesc'),
      archs: [
        {
          label: t('download.linuxArchLabel'),
          desc: t('download.linuxArchDesc'),
          size: downloadsData.linux.arm64.size,
          url: downloadsData.linux.arm64.url,
        },
      ],
    },
  }

  // Auto-trigger macOS download 2 seconds after popup appears
  useEffect(() => {
    if (showMacPopup && macDownloadUrl) {
      const timeout = setTimeout(() => {
        window.open(macDownloadUrl, '_blank')
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [showMacPopup, macDownloadUrl])

  const currentPlatform = platformData[detectedOS]
  const otherPlatforms = Object.entries(platformData).filter(([key]) => key !== detectedOS)

  const handleDownload = (os: string, archUrl?: string) => {
    const platform = platformData[os]
    if (platform.archs.length === 1) {
      const url = archUrl || platform.archs[0].url
      if (os === 'mac') {
        setMacDownloadUrl(url)
        setShowMacPopup(true)
      } else {
        window.open(url, '_blank')
      }
    } else {
      // Multiple architectures — show modal
      setShowArchModal(os)
    }
  }

  const handleArchSelect = (os: string, url: string) => {
    setShowArchModal(null)
    if (os === 'mac') {
      setMacDownloadUrl(url)
      setShowMacPopup(true)
    } else {
      window.open(url, '_blank')
    }
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('xattr -cr /Applications/Divizion\\ Launcher.app')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="page-hero">
          <h1 className="page-title">{t('download.title')}</h1>
          <p className="page-subtitle">
            {t('download.subtitle')} {version.version}
          </p>
        </section>

        <div className="download-content">
          {/* ===== PRIMARY DOWNLOAD (Detected OS) ===== */}
          <div className="download-main-card">
            <span className="download-main-badge">{t('download.recommended')}</span>
            <h2 className="download-main-os">{currentPlatform.name}</h2>
            <p className="download-main-description">{currentPlatform.description}</p>
            <p className="download-main-version">v{version.version} · {currentPlatform.archs[0].size}</p>

            <div className="download-btn-row">
              {currentPlatform.archs.length === 1 ? (
                /* Single arch: direct download */
                <button
                  className="download-btn-main"
                  onClick={() => handleDownload(detectedOS)}
                >
                  <Download size={16} />
                  {t('download.cta')}
                </button>
              ) : (
                /* Multiple archs: button + dropdown */
                <>
                  <button
                    className="download-btn-main"
                    onClick={() => handleDownload(detectedOS)}
                  >
                    <Download size={16} />
                    {t('download.cta')}
                  </button>
                  <div className="download-dropdown-wrapper">
                    <button
                      className="download-btn-dropdown"
                      onClick={() => setShowArchDropdown(!showArchDropdown)}
                    >
                      <ChevronDown
                        size={16}
                        style={{
                          transform: showArchDropdown ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </button>
                    {showArchDropdown && (
                      <div className="download-dropdown-menu">
                        {currentPlatform.archs.map((arch, i) => (
                          <a
                            key={i}
                            href={arch.url}
                            className="download-dropdown-item"
                            onClick={(e) => {
                              e.preventDefault()
                              handleArchSelect(detectedOS, arch.url)
                              setShowArchDropdown(false)
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: 2 }}>{arch.label}</div>
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{arch.desc}</div>
                            </div>
                            <span className="download-dropdown-item-size">{arch.size}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ===== OTHER PLATFORMS ===== */}
          <div className="download-other-section">
            <h3 className="download-other-title">{t('download.otherPlatforms')}</h3>
            <div className="download-other-grid">
              {otherPlatforms.map(([key, platform]) => (
                <div
                  key={key}
                  className="download-other-card"
                  onClick={() => handleDownload(key)}
                >
                  <h3>{platform.name}</h3>
                  <p>{platform.description}</p>
                  <span className="download-other-btn">
                    <Download size={12} />
                    {t('download.cta')} →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ===== ARCHITECTURE SELECTION MODAL ===== */}
      {showArchModal && (
        <div className="modal-overlay" onClick={() => setShowArchModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {t('download.downloadFor')} {platformData[showArchModal].name}
              </h3>
              <button className="modal-close" onClick={() => setShowArchModal(null)}>
                <X size={14} />
              </button>
            </div>
            <div className="modal-body">
              {platformData[showArchModal].archs.map((arch, i) => (
                <a
                  key={i}
                  href={arch.url}
                  className="modal-option"
                  onClick={(e) => {
                    e.preventDefault()
                    handleArchSelect(showArchModal, arch.url)
                  }}
                >
                  <div className="modal-option-icon">
                    {i === 0 ? <Cpu size={18} strokeWidth={1.5} /> : <Monitor size={18} strokeWidth={1.5} />}
                  </div>
                  <div className="modal-option-text">
                    <span className="modal-option-title">{arch.label}</span>
                    <span className="modal-option-desc">{arch.desc}</span>
                    <span className="modal-option-size">{arch.size}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== macOS COMMAND POPUP ===== */}
      {showMacPopup && (
        <div className="modal-overlay" onClick={() => { setShowMacPopup(false); setMacDownloadUrl(null) }}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t('download.macInfo')}</h3>
              <button className="modal-close" onClick={() => { setShowMacPopup(false); setMacDownloadUrl(null) }}>
                <X size={14} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>
                {t('download.macDescription')}
              </p>

              <div className="mac-command-block">
                <code className="mac-command-code">
                  xattr -cr /Applications/Divizion\ Launcher.app
                </code>
                <button
                  className="mac-command-copy"
                  onClick={handleCopyCommand}
                  title="Copier la commande"
                >
                  {copied ? <Check size={16} color="var(--accent)" /> : <Copy size={16} />}
                </button>
              </div>

              <button
                className="modal-confirm-btn"
                onClick={() => { setShowMacPopup(false); setMacDownloadUrl(null) }}
              >
                {t('download.macUnderstood')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
