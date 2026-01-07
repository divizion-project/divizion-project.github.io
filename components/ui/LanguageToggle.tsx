'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Globe } from 'lucide-react';

/**
 * Modern Language Toggle Component
 * A simple, elegant toggle switch between French and English
 */
export default function LanguageToggle() {
    const { locale, toggleLocale, currentLocaleInfo, t } = useI18n();

    return (
        <button
            onClick={toggleLocale}
            className="language-toggle"
            aria-label={t('language_switcher.switch_to')}
            title={t('language_switcher.switch_to')}
        >
            <span className="language-toggle__icon">
                <Globe size={16} />
            </span>

            <span className="language-toggle__label">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={locale}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="language-toggle__text"
                    >
                        {currentLocaleInfo.code.toUpperCase()}
                    </motion.span>
                </AnimatePresence>
            </span>

            <span className="language-toggle__flag">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={locale}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                        {currentLocaleInfo.flag}
                    </motion.span>
                </AnimatePresence>
            </span>

            <style jsx>{`
                .language-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 14px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 9999px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #d0d0d0;
                    font-size: 13px;
                    font-weight: 500;
                    backdrop-filter: blur(8px);
                }

                .language-toggle:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 107, 53, 0.5);
                    color: #fff;
                    transform: translateY(-1px);
                }

                .language-toggle:active {
                    transform: translateY(0);
                }

                .language-toggle__icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ff6b35;
                }

                .language-toggle__label {
                    position: relative;
                    overflow: hidden;
                    min-width: 20px;
                    text-align: center;
                }

                .language-toggle__text {
                    display: block;
                    font-family: var(--font-mono, monospace);
                    letter-spacing: 0.05em;
                }

                .language-toggle__flag {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    line-height: 1;
                }

                @media (max-width: 640px) {
                    .language-toggle {
                        padding: 8px 12px;
                    }

                    .language-toggle__label {
                        display: none;
                    }
                }
            `}</style>
        </button>
    );
}
