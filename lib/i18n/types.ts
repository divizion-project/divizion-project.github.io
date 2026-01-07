/**
 * Supported locales
 */
export type Locale = 'fr' | 'en';

/**
 * Language metadata
 */
export interface LocaleInfo {
    code: Locale;
    name: string;
    nativeName: string;
    flag: string;
}

/**
 * Available locales with their metadata
 */
export const LOCALES: LocaleInfo[] = [
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
];

/**
 * Default locale
 */
export const DEFAULT_LOCALE: Locale = 'fr';

/**
 * Fallback locale (used when translation is missing)
 */
export const FALLBACK_LOCALE: Locale = 'fr';

/**
 * Translation structure types
 */
export interface Translations {
    common: {
        discord: string;
        download: string;
        close: string;
        soon: string;
        join_discord: string;
        support_discord: string;
        view_roadmap: string;
        start_adventure: string;
        download_for: string;
        downloading: string;
        select_arch: string;
        intel_amd: string;
        apple_silicon: string;
        good_game: string;
        download_auto: string;
        previous_versions: string;
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
    };
    navbar: {
        home: string;
        news: string;
        launcher: string;
        roadmap: string;
        soon: string;
    };
    home: {
        hero: {
            badge: string;
            title_prefix: string;
            description: string;
        };
        about: {
            title: string;
            cards: {
                world: { title: string; description: string };
                survival: { title: string; description: string };
                factions: { title: string; description: string };
                dynamic: { title: string; description: string };
            };
        };
        features: {
            title: string;
            globe: { title: string; description: string };
            rarity: { title: string; description: string };
            events: { title: string; description: string };
        };
        cta: {
            title: string;
            description: string;
        };
    };
    launcher: {
        hero: {
            badge: string;
            title_prefix: string;
            title_suffix: string;
            description: string;
            video_label: string;
        };
        download: {
            title: string;
            subtitle: string;
        };
        features: {
            title: string;
            subtitle: string;
            preview: string;
            login: { title: string; description: string };
            transitions: { title: string; description: string };
            visuals: { title: string; description: string };
            settings: { title: string; description: string };
        };
        smart_features: {
            badge: string;
            title: string;
            magiclamp: { title: string; description: string };
            autodebug: { title: string; description: string };
        };
        eview: {
            badge: string;
            title: string;
            description: string;
            loading: string;
        };
        upcoming: {
            title: string;
            description: string;
        };
        ltsc: {
            title: string;
            description: string;
            download_windows: string;
            coming_soon: string;
        };
    };
    news: {
        soon: {
            title: string;
            description: string;
        };
    };
    roadmap: {
        header: {
            badge: string;
            title: string;
            description: string;
        };
        info: {
            title: string;
            description: string;
            note: string;
        };
        status: {
            in_progress: string;
            upcoming: string;
        };
        cards_heading: string;
        phases: Record<string, {
            title: string;
            objective: string;
            footer?: string;
            note?: string;
            cards: Record<string, {
                title: string;
                bullets: string[];
            }>;
        }>;
        future: {
            title: string;
            description: string;
            cards: {
                depollution: { title: string; description: string };
                tech: { title: string; description: string };
                diplomacy: { title: string; description: string };
                events: { title: string; description: string };
                modes: { title: string; description: string };
            };
        };
        cta: {
            title: string;
            description: string;
            testers: string;
        };
    };
    footer: {
        copyright: string;
        version: string;
        support: string;
    };
    language_switcher: {
        title: string;
        current: string;
        switch_to: string;
    };
}
