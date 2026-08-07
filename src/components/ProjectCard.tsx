import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_BY_KEY,
  categoriesOf,
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

const PLATE_TINT: Record<string, string> = {
  fe: "from-purple-100 to-purple-50 text-purple-900/25",
  be: "from-emerald-100 to-emerald-50 text-emerald-900/25",
  hw: "from-orange-100 to-orange-50 text-orange-900/25",
  ai: "from-pink-100 to-pink-50 text-pink-900/25",
  sci: "from-sky-100 to-sky-50 text-sky-900/25",
};

function PlaceholderPlate({ project }: { project: Project }) {
  const key = categoriesOf(project)[0];
  const tint = key ? PLATE_TINT[key] : "from-gray-100 to-gray-50 text-gray-900/30";
  // The project's own name, not its category — two projects sharing a
  // category would otherwise render byte-identical plates side by side,
  // which reads as a rendering bug rather than a design choice.
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br px-5",
        tint,
      )}
    >
      <span
        className={cn(
          "text-center font-bold leading-none tracking-tight",
          project.name.length > 14 ? "text-[26px]" : "text-[34px]",
        )}
      >
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
              "rounded-full border px-2 py-1 text-[11px] font-medium tracking-wide",
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
            className="rounded-sm text-[12px] font-mono text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
}: {
  project: Project;
  variant: Variant;
  priority?: boolean;
}) {
  const media = project.story?.media;
  const isActive = project.status === "active";
  const featured = variant === "featured";

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[14px] border border-black/10 bg-white/60 transition-all",
        "hover:border-black/30 hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]",
        "focus-within:border-black/40 focus-within:ring-2 focus-within:ring-black/60 focus-within:ring-offset-2",
        featured ? "p-0 overflow-hidden" : "p-5",
      )}
    >
      {featured ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-black/10 bg-gray-50">
          {media ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            // Every featured card fills this slot whether or not a screenshot
            // exists, so the row stays aligned. A tinted category plate reads
            // as a deliberate choice; a collapsed slot reads as a broken card.
            <PlaceholderPlate project={project} />
          )}
        </div>
      ) : null}

      <div className={cn("flex flex-1 flex-col", featured && "p-5")}>
        <header className="mb-3 flex items-baseline justify-between gap-3">
          <h2
            className={cn(
              "flex items-center gap-2 font-medium leading-tight text-black",
              featured ? "text-[18px]" : "text-[16px]",
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
          <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-gray-500">
            {formatDateRange(project)}
          </span>
        </header>

        <p
          className={cn(
            "flex-1 leading-[1.6] text-gray-600",
            featured ? "text-[14px]" : "text-[13px]",
          )}
        >
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
