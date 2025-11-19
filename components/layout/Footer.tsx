"use client";

import packageJson from "@/package.json";
import { DISCORD_LINK } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#3a3a3a] bg-[#1a1a1a] px-6 py-4 text-xs text-[#999]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.3em] text-[#666]">
          <span>{t("footer.copyright")}</span>
          <span className="opacity-60">
            {t("footer.version").replace("{version}", packageJson.version)}
          </span>
        </div>

        <a
          className="rounded border border-[#ff6b35] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-[#ff6b35] hover:text-[#1a1a1a]"
          href={DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
        >
          {t("footer.support")}
        </a>
      </div>
    </footer>
  );
}
