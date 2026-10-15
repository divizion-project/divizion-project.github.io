"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Download,
  Menu,
  X,
  Layers,
  Package,
  Server,
  BookOpen,
  Code2,
  Clock3,
  SlidersHorizontal,
} from "lucide-react";
import { asset } from "@/lib/config";
import { useLanguage } from "./provider";

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileLauncher, setMobileLauncher] = useState(false);
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(null);
    setMobileLauncher(false);
  }, [path]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  const cards =
    open === "resources"
      ? [
          {
            icon: BookOpen,
            title: t("Documentation", "Documentation"),
            desc: t(
              "Installation, comptes et premiers pas.",
              "Installation, accounts and first steps.",
            ),
            href: "/wiki",
          },
          {
            icon: Clock3,
            title: t("Versions", "Releases"),
            desc: t(
              "Les nouveautés, version par version.",
              "What changed, release by release.",
            ),
            href: "/releases",
          },
          {
            icon: Code2,
            title: "GitHub",
            desc: t(
              "Signaler un problème ou proposer une idée.",
              "Report an issue or suggest an idea.",
            ),
            href: "https://github.com/divizion-project/Divizion-Launcher",
          },
        ]
      : [
          {
            icon: SlidersHorizontal,
            title: t("Fonctionnalités", "Features"),
            desc: t(
              "Java, modloaders et installation automatique.",
              "Java, modloaders and automatic installation.",
            ),
            href: "/#features",
          },
          {
            icon: Layers,
            title: t("Vos instances", "Your instances"),
            desc: t(
              "Multi-instances, comptes et lancement rapide.",
              "Multiple instances, accounts and quick launch.",
            ),
            href: "/#instances",
          },
          {
            icon: Package,
            title: t("Mods & contenus", "Mods & content"),
            desc: t(
              "Tout Modrinth, directement dans le launcher.",
              "All of Modrinth, right in the launcher.",
            ),
            href: "/#modrinth",
          },
          {
            icon: Server,
            title: t("Serveurs & outils", "Servers & tools"),
            desc: t(
              "Du serveur entre amis aux tests de développement.",
              "From playing with friends to development tests.",
            ),
            href: "/#tools",
          },
        ];
  return (
    <>
      <header className="header" ref={ref}>
        <div className="container nav-bar">
          <Link
            className="brand"
            href="/"
            aria-label={t("Divizion — accueil", "Divizion — home")}
          >
            <img
              src={asset("/assets/logo.webp")}
              alt=""
              width="35"
              height="35"
            />
          </Link>
          <nav
            className="desktop-nav"
            aria-label={t("Navigation principale", "Main navigation")}
          >
            <button
              aria-expanded={open === "launcher"}
              aria-controls="mega-menu"
              onClick={() => setOpen(open === "launcher" ? null : "launcher")}
            >
              {t("Le launcher", "The launcher")}
              <ChevronDown
                size={14}
                className={open === "launcher" ? "rotated" : ""}
              />
            </button>
            <button
              aria-expanded={open === "resources"}
              aria-controls="mega-menu"
              onClick={() => setOpen(open === "resources" ? null : "resources")}
            >
              {t("Ressources", "Resources")}
              <ChevronDown
                size={14}
                className={open === "resources" ? "rotated" : ""}
              />
            </button>
            <Link href="/releases">{t("Versions", "Releases")}</Link>
          </nav>
          <div className="nav-actions">
            <button
              className="language"
              aria-label={t("Passer en anglais", "Switch to French")}
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            >
              {lang.toUpperCase()}
              <ChevronDown size={12} />
            </button>
            <Link
              className="button button-small button-white nav-download"
              href="/download"
            >
              {t("Télécharger", "Download")}
            </Link>
            <button
              className="menu-toggle"
              aria-label={t("Ouvrir le menu", "Open menu")}
              aria-expanded={open === "mobile"}
              onClick={() => setOpen(open === "mobile" ? null : "mobile")}
            >
              {open === "mobile" ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && open !== "mobile" && (
            <motion.div
              id="mega-menu"
              className="mega-wrap"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`mega container ${open === "launcher" ? "mega-launcher" : ""}`}
              >
                {cards.map((c) => {
                  const MenuLink = c.href.startsWith("/#") ? "a" : Link;
                  return (
                    <MenuLink
                      key={c.title}
                      href={c.href.startsWith("/#") ? asset(c.href) : c.href}
                      className="mega-card"
                      onClick={() => setOpen(null)}
                    >
                      <div className="mega-visual">
                        <c.icon size={38} strokeWidth={1} />
                        <span className="mega-line" />
                      </div>
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </MenuLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {open === "mobile" && (
            <motion.nav
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <button
                className="mobile-launcher-trigger"
                aria-expanded={mobileLauncher}
                aria-controls="mobile-launcher-links"
                onClick={() => setMobileLauncher(!mobileLauncher)}
              >
                {t("Le launcher", "The launcher")}
                <ChevronDown
                  size={16}
                  className={mobileLauncher ? "rotated" : ""}
                />
              </button>
              <AnimatePresence>
                {mobileLauncher && (
                  <motion.div
                    id="mobile-launcher-links"
                    className="mobile-launcher-links"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {cards.map((c) => (
                      <a
                        key={c.href}
                        href={asset(c.href)}
                        onClick={() => {
                          setOpen(null);
                          setMobileLauncher(false);
                        }}
                      >
                        {c.title}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <Link href="/wiki">Documentation</Link>
              <Link href="/releases">{t("Versions", "Releases")}</Link>
              <Link href="/download">
                {t("Télécharger", "Download")}
                <Download size={18} />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {open && open !== "mobile" && (
          <motion.button
            className="menu-scrim"
            aria-label={t("Fermer le menu", "Close menu")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
