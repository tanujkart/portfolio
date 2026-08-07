import Link from "next/link";
import { CATEGORIES, type CategoryKey } from "@/data/projects";
import { cn } from "@/utils/cn";

// One element, two jobs: it names what each colour means (there was no legend
// before, so the five colours decoded to nothing) and it filters.
//
// Filtering is navigation, not state. /projects/tag/hardware is a real
// prebuilt page — shareable, back-button-correct, and served from the CDN.
// An unknown tag is a route that was never generated, so it 404s without any
// validation code that could get it wrong.

export default function CategoryFilter({
  activeTag,
  counts,
}: {
  activeTag?: CategoryKey;
  counts: Record<CategoryKey, number>;
}) {
  return (
    // Below sm the chips scroll horizontally on one line instead of wrapping to
    // two rows. Wrapping cost ~60px of vertical space and pushed the first card
    // to 51% of the mobile fold — a filter was the third thing a visitor saw,
    // and nobody arrives at a portfolio wanting to filter. Negative margin +
    // matching padding lets the row bleed to the screen edge so the cut-off
    // chip signals "there is more this way".
    <nav
      aria-label="Filter projects by category"
      className="mb-10 -mx-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap">
        <li>
          <Link
            href="/projects"
            aria-current={activeTag ? undefined : "page"}
            className={cn(
              // 44px min height: these are tap targets now, not decoration
              "inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 text-sub font-medium transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
              activeTag
                ? "border-black/15 bg-white/60 text-gray-600 hover:border-black/30 hover:text-black"
                : "border-black/70 bg-black text-white",
            )}
          >
            all
          </Link>
        </li>

        {CATEGORIES.map((c) => {
          const active = activeTag === c.key;
          return (
            <li key={c.key}>
              <Link
                href={`/projects/tag/${c.key}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sub font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                  c.chip,
                  active
                    ? "ring-2 ring-black/70 ring-offset-2"
                    : "opacity-90 hover:opacity-100",
                )}
              >
                {c.label}
                <span className="font-mono text-meta opacity-60">
                  {counts[c.key]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
