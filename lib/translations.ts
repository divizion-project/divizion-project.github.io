export type Language =
    | "fr"
    | "en"
    | "es"
    | "de"
    | "ru"
    | "pt"
    | "zh"
    | "it"
    | "pl"
    | "ja"
    | "ko"
    | "nl"
    | "tr";

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LOADERS: Record<Language, () => Promise<Record<string, any>>> = {
    fr: () => import("./locales/fr").then((m) => m.FR),
    en: () => import("./locales/en").then((m) => m.EN),
    es: () => import("./locales/es").then((m) => m.ES),
    de: () => import("./locales/de").then((m) => m.DE),
    ru: () => import("./locales/ru").then((m) => m.RU),
    pt: () => import("./locales/pt").then((m) => m.PT),
    zh: () => import("./locales/zh").then((m) => m.ZH),
    it: () => import("./locales/it").then((m) => m.IT),
    pl: () => import("./locales/pl").then((m) => m.PL),
    ja: () => import("./locales/ja").then((m) => m.JA),
    ko: () => import("./locales/ko").then((m) => m.KO),
    nl: () => import("./locales/nl").then((m) => m.NL),
    tr: () => import("./locales/tr").then((m) => m.TR),
};
