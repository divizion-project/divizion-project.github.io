"use client";

import { useState } from "react";
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
  Download,
  Globe,
  Shield,
  Play
} from "lucide-react";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import Portal from "@/components/ui/Portal";
import { DISCORD_LINK, LAUNCHER_VERSION, LAUNCHER_RELEASES_LINK } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";



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

const DOWNLOAD_LINKS = {
  WINDOWS: {
    X64: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion.Launcher-setup-3.0.2.exe"
  },
  MACOS: {
    X64: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion.Launcher-setup-3.0.2-x64.dmg",
    ARM: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion.Launcher-setup-3.0.2-arm64.dmg"
  },
  LINUX: {
    APPIMAGE: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion.Launcher-setup-3.0.2.AppImage"
  }
};



type ModalState =
  | { type: "selection"; os: OS }
  | { type: "download"; os: OS }
  | { type: "coming_soon"; os: OS }
  | null;

export default function LauncherPage() {
  const { t } = useLanguage();
  const [modalState, setModalState] = useState<ModalState>(null);

  const FEATURE_KEYS = [
    { key: "login", icon: <UserCircle className="h-6 w-6" /> },
    { key: "transitions", icon: <Sparkles className="h-6 w-6" /> },
    { key: "visuals", icon: <Monitor className="h-6 w-6" /> },
    { key: "settings", icon: <Settings className="h-6 w-6" /> },
  ];

  const SMART_FEATURE_KEYS = [
    { key: "magiclamp", icon: <Cpu className="h-8 w-8 text-[#ff6b35]" /> },
    { key: "autodebug", icon: <Bug className="h-8 w-8 text-[#ff6b35]" /> },
  ];

  const [isEviewFlipped, setIsEviewFlipped] = useState(false);
  const [isEviewLoading, setIsEviewLoading] = useState(true);

  const handleOSClick = (os: OS, hasArch: boolean) => {
    if (os === "Linux") {
      startDownload(DOWNLOAD_LINKS.LINUX.APPIMAGE);
      return;
    }
    if (hasArch) {
      setModalState({ type: "selection", os });
    } else {
      setModalState({ type: "download", os });
    }
  };

  const startDownload = (url: string) => {
    window.location.href = url;
    setModalState((prev) => (prev ? { ...prev, type: "download" } : null));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
      {/* Hero Section */}
      <header className="flex flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
            <Sparkles className="h-3 w-3" />
            <span>{t("launcher.hero.badge").replace("{version}", LAUNCHER_VERSION)}</span>
          </div>

          <h1 className="text-5xl font-black text-[#d0d0d0] md:text-7xl">
            {t("launcher.hero.title_prefix")}{" "}
            <span className="text-[#ff6b35]">Divizion</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-[#999]">
            {t("launcher.hero.description")}
          </p>
        </div>



        {/* YouTube Video Link */}
        <a
          href="https://www.youtube.com/watch?v=SkrTrm7W-0k"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] shadow-2xl"
        >
          <img
            src="https://img.youtube.com/vi/SkrTrm7W-0k/maxresdefault.jpg"
            alt="Divizion Trailer"
            className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff6b35]/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff6b35]">
              <Play className="ml-1 h-8 w-8 fill-current" />
            </div>
          </div>
        </a>
      </header>

      {/* Downloads Section */}
      <section className="relative space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#d0d0d0]">{t("launcher.download.title")}</h2>
          <p className="text-[#999]">{t("launcher.download.subtitle")}</p>
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
                      {modalState.type === "selection"
                        ? t("common.download_for").replace("{os}", modalState.os)
                        : modalState.type === "coming_soon"
                          ? t("common.soon")
                          : t("common.downloading")}
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
                        <p className="mb-6 text-[#999]">{t("common.select_arch")}</p>
                        <div className="grid w-full grid-cols-2 gap-4">
                          <button
                            onClick={() => startDownload(
                              modalState.os === "Windows"
                                ? DOWNLOAD_LINKS.WINDOWS.X64
                                : DOWNLOAD_LINKS.MACOS.X64
                            )}
                            className="flex flex-col items-center gap-2 rounded border border-[#3a3a3a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#ff6b35] hover:bg-[#ff6b35]/10"
                          >
                            <span className="text-lg font-bold text-[#d0d0d0]">x64</span>
                            <span className="text-xs text-[#666]">{t("common.intel_amd")}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (modalState.os === "Windows") return;
                              startDownload(DOWNLOAD_LINKS.MACOS.ARM);
                            }}
                            disabled={modalState.os === "Windows"}
                            className={`flex flex-col items-center gap-2 rounded border border-[#3a3a3a] bg-[#1a1a1a] p-4 transition-colors ${modalState.os === "Windows"
                              ? "cursor-not-allowed opacity-50"
                              : "hover:border-[#ff6b35] hover:bg-[#ff6b35]/10"
                              }`}
                          >
                            <span className="text-lg font-bold text-[#d0d0d0]">ARM</span>
                            <span className="text-xs text-[#666]">
                              {modalState.os === "Windows" ? t("common.soon") : t("common.apple_silicon")}
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    ) : modalState.type === "coming_soon" ? (
                      <motion.div
                        key="coming_soon"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center"
                      >
                        <p className="text-center text-[#999]">
                          La version Linux n'est pas encore disponible. Rejoignez notre Discord pour être informé de sa sortie !
                        </p>
                        <button
                          onClick={() => setModalState(null)}
                          className="mt-6 rounded bg-[#3a3a3a] px-6 py-2 text-sm font-bold text-[#d0d0d0] hover:bg-[#4a4a4a]"
                        >
                          {t("common.close")}
                        </button>
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
                        <p className="text-lg text-[#ff6b35]">{t("common.good_game")}</p>
                        <p className="mt-2 text-sm text-[#999]">{t("common.download_auto")}</p>
                        <button
                          onClick={() => setModalState(null)}
                          className="mt-6 rounded bg-[#3a3a3a] px-6 py-2 text-sm font-bold text-[#d0d0d0] hover:bg-[#4a4a4a]"
                        >
                          {t("common.close")}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )
          }
        </AnimatePresence >
      </Portal >

      {/* Main Features Grid */}
      < section className="space-y-8" >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#d0d0d0]">{t("launcher.features.title")}</h2>
          <p className="text-[#999]">{t("launcher.features.subtitle")}</p>
          <div className="mx-auto mt-4 h-1 w-16 bg-[#ff6b35]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {FEATURE_KEYS.map((feature, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded border border-[#3a3a3a] bg-[#2a2a2a] transition-all hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/10"
            >
              {/* 16:9 Image Placeholder */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#1a1a1a] border-b border-[#3a3a3a]">
                <div className="absolute inset-0 flex items-center justify-center text-[#666]">
                  <div className="flex flex-col items-center gap-2">
                    <Layout className="h-8 w-8 opacity-50" />
                    <span className="font-mono text-xs uppercase tracking-widest">{t("launcher.features.preview")} {t(`launcher.features.${feature.key}.title`)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 inline-flex items-center gap-2 text-[#ff6b35]">
                  {feature.icon}
                  <h3 className="font-bold text-[#d0d0d0]">{t(`launcher.features.${feature.key}.title`)}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#999]">{t(`launcher.features.${feature.key}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* Smart Features (Beta) */}
      < section className="rounded border border-[#ff6b35]/30 bg-[#2a2a2a] p-8 md:p-12 relative overflow-hidden" >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Cpu className="w-64 h-64 text-[#ff6b35]" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <span className="rounded bg-[#ff6b35] px-2 py-1 text-xs font-bold text-white">{t("launcher.smart_features.badge")}</span>
            <h2 className="text-2xl font-bold text-[#d0d0d0]">{t("launcher.smart_features.title")}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SMART_FEATURE_KEYS.map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded border border-[#3a3a3a] bg-[#1a1a1a]/50 p-6 backdrop-blur-sm transition-colors hover:border-[#ff6b35]/50"
              >
                <div className="shrink-0 pt-1">{feature.icon}</div>
                <div>
                  <h3 className="mb-2 font-bold text-[#d0d0d0]">{t(`launcher.smart_features.${feature.key}.title`)}</h3>
                  <p className="text-sm text-[#999]">{t(`launcher.smart_features.${feature.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* eView Section (Beta) - 3D Flip Card */}
      < div className="group relative w-full" style={{ perspective: "1000px" }}>
        <motion.div
          animate={{ rotateY: isEviewFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 12 }}
          className="relative w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Face */}
          <div
            className="relative w-full overflow-hidden rounded border border-[#3a3a3a] bg-[#2a2a2a] shadow-2xl transition-all hover:border-[#ff6b35] hover:shadow-[#ff6b35]/10 cursor-pointer"
            style={{ backfaceVisibility: "hidden" }}
            onClick={() => setIsEviewFlipped(true)}
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-[#3a3a3a] bg-[#1a1a1a]/50 p-6 backdrop-blur-sm md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6b35]/10 text-[#ff6b35]">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-[#d0d0d0]">{t("launcher.eview.title")}</h2>
                  <span className="rounded bg-[#ff6b35] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {t("launcher.eview.badge")}
                  </span>
                </div>
                <p className="text-sm text-[#666]">{t("launcher.smart_features.title")}</p>
              </div>
            </div>

            {/* 16:9 Media Placeholder */}
            <div className="relative aspect-video w-full bg-black/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-[#666]">
                  <Globe className="h-16 w-16 opacity-20" />
                  <p className="text-sm font-medium uppercase tracking-widest opacity-50">Preview 16:9</p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-lg leading-relaxed text-[#999]">{t("launcher.eview.description")}</p>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 overflow-hidden rounded border border-[#3a3a3a] bg-[#000]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            {isEviewFlipped && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEviewFlipped(false);
                  }}
                  className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-[#ff6b35] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {isEviewLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1a1a1a]">
                    <p className="mb-4 text-xl font-bold text-[#d0d0d0]">{t("launcher.eview.loading")}</p>
                    <div className="h-1 w-64 overflow-hidden rounded-full bg-[#3a3a3a]">
                      <motion.div
                        className="h-full bg-[#ff6b35]"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                    </div>
                  </div>
                )}
                <iframe
                  src="https://divizion.fr/earth-view/"
                  className="h-full w-full border-0"
                  onLoad={() => setIsEviewLoading(false)}
                />
              </>
            )}
          </div>
        </motion.div>
      </div >

      {/* Upcoming Features */}
      < section className="rounded border border-dashed border-[#3a3a3a] p-8 text-center md:p-12" >
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2a2a] text-[#999]">
            <Gamepad2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#d0d0d0]">{t("launcher.upcoming.title")}</h2>
          <p className="text-[#999]" dangerouslySetInnerHTML={{ __html: t("launcher.upcoming.description") }} />
        </div>
      </section >

      {/* LTSC Launcher */}
      < section className="rounded border border-[#3a3a3a] bg-[#1a1a1a] p-8 md:p-12" >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 md:max-w-2xl">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#ff6b35]" />
              <h2 className="text-2xl font-bold text-[#d0d0d0]">{t("launcher.ltsc.title")}</h2>
            </div>
            <p className="text-[#999]">{t("launcher.ltsc.description")}</p>
            <p className="text-xs text-[#666]">{t("launcher.ltsc.coming_soon")}</p>
          </div>
          <div className="shrink-0">
            <a
              href="https://github.com/divizion-project/Divizion-Launcher-LTSC/releases/download/2.0.0/Divizion.Launcher.LTSC-setup-2.0.0.exe"
              className="inline-flex items-center gap-2 rounded bg-[#3a3a3a] px-6 py-3 text-sm font-bold text-[#d0d0d0] transition-colors hover:bg-[#4a4a4a] hover:text-white"
            >
              <FaWindows className="h-5 w-5" />
              {t("launcher.ltsc.download_windows")}
            </a>
          </div>
        </div>
      </section >

      {/* Footer Links */}
      < div className="flex flex-wrap justify-center gap-4" >
        <a
          href={DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
        >
          {t("common.support_discord")}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={LAUNCHER_RELEASES_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#d0d0d0] transition-colors hover:border-[#ff6b35]"
        >
          {t("common.previous_versions")}
        </a>
      </div >
    </div >
  );
}
