import type { Architecture, Platform } from "./releases";

export type DeviceInfo = {
  platform: Platform | null;
  architecture: Architecture | null;
  unsupported32: boolean;
  source: "client-hints" | "user-agent" | "unknown";
};

type ClientHints = {
  architecture?: string;
  bitness?: string;
  wow64?: boolean;
};

export type DeviceNavigator = {
  userAgent: string;
  platform?: string;
  maxTouchPoints?: number;
  userAgentData?: {
    platform?: string;
    mobile?: boolean;
    getHighEntropyValues?: (hints: string[]) => Promise<ClientHints>;
  };
};

export function devicePlatform(nav: DeviceNavigator): Platform | null {
  const ua = nav.userAgent;
  if (
    nav.userAgentData?.mobile ||
    /android|iphone|ipad|ipod|cros/i.test(ua) ||
    (nav.platform === "MacIntel" && (nav.maxTouchPoints || 0) > 1)
  )
    return null;
  const platform = nav.userAgentData?.platform || nav.platform || "";
  if (/mac/i.test(platform) || /macintosh|mac os x/i.test(ua)) return "macos";
  if (/win/i.test(platform) || /windows/i.test(ua)) return "windows";
  if (/linux/i.test(platform) || /linux/i.test(ua)) return "linux";
  return null;
}

export function architectureFromHints(hints: ClientHints): {
  architecture: Architecture | null;
  unsupported32: boolean;
} {
  const cpu = (hints.architecture || "").toLowerCase();
  if (hints.wow64) return { architecture: "x64", unsupported32: false };
  if (hints.bitness === "32")
    return { architecture: null, unsupported32: true };
  if (
    /^(arm64|aarch64)$/.test(cpu) ||
    (cpu === "arm" && hints.bitness === "64")
  )
    return { architecture: "arm64", unsupported32: false };
  if (
    /^(x64|x86_64|amd64)$/.test(cpu) ||
    (cpu === "x86" && hints.bitness === "64")
  )
    return { architecture: "x64", unsupported32: false };
  return { architecture: null, unsupported32: false };
}

export async function detectDevice(
  nav: DeviceNavigator,
  timeoutMs = 2200,
): Promise<DeviceInfo> {
  const platform = devicePlatform(nav);
  const unknown: DeviceInfo = {
    platform,
    architecture: null,
    unsupported32: false,
    source: "unknown",
  };
  if (!platform) return unknown;
  const data = nav.userAgentData;
  if (data?.getHighEntropyValues) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const hints = await Promise.race([
        data.getHighEntropyValues(["architecture", "bitness", "wow64"]),
        new Promise<null>((resolve) => {
          timer = setTimeout(() => resolve(null), timeoutMs);
        }),
      ]);
      if (hints) {
        const result = architectureFromHints(hints);
        if (result.architecture || result.unsupported32)
          return { ...unknown, ...result, source: "client-hints" };
      }
    } catch {
      // Some browsers deny these hints; the wizard provides a manual choice.
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
  // macOS and reduced Chromium user agents can report Intel/x64 on ARM devices.
  // Only explicit desktop CPU values from unreduced user agents are used here.
  if (
    platform === "macos" ||
    data ||
    /chrome|chromium|crios|edg|opr\//i.test(nav.userAgent)
  )
    return unknown;
  if (/aarch64|arm64/i.test(nav.userAgent))
    return { ...unknown, architecture: "arm64", source: "user-agent" };
  if (/x86_64|amd64|win64|wow64/i.test(nav.userAgent))
    return { ...unknown, architecture: "x64", source: "user-agent" };
  if (platform === "linux" && /\bi[3-6]86\b/i.test(nav.userAgent))
    return { ...unknown, unsupported32: true, source: "user-agent" };
  return unknown;
}
