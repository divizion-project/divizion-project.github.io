import { latest } from './releases';

export interface VersionInfo {
  version: string;
  releaseDate: string;
  releaseDateFormatted: {
    fr: string;
    en: string;
  };
  downloads: {
    windows: {
      exe: {
        filename: string;
        size: string;
        sha256: string;
      };
      x64: {
        filename: string;
        size: string;
        sha256: string;
      };
      arm64: {
        filename: string;
        size: string;
        sha256: string;
      };
    };
    mac: {
      x64: {
        filename: string;
        size: string;
        sha256: string;
      };
      arm64: {
        filename: string;
        size: string;
        sha256: string;
      };
    };
    linux: {
      arm64: {
        filename: string;
        size: string;
        sha256: string;
      };
    };
  };
  githubReleaseUrl: string;
}

export const version: VersionInfo = {
  version: latest.version,
  releaseDate: latest.releaseDate,
  releaseDateFormatted: latest.releaseDateFormatted,
  downloads: {
    windows: {
      exe: {
        filename: latest.downloads.windows.exe!.filename,
        size: latest.downloads.windows.exe!.size,
        sha256: latest.downloads.windows.exe!.sha256!,
      },
      x64: {
        filename: latest.downloads.windows.x64!.filename,
        size: latest.downloads.windows.x64!.size,
        sha256: latest.downloads.windows.x64!.sha256!,
      },
      arm64: {
        filename: latest.downloads.windows.arm64!.filename,
        size: latest.downloads.windows.arm64!.size,
        sha256: latest.downloads.windows.arm64!.sha256!,
      },
    },
    mac: {
      x64: {
        filename: latest.downloads.mac.x64!.filename,
        size: latest.downloads.mac.x64!.size,
        sha256: latest.downloads.mac.x64!.sha256!,
      },
      arm64: {
        filename: latest.downloads.mac.arm64!.filename,
        size: latest.downloads.mac.arm64!.size,
        sha256: latest.downloads.mac.arm64!.sha256!,
      },
    },
    linux: {
      arm64: {
        filename: latest.downloads.linux.arm64!.filename,
        size: latest.downloads.linux.arm64!.size,
        sha256: latest.downloads.linux.arm64!.sha256!,
      },
    },
  },
  githubReleaseUrl: latest.githubReleaseUrl,
};

export const BASE_URL = `https://github.com/divizion-project/Divizion-Launcher/releases/download/${version.version}`;

export const downloadsData: Record<string, Record<string, { url: string; size: string; sha: string }>> = {
  windows: {
    exe: {
      url: latest.downloads.windows.exe!.url,
      size: latest.downloads.windows.exe!.size,
      sha: latest.downloads.windows.exe!.sha256!,
    },
    x64: {
      url: latest.downloads.windows.x64!.url,
      size: latest.downloads.windows.x64!.size,
      sha: latest.downloads.windows.x64!.sha256!,
    },
    arm64: {
      url: latest.downloads.windows.arm64!.url,
      size: latest.downloads.windows.arm64!.size,
      sha: latest.downloads.windows.arm64!.sha256!,
    }
  },
  mac: {
    x64: {
      url: latest.downloads.mac.x64!.url,
      size: latest.downloads.mac.x64!.size,
      sha: latest.downloads.mac.x64!.sha256!,
    },
    arm64: {
      url: latest.downloads.mac.arm64!.url,
      size: latest.downloads.mac.arm64!.size,
      sha: latest.downloads.mac.arm64!.sha256!,
    }
  },
  linux: {
    arm64: {
      url: latest.downloads.linux.arm64!.url,
      size: latest.downloads.linux.arm64!.size,
      sha: latest.downloads.linux.arm64!.sha256!,
    }
  }
};
