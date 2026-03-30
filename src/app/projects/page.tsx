import Link from "next/link";

const projects = [
  {
    name: "tagopt",
    description:
      "building… ai for seo by optimizing hashtags for platform and goal. pitched to vcs.",
  },
  {
    name: "patent 11610482",
    description:
      "system to warn a motorist of the presence of a pedestrian in a crosswalk at a traffic intersection. collaborating with 20+ department of transportation officials for compliance & testing.",
  },
  {
    name: "thinkclear",
    description:
      "smart glasses with facial recognition technology + ai-powered gamification. 400k+ interactions. pitched to ceo of an 8-figure digital therapeutics company and penn faculty. m&tsi 2025.",
  },
  {
    name: "memo",
    description:
      "wearable recording device + ai summarization and note-taking. backed by ncssm colopy entrepreneurship fund. ncssm entrepreneurship program fall 2025.",
  },
  {
    name: "nemo",
    description:
      "autonomous data-gathering submarine + live global modeling dashboard. smath hacks 2026.",
  },
  {
    name: "engage360",
    description:
      "civic engagement platform. presented to congressman timmons (district SC-04). congressional app challenge grand winner 2025.",
  },
  {
    name: "portfolio",
    description: "what ur looking at right now!! 30k+ interactions.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">projects</h1>

        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.name}>
              <h2 className="text-lg font-bold text-black">{project.name}</h2>
              {project.description.split("\n").map((line, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-gray-700 mt-1">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
