"use client";
import { useLanguage } from "@/components/provider";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { t } = useLanguage();
  return (
    <section className="not-found">
      <div className="container">
        <span className="error-number">!</span>
        <h1>{t("Un petit contretemps.", "A small setback.")}</h1>
        <p>
          {t(
            "La page n’a pas pu s’afficher. Vous pouvez réessayer.",
            "The page could not be displayed. Please try again.",
          )}
        </p>
        <button className="button button-white" onClick={reset}>
          {t("Réessayer", "Try again")}
        </button>
      </div>
    </section>
  );
}
