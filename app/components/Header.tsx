'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../i18n/LanguageContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/features', label: t('nav.features') },
    { href: '/versions', label: t('nav.versions') },
    { href: '/wiki', label: t('nav.documentation') },
  ]

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <img src="/images/icones/logo-small-navbar.webp" alt="Divizion" />
            <span>Divizion</span>
          </Link>

          <nav className="header-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/download" className="header-cta desktop-cta">
            {t('nav.download')}
          </Link>

          <button
            className={`header-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/download"
          className="header-cta"
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.download')}
        </Link>
      </div>
    </>
  )
}
