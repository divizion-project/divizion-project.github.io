'use client'

import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-by">
          <span>by</span>
          <img
            src="/seizure-logo-black.webp"
            alt="Seizure"
            className="footer-seizure-logo"
          />
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <Link href="/legal">{t('footer.legal')}</Link>
            <Link href="/privacy">{t('footer.privacy')}</Link>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
