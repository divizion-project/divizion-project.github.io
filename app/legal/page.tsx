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
    legal: {
      title: "Conditions Générales d'Utilisation (CGU)",
      lastUpdate: "Dernière mise à jour : 21 mars 2026",
      sections: {
        objet: {
          title: "1. Objet",
          content: "Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») encadrent l'utilisation du launcher Divizion, du site associé, ainsi que des services liés au projet Divizion.\nDivizion est un launcher tiers permettant notamment de gérer des instances, paramètres, téléchargements et lancements liés à l'univers du projet Divizion."
        },
        editeur: {
          title: "2. Éditeur",
          content: "Le launcher Divizion est édité par :\nNom du responsable : Maxence SCHAFFERT\nStatut : projet personnel non encore immatriculé\nE-mail de contact : redflyhd@aol.com"
        },
        hebergement: {
          title: "3. Hébergement",
          content: "Le site est hébergé via GitHub."
        },
        acceptation: {
          title: "4. Acceptation",
          content: "Toute utilisation de Divizion implique l'acceptation pleine et entière des présentes CGU.\nSi l'utilisateur n'accepte pas ces conditions, il ne doit pas utiliser le launcher ni les services associés."
        },
        age: {
          title: "5. Âge minimum",
          content: "L'utilisation de Divizion est réservée aux personnes âgées d'au moins 15 ans.\nToute personne mineure doit s'assurer de disposer des autorisations nécessaires de son représentant légal lorsque cela est requis."
        },
        minecraft: {
          title: "6. Relation avec Minecraft / Microsoft / Mojang",
          content: "Divizion est un launcher tiers indépendant.\nDivizion n'est ni affilié, ni approuvé, ni édité par Mojang Studios, Microsoft ou leurs sociétés affiliées.\nL'utilisation de Minecraft via Divizion reste soumise aux règles, conditions et exigences applicables de Mojang, Microsoft et Minecraft."
        },
        comptes: {
          title: "7. Comptes",
          content: "L'utilisation normale de certaines fonctionnalités peut nécessiter un compte Minecraft premium.\nUn mode hors ligne peut également être utilisé.\nLorsqu'un compte hors ligne est utilisé, celui-ci peut être supprimé à la fermeture du launcher.\nCertaines données locales peuvent toutefois être conservées sur l'appareil, notamment les instances, paramètres, réglages du launcher et, le cas échéant, les informations liées au compte Microsoft localement enregistrées par l'utilisateur."
        },
        fonctionnement: {
          title: "8. Fonctionnement du launcher",
          content: "Le launcher peut fonctionner indépendamment d'un serveur de jeu.\nLe launcher peut télécharger ou mettre à jour certains fichiers nécessaires à son fonctionnement, y compris Java, ainsi que des contenus liés au projet.\nCertaines ressources peuvent provenir du dépôt GitHub du projet ou de services tiers utilisés par Divizion."
        },
        sources: {
          title: "9. Sources et contenus tiers",
          content: "Divizion peut utiliser des ressources, mods ou modpacks provenant de services tiers, notamment via l'API Modrinth.\nL'utilisateur reconnaît que certains contenus téléchargés via le launcher peuvent rester soumis aux conditions, licences et droits de leurs auteurs respectifs.\nDivizion ne revendique pas la propriété des contenus tiers."
        },
        interdictions: {
          title: "10. Utilisations interdites",
          content: "Il est strictement interdit de :\n• tenter de pirater le launcher ;\n• tenter de voler des données ;\n• contourner des mesures de sécurité ;\n• décompiler le launcher ;\n• pratiquer du reverse engineering sur le launcher ;\n• modifier puis redistribuer le launcher sans autorisation ;\n• republier une version modifiée du launcher sans autorisation ;\n• utiliser Divizion de manière malveillante ou frauduleuse."
        },
        abus: {
          title: "11. Mesures en cas d'abus",
          content: "Aucune grille de sanction automatique n'est prévue à ce jour.\nToutefois, Divizion se réserve le droit de prendre toute mesure technique, temporaire ou définitive, nécessaire à la protection du launcher, du site, de ses fichiers, de ses infrastructures ou de ses utilisateurs en cas d'usage abusif, dangereux ou malveillant."
        },
        donnees: {
          title: "12. Données et confidentialité",
          content: "Divizion ne met actuellement pas en place de système de paiement.\nDivizion ne collecte actuellement que certaines informations techniques limitées nécessaires au fonctionnement ou au suivi global du projet.\nLe launcher peut transmettre à Discord Rich Presence des informations de statut, notamment le nom de l'instance utilisée et le temps de jeu.\nLe projet peut également mesurer de façon anonyme certaines statistiques globales, notamment le nombre d'ouvertures et de lancements du launcher via Google Analytics.\nAucun système d'anti-cheat ni de collecte détaillée de logs n'est annoncé à ce jour."
        },
        donneesLocales: {
          title: "13. Données locales",
          content: "Certaines données sont conservées localement sur l'ordinateur de l'utilisateur afin d'assurer le bon fonctionnement du launcher.\nLa suppression du launcher et de ses fichiers locaux par l'utilisateur met fin à cette conservation locale, sous réserve des données éventuellement stockées par des services tiers utilisés par l'utilisateur lui-même."
        },
        contributions: {
          title: "14. Contributions communautaires",
          content: "Les suggestions communautaires sont autorisées.\nDes propositions, retours ou contributions peuvent être publiés notamment sur Discord ou GitHub.\nSauf mention contraire, l'envoi volontaire d'une suggestion autorise Divizion à l'étudier, l'adapter, l'utiliser ou ne pas l'utiliser, sans obligation de compensation."
        },
        propriete: {
          title: "15. Propriété intellectuelle",
          content: "Le nom Divizion, l'identité visuelle, l'interface, le code, les éléments graphiques, textes, fichiers et contenus originaux du projet sont protégés par les droits applicables.\nSauf autorisation écrite préalable, aucun élément original de Divizion ne peut être copié, reproduit, redistribué, modifié, exploité ou réutilisé publiquement."
        },
        garantie: {
          title: "16. Absence de garantie",
          content: "Divizion est fourni en l'état.\nAucune garantie n'est accordée quant à l'absence de bugs, d'interruptions, d'erreurs, d'incompatibilités ou d'indisponibilité.\nL'utilisateur utilise le launcher sous sa seule responsabilité."
        },
        responsabilite: {
          title: "17. Responsabilité",
          content: "Divizion ne pourra être tenu responsable des dommages indirects, pertes de données, incompatibilités logicielles, erreurs de téléchargement, indisponibilités temporaires ou dysfonctionnements liés à des services tiers, à l'environnement de l'utilisateur ou à une mauvaise utilisation.\nL'utilisateur reste responsable de son appareil, de ses fichiers, de son compte Minecraft/Microsoft et de ses usages."
        },
        modification: {
          title: "18. Modification des CGU",
          content: "Les présentes CGU peuvent être modifiées à tout moment.\nLa version applicable est celle publiée sur le site ou mise à disposition avec le launcher à la date d'utilisation."
        },
        droit: {
          title: "19. Droit applicable",
          content: "Les présentes CGU sont soumises au droit français."
        },
        litiges: {
          title: "20. Litiges",
          content: "En cas de litige, une solution amiable sera recherchée en priorité.\nÀ défaut, le litige sera porté devant les juridictions territorialement compétentes selon les règles de droit commun."
        },
        contact: {
          title: "21. Contact",
          content: "Pour toute question relative aux présentes CGU :\nredflyhd@aol.com"
        }
      }
    },
    footer: {
      copyright: "Tous droits réservés.",
      legal: "CGU",
      privacy: "Confidentialité"
    }
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      download: "Download"
    },
    legal: {
      title: "Terms of Use (CGU)",
      lastUpdate: "Last updated: March 21, 2026",
      sections: {
        objet: {
          title: "1. Purpose",
          content: "These General Terms of Use (hereinafter \"CGU\") govern the use of the Divizion launcher, the associated website, and services related to the Divizion project.\nDivizion is a third-party launcher that allows, among other things, managing instances, settings, downloads, and launches related to the Divizion project universe."
        },
        editeur: {
          title: "2. Publisher",
          content: "The Divizion launcher is published by:\nName of the person in charge: Maxence SCHAFFERT\nStatus: personal project not yet registered\nContact email: redflyhd@aol.com"
        },
        hebergement: {
          title: "3. Hosting",
          content: "The website is hosted via GitHub."
        },
        acceptation: {
          title: "4. Acceptance",
          content: "Any use of Divizion implies full acceptance of these CGU.\nIf the user does not accept these conditions, they must not use the launcher or the associated services."
        },
        age: {
          title: "5. Minimum Age",
          content: "The use of Divizion is reserved for persons aged at least 15 years.\nAny minor must ensure they have the necessary authorizations from their legal representative when required."
        },
        minecraft: {
          title: "6. Relationship with Minecraft / Microsoft / Mojang",
          content: "Divizion is an independent third-party launcher.\nDivizion is not affiliated, approved, or published by Mojang Studios, Microsoft, or their affiliated companies.\nUse of Minecraft via Divizion remains subject to the applicable rules, conditions, and requirements of Mojang, Microsoft, and Minecraft."
        },
        comptes: {
          title: "7. Accounts",
          content: "Normal use of certain features may require a premium Minecraft account.\nAn offline mode can also be used.\nWhen an offline account is used, it may be deleted when the launcher is closed.\nHowever, certain local data may be kept on the device, including instances, settings, launcher settings, and, if applicable, information related to the Microsoft account locally saved by the user."
        },
        fonctionnement: {
          title: "8. Launcher Operation",
          content: "The launcher can operate independently of a game server.\nThe launcher may download or update certain files necessary for its operation, including Java, as well as content related to the project.\nSome resources may come from the project's GitHub repository or third-party services used by Divizion."
        },
        sources: {
          title: "9. Sources and Third-Party Content",
          content: "Divizion may use resources, mods, or modpacks from third-party services, including via the Modrinth API.\nThe user acknowledges that certain content downloaded via the launcher may remain subject to the conditions, licenses, and rights of their respective authors.\nDivizion does not claim ownership of third-party content."
        },
        interdictions: {
          title: "10. Prohibited Uses",
          content: "It is strictly prohibited to:\n• attempt to hack the launcher;\n• attempt to steal data;\n• bypass security measures;\n• decompile the launcher;\n• practice reverse engineering on the launcher;\n• modify and then redistribute the launcher without authorization;\n• republish a modified version of the launcher without authorization;\n• use Divizion maliciously or fraudulently."
        },
        abus: {
          title: "11. Measures in Case of Abuse",
          content: "No automatic sanction grid is currently planned.\nHowever, Divizion reserves the right to take any technical measure, temporary or permanent, necessary for the protection of the launcher, the site, its files, its infrastructures, or its users in case of abusive, dangerous, or malicious use."
        },
        donnees: {
          title: "12. Data and Confidentiality",
          content: "Divizion does not currently implement a payment system.\nDivizion currently only collects certain limited technical information necessary for operation or overall project monitoring.\nThe launcher may transmit status information to Discord Rich Presence, including the name of the instance used and play time.\nThe project may also anonymously measure certain global statistics, including the number of launcher openings and launches via Google Analytics.\nNo anti-cheat system or detailed log collection is currently announced."
        },
        donneesLocales: {
          title: "13. Local Data",
          content: "Certain data is kept locally on the user's computer to ensure proper functioning of the launcher.\nDeletion of the launcher and its local files by the user ends this local storage, subject to data possibly stored by third-party services used by the user themselves."
        },
        contributions: {
          title: "14. Community Contributions",
          content: "Community suggestions are allowed.\nProposals, feedback, or contributions may be published on Discord or GitHub.\nUnless otherwise stated, voluntary submission of a suggestion authorizes Divizion to study, adapt, use, or not use it, without obligation of compensation."
        },
        propriete: {
          title: "15. Intellectual Property",
          content: "The name Divizion, visual identity, interface, code, graphic elements, texts, files, and original content of the project are protected by applicable rights.\nWithout prior written authorization, no original element of Divizion may be copied, reproduced, redistributed, modified, exploited, or publicly reused."
        },
        garantie: {
          title: "16. No Warranty",
          content: "Divizion is provided as is.\nNo warranty is given regarding the absence of bugs, interruptions, errors, incompatibilities, or unavailability.\nThe user uses the launcher at their own risk."
        },
        responsabilite: {
          title: "17. Liability",
          content: "Divizion cannot be held responsible for indirect damages, data loss, software incompatibilities, download errors, temporary unavailability, or malfunctions related to third-party services, the user's environment, or misuse.\nThe user remains responsible for their device, files, Minecraft/Microsoft account, and usage."
        },
        modification: {
          title: "18. Modification of CGU",
          content: "These CGU may be modified at any time.\nThe applicable version is the one published on the site or made available with the launcher at the date of use."
        },
        droit: {
          title: "19. Applicable Law",
          content: "These CGU are subject to French law."
        },
        litiges: {
          title: "20. Disputes",
          content: "In case of dispute, an amicable solution will be sought first.\nFailing that, the dispute will be brought before the territorially competent courts according to common law rules."
        },
        contact: {
          title: "21. Contact",
          content: "For any question regarding these CGU:\nredflyhd@aol.com"
        }
      }
    },
    footer: {
      copyright: "All rights reserved.",
      legal: "CGU",
      privacy: "Privacy Policy"
    }
  }
}

export default function LegalPage() {
  const { locale } = useLanguage()
  const t = translations[locale]

  return (
    <>
      <Header />

      <main className="page-content">
        <section className="legal-page">
          <div className="container">
            <div className="legal-header">
              <h1 className="legal-title">{t.legal.title}</h1>
              <p className="legal-update">{t.legal.lastUpdate}</p>
            </div>

            <div className="legal-content">
              {Object.values(t.legal.sections).map((section, i) => (
                <div className="legal-section" key={i}>
                  <h2 className="legal-section-title">{section.title}</h2>
                  <p className="legal-section-text">{section.content}</p>
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
