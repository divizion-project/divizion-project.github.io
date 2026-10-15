"use client";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { useLanguage } from "./provider";
import { asset } from "@/lib/config";
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Link
              className="brand"
              href="/"
              aria-label={t("Divizion — accueil", "Divizion — home")}
            >
              <img
                src={asset("/assets/logo.webp")}
                alt=""
                width="36"
                height="36"
              />
            </Link>
            <p>
              {t(
                "Un projet indépendant.\nUn launcher pour Minecraft.",
                "An independent project.\nA launcher for Minecraft.",
              )}
            </p>
            <a
              className="social-button"
              href="https://github.com/divizion-project/Divizion-Launcher"
              aria-label="GitHub"
            >
              <Code2 size={20} />
            </a>
          </div>
          <div className="footer-group">
            <h4>{t("LE LAUNCHER", "THE LAUNCHER")}</h4>
            <a href={asset("/#features")}>{t("Fonctionnalités", "Features")}</a>
            <a href={asset("/#modrinth")}>Modrinth</a>
            <a href={asset("/#instances")}>
              {t("Multi-instances", "Multiple instances")}
            </a>
            <a href={asset("/#tools")}>
              {t("Pour les développeurs", "For developers")}
            </a>
          </div>
          <div className="footer-group">
            <h4>{t("RESSOURCES", "RESOURCES")}</h4>
            <Link href="/wiki">Documentation</Link>
            <Link href="/releases">
              {t("Notes de version", "Release notes")}
            </Link>
            <a href="https://github.com/divizion-project/Divizion-Launcher/issues">
              {t("Signaler un problème", "Report an issue")}
            </a>
          </div>
          <div className="footer-group">
            <h4>{t("TÉLÉCHARGER", "DOWNLOAD")}</h4>
            <Link href="/download?os=windows">Windows</Link>
            <Link href="/download?os=macos">macOS</Link>
            <Link href="/download?os=linux">Linux</Link>
            <Link href="/download?channel=beta">
              {t("Version bêta", "Beta release")}
            </Link>
            <span>Legacy · {t("Bientôt", "Soon")}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <Link href="/legal">
              {t("Conditions d’utilisation", "Terms of use")}
            </Link>
            <Link href="/privacy">{t("Confidentialité", "Privacy")}</Link>
          </div>
          <span>© {new Date().getFullYear()} Divizion</span>
        </div>
        <p className="minecraft-notice">
          {t(
            "Divizion est indépendant de Mojang Studios et Microsoft. Minecraft est une marque de Mojang.",
            "Divizion is independent of Mojang Studios and Microsoft. Minecraft is a trademark of Mojang.",
          )}
        </p>
      </div>
    </footer>
  );
}
