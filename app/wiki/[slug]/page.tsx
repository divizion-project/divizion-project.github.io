import type { Metadata } from "next";
import { notFound } from "next/navigation";
import cached from "@/public/data/docs.json";
import { docSlug, type Doc } from "@/lib/docs";
import { WikiArticle } from "@/components/wiki";
const docs = cached as Doc[];
export const dynamicParams = false;
export function generateStaticParams() {
  return docs.map((d) => ({ slug: docSlug(d) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docs.find((d) => docSlug(d) === slug);
  return {
    title: doc?.meta.title || "Documentation",
    description: doc?.meta.description,
    alternates: { canonical: `/wiki/${slug}/` },
    openGraph: { title: doc?.meta.title, description: doc?.meta.description },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs.find((d) => docSlug(d) === slug);
  if (!doc) notFound();
  return <WikiArticle initial={doc} />;
}
