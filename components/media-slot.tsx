"use client";

import { asset } from "@/lib/config";
import { useLanguage } from "./provider";
import { AnimatePresence, motion } from "motion/react";

// Replace these paths with supplied artwork. Layout and transitions stay in place.
export const MEDIA: Record<string, { src?: string; video?: string }> = {
  overview: {},
  mods: {},
  servers: {},
  java: {},
  instances: {},
  accounts: {},
  search: {},
  development: {},
  timeline: {},
};
export function MediaSlot({
  id,
  label,
  dark = false,
  large = false,
}: {
  id: string;
  label: string;
  dark?: boolean;
  large?: boolean;
}) {
  const { t } = useLanguage();
  const media = MEDIA[id] || {};
  return (
    <div
      className={`media-slot ${dark ? "media-dark" : ""} ${large ? "media-large" : ""}`}
    >
      <div className="media-grid" aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          className="media-inner"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          {media.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={media.src ? asset(media.src) : undefined}
              src={asset(media.video)}
              aria-label={label}
            />
          ) : media.src ? (
            <img src={asset(media.src)} alt={label} />
          ) : (
            <div className="media-reserved">
              <span className="slot-mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{label}</span>
              <small>{t("Aperçu à venir", "Preview coming soon")}</small>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <span className="media-index" aria-hidden="true">
        DIVIZION / {id.toUpperCase()}
      </span>
    </div>
  );
}
