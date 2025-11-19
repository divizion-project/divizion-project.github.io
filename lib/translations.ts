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

export const TRANSLATIONS = {
    fr: {
        navbar: {
            home: "Accueil",
            news: "Actualités",
            launcher: "Launcher",
            roadmap: "Roadmap",
            soon: "Bientôt...",
        },
        home: {
            soon_badge: "En Développement",
            title: "Bienvenue sur Divizion",
            description:
                "Divizion est un serveur Minecraft géopolitique unique. Construisez, collaborez et évoluez dans un monde persistant à l'échelle mondiale.",
            cards: {
                play: {
                    title: "Rejoindre le serveur",
                    description:
                        "Téléchargez le launcher, synchronisez votre profil et plongez dans l'aventure Divizion.",
                    button: "Télécharger",
                },
                discord: {
                    title: "Discord Communautaire",
                    description:
                        "Rejoignez notre communauté pour suivre les actualités, participer aux événements et obtenir de l'aide.",
                    button: "Rejoindre le Discord",
                },
                roadmap: {
                    title: "Feuille de route",
                    description:
                        "Explorez notre roadmap pour suivre l'avancement du projet et découvrir les futures mises à jour.",
                    button: "Voir la roadmap",
                },
            },
        },
    },
    en: {
        navbar: {
            home: "Home",
            news: "News",
            launcher: "Launcher",
            roadmap: "Roadmap",
            soon: "Coming soon...",
        },
        home: {
            soon_badge: "Coming Soon",
            title: "Welcome to Divizion",
            description:
                "Divizion is a geopolitical Minecraft server on a world map. Build, collaborate, and play in a persistent world.",
            cards: {
                play: {
                    title: "Play on the Server",
                    description:
                        "Download the Divizion launcher, sync your profile, and join Divizion.",
                    button: "Download",
                },
                discord: {
                    title: "Community Discord",
                    description:
                        "Join the official Discord for updates and community support.",
                    button: "Join Discord",
                },
                roadmap: {
                    title: "Divizion Roadmap",
                    description:
                        "Discover the roadmap to follow each development phase and what's coming next.",
                    button: "View Roadmap",
                },
            },
        },
    },
    es: {
        navbar: {
            home: "Inicio",
            news: "Noticias",
            launcher: "Launcher",
            roadmap: "Hoja de ruta",
            soon: "Próximamente...",
        },
        home: {
            soon_badge: "Próximamente",
            title: "Bienvenido a Divizion",
            description:
                "Divizion es un servidor geopolítico de Minecraft en un mapa mundial. Construye, colabora y juega en un mundo persistente.",
            cards: {
                play: {
                    title: "Jugar en el servidor",
                    description:
                        "Descarga el launcher de Divizion, sincroniza tu perfil y únete a Divizion.",
                    button: "Descargar",
                },
                discord: {
                    title: "Discord de la comunidad",
                    description:
                        "Únete al Discord oficial para actualizaciones y ayuda mutua.",
                    button: "Unirse a Discord",
                },
                roadmap: {
                    title: "Hoja de ruta de Divizion",
                    description:
                        "Descubre la hoja de ruta para seguir cada fase de desarrollo y lo que viene después.",
                    button: "Ver hoja de ruta",
                },
            },
        },
    },
    de: {
        navbar: {
            home: "Startseite",
            news: "Neuigkeiten",
            launcher: "Launcher",
            roadmap: "Roadmap",
            soon: "Demnächst...",
        },
        home: {
            soon_badge: "Demnächst",
            title: "Willkommen bei Divizion",
            description:
                "Divizion ist ein geopolitischer Minecraft-Server auf einer Weltkarte. Baue, arbeite zusammen und spiele in einer persistenten Welt.",
            cards: {
                play: {
                    title: "Auf dem Server spielen",
                    description:
                        "Lade den Divizion-Launcher herunter, synchronisiere dein Profil und tritt Divizion bei.",
                    button: "Herunterladen",
                },
                discord: {
                    title: "Community-Discord",
                    description:
                        "Tritt dem offiziellen Discord bei für Updates und gegenseitige Hilfe.",
                    button: "Discord beitreten",
                },
                roadmap: {
                    title: "Divizion Roadmap",
                    description:
                        "Entdecke die Roadmap, um jede Entwicklungsphase und was als nächstes kommt zu verfolgen.",
                    button: "Roadmap ansehen",
                },
            },
        },
    },
    ru: {
        navbar: {
            home: "Главная",
            news: "Новости",
            launcher: "Лаунчер",
            roadmap: "Дорожная карта",
            soon: "Скоро...",
        },
        home: {
            soon_badge: "Скоро",
            title: "Добро пожаловать в Divizion",
            description:
                "Divizion - это геополитический сервер Minecraft на карте мира. Стройте, сотрудничайте и играйте в постоянном мире.",
            cards: {
                play: {
                    title: "Играть на сервере",
                    description:
                        "Скачайте лаунчер Divizion, синхронизируйте профиль и присоединяйтесь к Divizion.",
                    button: "Скачать",
                },
                discord: {
                    title: "Discord сообщества",
                    description:
                        "Присоединяйтесь к официальному Discord для обновлений и помощи.",
                    button: "Присоединиться к Discord",
                },
                roadmap: {
                    title: "Дорожная карта Divizion",
                    description:
                        "Ознакомьтесь с дорожной картой, чтобы следить за каждым этапом разработки.",
                    button: "Смотреть карту",
                },
            },
        },
    },
    pt: {
        navbar: {
            home: "Início",
            news: "Notícias",
            launcher: "Launcher",
            roadmap: "Roteiro",
            soon: "Em breve...",
        },
        home: {
            soon_badge: "Em breve",
            title: "Bem-vindo ao Divizion",
            description:
                "Divizion é um servidor geopolítico de Minecraft em um mapa mundial. Construa, colabore e jogue em um mundo persistente.",
            cards: {
                play: {
                    title: "Jogar no servidor",
                    description:
                        "Baixe o launcher Divizion, sincronize seu perfil e junte-se ao Divizion.",
                    button: "Baixar",
                },
                discord: {
                    title: "Discord da comunidade",
                    description:
                        "Junte-se ao Discord oficial para atualizações e ajuda mútua.",
                    button: "Entrar no Discord",
                },
                roadmap: {
                    title: "Roteiro Divizion",
                    description:
                        "Descubra o roteiro para acompanhar cada fase de desenvolvimento e o que vem a seguir.",
                    button: "Ver roteiro",
                },
            },
        },
    },
    zh: {
        navbar: {
            home: "首页",
            news: "新闻",
            launcher: "启动器",
            roadmap: "路线图",
            soon: "即将推出...",
        },
        home: {
            soon_badge: "即将推出",
            title: "欢迎来到 Divizion",
            description:
                "Divizion 是一个基于世界地图的地缘政治 Minecraft 服务器。在一个持久的世界中建造、合作和游玩。",
            cards: {
                play: {
                    title: "加入服务器",
                    description: "下载 Divizion 启动器，同步您的个人资料并加入 Divizion。",
                    button: "下载",
                },
                discord: {
                    title: "社区 Discord",
                    description: "加入官方 Discord 获取更新和互助。",
                    button: "加入 Discord",
                },
                roadmap: {
                    title: "Divizion 路线图",
                    description: "查看路线图以关注每个开发阶段以及接下来的内容。",
                    button: "查看路线图",
                },
            },
        },
    },
    it: {
        navbar: {
            home: "Home",
            news: "Notizie",
            launcher: "Launcher",
            roadmap: "Roadmap",
            soon: "Presto...",
        },
        home: {
            soon_badge: "Presto",
            title: "Benvenuto su Divizion",
            description:
                "Divizion è un server Minecraft geopolitico su una mappa del mondo. Costruisci, collabora e gioca in un mondo persistente.",
            cards: {
                play: {
                    title: "Gioca sul server",
                    description:
                        "Scarica il launcher Divizion, sincronizza il tuo profilo e unisciti a Divizion.",
                    button: "Scarica",
                },
                discord: {
                    title: "Discord della community",
                    description:
                        "Unisciti al Discord ufficiale per aggiornamenti e supporto.",
                    button: "Unisciti a Discord",
                },
                roadmap: {
                    title: "Roadmap Divizion",
                    description:
                        "Scopri la roadmap per seguire ogni fase di sviluppo e cosa succederà dopo.",
                    button: "Vedi roadmap",
                },
            },
        },
    },
    pl: {
        navbar: {
            home: "Strona główna",
            news: "Aktualności",
            launcher: "Launcher",
            roadmap: "Mapa drogowa",
            soon: "Wkrótce...",
        },
        home: {
            soon_badge: "Wkrótce",
            title: "Witamy w Divizion",
            description:
                "Divizion to geopolityczny serwer Minecraft na mapie świata. Buduj, współpracuj i graj w trwałym świecie.",
            cards: {
                play: {
                    title: "Graj na serwerze",
                    description:
                        "Pobierz launcher Divizion, zsynchronizuj swój profil i dołącz do Divizion.",
                    button: "Pobierz",
                },
                discord: {
                    title: "Discord społeczności",
                    description:
                        "Dołącz do oficjalnego Discorda, aby otrzymywać aktualizacje i pomoc.",
                    button: "Dołącz do Discorda",
                },
                roadmap: {
                    title: "Mapa drogowa Divizion",
                    description:
                        "Odkryj mapę drogową, aby śledzić każdą fazę rozwoju i to, co nastąpi później.",
                    button: "Zobacz mapę drogową",
                },
            },
        },
    },
    ja: {
        navbar: {
            home: "ホーム",
            news: "ニュース",
            launcher: "ランチャー",
            roadmap: "ロードマップ",
            soon: "近日公開...",
        },
        home: {
            soon_badge: "近日公開",
            title: "Divizionへようこそ",
            description:
                "Divizionは世界地図上の地政学Minecraftサーバーです。永続的な世界で建築し、協力し、遊びましょう。",
            cards: {
                play: {
                    title: "サーバーで遊ぶ",
                    description:
                        "Divizionランチャーをダウンロードし、プロフィールを同期してDivizionに参加しましょう。",
                    button: "ダウンロード",
                },
                discord: {
                    title: "コミュニティDiscord",
                    description:
                        "アップデートや相互支援のために公式Discordに参加しましょう。",
                    button: "Discordに参加",
                },
                roadmap: {
                    title: "Divizionロードマップ",
                    description:
                        "ロードマップを見て、各開発フェーズと今後の予定を確認しましょう。",
                    button: "ロードマップを見る",
                },
            },
        },
    },
    ko: {
        navbar: {
            home: "홈",
            news: "뉴스",
            launcher: "런처",
            roadmap: "로드맵",
            soon: "곧 출시...",
        },
        home: {
            soon_badge: "곧 출시",
            title: "Divizion에 오신 것을 환영합니다",
            description:
                "Divizion은 세계 지도를 배경으로 한 지정학적 마인크래프트 서버입니다. 지속적인 세계에서 건설하고 협력하며 플레이하세요.",
            cards: {
                play: {
                    title: "서버에서 플레이",
                    description:
                        "Divizion 런처를 다운로드하고 프로필을 동기화하여 Divizion에 참여하세요.",
                    button: "다운로드",
                },
                discord: {
                    title: "커뮤니티 디스코드",
                    description:
                        "업데이트와 상호 지원을 위해 공식 디스코드에 참여하세요.",
                    button: "디스코드 참여",
                },
                roadmap: {
                    title: "Divizion 로드맵",
                    description:
                        "로드맵을 확인하여 각 개발 단계와 향후 계획을 따라가보세요.",
                    button: "로드맵 보기",
                },
            },
        },
    },
    nl: {
        navbar: {
            home: "Home",
            news: "Nieuws",
            launcher: "Launcher",
            roadmap: "Roadmap",
            soon: "Binnenkort...",
        },
        home: {
            soon_badge: "Binnenkort",
            title: "Welkom bij Divizion",
            description:
                "Divizion is een geopolitieke Minecraft-server op een wereldkaart. Bouw, werk samen en speel in een persistente wereld.",
            cards: {
                play: {
                    title: "Speel op de server",
                    description:
                        "Download de Divizion-launcher, synchroniseer je profiel en sluit je aan bij Divizion.",
                    button: "Downloaden",
                },
                discord: {
                    title: "Community Discord",
                    description:
                        "Word lid van de officiële Discord voor updates en wederzijdse hulp.",
                    button: "Word lid van Discord",
                },
                roadmap: {
                    title: "Divizion Roadmap",
                    description:
                        "Ontdek de roadmap om elke ontwikkelingsfase en wat er daarna komt te volgen.",
                    button: "Bekijk roadmap",
                },
            },
        },
    },
    tr: {
        navbar: {
            home: "Ana Sayfa",
            news: "Haberler",
            launcher: "Başlatıcı",
            roadmap: "Yol Haritası",
            soon: "Yakında...",
        },
        home: {
            soon_badge: "Yakında",
            title: "Divizion'a Hoş Geldiniz",
            description:
                "Divizion, dünya haritası üzerinde jeopolitik bir Minecraft sunucusudur. Kalıcı bir dünyada inşa edin, işbirliği yapın ve oynayın.",
            cards: {
                play: {
                    title: "Sunucuda Oyna",
                    description:
                        "Divizion başlatıcısını indirin, profilinizi senkronize edin ve Divizion'a katılın.",
                    button: "İndir",
                },
                discord: {
                    title: "Topluluk Discordu",
                    description:
                        "Güncellemeler ve yardımlaşma için resmi Discord'a katılın.",
                    button: "Discord'a Katıl",
                },
                roadmap: {
                    title: "Divizion Yol Haritası",
                    description:
                        "Her geliştirme aşamasını ve sonrasını takip etmek için yol haritasını keşfedin.",
                    button: "Yol Haritasını Gör",
                },
            },
        },
    },
} as const;
