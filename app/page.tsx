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
            <span>{t("home.hero.badge")}</span>
          </div>

          <h1 className="text-6xl font-black leading-tight text-[#d0d0d0] md:text-7xl lg:text-8xl">
            {t("home.hero.title_prefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#e74c3c]">Divizion</span>
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#999]">
            {t("home.hero.description")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link
              href="/launcher"
              className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
            >
              {t("common.start_adventure")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#d0d0d0] transition-colors hover:border-[#ff6b35]"
            >
              {t("common.join_discord")}
            </a>
          </div>
        </div>
      </section>

      {/* What is Divizion? */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />

        <div className="relative text-center mb-12">
          <h2 className="text-4xl font-bold text-[#d0d0d0] mb-4">{t("home.about.title")}</h2>
          <div className="mx-auto h-1 w-20 bg-[#ff6b35]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">{t("home.about.cards.world.title")}</h3>
            <p className="leading-relaxed text-[#999]">
              {t("home.about.cards.world.description")}
            </p>
          </div>

          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">{t("home.about.cards.survival.title")}</h3>
            <p className="leading-relaxed text-[#999]">
              {t("home.about.cards.survival.description")}
            </p>
          </div>

          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">{t("home.about.cards.factions.title")}</h3>
            <p className="leading-relaxed text-[#999]">
              {t("home.about.cards.factions.description")}
            </p>
          </div>

          <div className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 transition-colors hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-[#ff6b35]/20 text-[#ff6b35]">
              <Map className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#d0d0d0]">{t("home.about.cards.dynamic.title")}</h3>
            <p className="leading-relaxed text-[#999]">
              {t("home.about.cards.dynamic.description")}
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
            <h2 className="text-4xl font-bold text-[#d0d0d0] mb-4">{t("home.features.title")}</h2>
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
                  <h3 className="text-2xl font-bold text-[#d0d0d0] mb-3">{t("home.features.globe.title")}</h3>
                  <p className="text-[#999] leading-relaxed">
                    {t("home.features.globe.description")}
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
                  <h3 className="text-2xl font-bold text-[#d0d0d0] mb-3">{t("home.features.rarity.title")}</h3>
                  <p className="text-[#999] leading-relaxed">
                    {t("home.features.rarity.description")}
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
                  <h3 className="text-2xl font-bold text-[#d0d0d0] mb-3">{t("home.features.events.title")}</h3>
                  <p className="text-[#999] leading-relaxed">
                    {t("home.features.events.description")}
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
            <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">{t("home.cta.title")}</h2>
            <p className="text-lg text-[#999] mb-8 max-w-2xl mx-auto">
              {t("home.cta.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
              >
                {t("common.discord")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded border border-[#3a3a3a] bg-[#2a2a2a] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#d0d0d0] transition-colors hover:border-[#ff6b35]"
              >
                {t("common.view_roadmap")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
