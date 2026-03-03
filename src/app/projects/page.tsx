import Link from "next/link";

const projects = [
  {
    name: "thinkclear",
    description: "ai-powered memory assist platform.\n300k+ interactions. facial recognition + adaptive recall.",
  },
  {
    name: "tagopt",
    description: "ai marketing optimization tool.\nagent workflows + custom frontend.",
  },
  {
    name: "memo",
    description: "wearable audio capture + on-device summarization.",
  },
  {
    name: "student founders association",
    description: "connecting high school founders with real vcs in nc.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:py-24">
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
