"use client";
import Link from "next/link";
import { useLanguage } from "./provider";
import { Rails } from "./rails";
import { MediaSlot } from "./media-slot";
import { HomeSections } from "./home-sections";

export function Home() {
  const { t } = useLanguage();
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>
            {t("Minecraft, vos mods", "Minecraft, your mods")}
            <br />
            {t("et vos instances.", "and your instances.")}
          </h1>
          <p className="hero-description">
            {t(
              "Installez vos mods, gérez vos instances et lancez vos serveurs.\nJava et les dépendances ? Le launcher s’en occupe.",
              "Install your mods, manage your instances and start your servers.\nJava and dependencies? The launcher takes care of them.",
            )}
          </p>
          <div className="hero-actions">
            <Link className="button button-orange" href="/download">
              {t("Télécharger Divizion", "Download Divizion")}
            </Link>
            <Link className="button button-white" href="#features">
              {t("Découvrir le launcher", "Explore the launcher")}
            </Link>
          </div>
          <div className="hero-meta">
            {t("Gratuit", "Free")}
            <span />
            Windows · macOS · Linux
          </div>
        </div>
        <div className="hero-stage">
          <Rails variant="preview" />
          <div className="container hero-media">
            <div className="launcher-frame">
              <div className="launcher-window-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <MediaSlot
                id="overview"
                label={t("Aperçu du launcher", "Launcher preview")}
                dark
                large
              />
            </div>
          </div>
        </div>
      </section>
      <section className="platform-strip">
        <div className="container">
          <span>
            {t(
              "Un launcher.\nToutes vos façons de jouer.",
              "One launcher.\nEvery way you play.",
            )}
          </span>
          <div className="strip-divider" />
          <span>Windows</span>
          <span>macOS</span>
          <span>Linux</span>
          <span>Minecraft Java</span>
          <span>Modrinth</span>
        </div>
      </section>
      <HomeSections />
    </>
  );
}
