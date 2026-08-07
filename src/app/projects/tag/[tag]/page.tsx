import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsIndex from "@/components/ProjectsIndex";
import { CATEGORIES, CATEGORY_BY_KEY, type CategoryKey } from "@/data/projects";

// Only these five routes are generated. /projects/tag/anything-else was never
// built, so Next 404s it — the unknown-tag case handles itself out of
// existence rather than needing validation code that could get it wrong.
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ tag: c.key }));
}

function isCategory(tag: string): tag is CategoryKey {
  return CATEGORIES.some((c) => c.key === tag);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  if (!isCategory(tag)) return {};
  const label = CATEGORY_BY_KEY[tag].label;
  return {
    title: `${label} projects — Tanuj Karthikeyan`,
    description: `Projects tagged ${label}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  if (!isCategory(tag)) notFound();
  return <ProjectsIndex activeTag={tag} />;
}
