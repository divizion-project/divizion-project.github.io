'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import { Download, Copy, Check, AlertTriangle, Terminal, Github, ArrowLeft, FileCode } from 'lucide-react'

const BETA_VERSION = '4.0.0-beta.2'
const BETA_TAG = 'v4.0.0-beta.2'
const BETA_BASE_URL = `https://github.com/divizion-project/Divizion-Launcher/releases/download/${BETA_TAG}`
const GITHUB_RELEASE_URL = `https://github.com/divizion-project/Divizion-Launcher/releases/tag/${BETA_TAG}`

interface Asset {
  filename: string
  size: string
  sha256: string
  platform: 'windows' | 'mac' | 'linux'
  arch?: 'arm64' | 'x64'
  format?: string
}

const assets: Asset[] = [
  {
    filename: 'Divizion-Launcher-setup-4.0.0-beta.2.exe',
    size: '176 MB',
    sha256: 'f4343a02f0d5b72f4ff8dcdc8374489b090780ac3c24f22d2111065be83b5f44',
    platform: 'windows',
    format: '.exe',
  },
  {
    filename: 'Divizion-Launcher-setup-4.0.0-beta.2-arm64.dmg',
    size: '187 MB',
    sha256: 'a484a811315a72c7e074377738e1fbd35b0ff9b51ccf67d46b208b60557ad43d',
    platform: 'mac',
    arch: 'arm64',
    format: '.dmg',
  },
  {
    filename: 'Divizion-Launcher-setup-4.0.0-beta.2-x64.dmg',
    size: '190 MB',
    sha256: 'e26a54204f0bff192a7be8cd5b4c4f8417ca8342599261d60d531e585c1ee173',
    platform: 'mac',
    arch: 'x64',
    format: '.dmg',
  },
  {
    filename: 'Divizion-Launcher-setup-4.0.0-beta.2-arm64.zip',
    size: '191 MB',
    sha256: '5ec971fd356f5bfb1d2ab2199f1b44abc6250c93ea666eba9e2458404f07f2ca',
    platform: 'mac',
    arch: 'arm64',
    format: '.zip',
  },
  {
    filename: 'Divizion-Launcher-setup-4.0.0-beta.2-x64.zip',
    size: '196 MB',
    sha256: 'a7182bf5eca3a6f683e3ac2f4cca9005d7ecde973ba82c1bb02a56dab4cf40e3',
    platform: 'mac',
    arch: 'x64',
    format: '.zip',
  },
  {
    filename: 'Divizion-Launcher-4.0.0-beta.2.AppImage',
    size: '173 MB',
    sha256: '68022c4d9205847c35b3601138fafd081c9cff39cc58ea4ff311b3d4f688a73b',
    platform: 'linux',
    format: '.AppImage',
  },
]

const MAC_COMMAND = 'xattr -cr /Applications/Divizion\\ Launcher.app'

export default function BetaPage() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [expandedSha, setExpandedSha] = useState<string | null>(null)

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(MAC_COMMAND)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const platforms = [
    {
      key: 'windows' as const,
      name: t('beta.windowsName'),
      desc: t('beta.windowsDesc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 12.5H10.5V19.5L3 18.5V12.5ZM11.5 4.4L21 3V11.5H11.5V4.4ZM11.5 12.5H21V21L11.5 19.6V12.5Z"/></svg>
      ),
    },
    {
      key: 'mac' as const,
      name: t('beta.macName'),
      desc: t('beta.macDesc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z"/></svg>
      ),
    },
    {
      key: 'linux' as const,
      name: t('beta.linuxName'),
      desc: t('beta.linuxDesc'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.776-.492-1.02h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 0 0-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/></svg>
      ),
    },
  ]

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="page-hero">
          <h1 className="page-title">{t('beta.title')}</h1>
          <p className="page-subtitle">
            {t('beta.subtitle')}
          </p>
          <p className="page-subtitle beta-version-tag">
            {t('beta.version')} <span className="beta-version-mono">{BETA_VERSION}</span>
          </p>
        </section>

        {/* ===== WARNING BANNER ===== */}
        <div className="beta-warning-banner">
          <AlertTriangle size={18} />
          <span>{t('beta.warning')}</span>
        </div>

        {/* ===== BACK TO STABLE ===== */}
        <div className="beta-back-wrapper">
          <Link href="/download" className="beta-back-link">
            <ArrowLeft size={14} />
            {t('beta.backToStable')}
          </Link>
        </div>

        {/* ===== PLATFORM CARDS ===== */}
        <div className="beta-platforms">
          <h3 className="beta-section-title">{t('beta.platforms')}</h3>
          <div className="beta-platform-grid">
            {platforms.map((platform) => {
              const platformAssets = assets.filter(
                (a) => a.platform === platform.key && !a.filename.endsWith('.zip')
              )
              const isMac = platform.key === 'mac'
              return (
                <div key={platform.key} className={`beta-platform-card ${isMac ? 'beta-platform-card-mac' : ''}`}>
                  <div className="beta-platform-card-header">
                    <div className="beta-platform-icon">{platform.icon}</div>
                    <div>
                      <h4 className="beta-platform-name">{platform.name}</h4>
                      <p className="beta-platform-desc">{platform.desc}</p>
                    </div>
                  </div>

                  {/* macOS xattr warning */}
                  {isMac && (
                    <div className="beta-mac-warning">
                      <div className="beta-mac-warning-header">
                        <Terminal size={14} />
                        <span>{t('beta.macWarningTitle')}</span>
                      </div>
                      <p className="beta-mac-warning-desc">{t('beta.macWarningDesc')}</p>
                      <div className="mac-command-block">
                        <code className="mac-command-code">{MAC_COMMAND}</code>
                        <button
                          className="mac-command-copy"
                          onClick={handleCopyCommand}
                          title={t('beta.copyCommand')}
                        >
                          {copied ? <Check size={16} color="var(--accent)" /> : <Copy size={16} />}
                        </button>
                      </div>
                      {copied && <span className="beta-copied-badge">{t('beta.copied')}</span>}
                    </div>
                  )}

                  <div className="beta-download-list">
                    {platformAssets.map((asset) => (
                      <a
                        key={asset.filename}
                        href={`${BETA_BASE_URL}/${asset.filename}`}
                        className="beta-download-btn"
                      >
                        <span className="beta-download-label">
                          {asset.arch ? t(`beta.${asset.arch}`) : asset.format}
                        </span>
                        <span className="beta-download-size">{asset.size}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ===== ASSETS TABLE (Developer feel) ===== */}
        <div className="beta-assets-section">
          <h3 className="beta-section-title">
            <FileCode size={16} />
            {t('beta.assets')}
          </h3>
          <div className="beta-assets-table">
            <div className="beta-assets-table-header">
              <span className="beta-col-file">{t('beta.filename')}</span>
              <span className="beta-col-size">{t('beta.size')}</span>
              <span className="beta-col-sha">{t('beta.checksum')}</span>
              <span className="beta-col-action"></span>
            </div>
            {assets.map((asset) => (
              <div key={asset.filename} className="beta-asset-row">
                <span className="beta-col-file beta-asset-name" title={asset.filename}>
                  {asset.filename}
                </span>
                <span className="beta-col-size beta-asset-size">{asset.size}</span>
                <span
                  className="beta-col-sha beta-asset-sha"
                  onClick={() => setExpandedSha(expandedSha === asset.filename ? null : asset.filename)}
                >
                  {expandedSha === asset.filename ? asset.sha256 : `${asset.sha256.slice(0, 16)}…`}
                </span>
                <span className="beta-col-action">
                  <a
                    href={`${BETA_BASE_URL}/${asset.filename}`}
                    className="beta-asset-download"
                    title={t('beta.cta')}
                  >
                    <Download size={14} />
                  </a>
                </span>
              </div>
            ))}
            {/* Source code */}
            <div className="beta-asset-row beta-asset-row-source">
              <span className="beta-col-file beta-asset-name">Source code (zip)</span>
              <span className="beta-col-size beta-asset-size">—</span>
              <span className="beta-col-sha beta-asset-sha">—</span>
              <span className="beta-col-action">
                <a
                  href={GITHUB_RELEASE_URL}
                  className="beta-asset-download"
                  title={t('beta.sourceCode')}
                >
                  <Github size={14} />
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* ===== GITHUB RELEASE LINK ===== */}
        <div className="beta-github-cta">
          <a
            href={GITHUB_RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="beta-github-link"
          >
            <Github size={16} />
            {t('beta.githubRelease')}
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
