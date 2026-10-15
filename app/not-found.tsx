"use client";
import Link from "next/link";
import { useLanguage } from "@/components/provider";
import { Rails } from "@/components/rails";
export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="not-found">
      <Rails />
      <div className="container">
        <span className="error-number">404</span>
        <h1>{t("Cette page s’est égarée.", "This page got lost.")}</h1>
        <p>
          {t(
            "L’adresse a peut-être changé. Retrouvez le launcher depuis l’accueil.",
            "The address may have changed. Find the launcher from the home page.",
          )}
        </p>
        <Link className="button button-white" href="/">
          {t("Retour à l’accueil", "Back to home")}
        </Link>
      </div>
    </section>
  );
}
