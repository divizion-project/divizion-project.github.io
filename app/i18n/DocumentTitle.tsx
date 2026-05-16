'use client'

import { useEffect } from 'react'
import { useLanguage } from './LanguageContext'

export default function DocumentTitle() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t('site.title')

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('site.description'))
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', t('site.title'))
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', t('site.description'))
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t('site.title'))
    }
  }, [t])

  return null
}
