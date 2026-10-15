import { DOCS_REPO, type Language } from "./config";
export interface Segment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: string;
  color?: string;
}
export interface DocButton {
  type?: string;
  label: string;
  action: string;
  variant?: string;
  icon?: string;
}
export interface DocBlock {
  type: string;
  level?: number;
  text?: string;
  content?: Segment[] | string;
  url?: string;
  alt?: string;
  caption?: string;
  width?: string | number;
  title?: string;
  description?: string;
  variant?: string;
  language?: string;
  showCopyButton?: boolean;
  alignment?: string;
  buttons?: DocButton[];
  steps?: { step_number: number; title: string; description: string }[];
}
export interface Doc {
  meta: {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    coverImage?: string;
    author?: string;
    lastUpdated?: string;
    tags?: string[];
    language?: Language;
    lang?: Language;
  };
  blocks: DocBlock[];
  _path: string;
}
export const docSlug = (d: Doc) =>
  d._path
    .replace(/^docs\//, "")
    .replace(/\.json$/, "")
    .replaceAll("/", "--");
export function docLanguage(d: Doc): Language {
  return (
    d.meta.language ||
    d.meta.lang ||
    (/connexion|problemes|fr\b|français|[àâéèêçù]/i.test(
      d._path + " " + d.meta.title,
    )
      ? "fr"
      : "en")
  );
}
export function validDoc(value: unknown): value is Doc {
  const v = value as Doc;
  return (
    !!v &&
    typeof v.meta?.title === "string" &&
    typeof v.meta?.id === "string" &&
    Array.isArray(v.blocks)
  );
}
export async function fetchDocs(signal?: AbortSignal): Promise<Doc[]> {
  const response = await fetch(
    `https://api.github.com/repos/${DOCS_REPO}/git/trees/main?recursive=1`,
    { signal, headers: { Accept: "application/vnd.github+json" } },
  );
  if (!response.ok) throw new Error("Documentation unavailable");
  const tree = await response.json();
  if (!Array.isArray(tree.tree) || tree.truncated)
    throw new Error("Incomplete documentation tree");
  const paths = (tree.tree as { path: string; type: string }[])
    .filter((x) => x.type === "blob" && /^docs\/.*\.json$/i.test(x.path))
    .map((x) => x.path);
  const docs: Doc[] = [];
  for (let i = 0; i < paths.length; i += 12) {
    const batch = await Promise.allSettled(
      paths.slice(i, i + 12).map(async (path) => {
        const res = await fetch(
          `https://raw.githubusercontent.com/${DOCS_REPO}/main/${path.split("/").map(encodeURIComponent).join("/")}`,
          { signal },
        );
        if (!res.ok) throw new Error("Missing document");
        const data = await res.json();
        if (!validDoc(data)) throw new Error("Invalid document");
        return { ...data, _path: path };
      }),
    );
    for (const r of batch) if (r.status === "fulfilled") docs.push(r.value);
  }
  if (paths.length && !docs.length) throw new Error("No valid documentation");
  return docs;
}
