"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LANGUAGES } from "@/lib/translations";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const layoutId = "language-switcher-modal";

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
                                />

                                {/* Modal */}
                                <motion.div
                                    layoutId={layoutId}
                                    ref={modalRef}
                                    className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#3a3a3a] bg-[#1a1a1a] shadow-2xl shadow-black/50"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="border-b border-[#3a3a3a] p-4">
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

                                    <div className="max-h-[60vh] overflow-y-auto p-2">
                                        <div className="grid gap-1">
                                            {filteredLanguages.map((lang) => (
                                                <button
                                                    key={lang.code}
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
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
