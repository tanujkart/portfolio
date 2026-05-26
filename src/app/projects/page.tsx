import Link from "next/link";

const projects = [
  {
    name: "tagopt",
    timeframe: "building…",
    description:
      "ai for seo by optimizing hashtags per platform and goal. pitched to vcs.",
  },
  {
    name: "hotspot",
    timeframe: "feb 2025 – mar 2026",
    description:
      "multi-source ml pipeline for harmful algal bloom (hab) early warning — fuses nasa aqua modis spectral retrievals, world ocean atlas phosphate climatologies, and noaa bloom event records into a spatially blocked logistic regression + random forest ensemble. converted raw satellite readings to monthly anomalies to capture trend signals over absolute values; applied spatial interpolation across cloud-induced data gaps. rule-based threshold filter post-processes model outputs to suppress low-confidence predictions. ~75% tpr with a two-month lead time, no local sensor infrastructure required.\nregional stockholm junior water prize · regional science fair 3rd place · presented at ncssm research symposium.",
  },
  {
    name: "nemo",
    timeframe: "mar 2026",
    description:
      "autonomous aquatic data-gathering submarine on a raspberry pi — water quality, temperature, and depth sensors with a remote navigation interface. next.js dashboard for real-time sensor streaming, historical trend analysis, and geospatial mapping of environmental readings. architected for multi-unit global deployment so additional units feed into a unified modeling layer without infrastructure changes.\nbuilt for smath hacks 2026.",
  },
  {
    name: "memo",
    timeframe: "aug 2025 – dec 2025",
    description:
      "wearable audio capture device on a raspberry pi with a two-mode recording interface — forward-trigger continuous capture and a reverse-buffer mode that retroactively saves the prior 60 seconds of audio. recordings run through openai whisper for on-device transcription, then gpt-4o via api to extract structured summaries and to-do lists. paired react native mobile app handles cloud sync, time/date/location tagging, and natural language search over transcript history.\nbacked by the ncssm colopy entrepreneurship fund · 2nd most innovative venture, ncssm entrepreneurship fair · selected for ncssm entrepreneurship program, fall 2025.",
  },
  {
    name: "thinkclear",
    timeframe: "jul 2025 – dec 2025",
    description:
      "facial recognition pipeline on a raspberry pi + camera module using deepface for real-time identity matching, integrated into a smart glasses form factor to surface contextual memory cues for users with early-to-mid stage dementia. paired with a react native-backed web app delivering ai-powered memory matching games clinically targeting cognitive retention — designed to slow dementia progression through spaced repetition and personalized recall challenges. 400k+ interactions across the web platform.\npitched to the ceo of an 8-figure digital therapeutics company and penn faculty · m&tsi 2025.",
  },
  {
    name: "engage360",
    timeframe: "aug 2024 – oct 2024",
    description:
      "civic engagement platform in next.js consolidating voter registration, representative lookup, and issue tracking into a single interface — reducing the friction of navigating fragmented government data sources.\ngrand winner, 2025 congressional app challenge · presented to congressman timmons (sc-04).",
  },
  {
    name: "patent 11610482",
    timeframe: "pedestrian crosswalk warning system",
    description:
      "real-time pedestrian detection and motorist alert system using an ultrasonic sensor array deployed at traffic intersections. continuously measures proximity of pedestrians in crosswalk zones and triggers alerts to approaching motorists below a distance threshold, reducing collision risk without camera-based infrastructure or cv compute overhead.\ncollaborated with 20+ department of transportation officials for compliance validation and field testing · u.s. patent 11610482.",
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
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="text-lg font-bold text-black">{project.name}</h2>
                {project.timeframe && (
                  <span className="text-xs font-mono text-gray-400">{project.timeframe}</span>
                )}
              </div>
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
