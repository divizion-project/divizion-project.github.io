"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Check,
  ChevronDown,
  Package,
  Image as ImageIcon,
  Sparkles,
  Map,
  FileCode,
  Layers,
  Users,
  Search,
  Code2,
  Terminal,
  Server,
  Settings2,
  Download,
} from "lucide-react";
import { useLanguage } from "./provider";
import { useReleases } from "./release-provider";
import { latestRelease, totalDownloads } from "@/lib/releases";
import { Rails } from "./rails";
import { MediaSlot } from "./media-slot";
import { asset } from "@/lib/config";
import { tabKeyboard } from "@/lib/tab-keyboard";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const reduced = useReducedMotion();
  return (
    <motion.div ref={ref} style={reduced ? {} : { y }}>
      {children}
    </motion.div>
  );
}
const setup = [
  {
    id: "java",
    fr: "Java & modloaders",
    en: "Java & modloaders",
    titleFr: "La bonne version.\nSans la chercher.",
    titleEn: "The right version.\nWithout the search.",
    textFr:
      "Divizion détecte la version de Java nécessaire à votre instance. Il propose de l’installer automatiquement, avec votre accord. Le modloader se configure au même endroit.",
    textEn:
      "Divizion detects the Java version your instance needs. With your permission, it installs it automatically. Set up your modloader in the same place.",
    pointsFr: [
      "Java adapté à votre version de Minecraft",
      "Installation automatique du modloader",
      "Possibilité de choisir votre propre Java",
    ],
    pointsEn: [
      "Java matched to your Minecraft version",
      "Automatic modloader installation",
      "Choose your own Java runtime",
    ],
  },
  {
    id: "mods",
    fr: "Mods & dépendances",
    en: "Mods & dependencies",
    titleFr: "Vos mods.\nLeurs dépendances aussi.",
    titleEn: "Your mods.\nTheir dependencies, too.",
    textFr:
      "Installez un mod ou un modpack depuis le launcher. Divizion récupère les dépendances, repère les incompatibilités et garde vos mods à jour.",
    textEn:
      "Install a mod or modpack from the launcher. Divizion gets the dependencies, spots incompatibilities and keeps your mods up to date.",
    pointsFr: [
      "Installation depuis Modrinth",
      "Dépendances récupérées automatiquement",
      "Détection des incompatibilités",
    ],
    pointsEn: [
      "Install from Modrinth",
      "Dependencies fetched automatically",
      "Incompatibility detection",
    ],
  },
  {
    id: "servers",
    fr: "Serveurs entre amis",
    en: "Servers with friends",
    titleFr: "Un serveur.\nQuelques clics.",
    titleEn: "A server.\nA few clicks.",
    textFr:
      "Créez un serveur avec le bon Java et le bon modloader. Le launcher fournit une adresse de connexion gratuite, sans configurer les ports de votre box.",
    textEn:
      "Create a server with the right Java and modloader. The launcher provides a free connection address, without configuring your router’s ports.",
    pointsFr: [
      "Java et modloader installés",
      "Adresse de connexion automatique",
      "Aucun port à ouvrir sur votre box",
    ],
    pointsEn: [
      "Java and modloader installed",
      "Automatic connection address",
      "No router port forwarding",
    ],
  },
];
const instances = [
  {
    id: "instances",
    icon: Layers,
    fr: "Multi-instances",
    en: "Multiple instances",
    titleFr: "Chaque partie a son espace.",
    titleEn: "Every playthrough has its place.",
    textFr:
      "Séparez vos versions, modpacks et configurations. Lancez plusieurs instances et suivez leur état depuis le centre d’activité.",
    textEn:
      "Keep your versions, modpacks and configurations separate. Run multiple instances and track their status from the activity center.",
  },
  {
    id: "accounts",
    icon: Users,
    fr: "Comptes",
    en: "Accounts",
    titleFr: "Le bon compte, à chaque lancement.",
    titleEn: "The right account, every launch.",
    textFr:
      "Ajoutez vos comptes Microsoft et hors ligne. Assignez un compte différent à chaque instance pour éviter de changer de profil à chaque fois.",
    textEn:
      "Add your Microsoft and offline accounts. Assign a different account to each instance so you don’t need to switch profiles each time.",
  },
  {
    id: "search",
    icon: Search,
    fr: "Lancement rapide",
    en: "Quick launch",
    titleFr: "Vos instances, à un raccourci.",
    titleEn: "Your instances, one shortcut away.",
    textFr:
      "Ouvrez la recherche avec un raccourci clavier personnalisé, même quand le launcher est réduit. Retrouvez une instance ou lancez une action sans quitter ce que vous faites.",
    textEn:
      "Open search with a custom keyboard shortcut, even when the launcher is minimized. Find an instance or launch an action without leaving what you’re doing.",
  },
];
export function HomeSections() {
  const { t, lang } = useLanguage();
  const { releases } = useReleases();
  const [setupTab, setSetupTab] = useState(0);
  const [instanceTab, setInstanceTab] = useState(0);
  const [role, setRole] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const item = setup[setupTab];
  const instance = instances[instanceTab];
  const stable = latestRelease(releases, "stable");
  const count = totalDownloads(releases);
  const roleDetails = [
    [
      {
        fr: "Mods, shaders, packs et maps",
        en: "Mods, shaders, packs and maps",
        dfr: "Parcourez Modrinth depuis Divizion et installez le contenu dans l’instance de votre choix.",
        den: "Browse Modrinth from Divizion and install content in the instance of your choice.",
      },
      {
        fr: "Installation accompagnée",
        en: "Guided installation",
        dfr: "Le launcher vérifie Java, le modloader et les dépendances avant de lancer votre partie.",
        den: "The launcher checks Java, the modloader and dependencies before you start playing.",
      },
      {
        fr: "Serveurs entre amis",
        en: "Servers with friends",
        dfr: "Créez un serveur et partagez son adresse de connexion sans configurer votre routeur.",
        den: "Create a server and share its connection address without configuring your router.",
      },
    ],
    [
      {
        fr: "Une configuration par projet",
        en: "A setup for each project",
        dfr: "Gardez une instance pour votre série, une autre pour tester un modpack, et une autre pour jouer.",
        den: "Keep an instance for your series, another to test a modpack and another to play.",
      },
      {
        fr: "Comptes assignés aux instances",
        en: "Accounts assigned to instances",
        dfr: "Chaque instance retrouve automatiquement le compte que vous lui avez associé.",
        den: "Every instance automatically uses the account you assigned to it.",
      },
      {
        fr: "Recherche et centre d’activité",
        en: "Search and activity center",
        dfr: "Lancez rapidement vos instances et suivez les installations et les téléchargements en cours.",
        den: "Launch instances quickly and follow ongoing installations and downloads.",
      },
    ],
    [
      {
        fr: "Java et modloaders personnalisés",
        en: "Custom Java and modloaders",
        dfr: "Utilisez vos propres runtimes et modloaders pour garder le contrôle de votre environnement.",
        den: "Use your own runtimes and modloaders to stay in control of your environment.",
      },
      {
        fr: "Serveurs de test",
        en: "Test servers",
        dfr: "Déployez un environnement de test rapidement pour vérifier vos changements.",
        den: "Deploy a test environment quickly to check your changes.",
      },
      {
        fr: "Logs et débogage",
        en: "Logs and debugging",
        dfr: "Consultez les logs en direct et les options avancées pour comprendre ce qui se passe.",
        den: "Read live logs and use advanced options to understand what is happening.",
      },
    ],
  ][role];
  const faqs = [
    {
      fr: "Divizion est-il gratuit ?",
      en: "Is Divizion free?",
      dfr: "Oui. Le launcher est gratuit, sans publicité et sans compte Divizion obligatoire.",
      den: "Yes. The launcher is free, with no ads and no required Divizion account.",
    },
    {
      fr: "Faut-il installer Java à la main ?",
      en: "Do I need to install Java manually?",
      dfr: "Non. Divizion vous propose d’installer la version adaptée à votre instance. Vous pouvez aussi sélectionner votre propre installation de Java.",
      den: "No. Divizion offers to install the version your instance needs. You can also choose your own Java installation.",
    },
    {
      fr: "Quelle est la différence entre stable et bêta ?",
      en: "What is the difference between stable and beta?",
      dfr: "La version stable est proposée par défaut. La bêta permet de tester les nouveautés avant leur sortie stable et peut contenir des bugs. Vous choisissez le canal au téléchargement.",
      den: "The stable version is offered by default. Beta lets you test new features before their stable release and may contain bugs. Choose your channel when downloading.",
    },
    {
      fr: "Le launcher remplace-t-il l’achat de Minecraft ?",
      en: "Does the launcher replace buying Minecraft?",
      dfr: "Divizion est un launcher tiers indépendant. L’utilisation de Minecraft reste soumise aux règles et conditions de Mojang et Microsoft. Certaines fonctionnalités nécessitent un compte Minecraft officiel.",
      den: "Divizion is an independent third-party launcher. Minecraft remains subject to Mojang and Microsoft terms. Some features require an official Minecraft account.",
    },
  ];
  return (
    <>
      <section className="section setup-section" id="features">
        <div className="container">
          <Reveal className="section-head">
            <h2>
              {t("Java, mods et modloaders.", "Java, mods and modloaders.")}
              <br />
              {t(
                "L’installation est automatique.",
                "Installation is automatic.",
              )}
            </h2>
            <p className="prose">
              {t(
                "Choisissez votre version de Minecraft et ce que vous voulez installer. Divizion prépare votre instance, sans vous faire chercher les bons fichiers.",
                "Choose your Minecraft version and what you want to install. Divizion prepares your instance, without making you hunt for the right files.",
              )}
            </p>
            <Link className="button button-black" href="/download">
              {t("Découvrir le launcher", "Try the launcher")}
            </Link>
          </Reveal>
          <div
            className="numbered-tabs"
            role="tablist"
            aria-label={t("Installation automatique", "Automatic installation")}
          >
            {setup.map((s, i) => (
              <button
                id={`setup-${i}`}
                role="tab"
                aria-selected={setupTab === i}
                aria-controls="setup-panel"
                key={s.id}
                tabIndex={setupTab === i ? 0 : -1}
                onKeyDown={(e) => tabKeyboard(e, setupTab, 3, setSetupTab)}
                onClick={() => setSetupTab(i)}
              >
                <span>0{i + 1}</span>
                {t(s.fr, s.en)}
                {setupTab === i && <motion.i layoutId="setup-line" />}
              </button>
            ))}
          </div>
          <div
            id="setup-panel"
            role="tabpanel"
            aria-labelledby={`setup-${setupTab}`}
            className="setup-panel"
          >
            <AnimatePresence mode="wait">
              <motion.div
                className="setup-copy"
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3>{t(item.titleFr, item.titleEn)}</h3>
                <p>{t(item.textFr, item.textEn)}</p>
                <ul>
                  {(lang === "fr" ? item.pointsFr : item.pointsEn).map((p) => (
                    <li key={p}>
                      <Check size={16} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="setup-media">
              <MediaSlot id={item.id} label={t(item.fr, item.en)} dark />
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-dark instances-section"
        id="instances"
      >
        <div className="container split-layout">
          <Parallax>
            <MediaSlot
              id={instance.id}
              label={t(instance.fr, instance.en)}
              large
            />
          </Parallax>
          <div>
            <Reveal>
              <h2>
                {t("Une instance pour", "One instance for")}
                <br />
                {t("chaque façon de jouer.", "every way you play.")}
              </h2>
              <p className="prose">
                {t(
                  "Un modpack entre amis, un monde solo, une version de test. Vos instances restent séparées, vos réglages aussi.",
                  "A modpack with friends, a solo world, a test version. Your instances stay separate, and so do their settings.",
                )}
              </p>
              <Link className="button button-white" href="/download">
                {t("Télécharger Divizion", "Download Divizion")}
              </Link>
            </Reveal>
            <div
              className="instance-tabs"
              role="tablist"
              aria-label={t("Gestion des instances", "Instance management")}
            >
              {instances.map((s, i) => (
                <button
                  role="tab"
                  id={`instance-${i}`}
                  aria-controls="instance-panel"
                  aria-selected={instanceTab === i}
                  key={s.id}
                  tabIndex={instanceTab === i ? 0 : -1}
                  onKeyDown={(e) =>
                    tabKeyboard(e, instanceTab, 3, setInstanceTab)
                  }
                  onClick={() => setInstanceTab(i)}
                >
                  {t(s.fr, s.en)}
                  {instanceTab === i && <motion.i layoutId="instance-line" />}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                role="tabpanel"
                id="instance-panel"
                aria-labelledby={`instance-${instanceTab}`}
                className="instance-detail"
                key={instance.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <h4>{t(instance.titleFr, instance.titleEn)}</h4>
                <p>{t(instance.textFr, instance.textEn)}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      <section className="section audience-section">
        <div className="container">
          <Reveal className="center-head">
            <h2>
              {t("Joueurs, créateurs,", "Players, creators,")}
              <br />
              {t("développeurs.", "developers.")}
            </h2>
          </Reveal>
          <div
            className="audience-tabs"
            role="tablist"
            aria-label={t("Choisir un usage", "Choose a use case")}
          >
            {["Jouer", "Créer", "Développer"].map((s, i) => (
              <button
                role="tab"
                id={`role-${i}`}
                aria-controls="role-panel"
                aria-selected={role === i}
                key={s}
                tabIndex={role === i ? 0 : -1}
                onKeyDown={(e) => tabKeyboard(e, role, 3, setRole)}
                onClick={() => setRole(i)}
              >
                {t(s, ["Play", "Create", "Develop"][i])}
                {role === i && <motion.i layoutId="role-line" />}
              </button>
            ))}
          </div>
          <div
            className="audience-panel"
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`role-${role}`}
          >
            <div className="audience-lead">
              <span className="audience-number">0{role + 1}</span>
              <h3>
                {t(
                  [
                    "Tout pour\ncommencer à jouer.",
                    "Vos projets,\nbien organisés.",
                    "Votre environnement,\nsous contrôle.",
                  ][role],
                  [
                    "Everything to\nstart playing.",
                    "Your projects,\nwell organized.",
                    "Your environment,\nunder control.",
                  ][role],
                )}
              </h3>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="audience-details"
                key={role}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {roleDetails.map((d, i) => (
                  <div key={d.fr}>
                    <span>0{i + 1}</span>
                    <div>
                      <h4>{t(d.fr, d.en)}</h4>
                      <p>{t(d.dfr, d.den)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="stat-row">
            <div>
              <strong>{new Intl.NumberFormat(lang).format(count)}</strong>
              <span>
                {t(
                  "Téléchargements des fichiers du launcher",
                  "Launcher file downloads",
                )}
              </span>
            </div>
            <div>
              <strong>3</strong>
              <span>Windows, macOS, Linux</span>
            </div>
            <div>
              <strong>0 €</strong>
              <span>{t("Gratuit, sans publicité", "Free, without ads")}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section connection-section" id="modrinth">
        <div className="container">
          <Reveal className="center-head">
            <h2>
              {t("Tous vos contenus.", "All your content.")}
              <br />
              {t("Depuis le launcher.", "From the launcher.")}
            </h2>
            <p>
              {t(
                "Mods, modpacks, shaders, packs de ressources, datapacks et maps.\nParcourez la bibliothèque Modrinth et installez ce qu’il vous faut,\ndirectement dans votre instance.",
                "Mods, modpacks, shaders, resource packs, datapacks and maps.\nBrowse the Modrinth library and install what you need,\nright into your instance.",
              )}
            </p>
          </Reveal>
          <div className="connection-stage">
            <Rails variant="connect" />
            <div className="connection-flow" aria-hidden="true">
              <div className="connection-icons">
                {[Package, Sparkles, ImageIcon].map((Icon, i) => (
                  <span key={i}>
                    <Icon size={26} strokeWidth={1.5} />
                  </span>
                ))}
              </div>
              <div className="connection-brand">
                <img
                  src={asset("/assets/logo.webp")}
                  alt=""
                  width="90"
                  height="90"
                />
              </div>
              <div className="connection-icons">
                {[FileCode, Map, Layers].map((Icon, i) => (
                  <span key={i}>
                    <Icon size={26} strokeWidth={1.5} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="connection-features">
            {[
              {
                fr: "Une bibliothèque intégrée",
                en: "An integrated library",
                dfr: "Trouvez vos contenus Modrinth sans quitter Divizion.",
                den: "Find Modrinth content without leaving Divizion.",
              },
              {
                fr: "La bonne instance",
                en: "The right instance",
                dfr: "Choisissez où installer vos mods et vos packs.",
                den: "Choose where to install your mods and packs.",
              },
              {
                fr: "Dépendances incluses",
                en: "Dependencies included",
                dfr: "Les fichiers nécessaires sont récupérés avec vos mods.",
                den: "Required files are fetched with your mods.",
              },
              {
                fr: "Mises à jour suivies",
                en: "Updates tracked",
                dfr: "Gardez votre installation à jour depuis le launcher.",
                den: "Keep your installation up to date from the launcher.",
              },
            ].map((c) => (
              <div key={c.fr}>
                <h4>{t(c.fr, c.en)}</h4>
                <p>{t(c.dfr, c.den)}</p>
              </div>
            ))}
          </div>
          <div className="modrinth-preview">
            <MediaSlot
              id="mods"
              label={t(
                "La bibliothèque Modrinth dans Divizion",
                "The Modrinth library in Divizion",
              )}
              dark
            />
          </div>
        </div>
      </section>
      <section className="section section-cream tools-section" id="tools">
        <div className="container">
          <Reveal className="center-head">
            <h2>
              {t("Tester, configurer,", "Test, configure,")}
              <br />
              {t("comprendre.", "understand.")}
            </h2>
            <p className="prose">
              {t(
                "Les réglages restent accessibles quand vous en avez besoin.\nVos versions de Java, vos modloaders et vos serveurs de test.",
                "Settings stay accessible when you need them.\nYour Java versions, your modloaders and your test servers.",
              )}
            </p>
          </Reveal>
          <div className="split-layout tools-split">
            <Parallax>
              <MediaSlot
                id="development"
                label={t("Les outils développeur", "Developer tools")}
              />
            </Parallax>
            <div className="tool-list">
              {[
                {
                  icon: Settings2,
                  fr: "Modloaders & Java personnalisés",
                  en: "Custom modloaders & Java",
                  dfr: "Utilisez votre propre environnement au lieu des versions proposées automatiquement.",
                  den: "Use your own environment instead of the automatically suggested versions.",
                },
                {
                  icon: Server,
                  fr: "Serveurs de test",
                  en: "Test servers",
                  dfr: "Préparez rapidement un serveur pour essayer votre mod ou vérifier une configuration.",
                  den: "Set up a server quickly to try your mod or check a configuration.",
                },
                {
                  icon: Terminal,
                  fr: "Logs en direct & débogage",
                  en: "Live logs & debugging",
                  dfr: "Suivez les logs de vos instances et accédez aux options de débogage avancées.",
                  den: "Follow your instance logs and access advanced debugging options.",
                },
              ].map((d) => (
                <div className="tool-item" key={d.fr}>
                  <d.icon size={22} strokeWidth={1.3} />
                  <div>
                    <h4>{t(d.fr, d.en)}</h4>
                    <p>{t(d.dfr, d.den)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section time-section">
        <div className="container split-layout">
          <Reveal>
            <h2>
              {t("Retrouvez un état", "Return to an earlier")}
              <br />
              {t("de votre monde.", "state of your world.")}
            </h2>
            <p className="prose">
              {t(
                "Time Machine crée des sauvegardes automatiques et les organise dans une timeline. Parcourez les états de votre monde pour retrouver celui que vous voulez restaurer.",
                "Time Machine creates automatic backups and organizes them on a timeline. Browse your world’s states to find the one you want to restore.",
              )}
            </p>
            <p className="experimental-note">
              {t(
                "Cette fonctionnalité est expérimentale. Conservez une copie séparée de vos mondes importants.",
                "This feature is experimental. Keep a separate copy of your important worlds.",
              )}
            </p>
            <Link className="text-link" href="/download?channel=beta">
              {t("Découvrir la bêta", "Try the beta")}
            </Link>
          </Reveal>
          <MediaSlot
            id="timeline"
            label={t(
              "Time Machine — la timeline de vos sauvegardes",
              "Time Machine — your backup timeline",
            )}
            dark
          />
        </div>
      </section>
      <section className="section editorial-section">
        <div className="container editorial-layout">
          <Reveal>
            <h2>
              {t("Les réponses,", "Answers,")}
              <br />
              {t("dans la documentation.", "in the documentation.")}
            </h2>
            <Link href="/wiki" className="button button-black">
              {t("Ouvrir le wiki", "Open the wiki")}
            </Link>
          </Reveal>
          <div className="editorial-list">
            <Link
              href={
                lang === "fr"
                  ? "/wiki/problemes_installation"
                  : "/wiki/installation_issues"
              }
            >
              <div className="article-meta">
                <span>INSTALLATION</span>
                <span>macOS · Windows</span>
              </div>
              <h3>
                {t(
                  "Installer Divizion et résoudre les blocages au premier lancement",
                  "Install Divizion and resolve first-launch blocks",
                )}
              </h3>
              <p>
                {t(
                  "Les étapes à suivre si macOS ou Windows bloque l’ouverture du launcher.",
                  "The steps to follow if macOS or Windows blocks the launcher.",
                )}
              </p>
            </Link>
            <Link
              href={
                lang === "fr"
                  ? "/wiki/connexion_microsoft"
                  : "/wiki/microsoft_connection"
              }
            >
              <div className="article-meta">
                <span>{t("COMPTES", "ACCOUNTS")}</span>
                <span>Microsoft</span>
              </div>
              <h3>
                {t(
                  "Connecter votre compte Microsoft au launcher",
                  "Connect your Microsoft account to the launcher",
                )}
              </h3>
              <p>
                {t(
                  "Le guide de connexion et les solutions aux erreurs d’authentification.",
                  "The connection guide and solutions to authentication errors.",
                )}
              </p>
            </Link>
            <Link href="/releases">
              <div className="article-meta">
                <span>{t("VERSIONS", "RELEASES")}</span>
                <span>{stable?.tag_name || ""}</span>
              </div>
              <h3>
                {t("Ce qui change dans Divizion", "What changes in Divizion")}
              </h3>
              <p>
                {t(
                  "Consultez les notes de version stable et les nouveautés de la bêta.",
                  "Read stable release notes and what’s new in beta.",
                )}
              </p>
            </Link>
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-layout">
          <h2>{t("Avant de commencer.", "Before you start.")}</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <button
                  aria-expanded={faq === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {t(f.fr, f.en)}
                  <ChevronDown
                    size={18}
                    className={faq === i ? "rotated" : ""}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{t(f.dfr, f.den)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section final-cta">
        <Rails variant="sweep" />
        <div className="container center-head">
          <h2>
            {t("Votre première instance", "Your first instance")}
            <br />
            {t("commence ici.", "starts here.")}
          </h2>
          <p>
            {t(
              "Gratuit. Disponible sur Windows, macOS et Linux.",
              "Free. Available on Windows, macOS and Linux.",
            )}
          </p>
          <Link className="button button-orange" href="/download">
            <Download size={18} />
            {t("Télécharger Divizion", "Download Divizion")}
          </Link>
          <Link className="cta-secondary" href="/download?channel=beta">
            {t("Ou essayer la version bêta", "Or try the beta release")}
          </Link>
        </div>
      </section>
    </>
  );
}
