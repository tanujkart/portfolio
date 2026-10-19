import Link from "next/link";
import ProjectList from "@/components/ProjectList";
import { PROJECT_LIST } from "@/data/projectList";
import { CATEGORY_BY_KEY, projectBySlug, projectsForTag, type CategoryKey } from "@/data/projects";

// The tag routes (/projects/tag/[tag]) stay, but the filter chips are gone from the page.
// A tag page is the same list narrowed to that tag, with a way back to everything.
export default function ProjectsIndex({ activeTag }: { activeTag?: CategoryKey }) {
  const tagged = activeTag ? new Set(projectsForTag(activeTag).map((p) => p.slug)) : null;
  const rows = PROJECT_LIST.filter(
    (row) => !projectBySlug(row.slug)?.hidden && (!tagged || tagged.has(row.slug)),
  );

  return (
    <main className="min-h-screen bg-[#fafaf7] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="w-full">
        <Link
          href="/"
          className="inline-flex min-h-6 items-center rounded-sm font-mono text-sub text-gray-500 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          ← Back
        </Link>

        <h1 className="mb-6 mt-8 text-display font-bold tracking-tight text-[#111]">Projects</h1>

        {activeTag && (
          <p className="mb-6 text-sub text-gray-600">
            {CATEGORY_BY_KEY[activeTag].label} ·{" "}
            <Link href="/projects" className="underline underline-offset-2 hover:text-black">
              all projects
            </Link>
          </p>
        )}

        {rows.length > 0 ? (
          <ProjectList projects={rows} />
        ) : (
          <p className="text-body text-gray-600">Nothing listed under this tag yet.</p>
        )}
      </div>
    </main>
  );
}
