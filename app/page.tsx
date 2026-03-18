'use client'

import { useState, useEffect } from 'react'
import TransitionLink from './components/TransitionLink'
import ScrollButton from './components/ScrollButton'
import PageWrapper from './components/PageWrapper'
import { usePageTransition } from './components/PageTransition'
import { version } from './lib/version'
import { 
  Zap, Layers, Download, Settings, Users, 
  HardDrive, Gauge, Box, Loader, FileText, Play, Activity,
  Cpu, Database, Network, ChevronDown, ArrowDown,
  ChevronLeft, ChevronRight, Monitor, Smartphone, Terminal,
  Package, UserCheck, LayoutGrid, MousePointer, Sparkles,
  Eye, BarChart3, RefreshCw, Clock, Trash2, FolderSync,
  Palette, Maximize, Menu, MessageCircle, Youtube
} from 'lucide-react'

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      docs: "Documentation",
      download: "Télécharger"
    },
    hero: {
      badge: "Version 3.0.2",
      title: "Le launcher",
      titleAccent: "polyvalent",
      titleEnd: "pour Minecraft",
      description: "Parfait pour les créateurs de contenus, développeurs de mods, et joueurs qui veulent simplement jouer sans se casser la tête.",
      ctaDownload: "Télécharger",
      ctaFeatures: "Fonctionnalités"
    },
    meta: {
      version: "Version",
      date: "Date",
      platforms: "Plateformes"
    },
    slider: {
      slide: "Diapositive"
    },
    trailer: {
      badge: "Nouveau",
      title: "Découvrez",
      titleAccent: "Divizion Launcher 3.1",
      subtitle: "Regardez la présentation complète du launcher",
      youtubeBtn: "Voir sur YouTube",
      comingSoon: "Trailer à venir"
    },
    features: {
      title: "Fonctionnalités"
    },
    footer: {
      copyright: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité"
    }
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      docs: "Documentation",
      download: "Download"
    },
    hero: {
      badge: "Version 3.0.2",
      title: "The versatile",
      titleAccent: "launcher",
      titleEnd: "for Minecraft",
      description: "Perfect for content creators, mod developers, and players who just want to play without hassle.",
      ctaDownload: "Download",
      ctaFeatures: "Features"
    },
    meta: {
      version: "Version",
      date: "Date",
      platforms: "Platforms"
    },
    slider: {
      slide: "Slide"
    },
    trailer: {
      badge: "New",
      title: "Discover",
      titleAccent: "Divizion Launcher 3.1",
      subtitle: "Watch the full launcher presentation",
      youtubeBtn: "Watch on YouTube",
      comingSoon: "Trailer coming soon"
    },
    features: {
      title: "Features"
    },
    footer: {
      copyright: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy"
    }
  }
}

interface Feature {
  icon: any
  title: string
  description: string
}

function getBrowserLanguage(): 'fr' | 'en' {
  if (typeof window === 'undefined') return 'fr'
  const saved = localStorage.getItem('divizion-locale')
  if (saved === 'fr' || saved === 'en') return saved
  const lang = navigator.language || (navigator as any).userLanguage || 'fr'
  const locale = lang.toLowerCase().split('-')[0]
  return locale === 'fr' ? 'fr' : 'en'
}



const featuredFeatures: Record<string, Feature[]> = {
  fr: [
    { icon: Box, title: "Installation de mods faciles", description: "Installe tes mods depuis le launcher sans chercher les bons dossiers, déplacer les fichiers à la main ou refaire les mêmes étapes à chaque fois." },
    { icon: Users, title: "Support des comptes crack Minecraft", description: "Choisis librement entre un compte officiel Minecraft et un compte hors ligne selon l'usage que tu veux faire de chaque instance." },
    { icon: Download, title: "Import MultiMC, PolyMC et Prism en 3 clics", description: "Récupère facilement tes installations depuis MultiMC, Prism Launcher, PolyMC ou le launcher officiel Minecraft sans tout recommencer de zéro." }
  ],
  en: [
    { icon: Box, title: "Easy mod installation", description: "Install your mods from the launcher without searching for the right folders, moving files manually, or repeating the same steps every time." },
    { icon: Users, title: "Minecraft cracked account support", description: "Freely choose between an official Minecraft account and an offline account depending on how you want to use each instance." },
    { icon: Download, title: "MultiMC, PolyMC & Prism import in 3 clicks", description: "Easily recover your installations from MultiMC, Prism Launcher, PolyMC or the official Minecraft launcher without starting from scratch." }
  ]
}

const allFeatures: Record<string, Feature[]> = {
  fr: [
    { icon: Package, title: "Installe tes modpacks en quelques clics", description: "Tu choisis un modpack, et le launcher s'occupe du reste pour que tu puisses jouer rapidement sans passer par une installation compliquée ou des manipulations techniques inutiles." },
    { icon: Box, title: "Ajoute tes mods simplement", description: "Installe tes mods depuis le launcher sans chercher les bons dossiers, déplacer les fichiers à la main ou refaire les mêmes étapes à chaque fois." },
    { icon: Loader, title: "Laisse le launcher gérer les dépendances", description: "Quand un mod ou un modpack a besoin d'autres composants pour fonctionner, le launcher les récupère automatiquement pour t'éviter les oublis et les erreurs." },
    { icon: Layers, title: "Joue avec Fabric facilement", description: "Crée et lance tes instances Fabric sans avoir à préparer tout l'environnement technique toi-même." },
    { icon: Download, title: "Importe tes anciennes instances", description: "Récupère facilement tes installations depuis MultiMC, Prism Launcher, PolyMC ou le launcher officiel Minecraft sans tout recommencer de zéro." },
    { icon: Users, title: "Utilise un compte premium ou hors ligne", description: "Choisis librement entre un compte officiel Minecraft et un compte hors ligne selon l'usage que tu veux faire de chaque instance." },
    { icon: UserCheck, title: "Choisis un compte différent pour chaque instance", description: "Garde une vraie séparation entre tes usages en attribuant à chaque instance le type de compte qui lui correspond." },
    { icon: Sparkles, title: "Commence sans compte imposé", description: "Télécharge, configure et lance le launcher sans être bloqué par une création de compte ou une étape de connexion inutile." },
    { icon: Zap, title: "Profite d'une expérience sans friction", description: "Tout est pensé pour te faire gagner du temps, réduire les étapes inutiles et rendre l'utilisation du launcher plus simple du début à la fin." },
    { icon: LayoutGrid, title: "Gère tout autour de tes instances", description: "Le launcher place tes instances au centre de l'expérience pour que tu puisses les créer, les modifier, les organiser et les lancer plus naturellement." },
    { icon: Cpu, title: "Lance plusieurs instances en même temps", description: "Garde plusieurs sessions ouvertes en parallèle pour tester, comparer, multitâcher ou jouer sur plusieurs environnements sans interruption." },
    { icon: Play, title: "Relance plusieurs fois la même instance", description: "Ouvre plusieurs sessions basées sur une seule et même configuration quand ton usage le demande." },
    { icon: Database, title: "Range tes instances avec des tags", description: "Classe tes instances comme tu veux pour retrouver plus vite celles qui correspondent à ton style de jeu, à tes projets ou à tes tests." },
    { icon: MousePointer, title: "Accède rapidement aux actions importantes", description: "Utilise le menu clic droit pour atteindre immédiatement les options essentielles d'une instance sans naviguer dans plusieurs écrans." },
    { icon: FolderSync, title: "Fais glisser, dépose, continue", description: "Le support du drag and drop rend certaines actions plus directes et plus naturelles dans l'usage quotidien." },
    { icon: Gauge, title: "Profite d'un lancement ultra-rapide", description: "Le launcher est pensé pour t'emmener vers le jeu le plus vite possible avec une expérience de démarrage fluide et réactive." },
    { icon: Zap, title: "Ouvre le launcher rapidement", description: "Accède vite à tes instances et à tes actions principales sans attendre qu'une interface lourde se mette en place." },
    { icon: Settings, title: "Optimise les performances comme tu veux", description: "Une section dédiée te permet d'ajuster les options de performance du launcher selon ton matériel et ta manière de jouer." },
    { icon: RefreshCw, title: "Réduis les vérifications inutiles", description: "Certaines validations peuvent être gérées plus intelligemment pour rendre la préparation et le lancement plus rapides." },
    { icon: HardDrive, title: "Profite d'un cache natif plus efficace", description: "Le launcher réutilise certains composants déjà préparés pour éviter de refaire inutilement les mêmes traitements." },
    { icon: Database, title: "Garde les données utiles en mémoire", description: "Les informations fréquemment utilisées, comme certaines données de versions ou d'environnement, restent disponibles pour rendre l'expérience plus fluide." },
    { icon: Cpu, title: "Accélère la gestion de Java", description: "Le launcher évite de refaire certaines vérifications Java inutilement pour rendre la préparation plus discrète et plus efficace." },
    { icon: Clock, title: "Choisis la durée du cache", description: "Ajuste le comportement du cache selon tes préférences pour privilégier soit la rapidité, soit un rafraîchissement plus strict." },
    { icon: Trash2, title: "Réinitialise rapidement l'environnement", description: "Nettoie le cache en un instant quand tu veux repartir sur une base propre ou corriger un comportement inhabituel." },
    { icon: Download, title: "Précharge tes versions Minecraft préférées", description: "Prépare à l'avance les versions que tu utilises le plus pour qu'elles soient déjà prêtes au moment où tu veux les lancer." },
    { icon: Package, title: "Prépare tes versions avec un assistant dédié", description: "Un assistant t'aide à sélectionner et télécharger à l'avance les versions que tu veux garder disponibles." },
    { icon: Network, title: "Travaille confortablement en multitâche", description: "Le launcher reste agréable à utiliser même quand tu enchaînes plusieurs lancements, installations ou tests dans la même session." },
    { icon: Eye, title: "Profite d'une interface claire", description: "L'interface met en avant ce qui compte vraiment pour que tu comprennes rapidement où cliquer et quoi faire." },
    { icon: Monitor, title: "Retrouve un accueil plus utile", description: "La page d'accueil te donne un accès plus direct aux éléments importants pour commencer plus vite." },
    { icon: Palette, title: "Navigue dans un design allégé", description: "Le launcher évite les éléments visuels inutiles pour garder une interface plus lisible et plus agréable à utiliser." },
    { icon: Maximize, title: "Utilise le launcher dans n'importe quelle taille de fenêtre", description: "L'interface s'adapte proprement à ton espace pour rester confortable aussi bien dans une petite fenêtre qu'en affichage plus large." },
    { icon: Menu, title: "Profite d'une barre supérieure unifiée", description: "La title bar commune à toute l'application apporte une navigation plus cohérente et un rendu plus propre sur l'ensemble du launcher." },
    { icon: Sparkles, title: "Ressens des interactions plus fluides", description: "Les actions, transitions et réponses de l'interface sont pensées pour rendre l'expérience plus naturelle au quotidien." },
    { icon: Activity, title: "Suis tout depuis le centre d'activité", description: "Retrouve dans un seul espace les téléchargements, les installations, les actions internes du launcher et l'activité liée à tes instances." },
    { icon: Eye, title: "Vois ce qu'il se passe en temps réel", description: "Tu sais toujours quelle tâche est en cours, où elle en est et sur quoi le launcher travaille à l'instant." },
    { icon: Download, title: "Garde un œil sur tes téléchargements", description: "Consulte facilement les téléchargements en cours sans perdre le fil de ce que le launcher est en train de préparer." },
    { icon: Package, title: "Suis tes installations et mises à jour", description: "Observe clairement les opérations liées aux mods, modpacks et autres contenus gérés par le launcher." },
    { icon: FileText, title: "Consulte des logs séparés par instance", description: "Chaque instance dispose de son propre suivi pour t'aider à mieux comprendre ce qui se passe sans tout mélanger." },
    { icon: AlertCircle, title: "Repère plus vite les crashs", description: "Quand le jeu plante, le launcher détecte le crash pour t'aider à comprendre plus rapidement ce qu'il s'est passé." },
    { icon: Eye, title: "Vois directement la partie utile des logs", description: "Le launcher met en avant l'extrait le plus pertinent pour éviter de perdre du temps à chercher l'erreur dans des centaines de lignes." },
    { icon: FileText, title: "Copie rapidement l'erreur importante", description: "Récupère facilement l'extrait utile pour le partager, le garder ou demander de l'aide plus simplement." },
    { icon: Cpu, title: "Laisse le launcher gérer Java pour toi", description: "Le launcher détecte et installe automatiquement Java quand c'est nécessaire pour te retirer une partie technique souvent pénible." },
    { icon: BarChart3, title: "Visualise ce qui prend de la place", description: "Une section stockage t'aide à mieux comprendre comment l'espace disque est utilisé par le launcher." },
    { icon: HardDrive, title: "Analyse ton espace disque clairement", description: "Repère rapidement les éléments les plus lourds pour mieux gérer ton installation au fil du temps." },
    { icon: Database, title: "Vois le détail par composant", description: "Consulte séparément les versions, libraries, assets, cache, mods, images et instances pour comprendre exactement ce qui occupe ton stockage." },
    { icon: FolderSync, title: "Gère tes versions préchargées", description: "Retrouve facilement les versions déjà préparées et supprime celles que tu ne veux plus conserver localement." },
    { icon: MessageCircle, title: "Affiche ton activité sur Discord", description: "Le support Discord RPC te permet de montrer ce que tu fais directement sur Discord sans configuration compliquée." }
  ],
  en: [
    { icon: Package, title: "Install modpacks in a few clicks", description: "Choose a modpack, and the launcher takes care of the rest so you can play quickly without going through a complicated installation or unnecessary technical manipulations." },
    { icon: Box, title: "Add your mods easily", description: "Install your mods from the launcher without searching for the right folders, moving files manually, or repeating the same steps every time." },
    { icon: Loader, title: "Let the launcher handle dependencies", description: "When a mod or modpack needs other components to work, the launcher automatically retrieves them to avoid oversights and errors." },
    { icon: Layers, title: "Play with Fabric easily", description: "Create and launch your Fabric instances without having to prepare the entire technical environment yourself." },
    { icon: Download, title: "Import your old instances", description: "Easily recover your installations from MultiMC, Prism Launcher, PolyMC or the official Minecraft launcher without starting from scratch." },
    { icon: Users, title: "Use a premium or offline account", description: "Freely choose between an official Minecraft account and an offline account depending on how you want to use each instance." },
    { icon: UserCheck, title: "Choose a different account for each instance", description: "Keep a real separation between your uses by assigning each instance the type of account that corresponds to it." },
    { icon: Sparkles, title: "Start without a forced account", description: "Download, configure and launch the launcher without being blocked by account creation or an unnecessary login step." },
    { icon: Zap, title: "Enjoy a frictionless experience", description: "Everything is designed to save you time, reduce unnecessary steps and make using the launcher simpler from start to finish." },
    { icon: LayoutGrid, title: "Manage everything around your instances", description: "The launcher places your instances at the center of the experience so you can create, modify, organize and launch them more naturally." },
    { icon: Cpu, title: "Launch multiple instances at the same time", description: "Keep multiple sessions open in parallel to test, compare, multitask or play on multiple environments without interruption." },
    { icon: Play, title: "Relaunch the same instance multiple times", description: "Open multiple sessions based on a single configuration when your usage requires it." },
    { icon: Database, title: "Organize your instances with tags", description: "Sort your instances as you wish to quickly find those that match your play style, projects or tests." },
    { icon: MousePointer, title: "Quickly access important actions", description: "Use the right-click menu to immediately reach essential instance options without navigating through multiple screens." },
    { icon: FolderSync, title: "Drag, drop, continue", description: "Drag and drop support makes certain actions more direct and natural in daily use." },
    { icon: Gauge, title: "Enjoy ultra-fast launching", description: "The launcher is designed to take you to the game as quickly as possible with a smooth and responsive startup experience." },
    { icon: Zap, title: "Open the launcher quickly", description: "Quickly access your instances and main actions without waiting for a heavy interface to load." },
    { icon: Settings, title: "Optimize performance as you want", description: "A dedicated section allows you to adjust launcher performance options according to your hardware and play style." },
    { icon: RefreshCw, title: "Reduce unnecessary checks", description: "Some validations can be managed more intelligently to make preparation and launching faster." },
    { icon: HardDrive, title: "Enjoy a more efficient native cache", description: "The launcher reuses already prepared components to avoid unnecessarily repeating the same processes." },
    { icon: Database, title: "Keep useful data in memory", description: "Frequently used information, such as certain version or environment data, remains available to make the experience smoother." },
    { icon: Cpu, title: "Accelerate Java management", description: "The launcher avoids repeating certain unnecessary Java checks to make preparation more discreet and efficient." },
    { icon: Clock, title: "Choose cache duration", description: "Adjust cache behavior according to your preferences to prioritize either speed or stricter refreshing." },
    { icon: Trash2, title: "Quickly reset the environment", description: "Clean the cache in an instant when you want to start fresh or correct unusual behavior." },
    { icon: Download, title: "Preload your favorite Minecraft versions", description: "Prepare in advance the versions you use most so they're ready when you want to launch them." },
    { icon: Package, title: "Prepare your versions with a dedicated wizard", description: "A wizard helps you select and download in advance the versions you want to keep available." },
    { icon: Network, title: "Work comfortably in multitasking", description: "The launcher remains pleasant to use even when you chain multiple launches, installations or tests in the same session." },
    { icon: Eye, title: "Enjoy a clear interface", description: "The interface highlights what really matters so you quickly understand where to click and what to do." },
    { icon: Monitor, title: "Find a more useful home", description: "The home page gives you more direct access to important elements to start faster." },
    { icon: Palette, title: "Navigate in a lightweight design", description: "The launcher avoids unnecessary visual elements to keep a more readable and pleasant interface to use." },
    { icon: Maximize, title: "Use the launcher in any window size", description: "The interface adapts properly to your space to remain comfortable both in a small window and in a wider display." },
    { icon: Menu, title: "Enjoy a unified top bar", description: "The title bar common to the entire application brings more consistent navigation and cleaner rendering across the launcher." },
    { icon: Sparkles, title: "Feel smoother interactions", description: "Actions, transitions and interface responses are designed to make the experience more natural on a daily basis." },
    { icon: Activity, title: "Track everything from the activity center", description: "Find in one space downloads, installations, internal launcher actions and activity related to your instances." },
    { icon: Eye, title: "See what's happening in real time", description: "You always know what task is in progress, where it stands and what the launcher is working on at the moment." },
    { icon: Download, title: "Keep an eye on your downloads", description: "Easily check ongoing downloads without losing track of what the launcher is preparing." },
    { icon: Package, title: "Track your installations and updates", description: "Clearly observe operations related to mods, modpacks and other content managed by the launcher." },
    { icon: FileText, title: "View logs separated by instance", description: "Each instance has its own tracking to help you better understand what's happening without mixing everything up." },
    { icon: AlertCircle, title: "Spot crashes faster", description: "When the game crashes, the launcher detects the crash to help you understand what happened more quickly." },
    { icon: Eye, title: "See directly the useful part of logs", description: "The launcher highlights the most relevant excerpt to avoid wasting time searching for the error in hundreds of lines." },
    { icon: FileText, title: "Quickly copy the important error", description: "Easily retrieve the useful excerpt to share, keep or ask for help more simply." },
    { icon: Cpu, title: "Let the launcher manage Java for you", description: "The launcher automatically detects and installs Java when necessary to remove a often tedious technical part." },
    { icon: BarChart3, title: "Visualize what's taking up space", description: "A storage section helps you better understand how disk space is used by the launcher." },
    { icon: HardDrive, title: "Analyze your disk space clearly", description: "Quickly identify the heaviest elements to better manage your installation over time." },
    { icon: Database, title: "See detail by component", description: "Separately view versions, libraries, assets, cache, mods, images and instances to understand exactly what's occupying your storage." },
    { icon: FolderSync, title: "Manage your preloaded versions", description: "Easily find already prepared versions and delete those you no longer want to keep locally." },
    { icon: MessageCircle, title: "Display your activity on Discord", description: "Discord RPC support allows you to show what you're doing directly on Discord without complicated configuration." }
  ]
}

function HomeContent() {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr')
  const [loading, setLoading] = useState(true)
  const { isFirstVisit } = usePageTransition()

  useEffect(() => {
    setLocale(getBrowserLanguage())
    
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1800)
      return () => clearTimeout(timer)
    } else {
      setLoading(false)
    }
  }, [isFirstVisit])

  const t = translations[locale]

  return (
    <>
      {isFirstVisit && (
        <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
          <div className="loading-content">
            <img src="/divizion-logo.webp" alt="Divizion Launcher" className="loading-logo" />
            <div className="loading-bar">
              <div className="loading-bar-fill"></div>
            </div>
          </div>
        </div>
      )}

      <div className={`page-content ${loading ? '' : 'visible'} ${!isFirstVisit ? 'page-enter' : ''}`}>
        <header className="header">
          <div className="container">
            <div className="header-inner">
              <div className="logo-section">
                <img src="/divizion-logo.webp" alt="Divizion Launcher" className="logo-image" />
                <span className="logo-text">Divizion Launcher</span>
              </div>
              <nav className="nav-links">
                <TransitionLink href="/" className="nav-link active">{t.nav.home}</TransitionLink>
                <ScrollButton targetId="features" className="nav-link">{t.nav.features}</ScrollButton>
                <TransitionLink href="/docs" className="nav-link">{t.nav.docs}</TransitionLink>
                <TransitionLink href="/download" className="nav-link">{t.nav.download}</TransitionLink>
                <button 
                  className="lang-toggle" 
                  onClick={() => {
                    const newLocale = locale === 'fr' ? 'en' : 'fr'
                    setLocale(newLocale)
                    localStorage.setItem('divizion-locale', newLocale)
                  }}
                  title={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
                >
                  {locale === 'fr' ? 'EN' : 'FR'}
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main>
          <section className="hero-section">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-content">
                  <div className="badge">
                    <span className="badge-dot"></span>
                    Version {version.version}
                  </div>

                  <h1 className="hero-title">
                    {t.hero.title}<br />
                    <span className="accent">{t.hero.titleAccent}</span> {t.hero.titleEnd}
                  </h1>

                  <p className="hero-description">
                    {t.hero.description}
                  </p>

                  <div className="hero-cta">
                    <TransitionLink href="/download" className="cta-primary">
                      <Download size={16} />
                      {t.hero.ctaDownload}
                    </TransitionLink>
                    <ScrollButton targetId="features" className="cta-secondary">
                      {t.hero.ctaFeatures}
                    </ScrollButton>
                  </div>

                  <div className="hero-meta">
                    <div className="meta-item">
                      <span className="meta-label">{t.meta.version}</span>
                      <span className="meta-value">{version.version}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{t.meta.date}</span>
                      <span className="meta-value">{version.releaseDateFormatted[locale]}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">{t.meta.platforms}</span>
                      <span className="meta-value">Win / Mac / Linux</span>
                    </div>
                  </div>
                </div>

                <div className="hero-slider">
                  <div className="slider-container">
                    <div className="slider-slide active">
                      <div className="trailer-video-container">
                        <div className="trailer-video-placeholder">
                          <iframe
                            src="https://www.youtube.com/embed/5WLQ-RkO2Fc?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=5WLQ-RkO2Fc"
                            title="Divizion Launcher 3.1"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            onClick={() => window.open('https://www.youtube.com/watch?v=5WLQ-RkO2Fc', '_blank')}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>



          <section id="features" className="features-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">{t.features.title}</h2>
              </div>

              <div className="featured-features-grid">
                {featuredFeatures[locale].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div className="featured-feature-card" key={index}>
                      <div className="featured-feature-icon">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div className="featured-feature-content">
                        <h3 className="featured-feature-title">{feature.title}</h3>
                        <p className="featured-feature-desc">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="features-grid-uniform">
                {allFeatures[locale].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div className="feature-card-uniform" key={index}>
                      <div className="feature-card-icon">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div className="feature-card-text">
                        <h3 className="feature-card-title">{feature.title}</h3>
                        <p className="feature-card-desc">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-seizure">
                <span className="footer-by">by</span>
                <img src="/seizure-logo-black.webp" alt="Seizure" className="footer-seizure-logo" />
              </div>
              <div className="footer-links">
                <TransitionLink href="/legal" className="footer-link">{t.footer.legal}</TransitionLink>
                <TransitionLink href="/privacy" className="footer-link">{t.footer.privacy}</TransitionLink>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      <HomeContent />
    </PageWrapper>
  )
}

function AlertCircle(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}
