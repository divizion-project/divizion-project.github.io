'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const languages = [
  { code: 'fr' as const, label: 'Français' },
  { code: 'en' as const, label: 'English' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = languages.find((l) => l.code === locale)!

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        className="lang-dropdown-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
      >
        <Globe size={14} />
        <span>{current.label}</span>
        <ChevronDown size={12} className={`lang-dropdown-arrow ${open ? 'open' : ''}`} />
      </button>
      {open && (
        <ul className="lang-dropdown-menu">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                className={`lang-dropdown-item ${lang.code === locale ? 'active' : ''}`}
                onClick={() => { setLocale(lang.code); setOpen(false) }}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
