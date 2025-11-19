"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DISCORD_LINK } from "@/lib/constants";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type PhaseStatus = "in_progress" | "upcoming";

const STATUS_LABELS_KEYS: Record<PhaseStatus, string> = {
  in_progress: "in_progress",
  upcoming: "upcoming",
};

const PHASE_ICONS: Record<string, string> = {
  phase1: "🌍",
  phase2: "🌾",
  phase3: "🚀",
  phase4: "🌐",
  phase5: "✨",
  phase6: "🛰️",
  phase7: "⚠️",
  phase8: "🏳️",
  phase9: "🔓",
  phase10: "🏁",
};

const PHASE_CARD_ICONS: Record<string, string[]> = {
  phase1: ["🌍", "🎮", "🌫️"],
  phase2: ["🥫", "⚖️", "🧭"],
  phase3: ["🖥️", "🔌"],
  phase4: ["🌐", "🔴", "🗺️"],
  phase5: ["✨", "🔁", "🧱"],
  phase6: ["🛰️", "⏳", "📚", "🕵️"],
  phase7: ["⚔️", "🌩️", "🥶", "📍"],
  phase8: ["🏰", "📌", "👥"],
  phase9: ["🔐", "🌍", "🔄"],
  phase10: ["🌍", "🛰️", "🧬"],
};

const FUTURE_ICONS: Record<string, string> = {
  depollution: "🌱",
  tech: "⚙️",
  diplomacy: "🕊️",
  events: "📆",
  modes: "🧪",
};

export default function RoadmapPage() {
  const { t } = useLanguage();
  const [expandedPhase, setExpandedPhase] = useState<number>(0);

  const phases = [
    "phase1",
    "phase2",
    "phase3",
    "phase4",
    "phase5",
    "phase6",
    "phase7",
    "phase8",
    "phase9",
    "phase10",
  ].map((phaseId, index) => {
    const status = (index === 0 ? "in_progress" : "upcoming") as PhaseStatus;
    const cardsData = t(`roadmap.phases.${phaseId}.cards`) as Record<
      string,
      { title: string; bullets: string[] }
    >;
    const cards = Object.keys(cardsData)
      .sort()
      .map((key, i) => ({
        icon: PHASE_CARD_ICONS[phaseId][i] || "🔹",
        title: cardsData[key].title,
        bullets: cardsData[key].bullets,
      }));

    return {
      id: phaseId,
      icon: PHASE_ICONS[phaseId],
      title: t(`roadmap.phases.${phaseId}.title`),
      objective: t(`roadmap.phases.${phaseId}.objective`),
      status,
      statusLabel: t(`roadmap.status.${STATUS_LABELS_KEYS[status]}`),
      cardsHeading: t("roadmap.cards_heading"),
      cards,
      note: t(`roadmap.phases.${phaseId}.note`, ""), // Handle optional note
      footer: t(`roadmap.phases.${phaseId}.footer`, ""), // Handle optional footer
      position: index + 1,
    };
  });

  const futureCardsData = t("roadmap.future.cards") as Record<
    string,
    { title: string; description: string }
  >;
  const futureCards = Object.keys(futureCardsData).map((key) => ({
    icon: FUTURE_ICONS[key] || "🔹",
    title: futureCardsData[key].title,
    description: futureCardsData[key].description,
  }));

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
            <span>{t("roadmap.header.badge")}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#d0d0d0] mb-6 leading-tight">
            {t("roadmap.header.title")}{" "}
            <span className="text-[#ff6b35]">Divizion</span>
          </h1>
          <p className="text-lg text-[#999] max-w-3xl mx-auto leading-relaxed">
            {t("roadmap.header.description")}
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
              <h3 className="text-[#ff6b35] font-bold text-lg mb-2">
                {t("roadmap.info.title")}
              </h3>
              <p className="text-[#999] text-sm leading-relaxed">
                {t("roadmap.info.description")}
              </p>
              <p className="text-[#999] text-xs mt-3 opacity-80">
                {t("roadmap.info.note")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          {phases.map((phase, index) => (
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
                  className={`w-16 h-16 rounded flex items-center justify-center font-bold text-lg relative z-10 ${
                    phase.status === "in_progress"
                      ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/50"
                      : "bg-[#2a2a2a] border border-[#3a3a3a] text-[#d0d0d0]"
                  }`}
                >
                  {phase.status === "in_progress" ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    phase.position
                  )}
                </motion.div>

                {/* Connecting Line */}
                {index < phases.length - 1 && (
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
                    onClick={() =>
                      setExpandedPhase(expandedPhase === index ? -1 : index)
                    }
                    className="w-full p-6 flex items-start justify-between hover:bg-[#2a2a2a]/50 transition-colors text-left"
                  >
                    <div className="flex gap-4 flex-1">
                      <span className="text-4xl">{phase.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-bold text-[#d0d0d0]">
                            {phase.title}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${
                              phase.status === "in_progress"
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
                                    <li
                                      key={bulletIndex}
                                      className="flex gap-2"
                                    >
                                      <span className="text-[#ff6b35] flex-shrink-0">
                                        •
                                      </span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ))}
                          </div>

                          {phase.note && phase.note !== phase.id && (
                            <div className="bg-[#2a2a2a] border border-[#ff6b35]/20 p-4 rounded mb-4">
                              <p className="text-[#999] text-sm">
                                <strong className="text-[#ff6b35]">
                                  Note:
                                </strong>{" "}
                                {phase.note}
                              </p>
                            </div>
                          )}

                          {phase.footer && phase.footer !== phase.id && (
                            <div className="pt-4 border-t border-[#3a3a3a]">
                              <p className="text-[#999] text-sm italic">
                                {phase.footer}
                              </p>
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
          <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">
            {t("roadmap.future.title")}
          </h2>
          <p className="text-[#999] mb-8 leading-relaxed">
            {t("roadmap.future.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-[#2a2a2a] border border-[#3a3a3a] p-6 rounded transition-colors hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10 ${
                  index === futureCards.length - 1 ? "md:col-span-2" : ""
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
              <h2 className="text-3xl font-bold text-[#d0d0d0] mb-4">
                {t("roadmap.cta.title")}
              </h2>
              <p className="text-[#999] max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("roadmap.cta.description")}
              </p>
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#ff6b35] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e74c3c]"
              >
                {t("common.join_discord")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-[#666] text-sm mt-6">
                {t("roadmap.cta.testers")}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

