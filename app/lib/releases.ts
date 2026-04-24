import releasesData from '../../releases.json';

export interface Changelog {
  summary: string;
  fixed?: string[];
  improved?: string[];
  changed?: string[];
  added?: string[];
  security?: string[];
}

export interface DownloadFile {
  filename: string;
  url: string;
  size: string;
  sha256?: string;
}

export interface PlatformDownloads {
  exe?: DownloadFile;
  x64?: DownloadFile;
  arm64?: DownloadFile;
}

export interface ReleaseDownloads {
  windows: PlatformDownloads;
  mac: PlatformDownloads;
  linux: PlatformDownloads;
}

export interface Release {
  version: string;
  tag: string;
  releaseDate: string;
  releaseDateFormatted: {
    fr: string;
    en: string;
  };
  changelog: Changelog;
  downloads: ReleaseDownloads;
  githubReleaseUrl: string;
}

export interface ReleasesData {
  repository: string;
  releasesUrl: string;
  latest: Release;
  history: Release[];
}

export const releases: ReleasesData = releasesData;

export const latest = releases.latest;

export const allReleases: Release[] = [releases.latest, ...releases.history];

export function getReleasePlatforms(release: Release) {
  const platforms = [];

  if (release.downloads.windows.x64) {
    platforms.push({
      name: 'Windows',
      arch: 'x64',
      size: release.downloads.windows.x64.size,
      url: release.downloads.windows.x64.url,
    });
  }

  if (release.downloads.mac.arm64) {
    platforms.push({
      name: 'macOS',
      arch: 'ARM64 (Apple Silicon)',
      size: release.downloads.mac.arm64.size,
      url: release.downloads.mac.arm64.url,
    });
  }

  if (release.downloads.mac.x64) {
    platforms.push({
      name: 'macOS',
      arch: 'Intel x64',
      size: release.downloads.mac.x64.size,
      url: release.downloads.mac.x64.url,
    });
  }

  if (release.downloads.linux.arm64) {
    platforms.push({
      name: 'Linux',
      arch: 'ARM64',
      size: release.downloads.linux.arm64.size,
      url: release.downloads.linux.arm64.url,
    });
  }

  return platforms;
}
