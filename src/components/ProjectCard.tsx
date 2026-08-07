import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_BY_KEY,
  categoryOf,
  formatDateRange,
  type Project,
} from "@/data/projects";
import { cn } from "@/utils/cn";

//  STRETCHED LINK
//  ──────────────
//  The whole card opens the detail page, but the receipt links inside it stay
//  independently clickable. Nesting <a> inside <a> is invalid HTML, so instead
//  the title link paints an invisible ::after overlay across the card, and the
//  receipts row sits above it on z-10.
//
//    ┌─ article (relative) ───────────────────┐
//    │  title <a> ::after inset-0  ← z-0      │
//    │  blurb                                 │
//    │  ┌ receipts (relative z-10) ─────────┐ │  ← above the overlay,
//    │  │  repo ↗   live ↗   paper (PDF)   │ │    so these win the click
//    │  └───────────────────────────────────┘ │
//    └────────────────────────────────────────┘

type Variant = "featured" | "compact";

function StatusDot() {
  return (
    <span
      className="relative inline-flex h-1.5 w-1.5 shrink-0"
      aria-hidden="true"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

// Flat neutral, no gradient. A purple gradient is the most recognizable
// AI-generated visual signature there is, and this was the least specific
// surface on a page that otherwise earns its keep through content.
function PlaceholderPlate({ project }: { project: Project }) {
  // The project's own name, not its category — two projects sharing a
  // category would otherwise render byte-identical plates side by side,
  // which reads as a rendering bug rather than a design choice.
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-black/[0.035] px-5"
    >
      <span className="text-center text-display font-bold leading-none tracking-tight text-black/25">
        {project.name}
      </span>
    </div>
  );
}

function Pills({ pills }: { pills: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {pills.map((pill) => {
        const key = categoryOf(pill);
        const style = key
          ? CATEGORY_BY_KEY[key].chip
          : "border-black/10 bg-black/5 text-gray-700";
        return (
          <span
            key={pill}
            className={cn(
              "rounded-full border px-2 py-1 text-meta font-medium tracking-wide",
              style,
            )}
          >
            {pill}
          </span>
        );
      })}
    </div>
  );
}

function Receipts({ project }: { project: Project }) {
  if (project.links.length === 0) return null;
  return (
    // relative + z-10 is what keeps these clickable through the stretched link
    <div className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {project.links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.href}
            href={link.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            // min-h-6 (24px) is the WCAG 2.5.8 AA floor. These were 18px —
            // the smallest target on the page, on the affordance the whole
            // receipts idea exists for.
            className="inline-flex min-h-6 items-center rounded-sm font-mono text-meta text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {link.label}
            {external ? " ↗" : ""}
          </a>
        );
      })}
    </div>
  );
}

export default function ProjectCard({
  project,
  variant,
  priority = false,
  showPlate = false,
}: {
  project: Project;
  variant: Variant;
  priority?: boolean;
  /**
   * Whether an imageless featured card should render the wordmark plate. The
   * plate exists only to keep a row's titles aligned when SOME cards have an
   * image and some don't. When no featured project has one, there is nothing
   * to align and the plate is just the project's name printed above the
   * project's name. ProjectsIndex decides; the card can't see its siblings.
   */
  showPlate?: boolean;
}) {
  const media = project.story?.media;
  const isActive = project.status === "active";
  const featured = variant === "featured";
  const showBand = featured && (media || showPlate);

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[14px] border border-black/10 bg-white/60 transition-all",
        "hover:border-black/30 hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]",
        "focus-within:border-black/40 focus-within:ring-2 focus-within:ring-black/60 focus-within:ring-offset-2",
        showBand ? "p-0 overflow-hidden" : "p-5",
      )}
    >
      {/* The plate exists only to keep the featured row's titles aligned, so
          it is suppressed below sm where cards are one per column and there is
          no row to align. It was costing 191px of an 844px viewport to render
          a word that repeated 60px below it. Real imagery still shows at every
          width — only the placeholder is mobile-suppressed, and `showBand`
          drops it entirely when no featured card has an image to align to. */}
      {showBand ? (
        <div
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden border-b border-black/10 bg-gray-50",
            media ? "block" : "hidden sm:block",
          )}
        >
          {media ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <PlaceholderPlate project={project} />
          )}
        </div>
      ) : null}

      <div className={cn("flex flex-1 flex-col", showBand && "p-5")}>
        {/* Featured stacks the date under the title; compact keeps them on one
            line. At text-title a long name like "patent 11610482" competing
            with a date for a 321px card wraps to two lines and knocks that
            card's header out of line with the other three. Full width for the
            title removes the competition. */}
        <header
          className={cn(
            "mb-3 gap-x-3",
            featured
              ? "flex flex-col items-start gap-y-1"
              : "flex items-baseline justify-between",
          )}
        >
          <h2
            className={cn(
              "flex items-center gap-2 font-medium leading-tight text-black",
              featured ? "text-title" : "text-body",
            )}
          >
            {isActive ? <StatusDot /> : null}
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm underline decoration-gray-300 underline-offset-2 transition-colors after:absolute after:inset-0 after:content-[''] hover:decoration-black focus-visible:outline-none"
            >
              {project.name}
              {isActive ? <span className="sr-only"> (currently active)</span> : null}
            </Link>
          </h2>
          <span className="shrink-0 whitespace-nowrap font-mono text-meta text-gray-500">
            {formatDateRange(project)}
          </span>
        </header>

        <p className="flex-1 text-sub leading-[1.6] text-gray-600">
          {project.blurb}
        </p>

        <hr className="my-4 border-0 border-t border-black/10" />

        <div className="flex flex-col gap-3">
          <Pills pills={project.pills} />
          <Receipts project={project} />
        </div>
      </div>
    </article>
  );
}
