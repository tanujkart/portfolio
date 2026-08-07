import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_BY_KEY, categoryOf } from "@/data/projects";
import { formatResearchDate, research } from "@/data/research";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: "Research — Tanuj Karthikeyan",
  description:
    "HOTSPOT, a satellite-proxy model for nutrient-driven ecological change in marine environments, and mechanistic interpretability of neural networks.",
};

//  Mirrors the project detail page exactly:
//
//    name · date
//    blurb
//    • three highlights          ← awards and methods, was buried in prose
//    tags
//    RECEIPTS  links
//    body prose
//    ▸ read the paper inline     ← was an 80vh dark PDF viewer, always open
//
//  The PDF used to be an always-mounted <object>. Chrome renders that as a
//  black toolbar and thumbnail rail, which is the loudest thing on an
//  otherwise warm, light page — and it pulled 1 MB on every visit. It now
//  sits behind a native <details>, so the page is quiet by default, the
//  browser doesn't fetch the file until someone asks, and anyone who wants
//  to read inline still can. No JavaScript.

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const key = categoryOf(tag);
        return (
          <span
            key={tag}
            className={cn(
              "rounded-full border px-2.5 py-1 text-meta font-medium tracking-wide",
              key ? CATEGORY_BY_KEY[key].chip : "border-black/10 bg-black/5 text-gray-700",
            )}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex min-h-6 items-center rounded-sm font-mono text-sub text-gray-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          ← Back
        </Link>

        <h1 className="mb-6 mt-8 text-display font-bold sm:mb-3">Research</h1>
        <p className="mb-14 hidden max-w-measure text-body leading-relaxed text-gray-600 sm:block">
          Two questions I&apos;ve spent real time on: how satellites can see nutrient
          pollution, and how neural networks hold ideas.
        </p>

        <div className="space-y-16">
          {research.map((entry) => {
            const date = formatResearchDate(entry);
            return (
              <article key={entry.slug} className="border-t border-black/10 pt-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="text-title font-bold text-black">{entry.name}</h2>
                  {date ? (
                    <span className="font-mono text-meta text-gray-500">{date}</span>
                  ) : null}
                </div>

                {entry.fullTitle ? (
                  <p className="mt-1 max-w-measure text-sub leading-relaxed text-gray-500">
                    {entry.fullTitle}
                  </p>
                ) : null}

                <p className="mt-4 max-w-measure text-body leading-relaxed text-gray-700">
                  {entry.blurb}
                </p>

                <ul className="mt-5 max-w-measure space-y-2">
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-body leading-relaxed text-gray-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Tags tags={entry.tags} />

                {entry.links.length > 0 ? (
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-5">
                    <span className="font-mono text-meta uppercase tracking-[0.14em] text-gray-500">
                      Receipts
                    </span>
                    {entry.links.map((link) => {
                      const external = link.href.startsWith("http");
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target={external ? "_blank" : "_blank"}
                          rel="noopener noreferrer"
                          className="inline-flex min-h-6 items-center rounded-sm text-sub font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          {link.label} ↗
                        </a>
                      );
                    })}
                  </div>
                ) : null}

                <div className="mt-6 max-w-measure space-y-4 text-body leading-relaxed text-gray-700">
                  {entry.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>

                {entry.paper ? (
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
                    {/* Not mounted until opened, so the 1 MB PDF is never
                        fetched by someone who just wanted the summary. */}
                    <div className="px-5 pb-5">
                      <object
                        data={entry.paper.src}
                        type="application/pdf"
                        aria-label={entry.paper.label}
                        className="h-[80vh] w-full rounded-lg border border-black/10 bg-white"
                      >
                        <p className="p-4 text-sub text-gray-600">
                          Your browser can&apos;t display PDFs inline.{" "}
                          <a
                            href={entry.paper.src}
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
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
