'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'

type T = { fr: string; en: string }

const changelog: { version: string; date: T; latest: boolean; changes: { tag: string; text: T }[] }[] = [
  {
    version: '3.1.5',
    date: { fr: '2 avril 2026', en: 'April 2, 2026' },
    latest: true,
    changes: [
      { tag: 'new', text: { fr: "Nouveau centre d'activité centralisé pour suivre toutes les opérations du launcher", en: "New centralized activity center to track all launcher operations" } },
      { tag: 'new', text: { fr: "Affichage des logs en direct pour chaque instance en cours d'exécution", en: "Live log display for each running instance" } },
      { tag: 'improve', text: { fr: "Amélioration du système de gestion du stockage avec vue détaillée par composant", en: "Improved storage management system with detailed component view" } },
      { tag: 'improve', text: { fr: "Optimisation du lancement rapide via Ctrl + K", en: "Optimized quick launch via Ctrl + K" } },
      { tag: 'fix', text: { fr: "Correction d'un crash lors du lancement simultané de plusieurs instances", en: "Fixed a crash when launching multiple instances simultaneously" } },
      { tag: 'fix', text: { fr: "Correction de l'affichage des modpacks dans la vue sidebar", en: "Fixed modpack display in sidebar view" } },
    ],
  },
  {
    version: '3.1.4',
    date: { fr: '18 mars 2026', en: 'March 18, 2026' },
    latest: false,
    changes: [
      { tag: 'new', text: { fr: "Support des 3 modes de vue pour les instances (grille, liste, compacte)", en: "Support for 3 view modes for instances (grid, list, compact)" } },
      { tag: 'improve', text: { fr: "Refonte de la sidebar avec accès rapide aux détails des instances", en: "Sidebar redesign with quick access to instance details" } },
      { tag: 'improve', text: { fr: "Amélioration de la vitesse de téléchargement des modpacks", en: "Improved modpack download speed" } },
      { tag: 'fix', text: { fr: "Correction du système d'import depuis Prism Launcher", en: "Fixed import system from Prism Launcher" } },
      { tag: 'fix', text: { fr: "Résolution d'un bug d'affichage sur les écrans ultra-larges", en: "Fixed a display bug on ultra-wide screens" } },
    ],
  },
  {
    version: '3.1.3',
    date: { fr: '2 mars 2026', en: 'March 2, 2026' },
    latest: false,
    changes: [
      { tag: 'new', text: { fr: "Installation de modpacks simplifiée avec suivi du téléchargement en temps réel", en: "Simplified modpack installation with real-time download tracking" } },
      { tag: 'new', text: { fr: "Détection automatique des crashs avec affichage de l'extrait pertinent", en: "Automatic crash detection with relevant excerpt display" } },
      { tag: 'improve', text: { fr: "Meilleure gestion de la mémoire lors du lancement de multiples instances", en: "Better memory management when launching multiple instances" } },
      { tag: 'fix', text: { fr: "Correction de la détection automatique de Java sur certaines configurations Linux", en: "Fixed automatic Java detection on certain Linux configurations" } },
    ],
  },
  {
    version: '3.1.2',
    date: { fr: '14 février 2026', en: 'February 14, 2026' },
    latest: false,
    changes: [
      { tag: 'new', text: { fr: "Support du drag and drop pour l'organisation des instances", en: "Drag and drop support for instance organization" } },
      { tag: 'improve', text: { fr: "Amélioration de l'interface du gestionnaire de stockage", en: "Improved storage manager interface" } },
      { tag: 'improve', text: { fr: "Optimisation du cache natif pour réduire les temps de chargement", en: "Optimized native cache to reduce loading times" } },
      { tag: 'fix', text: { fr: "Correction d'un problème avec les comptes hors ligne sur certains serveurs", en: "Fixed an issue with offline accounts on certain servers" } },
      { tag: 'fix', text: { fr: "Fix de la détection de l'architecture ARM64 sur macOS", en: "Fixed ARM64 architecture detection on macOS" } },
    ],
  },
  {
    version: '3.1.1',
    date: { fr: '28 janvier 2026', en: 'January 28, 2026' },
    latest: false,
    changes: [
      { tag: 'improve', text: { fr: "Amélioration significative de la vitesse de démarrage du launcher", en: "Significant improvement in launcher startup speed" } },
      { tag: 'improve', text: { fr: "Refonte du système de gestion des dépendances des mods", en: "Redesigned mod dependency management system" } },
      { tag: 'fix', text: { fr: "Correction d'un bug empêchant le lancement sur Windows ARM64", en: "Fixed a bug preventing launch on Windows ARM64" } },
      { tag: 'fix', text: { fr: "Fix de l'affichage du Discord RPC pour les instances personnalisées", en: "Fixed Discord RPC display for custom instances" } },
    ],
  },
  {
    version: '3.1.0',
    date: { fr: '10 janvier 2026', en: 'January 10, 2026' },
    latest: false,
    changes: [
      { tag: 'new', text: { fr: "Multi-instances : lancez et supervisez plusieurs instances simultanément", en: "Multi-instance: launch and monitor multiple instances simultaneously" } },
      { tag: 'new', text: { fr: "Système de comptes hors ligne entièrement gratuit et sans restriction", en: "Completely free offline account system with no restrictions" } },
      { tag: 'new', text: { fr: "Support complet de Linux ARM64 et macOS Apple Silicon", en: "Full support for Linux ARM64 and macOS Apple Silicon" } },
      { tag: 'improve', text: { fr: "Nouvelle interface avec title bar unifiée", en: "New interface with unified title bar" } },
      { tag: 'remove', text: { fr: "Suppression du support des anciennes versions de Java 8 non-LTS", en: "Removed support for old non-LTS Java 8 versions" } },
    ],
  },
]

export default function ChangelogPage() {
  const { locale, t } = useLanguage()

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="page-hero">
          <h1 className="page-title">{t('changelog.title')}</h1>
          <p className="page-subtitle">
            {t('changelog.subtitle')}
          </p>
        </section>

        <div className="changelog-content">
          {changelog.map((entry) => (
            <div
              key={entry.version}
              className={`changelog-entry ${entry.latest ? 'latest' : ''}`}
            >
              <h3 className="changelog-version">v{entry.version}</h3>
              <p className="changelog-date">{entry.date[locale]}</p>
              <ul className="changelog-list">
                {entry.changes.map((change, i) => (
                  <li key={i}>
                    <span className={`changelog-tag tag-${change.tag}`}>
                      {t(`changelog.tags.${change.tag}`)}
                    </span>
                    <span>{change.text[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
