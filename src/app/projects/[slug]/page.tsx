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
          className="inline-flex min-h-6 items-center rounded-sm font-mono text-sub text-gray-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          ← Projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="flex items-center gap-2.5 text-display font-bold">
              {isActive ? (
                <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              ) : null}
              {project.name}
            </h1>
            <span className="font-mono text-meta text-gray-500">
              {formatDateRange(project)}
              {isActive ? " · active" : ""}
            </span>
          </div>

          <p className="mt-4 max-w-measure text-body leading-relaxed text-gray-700">{project.blurb}</p>

          {/* Three bullets, above the prose. A visitor who reads nothing else
              should still leave knowing the stack, the award, and the number.
              Exactly three is enforced in scripts/validate-projects.ts — the
              moment it becomes four it stops being a summary. */}
          <ul className="mt-5 max-w-measure space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-body leading-relaxed text-gray-700">
                <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.pills.map((pill) => {
              const key = categoryOf(pill);
              return (
                <span
                  key={pill}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-meta font-medium tracking-wide",
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
              <span className="font-mono text-meta uppercase tracking-[0.14em] text-gray-500">
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
                    className="inline-flex min-h-6 items-center rounded-sm text-sub font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
            {/* No forced aspect ratio on the hero. Sources range from 16:9
                renders to 2:3 photographs; boxing them all into one ratio
                either crops the image or strands it in empty space. Intrinsic
                dimensions plus a viewport cap shows each one whole, at its own
                shape. */}
            {story.media ? (
              <div className="mt-10 flex justify-center overflow-hidden rounded-[14px] border border-black/10 bg-gray-50 p-4">
                <Image
                  src={story.media.src}
                  alt={story.media.alt}
                  width={story.media.width}
                  height={story.media.height}
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto max-h-[70vh] w-auto max-w-full rounded-[6px] object-contain"
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
                  <h2 className="mb-2 font-mono text-meta uppercase tracking-[0.14em] text-gray-500">
                    {heading}
                  </h2>
                  <p className="max-w-measure text-body leading-relaxed text-gray-700">{body}</p>
                </section>
              ))}
            </div>

            {/* Closed by default. Chrome renders an inline PDF object with its
                own black toolbar and thumbnail rail, which becomes the loudest
                thing on the page; keeping the details shut also defers the
                fetch, so a 1 MB paper is never pulled by someone who only
                wanted the summary. Verified with performance.getEntriesByType.
                The receipts row above still links the file directly. */}
            {story.paper ? (
              <details className="group mt-8 rounded-[14px] border border-black/10 bg-white/60 open:bg-white">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-[14px] px-5 font-mono text-sub text-gray-600 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-open:rotate-90"
                  >
                    ▸
                  </span>
                  Read the paper here
                </summary>
                <div className="px-5 pb-5">
                  <object
                    data={story.paper.src}
                    type="application/pdf"
                    aria-label={story.paper.label}
                    className="h-[80vh] w-full rounded-lg border border-black/10 bg-white"
                  >
                    <p className="p-4 text-sub text-gray-600">
                      Your browser can&apos;t display PDFs inline.{" "}
                      <a
                        href={story.paper.src}
                        className="rounded-sm underline decoration-gray-300 underline-offset-2 hover:text-black hover:decoration-black"
                      >
                        Download it instead
                      </a>
                      .
                    </p>
                  </object>
                </div>
              </details>
            ) : null}

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
        ) : null}
      </div>
    </main>
  );
}
