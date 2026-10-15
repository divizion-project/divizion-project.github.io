"use client";
import Link from "next/link";
import legal from "@/public/data/legal.json";
import privacy from "@/public/data/privacy.json";
import legalEnglish from "@/public/data/legal-en.json";
import privacyEnglish from "@/public/data/privacy-en.json";
import { useLanguage } from "./provider";
export function LegalPage({ kind }: { kind: "legal" | "privacy" }) {
  const { t, lang } = useLanguage();
  const data =
    kind === "legal"
      ? lang === "fr"
        ? legal
        : legalEnglish
      : lang === "fr"
        ? privacy
        : privacyEnglish;
  const title =
    kind === "legal"
      ? t("Conditions générales\nd’utilisation.", "Terms of use.")
      : t("Politique de\nconfidentialité.", "Privacy policy.");
  return (
    <section className="section legal-page">
      <div className="container">
        <h1>{title}</h1>
        <div className="legal-layout">
          <aside className="legal-sidebar">
            <Link className={kind === "legal" ? "active" : ""} href="/legal">
              {t("Conditions d’utilisation", "Terms of use")}
            </Link>
            <Link
              className={kind === "privacy" ? "active" : ""}
              href="/privacy"
            >
              {t("Confidentialité", "Privacy")}
            </Link>
            <a href="mailto:redflyhd@aol.com">
              {t("Contacter l’éditeur", "Contact the publisher")}
            </a>
          </aside>
          <article className="legal-content">
            <p className="legal-source">
              {t(
                "Texte repris du site officiel",
                "Text from the official website",
              )}{" "}
              <a href={`https://divizion.fr/${kind}`}>divizion.fr</a>.{" "}
              {t(
                "La version française fait foi.",
                "The French version is authoritative.",
              )}
            </p>
            {data
              .filter((b) => b.type !== "h1")
              .map((b, i) =>
                b.type === "h2" ? (
                  <h2 key={i}>{b.text}</h2>
                ) : b.type === "li" ? (
                  <p className="legal-bullet" key={i}>
                    {b.text}
                  </p>
                ) : (
                  <p key={i}>{b.text}</p>
                ),
              )}
            {kind === "privacy" && (
              <>
                <h2>{t("Le site vitrine", "The presentation website")}</h2>
                <p>
                  {t(
                    "Ce site mémorise votre préférence de langue sur votre appareil. Il ne charge aucun outil de mesure publicitaire. Pour actualiser les versions et les guides, votre navigateur contacte les services publics de GitHub. Les informations ci-dessus concernant Google Analytics et Discord RPC se rapportent au launcher.",
                    "This website stores your language preference on your device. It loads no advertising measurement tools. To refresh releases and guides, your browser contacts GitHub’s public services. The Google Analytics and Discord RPC information above refers to the launcher.",
                  )}
                </p>
              </>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
