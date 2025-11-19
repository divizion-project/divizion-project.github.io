"use client";

import Link from "next/link";
import { DISCORD_LINK } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Sparkles, Globe, Users, Zap, ArrowRight, Map, Swords, Calendar } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden py-32">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(/assets/hero-minecraft.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.1),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#1a1a1a]" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
            <Sparkles className="h-3 w-3" />
            <span>Serveur Survie Post-Apocalyptique</span>
          </div>

          <h1 className="text-6xl font-black leading-tight text-[#d0d0d0] md:text-7xl lg:text-8xl">
            Bienvenue sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#e74c3c]">Divizion</span>
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#999]">
            Un monde Minecraft post-apocalyptique où chaque ressource compte, chaque décision a du poids,
            et où votre survie dépend autant de votre stratégie que de vos alliances.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link
              href="/launcher"
              className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
            >
              Commencer l'aventure
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#d0d0d0] transition-colors hover:border-[#ff6b35]"
            >
              Rejoindre Discord
            </a>
          </div>
        </div>
      </section>

      {/* What is Divizion? */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />

        <div className="relative text-center mb-12">
          <h2 className="text-4xl font-bold text-[#d0d0d0] mb-4">Qu'est-ce que Divizion ?</h2>
          <div className="mx-auto h-1 w-20 bg-[#ff6b35]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">Une Terre Post-Apocalyptique</h3>
            <p className="leading-relaxed text-[#999]">
              Explorez un monde fidèle à la Terre réelle, parsemé de mégalopoles ravagées,
              de campagnes dévastées et de ruines dangereuses. Chaque région raconte une histoire,
              chaque bâtiment cache des secrets... et des dangers.
            </p>
          </div>

          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">Survie Hardcore & Stratégique</h3>
            <p className="leading-relaxed text-[#999]">
              Les ressources sont rares et contrôlées par un système dynamique. Il n'y a jamais assez
              pour tout le monde. Vous devrez piller, commercer, négocier ou conquérir pour survivre.
              La difficulté est réelle, les choix le sont encore plus.
            </p>
          </div>

          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">Joueurs & Factions</h3>
            <p className="leading-relaxed text-[#999]">
              Formez des alliances, créez des factions, bâtissez des empires ou vivez en solitaire.
              Le système de spawn tactique vous permet de choisir où apparaître sur le globe 3D.
              Chaque zone a ses avantages et ses risques.
            </p>
          </div>

          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Map className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">Monde Dynamique & Vivant</h3>
            <p className="leading-relaxed text-[#999]">
              Les vivres réapparaissent toutes les 24h dans des lieux crédibles. Les villes offrent
              plus de loot mais grouillent de mutants mortels. La campagne est plus calme mais se
              recharge lentement. Chaque région impose une stratégie différente.
            </p>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-[#ff6b35]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-[#ff6b35]/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#d0d0d0] mb-4">Ce qui rend Divizion unique</h2>
            <div className="mx-auto h-1 w-20 bg-[#ff6b35]" />
          </div>

          <div className="space-y-6">
            <div className="group rounded border border-[#3a3a3a] bg-[#2a2a2a]/50 backdrop-blur-sm p-8 transition-colors hover:border-[#ff6b35] hover:bg-[#2a2a2a]">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
                    <Globe className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#d0d0d0] mb-3">Globe 3D interactif dans le launcher</h3>
                  <p className="text-[#999] leading-relaxed">
                    Avant même de vous connecter, visualisez le monde entier en 3D. Voyez les zones chaudes (guerres, sièges),
                    les régions calmes, et les opportunités. Un système de hotpoints en direct vous montre où se joue l'action.
                    Choisissez votre spawn stratégiquement : près d'une ville dangereuse mais riche, ou dans une campagne isolée ?
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded border border-[#3a3a3a] bg-[#2a2a2a]/50 backdrop-blur-sm p-8 transition-colors hover:border-[#ff6b35] hover:bg-[#2a2a2a]">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
                    <Swords className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#d0d0d0] mb-3">Rareté organisée & tension permanente</h3>
                  <p className="text-[#999] leading-relaxed">
                    Un système de spawn de vivres dynamique garantit qu'il y a toujours un peu moins de nourriture que nécessaire.
                    Les ressources apparaissent dans des lieux crédibles (frigos, dépôts, boutiques) toutes les 24h. Cette rareté
                    force la coopération, le commerce... ou la guerre. Chaque choix compte.
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded border border-[#3a3a3a] bg-[#2a2a2a]/50 backdrop-blur-sm p-8 transition-colors hover:border-[#ff6b35] hover:bg-[#2a2a2a]">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
                    <Calendar className="h-7 w-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#d0d0d0] mb-3">Saisons & événements globaux</h3>
                  <p className="text-[#999] leading-relaxed">
                    Des météorites s'écrasent, apportant des minerais rares mais attirant tous les joueurs. Des épidémies ravagent
                    des régions entières. Des caravanes de ravitaillement traversent le monde. Chaque saison transforme le monde,
                    redistribue les cartes et crée des opportunités uniques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative mx-auto max-w-4xl px-6 py-20 pb-32">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none" />

        <div className="relative rounded border border-[#ff6b35]/30 bg-[#2a2a2a] p-12 text-center overflow-hidden">
          {/* Subtle background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Sparkles className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">Prêt à survivre ?</h2>
            <p className="text-lg text-[#999] mb-8 max-w-2xl mx-auto">
              Divizion est en développement actif. La Phase 1 (Fondations de l'univers) est en cours.
              Rejoignez notre Discord pour suivre les avancées, participer aux tests et façonner l'avenir du serveur.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
              >
                Discord
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#d0d0d0] transition-colors hover:border-[#ff6b35]"
              >
                Voir la Roadmap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
