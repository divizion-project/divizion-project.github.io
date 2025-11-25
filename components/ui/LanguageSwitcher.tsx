"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LANGUAGES, LOADERS } from "@/lib/translations";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import createGlobe from "cobe";

// Calibrated phi values (phi=0 seems to be ~90°W / Central US)
// Positive rotation goes West.
const LOCATION_PHIS: Record<string, number> = {
    fr: -1.6,     // France (2°E) -> ~92° East of 90°W
    en: 0.1,      // USA (95°W) -> ~5° West of 90°W
    es: -1.5,     // Spain (4°W) -> ~86° East of 90°W
    de: -1.75,    // Germany (10°E) -> ~100° East of 90°W
    ru: -2.2,     // Russia (37°E) -> ~127° East of 90°W
    pt: -1.43,    // Portugal (8°W) -> ~82° East of 90°W
    zh: 2.9,      // China (105°E) -> ~165° West of 90°W
    it: -1.78,    // Italy (12°E) -> ~102° East of 90°W
    pl: -1.9,     // Poland (19°E) -> ~109° East of 90°W
    ja: 2.3,      // Japan (138°E) -> ~132° West of 90°W
    ko: 2.5,      // South Korea (128°E) -> ~142° West of 90°W
    nl: -1.66,    // Netherlands (5°E) -> ~95° East of 90°W
    tr: -2.18,    // Turkey (35°E) -> ~125° East of 90°W
};

export default function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const focusRef = useRef(0);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

    const layoutId = "language-switcher-modal";

    const [warnings, setWarnings] = useState<string[]>([]);
    const [currentWarningIndex, setCurrentWarningIndex] = useState(0);

    useEffect(() => {
        let mounted = true;
        const loadWarnings = async () => {
            const results = await Promise.all(
                LANGUAGES.map(async (lang) => {
                    try {
                        const loader = LOADERS[lang.code];
                        const translationModule = await loader();
                        return translationModule.language_switcher?.warning;
                    } catch (err) {
                        console.error(err);
                        return null;
                    }
                })
            );
            if (mounted) {
                setWarnings(results.filter((w): w is string => !!w));
            }
        };
        loadWarnings();
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (warnings.length === 0) return;

        const interval = setInterval(() => {
            setCurrentWarningIndex((prev) => (prev + 1) % warnings.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [warnings]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close modal when pathname changes
    useEffect(() => {
        setIsOpen(false);
        setIsAnimating(false);
    }, [pathname]);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Reset search when closing
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("");
        }
    }, [isOpen]);

    // Globe initialization
    useEffect(() => {
        if (!isOpen || !canvasRef.current) return;

        let phi = 0;
        let width = 0;

        // Use ResizeObserver for more robust sizing
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                width = entry.contentRect.width;
            }
        });
        resizeObserver.observe(canvasRef.current);

        // Initial width
        width = canvasRef.current.offsetWidth;

        // Set initial focus
        if (LOCATION_PHIS[language]) {
            focusRef.current = LOCATION_PHIS[language];
            phi = LOCATION_PHIS[language];
        }

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.2, // Reduced tilt slightly
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [1, 0.5, 0],
            glowColor: [0.1, 0.1, 0.1],
            markers: [],
            onRender: (state) => {
                // Smooth rotation to focus with shortest path logic
                const target = focusRef.current;

                let dist = target - phi;

                // Normalize distance to [-PI, PI] for shortest path
                while (dist > Math.PI) dist -= 2 * Math.PI;
                while (dist < -Math.PI) dist += 2 * Math.PI;

                // Interpolate
                phi += dist * 0.05;
                state.phi = phi;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            globe.destroy();
            resizeObserver.disconnect();
        };
    }, [isOpen, language]);

    const handleMouseEnter = (code: string) => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
            if (LOCATION_PHIS[code] !== undefined) {
                focusRef.current = LOCATION_PHIS[code];
            }
        }, 250);
    };

    const handleMouseLeave = () => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };

    const filteredLanguages = LANGUAGES.filter((lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentLanguage = LANGUAGES.find((l) => l.code === language);

    return (
        <>
            {/* Placeholder to maintain layout stability */}
            <div className="relative">
                <button
                    className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium opacity-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <span className="text-lg">{currentLanguage?.flag}</span>
                    <span className="hidden sm:inline">{currentLanguage?.name}</span>
                </button>

                {!isOpen && (
                    <motion.button
                        layoutId={isAnimating ? layoutId : undefined}
                        onMouseEnter={() => setIsAnimating(true)}
                        onMouseLeave={() => setIsAnimating(false)}
                        onClick={() => {
                            setIsAnimating(true);
                            setIsOpen(true);
                        }}
                        onLayoutAnimationComplete={() => {
                            if (!isOpen) {
                                setIsAnimating(false);
                            }
                        }}
                        className="absolute inset-0 flex items-center gap-2 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-2 text-sm font-medium text-[#d0d0d0] transition-colors hover:border-[#ff6b35] hover:text-white"
                        aria-label="Change language"
                    >
                        <motion.span layoutId={isAnimating ? `${layoutId}-flag` : undefined} className="text-lg">
                            {currentLanguage?.flag}
                        </motion.span>
                        <motion.span
                            layoutId={isAnimating ? `${layoutId}-name` : undefined}
                            className="hidden sm:inline"
                        >
                            {currentLanguage?.name}
                        </motion.span>
                    </motion.button>
                )}
            </div>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                    aria-hidden="true"
                                    onClick={() => setIsOpen(false)}
                                />

                                {/* Modal */}
                                <motion.div
                                    layoutId={layoutId}
                                    ref={modalRef}
                                    className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#3a3a3a] bg-[#1a1a1a] shadow-2xl shadow-black/50 flex flex-col md:flex-row max-h-[80dvh] md:h-[600px]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    {/* Left Side: Globe (Hidden on mobile) */}
                                    <div className="hidden md:flex w-1/2 bg-black/50 relative items-center justify-center overflow-hidden border-r border-[#3a3a3a]">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2a2a2a] via-[#1a1a1a] to-black opacity-50" />
                                        <div className="w-full h-full flex items-center justify-center">
                                            <canvas
                                                ref={canvasRef}
                                                style={{ width: '100%', aspectRatio: 1, maxWidth: '500px' }}
                                                className="opacity-80 mix-blend-screen"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Side: Content */}
                                    <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">
                                        <div className="bg-yellow-500/10 border-b border-yellow-500/20 h-32 flex flex-col justify-center relative overflow-hidden shrink-0">
                                            <div className="absolute top-0 left-0 w-full h-full p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                                <div className="flex gap-3">
                                                    <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                                                    <p className="text-sm text-yellow-200/90 leading-relaxed font-mono">
                                                        <Typewriter text={warnings.length > 0 ? warnings[currentWarningIndex] : t("language_switcher.warning")} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-b border-[#3a3a3a] p-4 shrink-0">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-lg font-bold text-white">
                                                    {t("language_switcher.title")}
                                                </h2>
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className="rounded-full p-1 text-[#999] hover:bg-[#333] hover:text-white transition-colors"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Search
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
                                                    size={18}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={t("language_switcher.search")}
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#666] focus:border-[#ff6b35] focus:outline-none"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-2 min-h-0">
                                            <div className="grid gap-1">
                                                {filteredLanguages.map((lang) => (
                                                    <button
                                                        key={lang.code}
                                                        onMouseEnter={() => handleMouseEnter(lang.code)}
                                                        onMouseLeave={handleMouseLeave}
                                                        onClick={() => {
                                                            setLanguage(lang.code);
                                                            setIsOpen(false);
                                                        }}
                                                        className={clsx(
                                                            "flex items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors",
                                                            language === lang.code
                                                                ? "bg-[#ff6b35]/10 border border-[#ff6b35]/20"
                                                                : "hover:bg-[#2a2a2a] border border-transparent"
                                                        )}
                                                    >
                                                        <span className="text-2xl">{lang.flag}</span>
                                                        <div className="flex flex-col">
                                                            <span
                                                                className={clsx(
                                                                    "text-sm font-medium",
                                                                    language === lang.code
                                                                        ? "text-[#ff6b35]"
                                                                        : "text-[#d0d0d0]"
                                                                )}
                                                            >
                                                                {lang.name}
                                                            </span>
                                                        </div>
                                                        {language === lang.code && (
                                                            <div className="ml-auto h-2 w-2 rounded-full bg-[#ff6b35]" />
                                                        )}
                                                    </button>
                                                ))}
                                                {filteredLanguages.length === 0 && (
                                                    <div className="py-8 text-center text-[#666]">
                                                        {t("language_switcher.no_results")}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}

function Typewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 20);
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>
            {displayedText}
            <span className="animate-pulse ml-0.5 inline-block w-1.5 h-3.5 bg-yellow-500/50 align-middle" />
        </span>
    );
}
