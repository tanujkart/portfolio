import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CanvasEmbed from "@/components/CanvasEmbed";
import {
  CATEGORY_BY_KEY,
  categoryOf,
  formatDateRange,
  projectBySlug,
  projects,
} from "@/data/projects";
import { cn } from "@/utils/cn";

// Every project gets a URL, including the nine with no writeup yet. Emitting
// only the four with a `story` would mean the share cards in
// opengraph-image.tsx cover 4 of 13 — the patent, the Congressional App
// Challenge win and the rest would keep pasting as blank grey boxes.
// A thin page still carries the name, dates, pills and every receipt link.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Tanuj Karthikeyan`,
    description: project.blurb,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const { story } = project;
  const isActive = project.status === "active";
  const primaryExternal = project.links.find((l) => l.href.startsWith("http"));

  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="rounded-sm font-mono text-sm text-gray-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          ← Projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="flex items-center gap-2.5 text-3xl font-bold sm:text-4xl">
              {isActive ? (
                <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              ) : null}
              {project.name}
            </h1>
            <span className="font-mono text-[13px] text-gray-500">
              {formatDateRange(project)}
              {isActive ? " · active" : ""}
            </span>
          </div>

          <p className="mt-4 text-[16px] leading-relaxed text-gray-700">{project.blurb}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.pills.map((pill) => {
              const key = categoryOf(pill);
              return (
                <span
                  key={pill}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
                    key ? CATEGORY_BY_KEY[key].chip : "border-black/10 bg-black/5 text-gray-700",
                  )}
                >
                  {pill}
                </span>
              );
            })}
          </div>

          {project.links.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-5">
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500">
                Receipts
              </span>
              {project.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="rounded-sm text-[13px] font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    {link.label}
                    {external ? " ↗" : ""}
                  </a>
                );
              })}
            </div>
          ) : null}
        </header>

        {story ? (
          <>
            {story.media ? (
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-black/10 bg-gray-50">
                <Image
                  src={story.media.src}
                  alt={story.media.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="mt-10 space-y-8">
              {(
                [
                  ["The problem", story.problem],
                  ["What I built", story.approach],
                  ["What happened", story.outcome],
                ] as const
              ).map(([heading, body]) => (
                <section key={heading}>
                  <h2 className="mb-2 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500">
                    {heading}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-gray-700">{body}</p>
                </section>
              ))}
            </div>

            {story.embed ? (
              <CanvasEmbed
                src={story.embed.src}
                poster={story.embed.poster}
                posterAlt={story.embed.posterAlt}
                title={story.embed.title}
                fallbackHref={primaryExternal?.href}
                fallbackLabel={primaryExternal?.label}
              />
            ) : null}
          </>
        ) : (
          // Thin variant. Deliberately quiet rather than apologetic — it says
          // where to go next instead of announcing an absence.
          <p className="mt-10 border-t border-black/10 pt-6 text-[14px] leading-relaxed text-gray-500">
            {primaryExternal ? (
              <>
                No writeup for this one yet.{" "}
                <a
                  href={primaryExternal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  {primaryExternal.label} ↗
                </a>{" "}
                is the best place to look.
              </>
            ) : (
              <>
                No writeup for this one yet. Happy to talk about it —{" "}
                <Link
                  href="/contact"
                  className="rounded-sm underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  get in touch
                </Link>
                .
              </>
            )}
          </p>
        )}
      </div>
    </main>
  );
}
