"use client";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Check,
  Copy,
  Download,
  Search,
  Code2,
  ExternalLink,
} from "lucide-react";
import cached from "@/public/data/docs.json";
import { DOCS_REPO } from "@/lib/config";
import {
  docSlug,
  docLanguage,
  fetchDocs,
  type Doc,
  type DocBlock,
  type Segment,
} from "@/lib/docs";
import { safeUrl } from "./markdown";
import { useLanguage } from "./provider";

export const initialDocs = cached as Doc[];
function useDocs() {
  const [docs, setDocs] = useState(initialDocs);
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    fetchDocs(controller.signal)
      .then(setDocs)
      .catch(() => setOffline(true))
      .finally(() => clearTimeout(timeout));
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);
  return { docs, offline };
}
function Segments({ content }: { content?: Segment[] | string }) {
  if (typeof content === "string") return <>{content}</>;
  return (
    <>
      {(content || []).map((s, i) => {
        if (!s || typeof s.text !== "string") return null;
        let element: React.ReactNode = s.text;
        if (s.bold) element = <strong>{element}</strong>;
        if (s.italic) element = <em>{element}</em>;
        if (s.underline) element = <u>{element}</u>;
        if (s.link)
          element = (
            <a href={safeUrl(s.link)} rel="noopener noreferrer">
              {element}
            </a>
          );
        return (
          <span
            key={i}
            style={
              s.color && /^#[\da-f]{3,8}$/i.test(s.color)
                ? { color: s.color }
                : undefined
            }
          >
            {element}
          </span>
        );
      })}
    </>
  );
}
function CodeBlock({ block }: { block: DocBlock }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const code = typeof block.content === "string" ? block.content : "";
  return (
    <div className="doc-code">
      <div>
        <span>{block.language || "text"}</span>
        {block.showCopyButton !== false && (
          <button
            aria-label={t("Copier le code", "Copy code")}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              } catch {
                setFailed(true);
              }
            }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
            {copied ? t("Copié", "Copied") : t("Copier", "Copy")}
          </button>
        )}
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      {failed && (
        <small>
          {t(
            "Sélectionnez le texte pour le copier.",
            "Select the text to copy it.",
          )}
        </small>
      )}
    </div>
  );
}
function DocImage({ block }: { block: DocBlock }) {
  const [error, setError] = useState(false);
  const url = block.url?.startsWith("/")
    ? `https://divizion.fr${block.url}`
    : block.url;
  if (!url || !/^https?:\/\//.test(url) || error) return null;
  return (
    <figure
      style={{
        maxWidth:
          block.width === "centered"
            ? "650px"
            : typeof block.width === "number"
              ? `${block.width}px`
              : undefined,
      }}
    >
      <img
        loading="lazy"
        src={url}
        alt={block.alt || ""}
        onError={() => setError(true)}
      />
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}
export function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="doc-blocks">
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          const Tag = (b.level && b.level > 2 ? "h3" : "h2") as "h2" | "h3";
          return (
            <Tag id={`heading-${i}`} key={i}>
              {b.text}
            </Tag>
          );
        }
        if (b.type === "paragraph")
          return (
            <p key={i}>
              <Segments content={b.content} />
            </p>
          );
        if (b.type === "image") return <DocImage key={i} block={b} />;
        if (b.type === "alert")
          return (
            <aside
              key={i}
              className={`doc-alert ${["warning", "error", "success"].includes(b.variant || "") ? b.variant : "info"}`}
            >
              <strong>{b.title}</strong>
              <p>
                <Segments content={b.content} />
              </p>
            </aside>
          );
        if (b.type === "code") return <CodeBlock key={i} block={b} />;
        if (b.type === "step_list")
          return (
            <section key={i} className="doc-steps">
              {b.title && <h3>{b.title}</h3>}
              {b.description && <p>{b.description}</p>}
              <ol>
                {(b.steps || []).map((s, j) => (
                  <li key={j}>
                    <span>{s.step_number || j + 1}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          );
        if (b.type === "button_group")
          return (
            <div
              className="doc-buttons"
              key={i}
              style={{
                justifyContent:
                  b.alignment === "center"
                    ? "center"
                    : b.alignment === "right"
                      ? "flex-end"
                      : "flex-start",
              }}
            >
              {(b.buttons || []).map((button, j) => {
                const Icon =
                  button.icon === "download"
                    ? Download
                    : button.icon === "github"
                      ? Code2
                      : ExternalLink;
                const internal = /^\/(?!\/)/.test(button.action);
                const contents = (
                  <>
                    {button.type !== "text" && <Icon size={16} />}
                    <span>{button.label}</span>
                  </>
                );
                const props = {
                  className: `button button-small ${button.variant === "primary" ? "button-black" : "button-outline"}`,
                  "aria-label": button.label,
                };
                return internal ? (
                  <Link key={j} href={safeUrl(button.action)} {...props}>
                    {contents}
                  </Link>
                ) : (
                  <a
                    key={j}
                    href={safeUrl(button.action)}
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {contents}
                  </a>
                );
              })}
            </div>
          );
        return null;
      })}
    </div>
  );
}
function ArticleQuery({ onChange }: { onChange: (value: string) => void }) {
  const params = useSearchParams();
  const slug = params.get("article") || "";
  useEffect(() => {
    onChange(slug);
  }, [slug, onChange]);
  return null;
}
export function WikiIndex() {
  const { t, lang } = useLanguage();
  const { docs, offline } = useDocs();
  const [query, setQuery] = useState("");
  const [articleSlug, setArticleSlug] = useState("");

  const staticSlugs = new Set(initialDocs.map(docSlug));
  const filtered = useMemo(
    () =>
      docs.filter(
        (d) =>
          docLanguage(d) === lang &&
          [d.meta.title, d.meta.description, ...(d.meta.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [docs, lang, query],
  );
  const article = docs.find((d) => docSlug(d) === articleSlug);
  if (article)
    return (
      <>
        <Suspense fallback={null}>
          <ArticleQuery onChange={setArticleSlug} />
        </Suspense>
        <WikiArticle initial={article} />
      </>
    );
  return (
    <>
      <Suspense fallback={null}>
        <ArticleQuery onChange={setArticleSlug} />
      </Suspense>
      <section className="section wiki-index">
        <div className="container">
          <h1>
            {t("Documentation", "Documentation")}
            <br />
            {t("et dépannage.", "and troubleshooting.")}
          </h1>
          <p className="prose">
            {t(
              "Installation, connexion et dépannage du launcher.",
              "Launcher installation, connection and troubleshooting.",
            )}
          </p>
          <label className="wiki-search">
            <Search size={20} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                "Rechercher dans la documentation…",
                "Search documentation…",
              )}
              aria-label={t(
                "Rechercher dans la documentation",
                "Search documentation",
              )}
            />
            <kbd>/</kbd>
          </label>
          <div className="wiki-results-meta" aria-live="polite">
            {filtered.length}{" "}
            {t(
              filtered.length === 1 ? "guide" : "guides",
              filtered.length === 1 ? "guide" : "guides",
            )}
            {offline && (
              <span>
                {t(
                  "Dernière documentation synchronisée",
                  "Last synced documentation",
                )}
              </span>
            )}
          </div>
          <div className="wiki-grid">
            {filtered.map((d) => (
              <Link
                href={
                  staticSlugs.has(docSlug(d))
                    ? `/wiki/${docSlug(d)}`
                    : `/wiki?article=${encodeURIComponent(docSlug(d))}`
                }
                key={d.meta.id}
                className="wiki-card"
              >
                <div className="wiki-card-icon">
                  <BookOpen size={28} strokeWidth={1.25} />
                </div>
                <div className="wiki-card-content">
                  <div className="article-meta">
                    <span>{d.meta.tags?.[0] || "GUIDE"}</span>
                    <time>{d.meta.lastUpdated}</time>
                  </div>
                  <h2>{d.meta.title}</h2>
                  <p>{d.meta.description}</p>
                  <span className="text-link">
                    {t("Lire le guide", "Read guide")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {!filtered.length && (
            <div className="empty-result">
              <Search size={28} />
              <h2>{t("Aucun guide trouvé.", "No guide found.")}</h2>
              <p>
                {t(
                  "Essayez un autre mot ou effacez la recherche.",
                  "Try another word or clear your search.",
                )}
              </p>
              <button
                className="button button-black button-small"
                onClick={() => setQuery("")}
              >
                {t("Effacer la recherche", "Clear search")}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export function WikiArticle({ initial }: { initial: Doc }) {
  const { t, lang } = useLanguage();
  const { docs, offline } = useDocs();
  const doc = docs.find((d) => d._path === initial._path) || initial;
  const source = `https://github.com/${DOCS_REPO}/blob/main/${doc._path}`;
  return (
    <section className="section wiki-article">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/wiki">Documentation</Link>
          <span>/</span>
          <span>{doc.meta.tags?.[0] || "Guide"}</span>
        </div>
        <div className="wiki-article-layout">
          <aside className="wiki-sidebar">
            <h4>Documentation</h4>
            {docs
              .filter((d) => docLanguage(d) === lang || d._path === doc._path)
              .map((d) => (
                <Link
                  className={d._path === doc._path ? "active" : ""}
                  key={d.meta.id}
                  href={
                    initialDocs.some((s) => docSlug(s) === docSlug(d))
                      ? `/wiki/${docSlug(d)}`
                      : `/wiki?article=${encodeURIComponent(docSlug(d))}`
                  }
                >
                  {d.meta.title}
                </Link>
              ))}
            <Link className="wiki-back" href="/wiki">
              {t("Tous les guides", "All guides")}
            </Link>
          </aside>
          <article>
            <div className="article-meta">
              <span>GUIDE</span>
              <time>{doc.meta.lastUpdated}</time>
            </div>
            <h1>{doc.meta.title}</h1>
            {doc.meta.subtitle && (
              <p className="article-subtitle">{doc.meta.subtitle}</p>
            )}
            <div className="doc-author">
              {doc.meta.author || "Divizion"} ·{" "}
              <a href={source}>{t("Source sur GitHub", "Source on GitHub")}</a>
            </div>
            <DocBlocks blocks={doc.blocks} />
            {offline && (
              <p className="catalog-status">
                {t(
                  "Cette copie du guide reste disponible hors connexion.",
                  "This copy of the guide remains available offline.",
                )}
              </p>
            )}
          </article>
          <aside className="wiki-toc">
            <h4>{t("SUR CETTE PAGE", "ON THIS PAGE")}</h4>
            {doc.blocks.map((b, i) =>
              b.type === "heading" && (b.level || 1) <= 2 ? (
                <a href={`#heading-${i}`} key={i}>
                  {b.text}
                </a>
              ) : null,
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
