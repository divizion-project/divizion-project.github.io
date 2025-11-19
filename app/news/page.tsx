"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#3a3a3a] border-t-[#ff6b35]" />
      </div>
      <h2 className="text-3xl font-bold text-[#d0d0d0]">
        {t("news.soon.title")}
      </h2>
      <p className="mt-4 max-w-2xl text-[#999]">
        {t("news.soon.description")}
      </p>
    </div>
  );
}
