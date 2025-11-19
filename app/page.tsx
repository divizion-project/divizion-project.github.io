"use client";

import Link from "next/link";
import { DISCORD_LINK } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";

type InternalPath = "/" | "/news" | "/launcher" | "/roadmap";

type CardDefinition = {
  key: "play" | "discord" | "support";
  icon: string;
  title: string;
  description: string;
  internalHref?: InternalPath;
  externalHref?: string;
  buttonLabel?: string;
  disabled?: boolean;
};

export default function HomePage() {
  const { t } = useLanguage();

  const CARDS: CardDefinition[] = [
    {
      key: "play",
      icon: "🚀",
      title: t("home.cards.play.title"),
      description: t("home.cards.play.description"),
      internalHref: "/launcher",
      buttonLabel: t("home.cards.play.button"),
    },
    {
      key: "discord",
      icon: "💬",
      title: t("home.cards.discord.title"),
      description: t("home.cards.discord.description"),
      externalHref: DISCORD_LINK,
      buttonLabel: t("home.cards.discord.button"),
    },
    {
      key: "support",
      icon: "📋",
      title: t("home.cards.roadmap.title"),
      description: t("home.cards.roadmap.description"),
      internalHref: "/roadmap",
      buttonLabel: t("home.cards.roadmap.button"),
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <section className="relative isolate overflow-hidden bg-[#1a1a1a] py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/assets/hero-minecraft.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/90 to-[#1a1a1a]" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#ff6b35]">
            {t("home.soon_badge")}
          </p>
          <h1 className="text-5xl font-black leading-tight text-[#d0d0d0] md:text-6xl">
            {t("home.title")}
          </h1>
          <p className="max-w-2xl text-lg text-[#999]">
            {t("home.description")}
          </p>
          <div className="h-1 w-16 bg-[#ff6b35]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ key, ...card }) => (
            <ActionCard key={key} {...card} />
          ))}
        </div>
      </section>
    </div>
  );
}

type ActionCardProps = Omit<CardDefinition, "key">;

function ActionCard({
  icon,
  title,
  description,
  internalHref,
  externalHref,
  buttonLabel,
  disabled,
}: ActionCardProps) {
  return (
    <div className="flex h-full flex-col rounded border border-[#3a3a3a] bg-[#2a2a2a] p-6 transition-all duration-300 hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-[#d0d0d0]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#999]">
        {description}
      </p>
      {buttonLabel && !disabled ? (
        externalHref ? (
          <a
            href={externalHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded bg-[#ff6b35] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#e74c3c]"
          >
            {buttonLabel} →
          </a>
        ) : internalHref ? (
          <Link
            href={internalHref}
            className="mt-6 inline-flex items-center gap-2 rounded bg-[#ff6b35] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#e74c3c]"
          >
            {buttonLabel} →
          </Link>
        ) : null
      ) : (
        <p className="mt-6 text-xs uppercase tracking-[0.4em] text-[#555]">
          {disabled ? "Bientôt" : ""}
        </p>
      )}
    </div>
  );
}
