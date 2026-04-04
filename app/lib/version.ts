import versionData from '../../version.json';

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

export const version: VersionInfo = versionData;

export const BASE_URL = `https://github.com/divizion-project/Divizion-Launcher/releases/download/${version.version}`;

export const downloadsData: Record<string, Record<string, { url: string; size: string; sha: string }>> = {
  windows: {
    exe: {
      url: `${BASE_URL}/${version.downloads.windows.exe.filename}`,
      size: version.downloads.windows.exe.size,
      sha: version.downloads.windows.exe.sha256
    },
    x64: {
      url: `${BASE_URL}/${version.downloads.windows.x64.filename}`,
      size: version.downloads.windows.x64.size,
      sha: version.downloads.windows.x64.sha256
    },
    arm64: {
      url: `${BASE_URL}/${version.downloads.windows.arm64.filename}`,
      size: version.downloads.windows.arm64.size,
      sha: version.downloads.windows.arm64.sha256
    }
  },
  mac: {
    x64: {
      url: `${BASE_URL}/${version.downloads.mac.x64.filename}`,
      size: version.downloads.mac.x64.size,
      sha: version.downloads.mac.x64.sha256
    },
    arm64: {
      url: `${BASE_URL}/${version.downloads.mac.arm64.filename}`,
      size: version.downloads.mac.arm64.size,
      sha: version.downloads.mac.arm64.sha256
    }
  },
  linux: {
    arm64: {
      url: `${BASE_URL}/${version.downloads.linux.arm64.filename}`,
      size: version.downloads.linux.arm64.size,
      sha: version.downloads.linux.arm64.sha256
    }
  }
};
