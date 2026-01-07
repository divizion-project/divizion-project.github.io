"use client";

import React, { useState, useRef, useCallback, memo, useEffect, useMemo } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Layout,
  Activity,
  Globe,
  Layers,
  Cpu,
  Bug,
  ArrowRight,
  ArrowDown,
  Gamepad2,
  Video,
  X,
  Download,
  Shield,
  Check,
  ChevronRight,
} from "lucide-react";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import Portal from "@/components/ui/Portal";
import { DISCORD_LINK, LAUNCHER_VERSION, LAUNCHER_RELEASES_LINK } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

// ============================================
// GLOBAL BACKGROUND WITH PARALLAX EFFECTS
// ============================================

// Parallax Particles - move at different speeds based on scroll
const ParallaxParticles = memo(function ParallaxParticles() {
  const { scrollYProgress } = useScroll();

  const particles = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 400, // Spread across the page height (400vh)
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.2, // Parallax speed multiplier
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.2,
    })), []
  );

  return (
    <>
      {particles.map((particle) => {
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}vh`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, rgba(255, 107, 53, ${particle.opacity}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${particle.size * 3}px rgba(255, 107, 53, ${particle.opacity * 0.6})`,
            }}
            animate={{
              y: [0, -150 * particle.speed, 0],
              x: [0, (Math.random() - 0.5) * 60, 0],
              opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
});

// Light Orbs with Parallax
const ParallaxLightOrbs = memo(function ParallaxLightOrbs() {
  const { scrollYProgress } = useScroll();

  // Different parallax speeds for each orb
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  const orbs = [
    { size: 800, x: "10%", baseY: "20vh", color: "rgba(255, 107, 53, 0.12)", blur: 100, y: y1, duration: 10 },
    { size: 600, x: "80%", baseY: "60vh", color: "rgba(255, 140, 80, 0.1)", blur: 80, y: y2, duration: 12 },
    { size: 500, x: "30%", baseY: "120vh", color: "rgba(255, 90, 40, 0.1)", blur: 70, y: y3, duration: 8 },
    { size: 700, x: "70%", baseY: "180vh", color: "rgba(255, 107, 53, 0.08)", blur: 90, y: y4, duration: 14 },
    { size: 550, x: "15%", baseY: "250vh", color: "rgba(255, 130, 60, 0.1)", blur: 75, y: y5, duration: 11 },
    { size: 650, x: "85%", baseY: "320vh", color: "rgba(255, 100, 50, 0.1)", blur: 85, y: y1, duration: 13 },
    { size: 450, x: "50%", baseY: "380vh", color: "rgba(255, 120, 70, 0.12)", blur: 65, y: y2, duration: 9 },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.baseY,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            y: orb.y,
            transform: "translateX(-50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
});

// Light Rays with Parallax
const ParallaxLightRays = memo(function ParallaxLightRays() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const rays = [
    { top: "30vh", rotation: -12, width: 200, opacity: 0.08 },
    { top: "80vh", rotation: -8, width: 250, opacity: 0.06 },
    { top: "150vh", rotation: -15, width: 180, opacity: 0.07 },
    { top: "220vh", rotation: -5, width: 220, opacity: 0.05 },
    { top: "300vh", rotation: -10, width: 200, opacity: 0.08 },
    { top: "380vh", rotation: -6, width: 240, opacity: 0.06 },
  ];

  return (
    <>
      {rays.map((ray, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px]"
          style={{
            width: `${ray.width}%`,
            background: `linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, ${ray.opacity}) 20%, rgba(255, 140, 80, ${ray.opacity * 1.2}) 50%, rgba(255, 107, 53, ${ray.opacity}) 80%, transparent 100%)`,
            top: ray.top,
            left: "-50%",
            transform: `rotate(${ray.rotation}deg)`,
            x,
          }}
          animate={{
            opacity: [ray.opacity, ray.opacity * 1.5, ray.opacity],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
});

// Sparkle Stars spread across the page
const GlobalSparkleStars = memo(function GlobalSparkleStars() {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 400, // 400vh spread
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 8,
    })), []
  );

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}vh`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "rgba(255, 180, 120, 0.9)",
              boxShadow: `0 0 ${star.size * 5}px rgba(255, 107, 53, 0.8), 0 0 ${star.size * 10}px rgba(255, 107, 53, 0.4)`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
});

// Animated Grid Pattern
const GlobalGridPattern = memo(function GlobalGridPattern() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.25, 0.2, 0.15]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        opacity,
      }}
    />
  );
});

// Main Global Background Component
const GlobalBackground = memo(function GlobalBackground() {
  // Particles dans le viewport
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.3,
    })), []
  );

  // Sparkles
  const sparkles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Large floating orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 800,
          height: 800,
          left: "10%",
          top: "20%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          right: "5%",
          top: "40%",
          background: "radial-gradient(circle, rgba(255, 140, 80, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          left: "50%",
          bottom: "10%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(255, 90, 40, 0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light rays */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute"
          style={{
            width: "200%",
            height: 2,
            left: "-50%",
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, rgba(255, 107, 53, ${0.05 + i * 0.01}), transparent)`,
            transform: `rotate(${-10 + i * 3}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `rgba(255, 107, 53, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(255, 107, 53, ${particle.opacity * 0.8})`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sparkle stars */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            background: "rgba(255, 180, 120, 1)",
            boxShadow: `0 0 ${sparkle.size * 6}px rgba(255, 107, 53, 0.9), 0 0 ${sparkle.size * 12}px rgba(255, 107, 53, 0.5)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
});

// Memoized OS Icons
const WindowsIcon = memo(({ className }: { className?: string }) => (
  <FaWindows className={className} />
));
WindowsIcon.displayName = "WindowsIcon";

const AppleIcon = memo(({ className }: { className?: string }) => (
  <FaApple className={className} />
));
AppleIcon.displayName = "AppleIcon";

const LinuxIcon = memo(({ className }: { className?: string }) => (
  <FaLinux className={className} />
));
LinuxIcon.displayName = "LinuxIcon";

type OS = "Windows" | "macOS" | "Linux";

const DOWNLOADS = [
  { os: "Windows", Icon: WindowsIcon, hasArch: true },
  { os: "macOS", Icon: AppleIcon, hasArch: true },
  { os: "Linux", Icon: LinuxIcon, hasArch: false },
] as const;

const DOWNLOAD_LINKS = {
  WINDOWS: {
    X64: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion-Launcher-setup-3.0.2.exe"
  },
  MACOS: {
    X64: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion-Launcher-setup-3.0.2-x64.dmg",
    ARM: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion-Launcher-setup-3.0.2-arm64.dmg"
  },
  LINUX: {
    APPIMAGE: "https://github.com/divizion-project/Divizion-Launcher/releases/download/3.0.2/Divizion-Launcher-3.0.2.AppImage"
  }
};

type ModalState =
  | { type: "selection"; os: OS }
  | { type: "download"; os: OS }
  | { type: "coming_soon"; os: OS }
  | null;

// Smooth scroll function
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth"
    });
  }
};

// Optimized animated section - uses CSS for performance
const AnimatedSection = memo(function AnimatedSection({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </section>
  );
});

// Feature data - Apple style with grid positions (uses translation keys)
const FEATURES = [
  {
    icon: Layout,
    titleKey: "launcher.features.interface.title",
    descriptionKey: "launcher.features.interface.description",
    size: "large", // spans 2 cols
  },
  {
    icon: Activity,
    titleKey: "launcher.features.control.title",
    descriptionKey: "launcher.features.control.description",
    size: "medium",
  },
  {
    icon: Globe,
    titleKey: "launcher.features.earthview.title",
    descriptionKey: "launcher.features.earthview.description",
    size: "medium",
  },
  {
    icon: Layers,
    titleKey: "launcher.features.multi_instances.title",
    descriptionKey: "launcher.features.multi_instances.description",
    size: "large",
  },
];

const AI_FEATURES = [
  {
    icon: Cpu,
    titleKey: "launcher.ai.magiclamp.title",
    descriptionKey: "launcher.ai.magiclamp.description",
    statusKey: "launcher.ai.magiclamp.status"
  },
  {
    icon: Bug,
    titleKey: "launcher.ai.autodebug.title",
    descriptionKey: "launcher.ai.autodebug.description",
    statusKey: "launcher.ai.autodebug.status"
  }
];

export default function LauncherPage() {
  const { t } = useI18n();
  const [modalState, setModalState] = useState<ModalState>(null);
  const [isEarthViewLoaded, setIsEarthViewLoaded] = useState(false);
  const [isEarthViewInteractive, setIsEarthViewInteractive] = useState(false);

  // Fallback: force show after 3 seconds if iframe onLoad doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEarthViewLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOSClick = useCallback((os: OS, hasArch: boolean) => {
    if (os === "Linux") {
      window.location.href = DOWNLOAD_LINKS.LINUX.APPIMAGE;
      setModalState({ type: "download", os });
      return;
    }
    if (hasArch) {
      setModalState({ type: "selection", os });
    } else {
      setModalState({ type: "download", os });
    }
  }, []);

  const startDownload = useCallback((url: string) => {
    window.location.href = url;
    setModalState((prev) => (prev ? { ...prev, type: "download" } : null));
  }, []);

  const handleScrollToDownload = useCallback(() => {
    smoothScrollTo("download");
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Background Effects */}
      <GlobalBackground />

      {/* Main Content */}
      <div className="relative z-[2]">
        {/* Hero Section - has its own earth-view background */}
        <section
          className="relative flex items-center justify-center overflow-hidden bg-black"
          style={{ height: "100dvh", marginTop: "-73px" }}
        >
          {/* Loading indicator - top positioned */}
          {!isEarthViewLoaded && (
            <div className="absolute top-32 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
              <Globe className="h-10 w-10 text-[#ff6b35] animate-pulse" />
              <span className="text-white/40 text-xs uppercase tracking-widest">{t("launcher.hero.loading")}</span>
            </div>
          )}

          {/* Earth-view iframe background */}
          <div className="absolute inset-0 z-0">
            <iframe
              src="https://divizion.fr/earth-view/"
              className="w-full h-full border-0"
              style={{
                opacity: isEarthViewLoaded ? 1 : 0,
                transition: "opacity 1s ease",
                pointerEvents: isEarthViewInteractive ? "auto" : "none",
              }}
              onLoad={() => setIsEarthViewLoaded(true)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
          </div>

          {/* Earth-view control button */}
          {isEarthViewLoaded && !isEarthViewInteractive && (
            <button
              onClick={() => setIsEarthViewInteractive(true)}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm px-4 py-2 text-xs text-white/60 hover:text-white hover:border-white/40 transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span>{t("launcher.hero.interact_globe")}</span>
            </button>
          )}

          {isEarthViewInteractive && (
            <button
              onClick={() => setIsEarthViewInteractive(false)}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-[#ff6b35]/40 bg-black/50 backdrop-blur-sm px-4 py-2 text-xs text-[#ff6b35] hover:bg-[#ff6b35]/10 transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span>{t("launcher.hero.disable_control")}</span>
            </button>
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10 pointer-events-none" />

          {/* Hero content */}
          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-6 backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              <span>Beta {LAUNCHER_VERSION}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
              Divizion<br />
              <span className="text-[#ff6b35]">Launcher</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
              {t("launcher.hero.description")}
            </p>

            <motion.button
              onClick={handleScrollToDownload}
              className="inline-flex items-center gap-3 rounded-full bg-[#ff6b35] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#ff6b35]/25 hover:bg-[#e55a2b] active:scale-95 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-5 w-5" />
              {t("launcher.hero.download_btn")}
            </motion.button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center animate-bounce">
            <ArrowDown className="h-6 w-6 text-white/40" />
          </div>
        </section>

        {/* Transition block between hero and download */}
        <div className="relative z-[3]">
          {/* Black separator */}
          <div className="h-8 bg-black" />
          {/* Bottom gradient fade */}
          <div className="h-64 bg-gradient-to-b from-black via-black/50 to-transparent" />
        </div>

        {/* Download Section */}
        <AnimatedSection id="download" className="py-24 px-6 relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{
                textShadow: "0 0 40px rgba(255, 107, 53, 0.3)",
              }}
            >
              {t("launcher.download.title")}
            </motion.h2>
            <p className="text-white/50 mb-8">
              {t("launcher.download.subtitle", { version: LAUNCHER_VERSION })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {DOWNLOADS.map((download, idx) => (
                <motion.button
                  key={download.os}
                  onClick={() => handleOSClick(download.os as OS, download.hasArch)}
                  className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] px-6 py-6 hover:border-[#ff6b35]/50 transition-all duration-200 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#ff6b35]/0 to-[#ff6b35]/0 group-hover:from-[#ff6b35]/10 group-hover:to-[#ff6b35]/5 transition-all duration-300" />
                  <download.Icon className="relative z-10 h-10 w-10 text-white/70 group-hover:text-[#ff6b35] transition-colors" />
                  <span className="relative z-10 text-base font-semibold text-white">{download.os}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Introduction Section */}
        <AnimatedSection className="py-24 px-6 relative">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-8"
              style={{ textShadow: "0 0 60px rgba(255, 107, 53, 0.2)" }}
            >
              {t("launcher.intro.title")}
            </motion.h2>
            <p className="text-xl text-white/50 leading-relaxed">
              {t("launcher.intro.description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Features Section - Apple Style Bento Grid */}
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimatedSection className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ textShadow: "0 0 80px rgba(255, 107, 53, 0.25)" }}
              >
                {t("launcher.features.title")}
              </motion.h2>
              <p className="text-white/40 text-lg">
                {t("launcher.features.subtitle")}
              </p>
            </AnimatedSection>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                const isLarge = feature.size === "large";

                return (
                  <motion.div
                    key={idx}
                    className={`group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff6b35]/40 transition-all duration-300 ${isLarge ? 'md:col-span-2' : ''}`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Visual area - takes most of the card */}
                    <div className={`relative flex items-center justify-center bg-[#050505] ${isLarge ? 'h-64 md:h-80' : 'h-48 md:h-64'}`}>
                      {/* Animated background glow */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-[#ff6b35]/10 rounded-full blur-3xl group-hover:bg-[#ff6b35]/20 group-hover:w-40 group-hover:h-40 md:group-hover:w-56 md:group-hover:h-56 transition-all duration-500" />
                      </motion.div>
                      {/* Icon with glow */}
                      <div className="relative z-10 flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-3xl bg-[#111] border border-[#1a1a1a] group-hover:border-[#ff6b35]/50 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-all duration-300">
                        <Icon className="h-10 w-10 md:h-14 md:w-14 text-[#ff6b35]" />
                      </div>
                    </div>

                    {/* Text area */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-white/50 text-sm md:text-base">
                        {t(feature.descriptionKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Features Section */}
        <AnimatedSection className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              className="rounded-[2rem] border border-[#ff6b35]/30 bg-[#050505] p-8 md:p-12 lg:p-16 relative overflow-hidden"
              whileHover={{ borderColor: "rgba(255, 107, 53, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Multiple animated glows */}
              <motion.div
                className="absolute top-0 right-0 w-72 h-72 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff8c50]/8 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 7,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
                  <motion.span
                    className="rounded-full bg-[#ff6b35] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255, 107, 53, 0.4)",
                        "0 0 40px rgba(255, 107, 53, 0.6)",
                        "0 0 20px rgba(255, 107, 53, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {t("launcher.ai.badge")}
                  </motion.span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: "0 0 40px rgba(255, 107, 53, 0.3)" }}>
                    {t("launcher.ai.title")}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {AI_FEATURES.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={idx}
                        className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 md:p-8 hover:border-[#ff6b35]/40 transition-colors duration-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b35]/10 text-[#ff6b35]"
                            whileHover={{
                              backgroundColor: "rgba(255, 107, 53, 0.2)",
                              boxShadow: "0 0 20px rgba(255, 107, 53, 0.4)",
                            }}
                          >
                            <Icon className="h-6 w-6" />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{t(feature.titleKey)}</h3>
                            <span className="text-xs text-[#ff6b35]">{t(feature.statusKey)}</span>
                          </div>
                        </div>
                        <p className="text-white/50 leading-relaxed">{t(feature.descriptionKey)}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Target Audience */}
        <AnimatedSection className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ textShadow: "0 0 60px rgba(255, 107, 53, 0.25)" }}
              >
                {t("launcher.audience.title")}
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="rounded-[2rem] border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-10 hover:border-[#ff6b35]/40 transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b35]/5 rounded-full blur-2xl pointer-events-none" />
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff6b35]/10 text-[#ff6b35] mb-6 relative z-10"
                  whileHover={{
                    backgroundColor: "rgba(255, 107, 53, 0.2)",
                    boxShadow: "0 0 30px rgba(255, 107, 53, 0.4)",
                  }}
                >
                  <Gamepad2 className="h-8 w-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t("launcher.audience.players.title")}</h3>
                <ul className="space-y-3 relative z-10">
                  {(t("launcher.audience.players.features") as string[]).map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-white/60"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="h-5 w-5 text-[#ff6b35]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="rounded-[2rem] border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-10 hover:border-[#ff6b35]/40 transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b35]/5 rounded-full blur-2xl pointer-events-none" />
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff6b35]/10 text-[#ff6b35] mb-6 relative z-10"
                  whileHover={{
                    backgroundColor: "rgba(255, 107, 53, 0.2)",
                    boxShadow: "0 0 30px rgba(255, 107, 53, 0.4)",
                  }}
                >
                  <Video className="h-8 w-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{t("launcher.audience.creators.title")}</h3>
                <ul className="space-y-3 relative z-10">
                  {(t("launcher.audience.creators.features") as string[]).map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-white/60"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="h-5 w-5 text-[#ff6b35]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* LTSC Section */}
        <AnimatedSection className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-[#ff6b35]" />
                    <h3 className="text-xl font-bold text-white">{t("launcher.ltsc.title")}</h3>
                  </div>
                  <p className="text-white/50 text-sm">
                    {t("launcher.ltsc.description")}
                  </p>
                </div>
                <a
                  href="https://github.com/divizion-project/Divizion-Launcher-LTSC/releases/download/2.0.0/Divizion.Launcher.LTSC-setup-2.0.0.exe"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-3 text-sm font-bold text-white hover:bg-[#2a2a2a] active:scale-95 transition-all duration-200"
                >
                  <FaWindows className="h-4 w-4" />
                  Windows
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer Links */}
        <AnimatedSection className="py-16 px-6 border-t border-[#111]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#e55a2b] active:scale-95 transition-all duration-200"
              >
                {t("launcher.footer.discord_support")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={LAUNCHER_RELEASES_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:border-[#ff6b35] active:scale-95 transition-all duration-200"
              >
                {t("launcher.footer.previous_versions")}
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Download Modal */}
        <Portal>
          <AnimatePresence>
            {modalState && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setModalState(null)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-full max-w-md rounded-3xl border border-[#1a1a1a] bg-[#0a0a0a] p-8 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setModalState(null)}
                    className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="text-[#ff6b35]">
                      {(() => {
                        const Icon = DOWNLOADS.find(d => d.os === modalState.os)?.Icon;
                        return Icon ? <Icon className="h-12 w-12" /> : null;
                      })()}
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {modalState.type === "selection"
                        ? t("launcher.modal.download_for", { os: modalState.os })
                        : modalState.type === "coming_soon"
                          ? t("launcher.modal.coming_soon")
                          : t("launcher.modal.downloading")}
                    </h3>

                    {modalState.type === "selection" ? (
                      <div className="w-full">
                        <p className="mb-6 text-white/50">{t("launcher.modal.select_arch")}</p>
                        <div className="grid w-full grid-cols-2 gap-4">
                          <button
                            onClick={() => startDownload(
                              modalState.os === "Windows"
                                ? DOWNLOAD_LINKS.WINDOWS.X64
                                : DOWNLOAD_LINKS.MACOS.X64
                            )}
                            className="flex flex-col items-center gap-2 rounded-xl border border-[#1a1a1a] bg-black p-4 hover:border-[#ff6b35] active:scale-95 transition-all duration-200"
                          >
                            <span className="text-lg font-bold text-white">x64</span>
                            <span className="text-xs text-white/40">{t("launcher.modal.intel_amd")}</span>
                          </button>
                          <button
                            onClick={() => {
                              if (modalState.os === "Windows") return;
                              startDownload(DOWNLOAD_LINKS.MACOS.ARM);
                            }}
                            disabled={modalState.os === "Windows"}
                            className={`flex flex-col items-center gap-2 rounded-xl border border-[#1a1a1a] bg-black p-4 transition-all duration-200 ${modalState.os === "Windows"
                              ? "cursor-not-allowed opacity-50"
                              : "hover:border-[#ff6b35] active:scale-95"
                              }`}
                          >
                            <span className="text-lg font-bold text-white">ARM</span>
                            <span className="text-xs text-white/40">
                              {modalState.os === "Windows" ? t("launcher.modal.soon") : t("launcher.modal.apple_silicon")}
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : modalState.type === "coming_soon" ? (
                      <div className="flex flex-col items-center">
                        <p className="text-center text-white/50">
                          {t("launcher.modal.coming_soon_version")}
                        </p>
                        <button
                          onClick={() => setModalState(null)}
                          className="mt-6 rounded-xl bg-[#1a1a1a] px-6 py-2 text-sm font-bold text-white hover:bg-[#2a2a2a] active:scale-95 transition-all duration-200"
                        >
                          {t("launcher.modal.close")}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="mb-4 rounded-full bg-[#ff6b35]/20 p-4 text-[#ff6b35]">
                          <Download className="h-12 w-12 animate-bounce" />
                        </div>
                        <p className="text-lg text-[#ff6b35]">{t("launcher.modal.good_game")}</p>
                        <p className="mt-2 text-sm text-white/50">{t("launcher.modal.download_auto")}</p>
                        <button
                          onClick={() => setModalState(null)}
                          className="mt-6 rounded-xl bg-[#1a1a1a] px-6 py-2 text-sm font-bold text-white hover:bg-[#2a2a2a] active:scale-95 transition-all duration-200"
                        >
                          {t("launcher.modal.close")}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </Portal>

        <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
      `}</style>
      </div>
    </div>
  );
}
