'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import {
  Package, Box, Loader, Layers, Download, Users,
  UserCheck, Sparkles, Zap, LayoutGrid, Cpu, Play,
  Database, MousePointer, FolderSync, Gauge, Settings,
  RefreshCw, HardDrive, Clock, Trash2, Network,
  Eye, Monitor, Palette, Maximize, Menu, Activity,
  FileText, MessageCircle, BarChart3
} from 'lucide-react'

type T = { fr: string; en: string }

/* ========== 8 HERO FEATURES (with media) ========== */
const heroFeatures: { media: string; type: 'image' | 'video'; title: T; description: T; ratio: string }[] = [
  {
    media: '/homesceensources/activitymanager.webp',
    type: 'image',
    title: { fr: "Centre d'Activité", en: "Activity Center" },
    description: { fr: "C'est ici que tout est centralisé. Dès que le launcher fait quelque chose ce sera affiché ici : une ré-indexation, le téléchargement d'un modpack, le lancement d'une ou plusieurs instances, ou tout autre téléchargement.", en: "Everything is centralized here. Whenever the launcher does something it will be displayed here: re-indexing, downloading a modpack, launching one or more instances, or any other download." },
    ratio: '339/629',
  },
  {
    media: '/homesceensources/ezinstancemonitor.webp',
    type: 'image',
    title: { fr: 'Logs en direct', en: 'Live Logs' },
    description: { fr: "Zone dédiée pour voir les logs des instances en cours d'exécution.", en: "Dedicated area to view logs of running instances." },
    ratio: '840/576',
  },
  {
    media: '/homesceensources/Ezofflineaccount.webm',
    type: 'video',
    title: { fr: 'Gratuit et pour tous', en: 'Free for Everyone' },
    description: { fr: "Tout le monde peut utiliser le launcher, sans compte, ni Minecraft premium. Ce qui veut dire qu'en plus de pouvoir jouer à Minecraft gratuitement, nous ne vous imposerons pas de pubs, de fonctions bridées, ni de comptes obligatoires.", en: "Everyone can use the launcher, without an account or Minecraft premium. This means that in addition to being able to play Minecraft for free, we won't impose ads, restricted features, or mandatory accounts." },
    ratio: '16/9',
  },
  {
    media: '/homesceensources/installmodpackeasly.webp',
    type: 'image',
    title: { fr: 'Installation simplifiée', en: 'Easy Installation' },
    description: { fr: "Vous pouvez installer n'importe quel modpack ou mods en quelques clics. Il s'affichera instantanément sur votre page d'accueil. Suivez le téléchargement de celui-ci comme une application sur votre smartphone.", en: "You can install any modpack or mods in just a few clicks. It will instantly appear on your home page. Track the download just like an app on your smartphone." },
    ratio: '958/539',
  },
  {
    media: '/homesceensources/Instancefastlaunch.webm',
    type: 'video',
    title: { fr: 'Lancement Rapide', en: 'Quick Launch' },
    description: { fr: "Avec le raccourci Ctrl + K, vous pouvez lancer n'importe quelle instance instantanément, sans superflu et rapidement, et mettre automatiquement le launcher en tâche de fond.", en: "With the Ctrl + K shortcut, you can launch any instance instantly, without clutter, quickly, and automatically minimize the launcher to the background." },
    ratio: '16/9',
  },
  {
    media: '/homesceensources/multipleinstance.webp',
    type: 'image',
    title: { fr: 'Multi-instances', en: 'Multi-Instance' },
    description: { fr: "Visionnez en temps réel le lancement de vos instances ou leur état directement depuis le centre d'activité.", en: "View the launch of your instances or their status in real time directly from the activity center." },
    ratio: '958/553',
  },
  {
    media: '/homesceensources/sidebar_and_instancesview.webm',
    type: 'video',
    title: { fr: 'Interface sur mesure', en: 'Custom Interface' },
    description: { fr: "Choisissez parmi les 3 modes de vue que vous préférez pour jouer à vos instances favorites, et utilisez la sidebar pour accéder rapidement aux détails pertinents de votre instance.", en: "Choose from 3 view modes to play your favorite instances, and use the sidebar to quickly access relevant details of your instance." },
    ratio: '16/9',
  },
  {
    media: '/homesceensources/storagemanager.webp',
    type: 'image',
    title: { fr: 'Gestion du stockage', en: 'Storage Management' },
    description: { fr: "Visionnez précisément l'usage de stockage du Divizion Launcher sur votre ordinateur.", en: "Precisely view the storage usage of Divizion Launcher on your computer." },
    ratio: '958/553',
  },
]

/* ========== ALL FEATURES (from screenshots) ========== */
const featureCategories: { titleKey: string; features: { icon: any; title: T; description: T }[] }[] = [
  {
    titleKey: 'cat_installMods',
    features: [
      { icon: Package, title: { fr: "Installe tes modpacks en quelques clics", en: "Install your modpacks in a few clicks" }, description: { fr: "Tu choisis un modpack, et le launcher s'occupe du reste pour que tu puisses jouer rapidement sans passer par une installation compliquée ou des manipulations techniques inutiles.", en: "You choose a modpack, and the launcher takes care of the rest so you can play quickly without going through a complicated installation or unnecessary technical steps." } },
      { icon: Box, title: { fr: "Ajoute tes mods simplement", en: "Add your mods easily" }, description: { fr: "Installe tes mods depuis le launcher sans chercher les bons dossiers, déplacer les fichiers à la main ou refaire les mêmes étapes à chaque fois.", en: "Install your mods from the launcher without searching for the right folders, manually moving files, or repeating the same steps every time." } },
      { icon: Loader, title: { fr: "Laisse le launcher gérer les dépendances", en: "Let the launcher handle dependencies" }, description: { fr: "Quand un mod ou un modpack a besoin d'autres composants pour fonctionner, le launcher les récupère automatiquement pour t'éviter les oublis et les erreurs.", en: "When a mod or modpack needs other components to work, the launcher automatically fetches them to avoid oversights and errors." } },
      { icon: Layers, title: { fr: "Joue avec Fabric facilement", en: "Play with Fabric easily" }, description: { fr: "Crée et lance tes instances Fabric sans avoir à préparer tout l'environnement technique toi-même.", en: "Create and launch your Fabric instances without having to set up the entire technical environment yourself." } },
      { icon: Download, title: { fr: "Importe tes anciennes instances", en: "Import your old instances" }, description: { fr: "Récupère facilement tes installations depuis MultiMC, Prism Launcher, PolyMC ou le launcher officiel Minecraft sans tout recommencer de zéro.", en: "Easily recover your installations from MultiMC, Prism Launcher, PolyMC or the official Minecraft launcher without starting from scratch." } },
    ],
  },
  {
    titleKey: 'cat_accounts',
    features: [
      { icon: Users, title: { fr: "Utilise un compte premium ou hors ligne", en: "Use a premium or offline account" }, description: { fr: "Choisis librement entre un compte officiel Minecraft et un compte hors ligne selon l'usage que tu veux faire de chaque instance.", en: "Freely choose between an official Minecraft account and an offline account depending on how you want to use each instance." } },
      { icon: UserCheck, title: { fr: "Choisis un compte différent pour chaque instance", en: "Choose a different account for each instance" }, description: { fr: "Garde une vraie séparation entre tes usages en attribuant à chaque instance le type de compte qui lui correspond.", en: "Keep a real separation between your uses by assigning each instance the account type that fits it." } },
      { icon: Sparkles, title: { fr: "Commence sans compte imposé", en: "Start without a mandatory account" }, description: { fr: "Télécharge, configure et lance le launcher sans être bloqué par une création de compte ou une étape de connexion inutile.", en: "Download, configure and launch the launcher without being blocked by account creation or an unnecessary login step." } },
      { icon: Zap, title: { fr: "Profite d'une expérience sans friction", en: "Enjoy a frictionless experience" }, description: { fr: "Tout est pensé pour te faire gagner du temps, réduire les étapes inutiles et rendre l'utilisation du launcher plus simple du début à la fin.", en: "Everything is designed to save you time, reduce unnecessary steps and make using the launcher simpler from start to finish." } },
    ],
  },
  {
    titleKey: 'cat_instances',
    features: [
      { icon: LayoutGrid, title: { fr: "Gère tout autour de tes instances", en: "Manage everything around your instances" }, description: { fr: "Le launcher place tes instances au centre de l'expérience pour que tu puisses les créer, les modifier, les organiser et les lancer plus naturellement.", en: "The launcher puts your instances at the center of the experience so you can create, modify, organize and launch them more naturally." } },
      { icon: Cpu, title: { fr: "Lance plusieurs instances en même temps", en: "Launch multiple instances at once" }, description: { fr: "Garde plusieurs sessions ouvertes en parallèle pour tester, comparer, multitâcher ou jouer sur plusieurs environnements sans interruption.", en: "Keep multiple sessions open in parallel to test, compare, multitask or play across multiple environments without interruption." } },
      { icon: Play, title: { fr: "Relance plusieurs fois la même instance", en: "Relaunch the same instance multiple times" }, description: { fr: "Ouvre plusieurs sessions basées sur une seule et même configuration quand ton usage le demande.", en: "Open multiple sessions based on a single configuration when your usage requires it." } },
      { icon: Database, title: { fr: "Range tes instances avec des tags", en: "Organize your instances with tags" }, description: { fr: "Classe tes instances comme tu veux pour retrouver plus vite celles qui correspondent à ton style de jeu, à tes projets ou à tes tests.", en: "Classify your instances as you like to find the ones that match your playstyle, projects or tests faster." } },
      { icon: MousePointer, title: { fr: "Accède rapidement aux actions importantes", en: "Quickly access important actions" }, description: { fr: "Utilise le menu clic droit pour atteindre immédiatement les options essentielles d'une instance sans naviguer dans plusieurs écrans.", en: "Use the right-click menu to immediately reach the essential options of an instance without navigating through multiple screens." } },
      { icon: FolderSync, title: { fr: "Fais glisser, dépose, continue", en: "Drag, drop, continue" }, description: { fr: "Le support du drag and drop rend certaines actions plus directes et plus naturelles dans l'usage quotidien.", en: "Drag and drop support makes certain actions more direct and natural in daily use." } },
    ],
  },
  {
    titleKey: 'cat_performance',
    features: [
      { icon: Gauge, title: { fr: "Profite d'un lancement ultra-rapide", en: "Enjoy ultra-fast launching" }, description: { fr: "Le launcher est pensé pour t'emmener vers le jeu le plus vite possible avec une expérience de démarrage fluide et réactive.", en: "The launcher is designed to get you into the game as fast as possible with a smooth and responsive startup experience." } },
      { icon: Zap, title: { fr: "Ouvre le launcher rapidement", en: "Open the launcher quickly" }, description: { fr: "Accède vite à tes instances et à tes actions principales sans attendre qu'une interface lourde se mette en place.", en: "Quickly access your instances and main actions without waiting for a heavy interface to load." } },
      { icon: Settings, title: { fr: "Optimise les performances comme tu veux", en: "Optimize performance as you wish" }, description: { fr: "Une section dédiée te permet d'ajuster les options de performance du launcher selon ton matériel et ta manière de jouer.", en: "A dedicated section lets you adjust the launcher's performance options according to your hardware and playstyle." } },
      { icon: RefreshCw, title: { fr: "Réduis les vérifications inutiles", en: "Reduce unnecessary checks" }, description: { fr: "Certaines validations peuvent être gérées plus intelligemment pour rendre la préparation et le lancement plus rapides.", en: "Some validations can be handled more intelligently to make preparation and launching faster." } },
      { icon: HardDrive, title: { fr: "Profite d'un cache natif plus efficace", en: "Benefit from more efficient native caching" }, description: { fr: "Le launcher réutilise certains composants déjà préparés pour éviter de refaire inutilement les mêmes traitements.", en: "The launcher reuses pre-prepared components to avoid unnecessarily repeating the same processes." } },
      { icon: Database, title: { fr: "Garde les données utiles en mémoire", en: "Keep useful data in memory" }, description: { fr: "Les informations fréquemment utilisées restent disponibles pour rendre l'expérience plus fluide.", en: "Frequently used information stays available to make the experience smoother." } },
      { icon: Cpu, title: { fr: "Accélère la gestion de Java", en: "Speed up Java management" }, description: { fr: "Le launcher évite de refaire certaines vérifications Java inutilement pour rendre la préparation plus discrète et plus efficace.", en: "The launcher avoids unnecessarily redoing certain Java checks to make preparation more seamless and efficient." } },
      { icon: Clock, title: { fr: "Choisis la durée du cache", en: "Choose cache duration" }, description: { fr: "Ajuste le comportement du cache selon tes préférences pour privilégier soit la rapidité, soit un rafraîchissement plus strict.", en: "Adjust cache behavior according to your preferences to favor either speed or stricter refreshing." } },
      { icon: Trash2, title: { fr: "Réinitialise rapidement l'environnement", en: "Quickly reset the environment" }, description: { fr: "Nettoie le cache en un instant quand tu veux repartir sur une base propre ou corriger un comportement inhabituel.", en: "Clear the cache in an instant when you want to start fresh or fix unusual behavior." } },
      { icon: Download, title: { fr: "Précharge tes versions Minecraft préférées", en: "Preload your favorite Minecraft versions" }, description: { fr: "Prépare à l'avance les versions que tu utilises le plus pour qu'elles soient déjà prêtes au moment où tu veux les lancer.", en: "Prepare in advance the versions you use most so they're already ready when you want to launch them." } },
      { icon: Package, title: { fr: "Prépare tes versions avec un assistant dédié", en: "Prepare your versions with a dedicated wizard" }, description: { fr: "Un assistant t'aide à sélectionner et télécharger à l'avance les versions que tu veux garder disponibles.", en: "A wizard helps you select and download in advance the versions you want to keep available." } },
      { icon: Network, title: { fr: "Travaille confortablement en multitâche", en: "Work comfortably while multitasking" }, description: { fr: "Le launcher reste agréable à utiliser même quand tu enchaînes plusieurs lancements, installations ou tests dans la même session.", en: "The launcher remains pleasant to use even when you chain multiple launches, installations or tests in the same session." } },
    ],
  },
  {
    titleKey: 'cat_interface',
    features: [
      { icon: Eye, title: { fr: "Profite d'une interface claire", en: "Enjoy a clean interface" }, description: { fr: "L'interface met en avant ce qui compte vraiment pour que tu comprennes rapidement où cliquer et quoi faire.", en: "The interface highlights what really matters so you quickly understand where to click and what to do." } },
      { icon: Monitor, title: { fr: "Retrouve un accueil plus utile", en: "Find a more useful home page" }, description: { fr: "La page d'accueil te donne un accès plus direct aux éléments importants pour commencer plus vite.", en: "The home page gives you more direct access to important elements to get started faster." } },
      { icon: Palette, title: { fr: "Navigue dans un design allégé", en: "Navigate in a lightweight design" }, description: { fr: "Le launcher évite les éléments visuels inutiles pour garder une interface plus lisible et plus agréable à utiliser.", en: "The launcher avoids unnecessary visual elements to keep a more readable and pleasant interface." } },
      { icon: Maximize, title: { fr: "Utilise le launcher dans n'importe quelle taille de fenêtre", en: "Use the launcher in any window size" }, description: { fr: "L'interface s'adapte proprement à ton espace pour rester confortable aussi bien dans une petite fenêtre qu'en affichage plus large.", en: "The interface adapts cleanly to your space to stay comfortable in both a small window and a wider display." } },
      { icon: Menu, title: { fr: "Profite d'une barre supérieure unifiée", en: "Enjoy a unified top bar" }, description: { fr: "La title bar commune à toute l'application apporte une navigation plus cohérente et un rendu plus propre sur l'ensemble du launcher.", en: "The common title bar across the entire application brings more consistent navigation and a cleaner look across the launcher." } },
      { icon: Sparkles, title: { fr: "Ressens des interactions plus fluides", en: "Feel smoother interactions" }, description: { fr: "Les actions, transitions et réponses de l'interface sont pensées pour rendre l'expérience plus naturelle au quotidien.", en: "Actions, transitions and interface responses are designed to make the experience feel more natural in daily use." } },
    ],
  },
  {
    titleKey: 'cat_activity',
    features: [
      { icon: Activity, title: { fr: "Suis tout depuis le centre d'activité", en: "Track everything from the activity center" }, description: { fr: "Retrouve dans un seul espace les téléchargements, les installations, les actions internes du launcher et l'activité liée à tes instances.", en: "Find in one place downloads, installations, internal launcher actions and activity related to your instances." } },
      { icon: Eye, title: { fr: "Vois ce qu'il se passe en temps réel", en: "See what's happening in real time" }, description: { fr: "Tu sais toujours quelle tâche est en cours, où elle en est et sur quoi le launcher travaille à l'instant.", en: "You always know which task is running, where it stands and what the launcher is working on right now." } },
      { icon: Download, title: { fr: "Garde un œil sur tes téléchargements", en: "Keep an eye on your downloads" }, description: { fr: "Consulte facilement les téléchargements en cours sans perdre le fil de ce que le launcher est en train de préparer.", en: "Easily check ongoing downloads without losing track of what the launcher is preparing." } },
      { icon: Package, title: { fr: "Suis tes installations et mises à jour", en: "Track your installations and updates" }, description: { fr: "Observe clairement les opérations liées aux mods, modpacks et autres contenus gérés par le launcher.", en: "Clearly observe operations related to mods, modpacks and other content managed by the launcher." } },
      { icon: FileText, title: { fr: "Consulte des logs séparés par instance", en: "View logs separated by instance" }, description: { fr: "Chaque instance dispose de son propre suivi pour t'aider à mieux comprendre ce qui se passe sans tout mélanger.", en: "Each instance has its own tracking to help you better understand what's happening without mixing everything up." } },
      { icon: Eye, title: { fr: "Vois directement la partie utile des logs", en: "See the useful part of logs directly" }, description: { fr: "Le launcher met en avant l'extrait le plus pertinent pour éviter de perdre du temps à chercher l'erreur dans des centaines de lignes.", en: "The launcher highlights the most relevant excerpt to avoid wasting time searching for the error in hundreds of lines." } },
      { icon: FileText, title: { fr: "Copie rapidement l'erreur importante", en: "Quickly copy the important error" }, description: { fr: "Récupère facilement l'extrait utile pour le partager, le garder ou demander de l'aide plus simplement.", en: "Easily retrieve the useful excerpt to share it, keep it or ask for help more simply." } },
    ],
  },
  {
    titleKey: 'cat_storage',
    features: [
      { icon: Cpu, title: { fr: "Laisse le launcher gérer Java pour toi", en: "Let the launcher manage Java for you" }, description: { fr: "Le launcher détecte et installe automatiquement Java quand c'est nécessaire pour te retirer une partie technique souvent pénible.", en: "The launcher automatically detects and installs Java when necessary to remove a often tedious technical part." } },
      { icon: BarChart3, title: { fr: "Visualise ce qui prend de la place", en: "Visualize what takes up space" }, description: { fr: "Une section stockage t'aide à mieux comprendre comment l'espace disque est utilisé par le launcher.", en: "A storage section helps you better understand how disk space is used by the launcher." } },
      { icon: HardDrive, title: { fr: "Analyse ton espace disque clairement", en: "Clearly analyze your disk space" }, description: { fr: "Repère rapidement les éléments les plus lourds pour mieux gérer ton installation au fil du temps.", en: "Quickly spot the heaviest elements to better manage your installation over time." } },
      { icon: Database, title: { fr: "Vois le détail par composant", en: "See details by component" }, description: { fr: "Consulte séparément les versions, libraries, assets, cache, mods, images et instances pour comprendre exactement ce qui occupe ton stockage.", en: "View separately versions, libraries, assets, cache, mods, images and instances to understand exactly what occupies your storage." } },
      { icon: FolderSync, title: { fr: "Gère tes versions préchargées", en: "Manage your preloaded versions" }, description: { fr: "Retrouve facilement les versions déjà préparées et supprime celles que tu ne veux plus conserver localement.", en: "Easily find already prepared versions and delete those you no longer want to keep locally." } },
      { icon: MessageCircle, title: { fr: "Affiche ton activité sur Discord", en: "Show your activity on Discord" }, description: { fr: "Le support Discord RPC te permet de montrer ce que tu fais directement sur Discord sans configuration compliquée.", en: "Discord RPC support lets you show what you're doing directly on Discord without complicated configuration." } },
    ],
  },
]

export default function FeaturesPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')
  const { locale, t } = useLanguage()

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="page-hero">
          <h1 className="page-title">{t('featuresPage.title')}</h1>
          <p className="page-subtitle">
            {t('featuresPage.subtitle')}
          </p>
        </section>

        {/* ===== HERO FEATURES WITH MEDIA ===== */}
        <div className="features-list">
          {heroFeatures.map((feature, index) => (
            <div key={index} className="feature-row">
              <div className="feature-media">
                {feature.type === 'video' ? (
                  <video autoPlay loop muted playsInline>
                    <source src={feature.media} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={feature.media}
                    alt={feature.title[locale]}
                    loading="lazy"
                    className="clickable-image"
                    onClick={() => {
                      setLightboxSrc(feature.media)
                      setLightboxAlt(feature.title[locale])
                    }}
                  />
                )}
              </div>
              <div className="feature-info">
                <span className="feature-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="feature-title">{feature.title[locale]}</h2>
                <p className="feature-description">{feature.description[locale]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== ALL FEATURES BY CATEGORY ===== */}
        {featureCategories.map((category, catIndex) => (
          <section key={catIndex} className="section">
            <div className="section-header">
              <h2 className="section-title">{t(`featuresPage.${category.titleKey}`)}</h2>
              <div className="section-divider" />
            </div>

            <div className="features-grid-text">
              {category.features.map((feature, featureIndex) => {
                const Icon = feature.icon
                return (
                  <div key={featureIndex} className="feature-text-card">
                    <div className="feature-text-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="feature-text-title">{feature.title[locale]}</h3>
                      <p className="feature-text-description">{feature.description[locale]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
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
