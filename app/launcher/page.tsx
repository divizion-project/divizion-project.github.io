import { DISCORD_LINK, LAUNCHER_VERSION, LAUNCHER_RELEASES_LINK } from "@/lib/constants";

const DOWNLOADS = [
  { os: "Windows", icon: "🪟" },
  { os: "macOS", icon: "🍎" },
  { os: "Linux", icon: "🐧" },
] as const;

export default function LauncherPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <header className="flex flex-col gap-2">
        <div className="flex items-baseline gap-4">
          <h1 className="text-4xl font-bold text-[#d0d0d0]">
            Launcher Divizion
          </h1>
          <span className="text-lg text-[#666] opacity-60">
            {LAUNCHER_VERSION}
          </span>
        </div>
        <div className="h-px w-24 bg-[#3a3a3a]" />
        <p className="text-sm uppercase tracking-[0.4em] text-[#666]">
          Obligatoire avant de rejoindre
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {DOWNLOADS.map((download) => (
          <DownloadCard
            key={download.os}
            icon={download.icon}
            os={download.os}
          />
        ))}
      </div>

      <section className="rounded border border-[#ff6b35]/40 bg-[#2a2a2a] p-8">
        <div className="flex gap-4">
          <span className="text-3xl" role="img" aria-label="warning">
            ⚠️
          </span>
          <div>
            <h3 className="text-lg font-semibold text-[#ff6b35]">
              Alerte système
            </h3>
            <p className="mt-3 text-sm text-[#999]">
              Installez le launcher pour accéder aux shaders, assets personnalisés
              et à la sécurité des comptes. Les versions Windows et macOS
              nécessitent les droits administrateur au premier lancement.
            </p>
            <p className="mt-2 text-xs text-[#666]">
              Les comptes Divizion unifiés arrivent bientôt. Les identifiants
              actuels restent valides jusqu'à la migration.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <a
          href={DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded border border-[#3a3a3a] px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#d0d0d0] transition-colors hover:border-[#ff6b35] hover:bg-[#2a2a2a]"
        >
          Support →
        </a>
        <a
          href={LAUNCHER_RELEASES_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded border border-[#3a3a3a] px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#d0d0d0] transition-colors hover:border-[#ff6b35] hover:bg-[#2a2a2a]"
        >
          Versions précédentes →
        </a>
      </div>
    </div>
  );
}

type DownloadCardProps = {
  os: string;
  icon: string;
};

function DownloadCard({ os, icon }: DownloadCardProps) {
  return (
    <button
      type="button"
      className="rounded border border-[#3a3a3a] bg-[#2a2a2a] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/20"
    >
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-[#d0d0d0]">{os}</h3>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#666]">
        Bientôt disponible
      </p>
    </button>
  );
}
