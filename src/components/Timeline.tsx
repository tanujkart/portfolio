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

// Oldest at the top. Every entry is shown in full. When the timeline is at least 32rem
// wide, entries alternate sides of a centre line with the dates opposite the entry, so
// both halves carry something; narrower than that the line moves left and everything
// stacks.
export default function Timeline({ className }: { className?: string }) {
  return (
    <div className={cn("@container relative", className)}>
      <div aria-hidden className="absolute bottom-0 left-[4px] top-0 w-px bg-gray-300 @lg:left-1/2" />
      <ol className="flex flex-col gap-1">
        {TIMELINE.map((e, i) => {
          const left = i % 2 === 0; // entry on the left, dates on the right
          return (
            <li
              key={`${e.org}-${e.dates}`}
              className="relative py-1.5 pl-7 @lg:grid @lg:grid-cols-2 @lg:pl-0"
            >
              <span
                aria-hidden
                className={
                  "absolute top-[12px] left-[1px] rounded-full @lg:left-1/2 @lg:-translate-x-1/2 " +
                  (e.current
                    ? "-ml-px h-[9px] w-[9px] bg-foreground ring-4 ring-foreground/15"
                    : "h-[7px] w-[7px] border border-foreground bg-background")
                }
              />

              <div
                className={
                  left
                    ? "@lg:col-start-1 @lg:row-start-1 @lg:pr-7 @lg:text-right"
                    : "@lg:col-start-2 @lg:row-start-1 @lg:pl-7"
                }
              >
                <h3 className="text-body font-bold leading-tight tracking-tight text-black">
                  <Org entry={e} />
                </h3>
                <p className="mt-0.5 text-sub leading-snug text-gray-700">{e.blurb}</p>
                <p className="mt-0.5 text-meta uppercase tracking-wide text-gray-500 @lg:hidden">{e.dates}</p>
              </div>

              <p
                className={
                  "hidden pt-[2px] text-meta uppercase tracking-wide text-gray-500 @lg:block " +
                  (left
                    ? "@lg:col-start-2 @lg:row-start-1 @lg:pl-7"
                    : "@lg:col-start-1 @lg:row-start-1 @lg:pr-7 @lg:text-right")
                }
              >
                {e.dates}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
