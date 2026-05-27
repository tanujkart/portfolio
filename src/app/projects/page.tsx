import Link from "next/link";

type Project = {
  name: string;
  timeframe?: string;
  description: string;
  tags?: string[];
  highlights?: string[];
};

const projects: Project[] = [
  {
    name: "Tagopt",
    timeframe: "Building…",
    description:
      "AI for SEO by optimizing hashtags per platform and goal.",
    tags: ["AI", "SEO", "Startup"],
    highlights: ["Pitched to VCs"],
  },
  {
    name: "HOTSPOT",
    timeframe: "Feb 2025 – Mar 2026",
    description:
      "Multi-source ML pipeline for harmful algal bloom (HAB) early warning — fuses NASA Aqua MODIS spectral retrievals, World Ocean Atlas phosphate climatologies, and NOAA bloom event records into a spatially blocked logistic regression + random forest ensemble. Converted raw satellite readings to monthly anomalies to capture trend signals over absolute values; applied spatial interpolation across cloud-induced data gaps. A rule-based threshold filter post-processes model outputs to suppress low-confidence predictions. Achieves ~75% TPR with a two-month lead time, no local sensor infrastructure required.",
    tags: ["ML", "Remote Sensing", "Research"],
    highlights: [
      "Regional Stockholm Junior Water Prize",
      "Regional Science Fair 3rd Place",
      "Presented at NCSSM Research Symposium",
    ],
  },
  {
    name: "NEMO",
    timeframe: "Mar 2026",
    description:
      "Autonomous aquatic data-gathering submarine on a Raspberry Pi — water quality, temperature, and depth sensors with a remote navigation interface. Next.js dashboard for real-time sensor streaming, historical trend analysis, and geospatial mapping of environmental readings. Architected for multi-unit global deployment so additional units feed into a unified modeling layer without infrastructure changes.",
    tags: ["Hardware", "Raspberry Pi", "Next.js"],
    highlights: ["Built for SMath Hacks 2026"],
  },
  {
    name: "Memo",
    timeframe: "Aug 2025 – Dec 2025",
    description:
      "Wearable audio capture device on a Raspberry Pi with a two-mode recording interface — forward-trigger continuous capture and a reverse-buffer mode that retroactively saves the prior 60 seconds of audio. Recordings run through OpenAI Whisper for on-device transcription, then GPT-4o via API to extract structured summaries and to-do lists. Paired React Native mobile app handles cloud sync, time/date/location tagging, and natural language search over transcript history.",
    tags: ["Wearable", "Whisper", "React Native"],
    highlights: [
      "Backed by the NCSSM Colopy Entrepreneurship Fund",
      "2nd Most Innovative Venture, NCSSM Entrepreneurship Fair",
      "Selected for NCSSM Entrepreneurship Program, Fall 2025",
    ],
  },
  {
    name: "ThinkClear",
    timeframe: "Jul 2025 – Dec 2025",
    description:
      "Facial recognition pipeline on a Raspberry Pi + camera module using DeepFace for real-time identity matching, integrated into a smart glasses form factor to surface contextual memory cues for users with early-to-mid stage dementia. Paired with a React Native-backed web app delivering AI-powered memory matching games clinically targeting cognitive retention — designed to slow dementia progression through spaced repetition and personalized recall challenges. 400K+ interactions across the web platform.",
    tags: ["Smart Glasses", "DeepFace", "Healthtech"],
    highlights: [
      "Pitched to the CEO of an 8-figure digital therapeutics company and Penn faculty",
      "M&TSI 2025",
    ],
  },
  {
    name: "Engage360",
    timeframe: "Aug 2024 – Oct 2024",
    description:
      "Civic engagement platform in Next.js consolidating voter registration, representative lookup, and issue tracking into a single interface — reducing the friction of navigating fragmented government data sources.",
    tags: ["Next.js", "Civic Tech"],
    highlights: [
      "Grand Winner, 2025 Congressional App Challenge",
      "Presented to Congressman Timmons (SC-04)",
    ],
  },
  {
    name: "Patent 11610482",
    timeframe: "Pedestrian Crosswalk Warning System",
    description:
      "Real-time pedestrian detection and motorist alert system using an ultrasonic sensor array deployed at traffic intersections. Continuously measures proximity of pedestrians in crosswalk zones and triggers alerts to approaching motorists below a distance threshold, reducing collision risk without camera-based infrastructure or CV compute overhead.",
    tags: ["Hardware", "Patent", "Safety"],
    highlights: [
      "Collaborated with 20+ DOT officials for compliance & field testing",
      "U.S. Patent 11610482",
    ],
  },
  {
    name: "Portfolio",
    description: "What you’re looking at right now!!",
    tags: ["Next.js", "Design"],
    highlights: ["30K+ interactions"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group relative flex flex-col rounded-xl border border-black/10 bg-white/60 p-5 transition-all hover:border-black/30 hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]"
            >
              <header className="mb-3">
                <h2 className="text-lg font-bold text-black leading-tight">
                  {project.name}
                </h2>
                {project.timeframe && (
                  <span className="mt-1 block text-xs font-mono text-gray-400">
                    {project.timeframe}
                  </span>
                )}
              </header>

              <p className="text-[14px] leading-relaxed text-gray-700 flex-1">
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-4 space-y-1 border-t border-black/5 pt-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-[12.5px] leading-snug text-gray-600 flex gap-2"
                    >
                      <span className="text-gray-300 select-none">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10.5px] font-mono uppercase tracking-wide text-gray-500 bg-black/[0.04] rounded px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
