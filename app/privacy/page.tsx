'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      download: "Télécharger"
    },
    privacy: {
      title: "Politique de confidentialité",
      lastUpdate: "Dernière mise à jour : Mars 2026",
      intro: "Nous accordons une grande importance à votre vie privée. Cette politique explique quelles données sont collectées par Divizion Launcher et comment elles sont utilisées.",
      sections: {
        principle: {
          title: "Notre principe",
          content: "Divizion Launcher est conçu pour respecter votre vie privée. Nous ne collectons aucune donnée personnelle identifiable. Aucune information sensible n'est stockée sur nos serveurs."
        },
        analytics: {
          title: "Google Analytics",
          content: "Le launcher utilise Google Analytics avec nos propres balises personnalisées. Ces données sont exclusivement utilisées à des fins statistiques internes et non à des fins publicitaires.",
          details: [
            "Nous mesurons uniquement le nombre de lancements du launcher et des instances",
            "Aucune donnée personnelle ou identifiable n'est collectée",
            "Les statistiques sont totalement anonymisées",
            "Aucun profil utilisateur n'est créé",
            "Aucune publicité ciblée n'est diffusée"
          ]
        },
        discord: {
          title: "Discord RPC",
          content: "Le launcher intègre le support Discord RPC (Rich Presence) pour afficher votre activité Minecraft sur votre profil Discord. Cette fonctionnalité est optionnelle et peut être désactivée dans les paramètres.",
          details: [
            "La communication s'effectue uniquement entre votre ordinateur et Discord",
            "Aucune donnée n'est transmise à nos serveurs",
            "Vous gardez le contrôle total sur cette fonctionnalité"
          ]
        },
        local: {
          title: "Données locales",
          content: "Toutes vos données de jeu, configurations et instances sont stockées exclusivement sur votre ordinateur. Rien n'est synchronisé ou envoyé vers des serveurs externes sans votre consentement explicite."
        },
        thirdParty: {
          title: "Services tiers",
          content: "Le launcher peut interagir avec des services tiers pour fonctionner correctement :",
          details: [
            "Mojang / Microsoft pour l'authentification Minecraft (uniquement si vous utilisez un compte officiel)",
            "Modrinth, CurseForge et autres plateformes pour le téléchargement de mods et modpacks",
            "GitHub pour les mises à jour du launcher"
          ]
        },
        control: {
          title: "Votre contrôle",
          content: "Vous avez un contrôle total sur vos données. Vous pouvez à tout moment désactiver les statistiques anonymes et Discord RPC depuis les paramètres du launcher."
        },
        changes: {
          title: "Modifications",
          content: "Cette politique de confidentialité peut être mise à jour occasionnellement. Les modifications seront notifiées via le launcher ou notre GitHub."
        }
      }
    },
    footer: {
      copyright: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité"
    }
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      download: "Download"
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdate: "Last updated: March 2026",
      intro: "We take your privacy seriously. This policy explains what data is collected by Divizion Launcher and how it is used.",
      sections: {
        principle: {
          title: "Our Principle",
          content: "Divizion Launcher is designed to respect your privacy. We do not collect any personally identifiable information. No sensitive data is stored on our servers."
        },
        analytics: {
          title: "Google Analytics",
          content: "The launcher uses Google Analytics with our own custom tags. This data is exclusively used for internal statistical purposes and not for advertising.",
          details: [
            "We only measure the number of launcher and instance launches",
            "No personal or identifiable data is collected",
            "Statistics are completely anonymized",
            "No user profile is created",
            "No targeted advertising is displayed"
          ]
        },
        discord: {
          title: "Discord RPC",
          content: "The launcher includes Discord RPC (Rich Presence) support to display your Minecraft activity on your Discord profile. This feature is optional and can be disabled in settings.",
          details: [
            "Communication occurs only between your computer and Discord",
            "No data is transmitted to our servers",
            "You retain full control over this feature"
          ]
        },
        local: {
          title: "Local Data",
          content: "All your game data, configurations, and instances are stored exclusively on your computer. Nothing is synchronized or sent to external servers without your explicit consent."
        },
        thirdParty: {
          title: "Third-Party Services",
          content: "The launcher may interact with third-party services to function properly:",
          details: [
            "Mojang / Microsoft for Minecraft authentication (only if you use an official account)",
            "Modrinth, CurseForge, and other platforms for downloading mods and modpacks",
            "GitHub for launcher updates"
          ]
        },
        control: {
          title: "Your Control",
          content: "You have full control over your data. You can disable anonymous statistics and Discord RPC at any time from the launcher settings."
        },
        changes: {
          title: "Changes",
          content: "This privacy policy may be updated occasionally. Changes will be notified via the launcher or our GitHub."
        }
      }
    },
    footer: {
      copyright: "All rights reserved.",
      legal: "Legal Notice",
      privacy: "Privacy Policy"
    }
  }
}

export default function PrivacyPage() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="legal-page">
          <div className="container">
            <div className="legal-header">
              <h1 className="legal-title">{t.privacy.title}</h1>
              <p className="legal-update">{t.privacy.lastUpdate}</p>
            </div>

            <div className="legal-content">
              <p className="legal-intro">{t.privacy.intro}</p>

              {Object.values(t.privacy.sections).map((section, i) => (
                <div className="legal-section" key={i}>
                  <h2 className="legal-section-title">{section.title}</h2>
                  <p className="legal-section-text">{section.content}</p>
                  {'details' in section && (
                    <ul className="legal-list">
                      {(section as { details: string[] }).details.map((item: string, j: number) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
