"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DISCORD_LINK } from "@/lib/constants";
import { ArrowRight, Sparkles, Check } from "lucide-react";

type PhaseStatus = "in_progress" | "upcoming";
type PhaseKey =
  | "phase1"
  | "phase2"
  | "phase3"
  | "phase4"
  | "phase5"
  | "phase6"
  | "phase7"
  | "phase8"
  | "phase9"
  | "phase10";

type PhaseCard = {
  icon: string;
  title: string;
  bullets: string[];
};

type PhaseDefinition = {
  id: PhaseKey;
  icon: string;
  title: string;
  objective: string;
  status: PhaseStatus;
  cardsHeading: string;
  cards: PhaseCard[];
  note?: string;
  footer?: string;
};

type PhaseViewModel = PhaseDefinition & {
  number: string;
  statusLabel: string;
  position: number;
};

const STATUS_LABELS: Record<PhaseStatus, string> = {
  in_progress: "En cours",
  upcoming: "À venir",
};

const PHASE_DEFINITIONS: PhaseDefinition[] = [
  {
    id: "phase1",
    icon: "🌍",
    title: "Fondations de l'univers",
    objective: "Offrir une portion jouable, stable et immersive avant d'agrandir le monde.",
    status: "in_progress",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🌍",
        title: "Première carte de test",
        bullets: [
          "Un morceau de Terre mêlant campagne et mégalopole ravagée.",
          "Tours effondrées, végétation envahissante, ruines dangereuses.",
          "Ambiance immédiatement post-apocalyptique.",
        ],
      },
      {
        icon: "🎮",
        title: "Serveur survie hardcore jouable",
        bullets: [
          "Difficulté plus élevée que Minecraft classique.",
          "Ressources limitées et premières mécaniques de rareté.",
          "Systèmes dynamiques déjà présents en version simplifiée.",
        ],
      },
      {
        icon: "🌫️",
        title: "Première ambiance Divizion",
        bullets: [
          "Packs de textures et shaders recommandés pour l'atmosphère.",
          "Tests de mutants, villes mortelles, exploration épique.",
          "Sensation d'être vraiment seul dans un monde abandonné.",
        ],
      },
    ],
    footer: "Cette phase garantit une base solide et immersive avant d'ajouter plus de complexité.",
  },
  {
    id: "phase2",
    icon: "🌾",
    title: "Rareté organisée",
    objective: "Créer une tension permanente grâce à un déficit maîtrisé des ressources.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🥫",
        title: "Spawn de vivres dynamique",
        bullets: [
          "Les vivres apparaissent toutes les 24h réelles dans des lieux crédibles.",
          "Frigos, garde-manger, dépôts, petites boutiques abandonnées.",
          "Le système s'adapte au nombre de joueurs mais garde toujours un léger déficit.",
        ],
      },
      {
        icon: "⚖️",
        title: "Tension permanente",
        bullets: [
          "Il y a toujours un peu moins de nourriture que nécessaire.",
          "Les joueurs doivent piller, commercer, coopérer ou innover.",
          "Les premiers conflits et alliances émergent naturellement.",
        ],
      },
      {
        icon: "🧭",
        title: "Ville vs campagne",
        bullets: [
          "Les villes offrent plus de loot mais un danger extrême.",
          "La campagne est plus calme mais se recharge beaucoup plus lentement.",
          "Chaque région pousse à une stratégie différente.",
        ],
      },
    ],
    footer: "La rareté transforme la survie en planification longue durée et en drame social.",
  },
  {
    id: "phase3",
    icon: "🚀",
    title: "Launcher Divizion v1",
    objective: "Livrer un launcher custom qui supprime les frictions et prépare les vues avancées.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🖥️",
        title: "Launcher dédié Divizion",
        bullets: [
          "Interface brandée pensée pour le projet.",
          "Installe automatiquement packs, configs et mods nécessaires.",
          "Un bouton Jouer lance Minecraft avec le bon profil.",
        ],
      },
      {
        icon: "🔌",
        title: "Connexion simplifiée",
        bullets: [
          "Plus besoin de copier-coller l'IP.",
          "Le launcher gère l'authentification et la connexion au serveur.",
          "Expérience fluide, fiable et centrée sur l'onboarding.",
        ],
      },
    ],
    note: "Le globe 3D arrive plus tard : cette version se concentre sur la stabilité et les outils.",
    footer: "Un launcher solide devient la colonne vertébrale des futures fonctionnalités.",
  },
  {
    id: "phase4",
    icon: "🌐",
    title: "Globe 3D et hotpoints",
    objective: "Transformer le launcher en salle d'observation stratégique.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🌐",
        title: "Globe 3D interactif",
        bullets: [
          "Une Terre reconnaissable avec continents et océans.",
          "Rotation fluide, zoom et déplacement libre.",
          "C'est la porte d'entrée vers le monde Divizion.",
        ],
      },
      {
        icon: "🔴",
        title: "Hotpoints en direct",
        bullets: [
          "Vert = zones calmes.",
          "Jaune = activité moyenne.",
          "Rouge = guerres, sièges, forte densité.",
          "La heatmap reflète l'activité réelle du serveur.",
        ],
      },
      {
        icon: "🗺️",
        title: "Lecture globale",
        bullets: [
          "Voir où se concentrent les joueurs avant de se connecter.",
          "Repérer les régions qui s'embrasent ou se calment.",
          "Identifier les zones désertes pleines d'opportunités.",
        ],
      },
    ],
    footer: "Les joueurs obtiennent une vue stratégique avant même d'apparaître au sol.",
  },
  {
    id: "phase5",
    icon: "✨",
    title: "Choix du spawn via le globe",
    objective: "Rendre les spawns tactiques tout en restant cohérents géographiquement.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "✨",
        title: "Première connexion libre",
        bullets: [
          "Zoom progressif de l'orbite jusqu'au niveau Minecraft.",
          "Cliquez exactement sur la zone voulue.",
          "Le launcher vous fait apparaître à l'endroit choisi.",
        ],
      },
      {
        icon: "🔁",
        title: "Logique de proximité ensuite",
        bullets: [
          "Les connexions suivantes se font dans un rayon d'environ 100 km.",
          "Empêche les sauts absurdes entre continents.",
          "Garde une flexibilité tactique sans casser l'immersion.",
        ],
      },
      {
        icon: "🧱",
        title: "Spawn intelligent",
        bullets: [
          "Le système évite les placements mortels (lave, vide, grands fonds).",
          "Pose toujours le joueur sur une surface logique proche de son choix.",
        ],
      },
    ],
    footer: "Le choix du spawn devient une décision stratégique : alliés, ressources ou embuscades.",
  },
  {
    id: "phase6",
    icon: "🛰️",
    title: "Vue satellite et historique",
    objective: "Offrir une intelligence orbitale synchronisée avec le passage de l'ISS.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🛰️",
        title: "Images satellite Minecraft",
        bullets: [
          "En zoomant, on bascule de la Terre à une vue orthographique de Minecraft.",
          "Observer bases, villes et mégastructures directement dans le launcher.",
          "Première cartographie accessible du serveur vivant.",
        ],
      },
      {
        icon: "⏳",
        title: "Actualisation synchronisée ISS",
        bullets: [
          "Les images ne sont pas en temps réel.",
          "Chaque zone s'actualise quand l'ISS simulée passe au-dessus.",
          "Exemple : Paris ne se met à jour que lors du passage de l'ISS.",
        ],
      },
      {
        icon: "📚",
        title: "Historique des régions",
        bullets: [
          "Revoir l'état d'une zone à différents jours.",
          "Analyser guerres, sièges et destructions massives.",
          "Suivre l'évolution d'une colonie semaine après semaine.",
        ],
      },
      {
        icon: "🕵️",
        title: "Lecture stratégique",
        bullets: [
          "Étudier l'expansion passée des nations rivales.",
          "Repérer bases abandonnées ou zones de staging.",
          "Comprendre les fronts historiques avant d'engager des forces.",
        ],
      },
    ],
    footer: "Le monde gagne une mémoire : les joueurs deviennent archivistes de leur univers.",
  },
  {
    id: "phase7",
    icon: "⚠️",
    title: "Événements dynamiques",
    objective: "Faire réagir la planète au contexte plutôt qu'à l'aléatoire.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "⚔️",
        title: "Afflux de mutants et menaces",
        bullets: [
          "Des vagues surgissent autour des villes ou des zones militaires.",
          "Dangers spécifiques liés aux secteurs pollués.",
          "Les rencontres s'intensifient selon la tension locale.",
        ],
      },
      {
        icon: "🌩️",
        title: "Anomalies météo extrêmes",
        bullets: [
          "Orages violents, tempêtes de sable, phénomènes lumineux.",
          "Impactent visibilité, cultures et certaines structures.",
          "Météo synchronisée avec les données réelles de chaque région.",
        ],
      },
      {
        icon: "🥶",
        title: "Pénuries localisées",
        bullets: [
          "Certaines zones subissent des crashs temporaires de ressources.",
          "Faut-il tenir, migrer, commercer ou attaquer ?",
          "Forcent alliances et déplacements massifs.",
        ],
      },
      {
        icon: "📍",
        title: "Comportement par zone",
        bullets: [
          "Les mégalopoles abritent des crises violentes mais rémunératrices.",
          "La campagne propose des événements plus rares mais surprenants.",
          "Chaque biome développe sa signature.",
        ],
      },
    ],
    footer: "Chaque session est vivante sans sombrer dans le chaos.",
  },
  {
    id: "phase8",
    icon: "🏳️",
    title: "Nations et géopolitique",
    objective: "Introduire des structures sociales qui portent les grandes histoires.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🏰",
        title: "Création de nations",
        bullets: [
          "Créer son groupe avec nom et bannière.",
          "Inviter des membres et définir des rôles.",
          "L'identité communautaire prend du poids.",
        ],
      },
      {
        icon: "📌",
        title: "Capitales et territoires",
        bullets: [
          "Déclarer une base principale visible dans le launcher.",
          "Point de ralliement et marqueur de prestige.",
          "Prépare le futur système territorial.",
        ],
      },
      {
        icon: "👥",
        title: "Jeu social et politique",
        bullets: [
          "Alliances et blocs émergent naturellement.",
          "Conflits autour des ressources et des villes.",
          "La diplomatie devient aussi importante que le combat.",
        ],
      },
    ],
    footer: "Divizion passe du chaos à un bac à sable géopolitique organisé.",
  },
  {
    id: "phase9",
    icon: "🔓",
    title: "Alpha puis bêta",
    objective: "Stress-tester l'écosystème avant la sortie.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🔐",
        title: "Alpha fermée",
        bullets: [
          "Un noyau restreint de testeurs motivés.",
          "Objectif : casser le jeu, trouver failles et déséquilibres.",
          "Attendez-vous à des wipes, resets et changements brutaux.",
        ],
      },
      {
        icon: "🌍",
        title: "Bêta élargie",
        bullets: [
          "Ouverture à davantage de joueurs pour des tests publics.",
          "Le monde rassemble la plupart des systèmes phares.",
          "Encore très évolutif mais jouable sur la durée.",
        ],
      },
      {
        icon: "🔄",
        title: "Itération rapide",
        bullets: [
          "Équilibrages, features et correctifs fréquents.",
          "Retours de la communauté intégrés quasi immédiatement.",
          "Prépare la transition vers une 1.0 stable.",
        ],
      },
    ],
    note: "Les phases Alpha et Bêta s'appuient sur les retours de la communauté pour polir Divizion.",
  },
  {
    id: "phase10",
    icon: "🏁",
    title: "Divizion 1.0",
    objective: "Livrer la première version complète et durable.",
    status: "upcoming",
    cardsHeading: "Ce que voient les joueurs",
    cards: [
      {
        icon: "🌍",
        title: "Monde cohérent et persistant",
        bullets: [
          "Planète post-apo avec une rareté maîtrisée.",
          "Les nations existent et mènent des guerres organiques.",
          "Événements dynamiques rythment la vie du serveur.",
          "Version prête pour du jeu continu.",
        ],
      },
      {
        icon: "🛰️",
        title: "Globe + satellite comme salle de contrôle",
        bullets: [
          "Le launcher devient la war room du joueur.",
          "Suivi des hotpoints presque en temps réel.",
          "Analyse des passages satellites archivés.",
          "Choix précis des spawns selon la stratégie.",
        ],
      },
      {
        icon: "🧬",
        title: "Identité Divizion claire",
        bullets: [
          "Rien à voir avec une survie ou une faction classique.",
          "Ce n'est pas juste du PvP, ni juste du RP.",
          "Un simulateur géopolitique apocalyptique pensé pour Minecraft.",
          "Chaque décision laisse une trace visible sur la planète.",
        ],
      },
    ],
    footer: "La 1.0 concrétise la vision et ouvre une nouvelle ère pour Minecraft.",
  },
];

const PHASES: PhaseViewModel[] = PHASE_DEFINITIONS.map((phase, index) => ({
  ...phase,
  number: `Phase ${index + 1}`,
  statusLabel: STATUS_LABELS[phase.status],
  position: index + 1,
}));

const FUTURE_VISION_CONTENT = {
  title: "Et après Divizion 1.0 ?",
  description:
    "Divizion est pensé comme un projet vivant. Une fois la 1.0 stabilisée, voici les pistes que nous souhaitons explorer :",
  cards: [
    {
      icon: "🌱",
      title: "Systèmes avancés de dépollution",
      description: "Arbres technologiques pour purifier les sols et restaurer des écosystèmes.",
    },
    {
      icon: "⚙️",
      title: "Développement technologique",
      description: "Automatisation, énergie, filtration, défenses industrielles et nouvelles logistiques.",
    },
    {
      icon: "🕊️",
      title: "Diplomatie poussée",
      description: "Traités formels, alliances reconnues, mécaniques de casus belli.",
    },
    {
      icon: "📆",
      title: "Événements mondiaux temporaires",
      description: "Saisons, catastrophes globales et événements épiques qui touchent tout le serveur.",
    },
    {
      icon: "🧪",
      title: "Modes alternatifs",
      description: "Modes spécifiques sur certaines régions du globe et opérations narratives dirigées.",
    },
  ],
};

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<number>(0);

  return (
    <div className="relative bg-[#1a1a1a] min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-6">
            <Sparkles className="h-3 w-3" />
            <span>Feuille de Route</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#d0d0d0] mb-6 leading-tight">
            L'évolution de <span className="text-[#ff6b35]">Divizion</span>
          </h1>
          <p className="text-lg text-[#999] max-w-3xl mx-auto leading-relaxed">
            Des premières fondations à une version stable ambitieuse, Divizion progresse étape par étape.
            Découvrez comment nous bâtissons un univers post-apocalyptique planétaire révolutionnaire.
          </p>
          <div className="mx-auto mt-6 h-1 w-16 bg-[#ff6b35]" />
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded border border-[#ff6b35]/30 bg-[#2a2a2a] p-6 mb-16 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex gap-4">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="text-[#ff6b35] font-bold text-lg mb-2">Roadmap en développement</h3>
              <p className="text-[#999] text-sm leading-relaxed">
                Divizion est un projet ambitieux en cours de construction. Cette feuille de route présente notre vision et nos jalons.
                Les dates, les mécaniques et les priorités peuvent évoluer selon nos découvertes, les retours de la communauté et les défis techniques.
              </p>
              <p className="text-[#999] text-xs mt-3 opacity-80">💡 Cette roadmap est mise à jour régulièrement. Restez connectés pour les dernières nouvelles !</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          {PHASES.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6 mb-8"
            >
              {/* Timeline Line & Marker */}
              <div className="flex flex-col items-center min-w-[4rem] relative">
                {/* Marker */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded flex items-center justify-center font-bold text-lg relative z-10 ${phase.status === "in_progress"
                      ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/50"
                      : "bg-[#2a2a2a] border border-[#3a3a3a] text-[#d0d0d0]"
                    }`}
                >
                  {phase.status === "in_progress" ? <Check className="h-6 w-6" /> : phase.position}
                </motion.div>

                {/* Connecting Line */}
                {index < PHASES.length - 1 && (
                  <div className="flex-1 w-0.5 bg-gradient-to-b from-[#3a3a3a] to-transparent mt-2 min-h-[80px]" />
                )}
              </div>

              {/* Phase Card */}
              <div className="flex-1 pb-8">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded border border-[#3a3a3a] bg-[#2a2a2a] overflow-hidden transition-all hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10"
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === index ? -1 : index)}
                    className="w-full p-6 flex items-start justify-between hover:bg-[#2a2a2a]/50 transition-colors text-left"
                  >
                    <div className="flex gap-4 flex-1">
                      <span className="text-4xl">{phase.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-bold text-[#d0d0d0]">{phase.title}</h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${phase.status === "in_progress"
                                ? "bg-[#ff6b35]/20 text-[#ff6b35]"
                                : "bg-[#3a3a3a] text-[#999]"
                              }`}
                          >
                            {phase.statusLabel}
                          </span>
                        </div>
                        <p className="text-[#999] text-sm">{phase.objective}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#ff6b35] ml-4"
                    >
                      <ArrowRight className="h-5 w-5 rotate-90" />
                    </motion.div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedPhase === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#3a3a3a] bg-[#1a1a1a] p-6">
                          <h4 className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest mb-4">
                            {phase.cardsHeading}
                          </h4>

                          <div className="space-y-3 mb-4">
                            {phase.cards.map((card, cardIndex) => (
                              <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: cardIndex * 0.1 }}
                                className="bg-[#2a2a2a] p-4 rounded border border-[#3a3a3a]"
                              >
                                <p className="text-[#ff6b35] font-semibold mb-2 text-sm">
                                  {card.icon} {card.title}
                                </p>
                                <ul className="text-[#999] text-sm space-y-1">
                                  {card.bullets.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex} className="flex gap-2">
                                      <span className="text-[#ff6b35] flex-shrink-0">•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ))}
                          </div>

                          {phase.note && (
                            <div className="bg-[#2a2a2a] border border-[#ff6b35]/20 p-4 rounded mb-4">
                              <p className="text-[#999] text-sm">
                                <strong className="text-[#ff6b35]">Note:</strong> {phase.note}
                              </p>
                            </div>
                          )}

                          {phase.footer && (
                            <div className="pt-4 border-t border-[#3a3a3a]">
                              <p className="text-[#999] text-sm italic">{phase.footer}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 pt-16 border-t border-[#3a3a3a]"
        >
          <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">{FUTURE_VISION_CONTENT.title}</h2>
          <p className="text-[#999] mb-8 leading-relaxed">{FUTURE_VISION_CONTENT.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FUTURE_VISION_CONTENT.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-[#2a2a2a] border border-[#3a3a3a] p-6 rounded transition-colors hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10 ${index === FUTURE_VISION_CONTENT.cards.length - 1 ? "md:col-span-2" : ""
                  }`}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-[#ff6b35] font-bold mb-2">{card.title}</h3>
                <p className="text-[#999] text-sm">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-[#3a3a3a]"
        >
          <div className="rounded border border-[#ff6b35]/30 bg-[#2a2a2a] p-12 text-center overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">Envie de façonner l'avenir de Divizion ?</h2>
              <p className="text-[#999] max-w-2xl mx-auto mb-8 leading-relaxed">
                Rejoignez notre communauté Discord, participez aux discussions et suivez la roadmap en direct.
                Vos retours façonnent le projet.
              </p>
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
              >
                Rejoindre Discord
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-[#666] text-sm mt-6">Les testeurs sont toujours les bienvenus</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
