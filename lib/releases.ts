import type { Language } from "./config";
import { RELEASE_REPO } from "./config";
export type Platform = "windows" | "macos" | "linux";
export type Channel = "stable" | "beta" | "legacy";
export type Architecture = "arm64" | "x64";
export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}
export interface Release {
  id: number;
  name: string;
  tag_name: string;
  body: string;
  prerelease: boolean;
  draft: boolean;
  published_at: string;
  html_url: string;
  assets: ReleaseAsset[];
}
export const isInstaller = (name: string) =>
  /\.(exe|msi|dmg|AppImage|deb|rpm|zip|tar\.gz)$/i.test(name) &&
  !/blockmap|symbols|debug/i.test(name);
export function latestRelease(releases: Release[], channel: Channel) {
  if (channel === "legacy") return undefined;
  return [...releases]
    .filter((r) => !r.draft && r.prerelease === (channel === "beta"))
    .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))[0];
}
export function assetsFor(
  release: Release | undefined,
  platform: Platform,
  architecture: Architecture,
) {
  const extension =
    platform === "windows"
      ? /\.(exe|msi)$/i
      : platform === "macos"
        ? /\.dmg$/i
        : /\.(AppImage|deb|rpm|tar\.gz)$/i;
  return (release?.assets || [])
    .filter((a) => extension.test(a.name))
    .filter((a) => {
      const arm = /arm64|aarch64/i.test(a.name);
      const intel = /x64|x86_64|amd64/i.test(a.name);
      // Unlabelled Linux builds are x64; never silently offer them for ARM.
      if (architecture === "arm64") return arm;
      return !arm || intel;
    })
    .sort(
      (a, b) =>
        Number(/AppImage|\.exe$|\.dmg$/i.test(b.name)) -
        Number(/AppImage|\.exe$|\.dmg$/i.test(a.name)),
    );
}
export function totalDownloads(releases: Release[]) {
  return releases.reduce(
    (sum, r) =>
      sum +
      r.assets
        .filter((a) => isInstaller(a.name))
        .reduce((n, a) => n + a.download_count, 0),
    0,
  );
}
export function formatBytes(bytes: number, lang: Language) {
  return `${new Intl.NumberFormat(lang, { maximumFractionDigits: 0 }).format(bytes / 1024 / 1024)} ${lang === "fr" ? "Mo" : "MB"}`;
}
export async function fetchReleases(signal?: AbortSignal): Promise<Release[]> {
  const releases: Release[] = [];
  for (let page = 1; page <= 20; page++) {
    const response = await fetch(
      `https://api.github.com/repos/${RELEASE_REPO}/releases?per_page=100&page=${page}`,
      { signal, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid release catalog");
    releases.push(...data);
    if (data.length < 100) return releases;
  }
  throw new Error("Release catalog pagination limit");
}
