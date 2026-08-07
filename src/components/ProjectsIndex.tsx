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
        className="inline-flex min-h-6 items-center rounded-sm font-mono text-sub text-gray-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        ← Back
      </Link>

      {/* mb-6 on mobile because the subhead below is hidden there and its
          margin goes with it; sm:mb-3 restores the tighter title/subhead pair. */}
      <h1 className="mb-6 mt-8 text-display font-bold sm:mb-3">Projects</h1>
      {/* Hidden below sm. On a phone this line sat between the title and the
          work, and every pixel above the first card is a pixel a recruiter
          spends on chrome instead of proof. */}
      <p className="mb-10 hidden max-w-measure text-body leading-relaxed text-gray-600 sm:block">
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
              className="mb-4 font-mono text-meta uppercase tracking-[0.14em] text-gray-500"
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
              className="mb-4 font-mono text-meta uppercase tracking-[0.14em] text-gray-500"
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
