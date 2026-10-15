export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${BASE_PATH}${path}`;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://divizion.fr";
export const RELEASE_REPO = "divizion-project/Divizion-Launcher";
export const LEGACY_REPO = "divizion-project/Divizion-Launcher-Legacy";
export const DOCS_REPO = "divizion-project/divizion-docu";
export type Language = "fr" | "en";
