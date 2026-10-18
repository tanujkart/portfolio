import Image from "next/image";
import { cn } from "@/utils/cn";
import { TIMELINE, type TimelineEntry } from "@/data/timeline";

// Org name as the heading, linked when it has a site, with its logo after it. The logo
// is decorative: the name next to it already says who it is.
function Org({ entry }: { entry: TimelineEntry }) {
  const logo = entry.logo && (
    <Image
      src={entry.logo}
      alt=""
      width={16}
      height={16}
      unoptimized
      className="ml-1 inline-block h-4 w-4 rounded-[3px] object-contain align-[-2px]"
    />
  );
  const name = (
    <>
      {entry.org}
      {logo}
    </>
  );
  if (!entry.href) return name;
  return (
    <a
      href={entry.href}
      className="underline underline-offset-2 decoration-gray-300 hover:decoration-black transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
}

// Oldest at the top. One row per entry, all on the same three columns: dates | dot on the
// line | org and description. The dates share a row with the org name, so each date reads
// as the label for the entry beside it.
export default function Timeline({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div aria-hidden className="absolute bottom-2 left-[9.25rem] top-2 w-px bg-gray-300" />
      <ol className="flex flex-col">
        {TIMELINE.map((e) => (
          <li
            key={`${e.org}-${e.dates}`}
            className="grid grid-cols-[8rem_1rem_1fr] gap-x-3 py-2"
          >
            <p className="pt-[3px] text-right text-meta leading-snug tabular-nums text-gray-500">
              {e.dates}
            </p>

            <span
              aria-hidden
              className={
                "relative mt-[6px] justify-self-center rounded-full " +
                (e.milestone
                  ? "h-[9px] w-[9px] bg-[#d62054] ring-4 ring-[#d62054]/20"
                  : e.current
                    ? "h-[9px] w-[9px] bg-foreground ring-4 ring-foreground/15"
                    : "h-[9px] w-[9px] border border-foreground bg-background")
              }
            />

            <div>
              <h3
                className={cn(
                  "text-body font-bold leading-tight tracking-tight",
                  e.milestone ? "text-[#d62054]" : "text-black",
                )}
              >
                <Org entry={e} />
                {e.milestone && (
                  <span aria-hidden className="ml-1.5">
                    🏃
                  </span>
                )}
              </h3>
              <p className="mt-0.5 text-sub leading-snug text-gray-700">{e.blurb}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
