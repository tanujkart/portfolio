import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import CategoryFilter from "@/components/CategoryFilter";
import {
  CATEGORIES,
  CATEGORY_BY_KEY,
  categoriesOf,
  projectsForTag,
  sortedProjects,
  type CategoryKey,
} from "@/data/projects";

//  ┌─ /projects ──────────────────────────────┐   ┌─ /projects/tag/[tag] ────┐
//  │  legend / filter                         │   │  legend / filter          │
//  │  FEATURED    [img][img][img][img]        │   │  (tiers collapse to one   │
//  │  EVERYTHING  ▤ ▤ ▤ ▤ ▤ ▤ ▤ ▤ ▤          │   │   flat list — otherwise a │
//  └──────────────────────────────────────────┘   │   filter could leave one  │
//                                                  │   lonely featured card in │
//                                                  │   a four-wide grid)       │
//                                                  └───────────────────────────┘

function counts(): Record<CategoryKey, number> {
  const out = {} as Record<CategoryKey, number>;
  for (const c of CATEGORIES) {
    out[c.key] = sortedProjects.filter((p) => categoriesOf(p).includes(c.key)).length;
  }
  return out;
}

export default function ProjectsIndex({ activeTag }: { activeTag?: CategoryKey }) {
  const filtered = activeTag ? projectsForTag(activeTag) : null;
  const featured = sortedProjects.filter((p) => p.featured);
  const rest = sortedProjects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Link
        href="/"
        className="rounded-sm font-mono text-sm text-gray-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        ← Back
      </Link>

      <h1 className="mb-3 mt-8 text-3xl font-bold sm:text-4xl">Projects</h1>
      <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-gray-600">
        Things I&apos;ve built, with links to check them. Filter by what they&apos;re made of.
      </p>

      <CategoryFilter activeTag={activeTag} counts={counts()} />

      {filtered ? (
        <section aria-labelledby="filtered-heading">
          <h2 id="filtered-heading" className="sr-only">
            {CATEGORY_BY_KEY[activeTag!].label} projects
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} variant="compact" />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section aria-labelledby="featured-heading" className="mb-14">
            <h2
              id="featured-heading"
              className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500"
            >
              Featured
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="featured"
                  priority={i < 2}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="rest-heading">
            <h2
              id="rest-heading"
              className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500"
            >
              Everything else
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} variant="compact" />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
