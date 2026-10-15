import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { docSlug, type Doc } from "@/lib/docs";
import docs from "@/public/data/docs.json";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/download/", "/wiki/", "/releases/", "/legal/", "/privacy/"].map(
      (path) => ({
        url: `${SITE_URL}${path}`,
        changeFrequency: (path === "/releases/" ? "weekly" : "monthly") as
          "weekly" | "monthly",
        priority: path === "/" ? 1 : 0.7,
      }),
    ),
    ...(docs as Doc[]).map((d) => ({
      url: `${SITE_URL}/wiki/${docSlug(d)}/`,
      lastModified: d.meta.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
