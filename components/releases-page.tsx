"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "./provider";
import { useReleases } from "./release-provider";
import { Markdown } from "./markdown";
export function ReleasesPage() {
  const { t, lang } = useLanguage();
  const { releases, state } = useReleases();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [limit, setLimit] = useState(12);
  const list = useMemo(
    () =>
      [...releases]
        .filter(
          (r) =>
            !r.draft &&
            (filter === "all" || r.prerelease === (filter === "beta")),
        )
        .sort(
          (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at),
        ),
    [releases, filter],
  );
  const active = list.find((r) => r.id === selected) || list[0];
  return (
    <section className="section releases-page">
      <div className="container">
        <h1>{t("Les versions de Divizion.", "Divizion releases.")}</h1>
        <p className="prose">
          {t(
            "Les nouveautés et corrections publiées sur GitHub.",
            "New features and fixes published on GitHub.",
          )}
        </p>
        <div
          className="release-filter"
          role="group"
          aria-label={t("Filtrer les versions", "Filter releases")}
        >
          {["all", "stable", "beta"].map((f) => (
            <button
              className={filter === f ? "active" : ""}
              aria-pressed={filter === f}
              key={f}
              onClick={() => {
                setFilter(f);
                setSelected(null);
                setLimit(12);
              }}
            >
              {f === "all"
                ? t("Toutes", "All")
                : f === "beta"
                  ? t("Bêta", "Beta")
                  : "Stable"}
            </button>
          ))}
        </div>
        <div className="release-layout">
          <aside
            className="release-sidebar"
            aria-label={t("Versions publiées", "Published releases")}
          >
            {list.slice(0, limit).map((r) => (
              <button
                key={r.id}
                className={active?.id === r.id ? "active" : ""}
                onClick={() => setSelected(r.id)}
              >
                <strong>{r.tag_name}</strong>
                <span>
                  {r.prerelease ? t("Bêta", "Beta") : "Stable"} ·{" "}
                  {new Intl.DateTimeFormat(lang, {
                    dateStyle: "medium",
                  }).format(new Date(r.published_at))}
                </span>
              </button>
            ))}
            {limit < list.length && (
              <button
                className="load-more"
                onClick={() => setLimit(limit + 12)}
              >
                {t("Afficher plus de versions", "Show more releases")}
              </button>
            )}
          </aside>
          <div className="release-body">
            <AnimatePresence mode="wait">
              {active && (
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="article-meta">
                    <span>
                      {active.prerelease
                        ? t("PRÉVERSION", "PRE-RELEASE")
                        : "STABLE"}
                    </span>
                    <time dateTime={active.published_at}>
                      {new Intl.DateTimeFormat(lang, {
                        dateStyle: "long",
                      }).format(new Date(active.published_at))}
                    </time>
                  </div>
                  <h2>{active.name || active.tag_name}</h2>
                  <div className="release-body-actions">
                    <Link
                      className="button button-black button-small"
                      href={
                        active.prerelease
                          ? "/download?channel=beta"
                          : "/download"
                      }
                    >
                      {t(
                        "Télécharger la dernière version",
                        "Download the latest release",
                      )}
                    </Link>
                    <a href={active.html_url} className="text-link">
                      {t("Voir sur GitHub", "View on GitHub")}
                    </a>
                  </div>
                  <Markdown
                    text={
                      active.body ||
                      t(
                        "Aucune note de version publiée.",
                        "No release notes published.",
                      )
                    }
                  />
                </motion.article>
              )}
            </AnimatePresence>
            {state === "offline" && (
              <p className="catalog-status">
                {t(
                  "Les dernières notes synchronisées sont affichées. GitHub est momentanément indisponible.",
                  "The last synced notes are shown. GitHub is temporarily unavailable.",
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
