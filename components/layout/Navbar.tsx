"use client";

import { FileText, Menu, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import LanguageToggle from "../ui/LanguageToggle";
import { useI18n } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";

type NavRoute = "/" | "/news" | "/launcher" | "/roadmap" | "/docs";

const INDICATOR_TRANSITION =
  "left 0.5s cubic-bezier(0.22, 1, 0.36, 1), top 0.5s cubic-bezier(0.22, 1, 0.36, 1), width 0.5s cubic-bezier(0.22, 1, 0.36, 1), height 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const { t } = useI18n();
  const logoSrc = "/images/icones/logo-small-navbar.webp";
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NAV_LINKS: { href: NavRoute; label: string }[] = useMemo(() => [
    { href: "/", label: t("navbar.home") },
    { href: "/news", label: t("navbar.news") },
    { href: "/launcher", label: t("navbar.launcher") },
    { href: "/roadmap", label: t("navbar.roadmap") },
    { href: "/docs", label: "DOCS" },
  ], [t]);

  const updateIndicator = useCallback(() => {
    const activeIndex = NAV_LINKS.findIndex((link) => link.href === pathname);
    const resolvedIndex = activeIndex === -1 ? 0 : activeIndex;
    const target = navRefs.current[resolvedIndex];
    if (!target || !navContainerRef.current) {
      setIndicatorStyle(null);
      return;
    }
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setIndicatorStyle({
      left: rect.left - containerRect.left,
      top: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    });
  }, [pathname, NAV_LINKS]);

  useEffect(() => {
    // Small delay to ensure DOM is ready and fonts are loaded
    const timer = setTimeout(updateIndicator, 100);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  const isLauncherPage = pathname === "/launcher";

  return (
    <nav className={clsx(
      "border-b px-6 py-4 sticky top-0 z-50 backdrop-blur-sm",
      isLauncherPage
        ? "bg-black/95 border-[#1a1a1a]"
        : "bg-[#1a1a1a]/95 border-[#3a3a3a]"
    )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoSrc}
            alt="Divizion"
            width={48}
            height={48}
            className="size-12 rounded object-cover transition-opacity duration-300 hover:opacity-80"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.4em] text-[#666]">
              Divizion
            </p>
            <p className="text-sm font-semibold text-[#d0d0d0]">
              {t("navbar.soon")}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div
            className="relative hidden items-center gap-3 md:flex"
            ref={navContainerRef}
          >
            {indicatorStyle && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute rounded-lg border border-white/10 bg-white/8"
                style={{
                  left: indicatorStyle.left,
                  top: indicatorStyle.top,
                  width: indicatorStyle.width,
                  height: indicatorStyle.height,
                  transition: INDICATOR_TRANSITION,
                }}
              />
            )}
            {NAV_LINKS.map((link, index) => (
              <div
                key={link.href}
                className="relative inline-flex"
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
              >
                <NavLink href={link.href} active={pathname === link.href}>
                  {link.label}
                </NavLink>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative z-10">
              <LanguageToggle />
            </div>
            <button
              className="md:hidden text-[#d0d0d0] hover:text-[#ff6b35] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "absolute left-0 top-full w-full md:hidden border-b backdrop-blur-sm overflow-hidden",
              isLauncherPage
                ? "border-[#1a1a1a] bg-black/95"
                : "border-[#3a3a3a] bg-[#1a1a1a]/95"
            )}
          >
            <div className="flex flex-col p-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                    pathname === link.href
                      ? "text-[#ff6b35]"
                      : "text-[#d0d0d0] hover:text-[#ff6b35]"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

type NavLinkProps = {
  href: NavRoute;
  children: ReactNode;
  active: boolean;
};

function NavLink({ href, children, active }: NavLinkProps) {
  const isDocs = href === "/docs";

  return (
    <Link
      href={href}
      className={clsx(
        "relative z-10 inline-flex items-center justify-center rounded-lg text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-300 text-[#d0d0d0]",
        isDocs ? "p-2" : "px-4 py-2",
        active
          ? "text-[#ff6b35]"
          : "hover:text-[#ff6b35] text-[#d0d0d0]"
      )}
    >
      {isDocs ? <FileText size={20} /> : children}
    </Link>
  );
}
