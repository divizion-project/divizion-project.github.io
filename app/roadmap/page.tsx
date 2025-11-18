"use client";

import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import { DISCORD_LINK } from "@/lib/constants";

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

const CTA_CONTENT = {
  title: "Envie de façonner l'avenir de Divizion ?",
  description:
    "Rejoignez notre communauté Discord, participez aux discussions et suivez la roadmap en direct. Vos retours façonnent le projet.",
  buttonLabel: "Rejoindre Discord",
  subtitle: "Les testeurs sont toujours les bienvenus",
};

const ROADMAP_INFO = {
  title: "Roadmap en développement",
  description:
    "Divizion est un projet ambitieux en cours de construction. Cette feuille de route présente notre vision et nos jalons. Les dates, les mécaniques et les priorités peuvent évoluer selon nos découvertes, les retours de la communauté et les défis techniques. Cette transparence fait partie de notre ADN.",
  disclaimer: "Cette roadmap est mise à jour régulièrement. Restez connectés pour les dernières nouvelles !",
};

const INTRO_SECTION = {
  title: "L'évolution de Divizion",
  description:
    "Des premières fondations à une version stable ambitieuse, Divizion progresse étape par étape. Découvrez comment nous bâtissons un univers post-apocalyptique planétaire révolutionnaire.",
};

export default function RoadmapPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <RoadmapInfo {...ROADMAP_INFO} />

      <IntroSection {...INTRO_SECTION} />
      <PhasesAccordion phases={PHASES} />

      <FutureVision {...FUTURE_VISION_CONTENT} />

      <JoinCTA {...CTA_CONTENT} />
    </div>
  );
}

type RoadmapInfoProps = {
  title: string;
  description: string;
  disclaimer: string;
};

function RoadmapInfo({ title, description, disclaimer }: RoadmapInfoProps) {
  return (
    <div className="bg-[#2a2a2a] border border-[#ff6b35] border-opacity-40 p-6 rounded mb-12">
      <div className="flex gap-4">
        <span className="text-3xl">📋</span>
        <div>
          <h3 className="text-[#ff6b35] font-bold text-lg mb-2">{title}</h3>
          <p className="text-[#999] text-sm leading-relaxed">{description}</p>
          <p className="text-[#999] text-xs mt-3 opacity-80">💡 {disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

type IntroSectionProps = {
  title: string;
  description: string;
};

function IntroSection({ title, description }: IntroSectionProps) {
  return (
    <section className="mb-16 text-center">
      <h1 className="text-5xl md:text-6xl font-black text-[#d0d0d0] mb-6 leading-tight">{title}</h1>
      <p className="text-lg text-[#999] max-w-3xl mx-auto leading-relaxed mb-8">{description}</p>
      <div className="w-16 h-1 bg-[#ff6b35] mx-auto" />
    </section>
  );
}

type PhasesAccordionProps = {
  phases: PhaseViewModel[];
};

function PhasesAccordion({ phases }: PhasesAccordionProps) {
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <div className="space-y-10 mb-16">
      {phases.map((phase, index) => (
        <PhaseAccordion
          key={phase.id}
          phase={phase}
          isOpen={openPhase === index}
          onToggle={() => setOpenPhase(openPhase === index ? -1 : index)}
          isLast={index === phases.length - 1}
        />
      ))}
    </div>
  );
}

type PhaseAccordionProps = {
  phase: PhaseViewModel;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
};

function PhaseAccordion({ phase, isOpen, onToggle, isLast }: PhaseAccordionProps) {
  const statusClass =
    phase.status === "in_progress"
      ? "text-[#00d4ff] bg-[#00d4ff] bg-opacity-10"
      : "text-[#ff6b35] bg-[#ff6b35] bg-opacity-10";

  const markerClass =
    phase.status === "in_progress"
      ? "bg-[#00d4ff] text-[#0a1618] ring-2 ring-[#00d4ff]/50"
      : "bg-[#3a3a3a] text-white";

  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    if (isOpen) {
      const updateHeight = () => setContentHeight(element.scrollHeight);
      updateHeight();

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(() => {
          if (!contentRef.current) {
            return;
          }
          setContentHeight(contentRef.current.scrollHeight);
        });
        observer.observe(element);
        observerRef.current = observer;
        return () => {
          observer.disconnect();
          observerRef.current = null;
        };
      }
      return;
    }

    observerRef.current?.disconnect();
    observerRef.current = null;

    const currentHeight = element.scrollHeight;
    setContentHeight(currentHeight);
    const frame = requestAnimationFrame(() => setContentHeight(0));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center min-w-[3rem]">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${markerClass}`}>
          {phase.position}
        </div>
        {!isLast && <div className="flex-1 w-px bg-[#3a3a3a] mt-2" />}
      </div>
      <div className="flex-1">
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded overflow-hidden hover:border-[#ff6b35] hover:border-opacity-50 transition-all">
          <button
            onClick={onToggle}
            className="w-full px-8 py-6 flex items-start justify-between hover:bg-[#3a3a3a] transition-colors"
          >
            <div className="flex gap-4 text-left flex-grow">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">{phase.icon}</span>
                <span className="text-xs font-bold text-[#666] uppercase">{phase.number}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-bold text-[#d0d0d0]">{phase.title}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${statusClass}`}
                  >
                    {phase.statusLabel}
                  </span>
                </div>
                <p className="text-[#999] text-sm">{phase.objective}</p>
              </div>
            </div>
            <span
              className={`text-[#ff6b35] text-2xl transition-transform duration-300 flex-shrink-0 ml-4 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div className="overflow-hidden transition-[height] duration-500 ease-in-out" style={{ height: `${contentHeight}px` }}>
            <div
              ref={contentRef}
              className={clsx(
                "border-t border-[#3a3a3a] bg-[#1a1a1a] px-8 py-8",
                "transition-opacity duration-400 ease-in-out",
                isOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <PhaseContent heading={phase.cardsHeading} cards={phase.cards} note={phase.note} footer={phase.footer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type PhaseContentProps = {
  heading: string;
  cards: PhaseCard[];
  note?: string;
  footer?: string;
};

function PhaseContent({ heading, cards, note, footer }: PhaseContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-[#ff6b35] font-bold text-lg mb-3">{heading}</h4>
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.title} className="bg-[#2a2a2a] p-4 rounded border border-[#3a3a3a]">
              <p className="text-[#ff6b35] font-semibold mb-2">
                {card.icon} {card.title}
              </p>
              <ul className="text-[#999] text-sm space-y-1">
                {card.bullets.map((bullet, bulletIndex) => (
                  <li key={`${card.title}-${bulletIndex}`}>• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {note && (
        <div className="bg-[#2a2a2a] border border-[#ff6b35] border-opacity-20 p-4 rounded">
          <p className="text-[#999] text-sm">
            <strong className="text-[#ff6b35]">Note:</strong> {note}
          </p>
        </div>
      )}
      {footer && (
        <div className="pt-4 border-t border-[#3a3a3a]">
          <p className="text-[#999] text-sm italic">{footer}</p>
        </div>
      )}
    </div>
  );
}

type FutureVisionProps = {
  title: string;
  description: string;
  cards: { icon: string; title: string; description: string }[];
};

function FutureVision({ title, description, cards }: FutureVisionProps) {
  return (
    <section className="mb-16 pt-16 border-t border-[#3a3a3a]">
      <h2 className="text-3xl font-bold text-[#d0d0d0] mb-8">{title}</h2>
      <p className="text-[#999] mb-8 leading-relaxed">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`bg-[#2a2a2a] border border-[#3a3a3a] p-6 rounded hover:border-[#ff6b35] transition-all ${
              index === cards.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="text-[#ff6b35] font-bold mb-2">{card.title}</h3>
            <p className="text-[#999] text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type JoinCTAProps = {
  title: string;
  description: string;
  buttonLabel: string;
  subtitle: string;
};

function JoinCTA({ title, description, buttonLabel, subtitle }: JoinCTAProps) {
  return (
    <section className="mt-16 pt-12 border-t border-[#3a3a3a]">
      <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border border-[#ff6b35] border-opacity-50 p-12 rounded text-center">
        <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">{title}</h2>
        <p className="text-[#999] max-w-2xl mx-auto mb-8 leading-relaxed">{description}</p>
        <a
          href={DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-[#ff6b35] text-white px-8 py-3 rounded font-bold hover:bg-[#e74c3c] transition-colors"
        >
          {buttonLabel} →
        </a>
        <p className="text-[#666] text-sm mt-6">{subtitle}</p>
      </div>
    </section>
  );
}
