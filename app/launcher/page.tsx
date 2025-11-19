"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Settings,
  Layout,
  Cpu,
  Bug,
  ArrowRight,
  Monitor,
  Gamepad2,
  UserCircle,
  X,
  Download
} from "lucide-react";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import Portal from "@/components/ui/Portal";
import { DISCORD_LINK, LAUNCHER_VERSION, LAUNCHER_RELEASES_LINK } from "@/lib/constants";

const TARGET_DATE = 1766167200 * 1000; // Timestamp in milliseconds

// OS Icons Components
const WindowsIcon = ({ className }: { className?: string }) => (
  <FaWindows className={className} />
);

const AppleIcon = ({ className }: { className?: string }) => (
  <FaApple className={className} />
);

const LinuxIcon = ({ className }: { className?: string }) => (
  <FaLinux className={className} />
);

type OS = "Windows" | "macOS" | "Linux";

const DOWNLOADS = [
  { os: "Windows", Icon: WindowsIcon, hasArch: true },
  { os: "macOS", Icon: AppleIcon, hasArch: true },
  { os: "Linux", Icon: LinuxIcon, hasArch: false },
] as const;

const FEATURES = [
  {
    title: "Nouvel écran de login",
    description: "Une interface de connexion repensée pour plus de fluidité et de sécurité.",
    icon: <UserCircle className="h-6 w-6" />,
  },
  {
    title: "Nouveaux effets de transitions",
    description: "Des animations fluides entre chaque menu pour une navigation agréable.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Meilleurs effets visuels",
    description: "Une refonte graphique complète pour un plaisir des yeux à chaque instant.",
    icon: <Monitor className="h-6 w-6" />,
  },
  {
    title: "Refonte des paramètres",
    description: "Un menu de configuration plus clair et plus complet.",
    icon: <Settings className="h-6 w-6" />,
  },
];

const SMART_FEATURES = [
  {
    title: "MagicLamp (Beta)",
    description: "Allocation intelligente de la RAM en fonction de votre machine et de l'instance.",
    icon: <Cpu className="h-8 w-8 text-[#ff6b35]" />,
  },
  {
    title: "Auto-Debug",
    description: "Détection et résolution automatique des crashs et conflits de mods.",
    icon: <Bug className="h-8 w-8 text-[#ff6b35]" />,
  },
];

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {[
        { label: "Jours", value: timeLeft.days },
        { label: "Heures", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Secondes", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center rounded border border-[#3a3a3a] bg-[#1a1a1a] p-4">
          <span className="text-3xl font-bold text-[#ff6b35] md:text-4xl">{item.value}</span>
          <span className="text-xs uppercase tracking-widest text-[#666]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

type ModalState =
  | { type: "selection"; os: OS }
  | { type: "download"; os: OS }
  | null;

export default function LauncherPage() {
  const [modalState, setModalState] = useState<ModalState>(null);

  const handleOSClick = (os: OS, hasArch: boolean) => {
    if (hasArch) {
      setModalState({ type: "selection", os });
    } else {
      setModalState({ type: "download", os });
    }
  };

  const handleDownload = () => {
    if (modalState) {
      setModalState({ type: "download", os: modalState.os });
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
      {/* Hero Section */}
      <header className="flex flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
            <Sparkles className="h-3 w-3" />
            <span>Bientôt Disponible • {LAUNCHER_VERSION}</span>
          </div>

          <h1 className="text-5xl font-black text-[#d0d0d0] md:text-7xl">
            Launcher <span className="text-[#ff6b35]">Divizion</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-[#999]">
            Une refonte complète. Plus simple, moins austère, avec des animations fluides et un design à couper le souffle.
          </p>
        </div>

        {/* Countdown */}
        <div className="w-full max-w-2xl">
          <Countdown />
        </div>

        {/* YouTube Placeholder */}
        <div className="aspect-video w-full max-w-4xl overflow-hidden rounded border border-[#3a3a3a] bg-[#1a1a1a] shadow-2xl">
          <div className="flex h-full w-full items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff6b35]/20 text-[#ff6b35]">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#666]">Vidéo de reveal V3</p>
            </div>
          </div>
        </div>
      </header>

      {/* Downloads Section */}
      <section className="relative space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#d0d0d0]">Téléchargement</h2>
          <p className="text-[#999]">Choisissez votre plateforme</p>
          <div className="mx-auto mt-4 h-1 w-16 bg-[#ff6b35]" />
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {DOWNLOADS.map((download) => {
            const isSelected = modalState?.os === download.os;
            return (
              <div key={download.os} className="relative">
                {/* Placeholder to keep space - ALWAYS RENDERED but invisible */}
                <div className="flex min-w-[200px] flex-col items-center gap-4 p-8 opacity-0 pointer-events-none">
                  <div className="h-12 w-12" />
                  <span className="text-xl font-bold">Placeholder</span>
                </div>

                {/* Actual Card */}
                {!isSelected && (
                  <motion.button
                    layoutId={`card-${download.os}`}
                    onClick={() => handleOSClick(download.os as OS, download.hasArch)}
                    className="group absolute inset-0 flex min-w-[200px] flex-col items-center gap-4 rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20"
                  >
                    <motion.div layoutId={`icon-${download.os}`} className="text-[#d0d0d0] transition-colors group-hover:text-[#ff6b35]">
                      <download.Icon className="h-12 w-12" />
                    </motion.div>
                    <motion.span layoutId={`title-${download.os}`} className="text-xl font-bold text-[#d0d0d0]">
                      {download.os}
                    </motion.span>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Unified Modal - Rendered in Portal to break out of transforms */}
      <Portal>
        <AnimatePresence>
          {modalState && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalState(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[#3a3a3a] bg-[#2a2a2a] p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setModalState(null)}
                  className="absolute right-4 top-4 text-[#666] hover:text-[#d0d0d0]"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="flex flex-col items-center gap-6 text-center">
                  {/* Shared Elements */}
                  <motion.div layoutId={`icon-${modalState.os}`} className="text-[#ff6b35]">
                    {(() => {
                      const Icon = DOWNLOADS.find(d => d.os === modalState.os)?.Icon;
                      return Icon ? <Icon className="h-12 w-12" /> : null;
                    })()}
                  </motion.div>

                  <motion.div layoutId={`title-${modalState.os}`}>
                    <h3 className="text-2xl font-bold text-[#d0d0d0]">
                      {modalState.type === "selection" ? `Télécharger pour ${modalState.os}` : "Téléchargement en cours..."}
                    </h3>
                  </motion.div>

                  {/* Content Switching */}
                  <AnimatePresence mode="wait">
                    {modalState.type === "selection" ? (
                      <motion.div
                        key="selection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                      >
                        <p className="mb-6 text-[#999]">Sélectionnez votre architecture</p>
                        <div className="grid w-full grid-cols-2 gap-4">
                          <button
                            onClick={handleDownload}
                            className="flex flex-col items-center gap-2 rounded border border-[#3a3a3a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#ff6b35] hover:bg-[#ff6b35]/10"
                          >
                            <span className="text-lg font-bold text-[#d0d0d0]">x64</span>
                            <span className="text-xs text-[#666]">Intel / AMD</span>
                          </button>
                          <button
                            onClick={handleDownload}
                            className="flex flex-col items-center gap-2 rounded border border-[#3a3a3a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#ff6b35] hover:bg-[#ff6b35]/10"
                          >
                            <span className="text-lg font-bold text-[#d0d0d0]">ARM</span>
                            <span className="text-xs text-[#666]">Apple Silicon</span>
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center"
                      >
                        <div className="mb-4 rounded-full bg-[#ff6b35]/20 p-4 text-[#ff6b35]">
                          <Download className="h-12 w-12 animate-bounce" />
                        </div>
                        <p className="text-lg text-[#ff6b35]">Bon jeu sur Divizion !</p>
                        <p className="mt-2 text-sm text-[#999]">Le téléchargement devrait démarrer automatiquement.</p>
                        <button
                          onClick={() => setModalState(null)}
                          className="mt-6 rounded bg-[#3a3a3a] px-6 py-2 text-sm font-bold text-[#d0d0d0] hover:bg-[#4a4a4a]"
                        >
                          Fermer
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>

      {/* Main Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#d0d0d0]">Nouveautés Principales</h2>
          <p className="text-[#999]">Découvrez ce qui change dans la V3</p>
          <div className="mx-auto mt-4 h-1 w-16 bg-[#ff6b35]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded border border-[#3a3a3a] bg-[#2a2a2a] transition-all hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/10"
            >
              {/* 16:9 Image Placeholder */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a] border-b border-[#3a3a3a]">
                <div className="absolute inset-0 flex items-center justify-center text-[#666]">
                  <div className="flex flex-col items-center gap-2">
                    <Layout className="h-8 w-8 opacity-50" />
                    <span className="font-mono text-xs uppercase tracking-widest">Aperçu {feature.title}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 inline-flex items-center gap-2 text-[#ff6b35]">
                  {feature.icon}
                  <h3 className="font-bold text-[#d0d0d0]">{feature.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#999]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Features (Beta) */}
      <section className="rounded border border-[#ff6b35]/30 bg-[#2a2a2a] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cpu className="w-64 h-64 text-[#ff6b35]" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <span className="rounded bg-[#ff6b35] px-2 py-1 text-xs font-bold text-white">BETA</span>
            <h2 className="text-2xl font-bold text-[#d0d0d0]">Fonctionnalités Intelligentes</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SMART_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded border border-[#3a3a3a] bg-[#1a1a1a]/50 p-6 backdrop-blur-sm transition-colors hover:border-[#ff6b35]/50"
              >
                <div className="shrink-0 pt-1">{feature.icon}</div>
                <div>
                  <h3 className="mb-2 font-bold text-[#d0d0d0]">{feature.title}</h3>
                  <p className="text-sm text-[#999]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="rounded border border-dashed border-[#3a3a3a] p-8 text-center md:p-12">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2a2a] text-[#999]">
            <Gamepad2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#d0d0d0]">Bientôt Disponible</h2>
          <p className="text-[#999]">
            Nous travaillons sur le support des <strong>modpacks custom</strong> pour remplacer MultiMC et le launcher de base,
            ainsi qu'une gestion avancée des comptes unifiés.
          </p>
        </div>
      </section>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
        >
          Support Discord
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={LAUNCHER_RELEASES_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#d0d0d0] transition-colors hover:border-[#ff6b35]"
        >
          Versions précédentes
        </a>
      </div>
    </div>
  );
}
