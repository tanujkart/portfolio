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
    name: "tagopt",
    timeframe: "building…",
    description:
      "ai for seo by optimizing hashtags per platform and goal.",
    tags: ["ai", "seo", "startup"],
    highlights: ["pitched to vcs"],
  },
  {
    name: "hotspot",
    timeframe: "feb 2025 – mar 2026",
    description:
      "multi-source ml pipeline for harmful algal bloom (hab) early warning — fuses nasa aqua modis spectral retrievals, world ocean atlas phosphate climatologies, and noaa bloom event records into a spatially blocked logistic regression + random forest ensemble. converted raw satellite readings to monthly anomalies to capture trend signals over absolute values; applied spatial interpolation across cloud-induced data gaps. rule-based threshold filter post-processes model outputs to suppress low-confidence predictions. ~75% tpr with a two-month lead time, no local sensor infrastructure required.",
    tags: ["ml", "remote sensing", "research"],
    highlights: [
      "regional stockholm junior water prize",
      "regional science fair 3rd place",
      "presented at ncssm research symposium",
    ],
  },
  {
    name: "nemo",
    timeframe: "mar 2026",
    description:
      "autonomous aquatic data-gathering submarine on a raspberry pi — water quality, temperature, and depth sensors with a remote navigation interface. next.js dashboard for real-time sensor streaming, historical trend analysis, and geospatial mapping of environmental readings. architected for multi-unit global deployment so additional units feed into a unified modeling layer without infrastructure changes.",
    tags: ["hardware", "raspberry pi", "next.js"],
    highlights: ["built for smath hacks 2026"],
  },
  {
    name: "memo",
    timeframe: "aug 2025 – dec 2025",
    description:
      "wearable audio capture device on a raspberry pi with a two-mode recording interface — forward-trigger continuous capture and a reverse-buffer mode that retroactively saves the prior 60 seconds of audio. recordings run through openai whisper for on-device transcription, then gpt-4o via api to extract structured summaries and to-do lists. paired react native mobile app handles cloud sync, time/date/location tagging, and natural language search over transcript history.",
    tags: ["wearable", "whisper", "react native"],
    highlights: [
      "backed by ncssm colopy entrepreneurship fund",
      "2nd most innovative venture, ncssm entrepreneurship fair",
      "selected for ncssm entrepreneurship program, fall 2025",
    ],
  },
  {
    name: "thinkclear",
    timeframe: "jul 2025 – dec 2025",
    description:
      "facial recognition pipeline on a raspberry pi + camera module using deepface for real-time identity matching, integrated into a smart glasses form factor to surface contextual memory cues for users with early-to-mid stage dementia. paired with a react native-backed web app delivering ai-powered memory matching games clinically targeting cognitive retention — designed to slow dementia progression through spaced repetition and personalized recall challenges. 400k+ interactions across the web platform.",
    tags: ["smart glasses", "deepface", "healthtech"],
    highlights: [
      "pitched to ceo of an 8-figure digital therapeutics company and penn faculty",
      "m&tsi 2025",
    ],
  },
  {
    name: "engage360",
    timeframe: "aug 2024 – oct 2024",
    description:
      "civic engagement platform in next.js consolidating voter registration, representative lookup, and issue tracking into a single interface — reducing the friction of navigating fragmented government data sources.",
    tags: ["next.js", "civic tech"],
    highlights: [
      "grand winner, 2025 congressional app challenge",
      "presented to congressman timmons (sc-04)",
    ],
  },
  {
    name: "patent 11610482",
    timeframe: "pedestrian crosswalk warning system",
    description:
      "real-time pedestrian detection and motorist alert system using an ultrasonic sensor array deployed at traffic intersections. continuously measures proximity of pedestrians in crosswalk zones and triggers alerts to approaching motorists below a distance threshold, reducing collision risk without camera-based infrastructure or cv compute overhead.",
    tags: ["hardware", "patent", "safety"],
    highlights: [
      "collaborated with 20+ dot officials for compliance & field testing",
      "u.s. patent 11610482",
    ],
  },
  {
    name: "portfolio",
    description: "what ur looking at right now!!",
    tags: ["next.js", "design"],
    highlights: ["30k+ interactions"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">projects</h1>

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
