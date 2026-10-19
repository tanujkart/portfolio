import Image from "next/image";
import ProjectIcon from "@/components/ProjectIcons";
import type { ListedProject, SkillCategory } from "@/data/projectList";
import { cn } from "@/utils/cn";

// Soft tint with darker matching text, readable on the white card.
const PILL: Record<SkillCategory, string> = {
  fe: "bg-purple-100 text-purple-800",
  be: "bg-emerald-100 text-emerald-800",
  hw: "bg-[#ffe3dc] text-[#a8402c]",
  ai: "bg-pink-100 text-pink-800",
  db: "bg-sky-100 text-sky-800",
  sci: "bg-teal-100 text-teal-800",
};

// Placeholder block: the project's most common skill colour, name in muted text.
const BLOCK: Record<SkillCategory, string> = {
  fe: "bg-purple-100 text-purple-900/40",
  be: "bg-emerald-100 text-emerald-900/40",
  hw: "bg-[#ffe3dc] text-[#a8402c]/45",
  ai: "bg-pink-100 text-pink-900/40",
  db: "bg-sky-100 text-sky-900/40",
  sci: "bg-teal-100 text-teal-900/40",
};

function mainCategory(p: ListedProject): SkillCategory {
  if (p.placeholderColor) return p.placeholderColor;
  const counts = new Map<SkillCategory, number>();
  for (const s of p.skills)
    counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
  let best: SkillCategory = "fe";
  let top = 0;
  for (const [cat, n] of counts) {
    if (n > top) {
      best = cat;
      top = n;
    }
  }
  return best;
}

// 16:9 frame reserved up front, so neither an image nor the placeholder can shift the layout.
// Images are fitted whole (contain) on a solid fill; scale is clipped by the frame.
function Cover({
  project: p,
  priority,
}: {
  project: ListedProject;
  priority: boolean;
}) {
  return (
    <div
      className="relative aspect-video w-full overflow-hidden border-b border-[#e6e4df]"
      style={p.image ? { backgroundColor: p.imageBg ?? "#f1efe9" } : undefined}
    >
      {p.image ? (
        <Image
          src={p.image.src}
          alt={p.image.alt}
          fill
          unoptimized={p.image.src.endsWith(".svg")}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1700px) 25vw, (min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
          style={{
            objectPosition: p.imagePosition ?? "center",
            transform: p.imageScale ? `scale(${p.imageScale})` : undefined,
          }}
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            "flex h-full w-full items-center justify-center px-6 text-center text-title font-bold lowercase tracking-tight",
            BLOCK[mainCategory(p)],
          )}
        >
          {p.name}
        </div>
      )}
    </div>
  );
}

function Card({
  project: p,
  priority,
}: {
  project: ListedProject;
  priority: boolean;
}) {
  return (
    <li className="flex h-full flex-col overflow-hidden rounded-[14px] border border-[#e6e4df] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors duration-150 hover:border-[#cfccc4] motion-reduce:transition-none">
      <Cover project={p} priority={priority} />

      <div className="flex flex-1 flex-col p-[22px]">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-title font-bold lowercase leading-tight tracking-tight text-[#111]">
            {p.name}
          </h2>
          <span className="shrink-0 text-meta text-[#7a7a7a]">{p.date}</span>
        </div>

        <ul className="mt-4 space-y-2">
          {p.bullets.map((b) => (
            <li
              key={b}
              className="flex gap-2.5 text-sub leading-relaxed text-[#4a4a4a]"
            >
              <span
                aria-hidden
                className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[#b5b2ab]"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {p.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.skills.map((s) => (
              <span
                key={s.label}
                className={cn(
                  "rounded-full px-2.5 py-1 text-meta font-medium",
                  PILL[s.category],
                )}
              >
                {s.label}
              </span>
            ))}
          </div>
        )}

        {/* mt-auto pins the icons to the card bottom so cards in a row line up. */}
        {p.links.length > 0 && (
          <div className="-mb-2.5 -ml-2.5 mt-auto flex items-center gap-0.5 pt-4">
            {p.links.map((link) => (
              <a
                key={link.kind}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} ${link.kind}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#7a7a7a] transition duration-150 hover:-translate-y-0.5 hover:text-[#111] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#111] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <ProjectIcon kind={link.kind} />
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function ProjectList({
  projects,
}: {
  projects: ListedProject[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3 min-[1700px]:grid-cols-4">
      {projects.map((p, i) => (
        <Card key={p.slug} project={p} priority={i < 2} />
      ))}
    </ul>
  );
}
