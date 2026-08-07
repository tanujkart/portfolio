// Single source of truth for the projects section.
//
//   projects.ts
//        │
//        ├──► /projects                    grid: featured tier + compact tier
//        ├──► /projects/tag/[tag]          same grid, filtered, tiers collapsed
//        ├──► /projects/[slug]             detail page (full story, or thin)
//        └──► /projects/[slug]/opengraph-image   auto-generated share card
//
// Adding a project = adding one object below. `npm run build` runs
// scripts/validate-projects.ts, which fails the build on a duplicate slug,
// a missing image file, an unknown pill, or a malformed date.

export type CategoryKey = "fe" | "be" | "hw" | "ai" | "sci";

export type ProjectStatus = "active" | "shipped" | "archived";

export type LinkKind = "live" | "repo" | "pdf" | "award" | "patent" | "demo";

export type ProjectLink = {
  kind: LinkKind;
  label: string;
  href: string;
};

export type ProjectStory = {
  problem: string;
  approach: string;
  outcome: string;
  media?: {
    /** Path under public/. Validated to exist on disk at build time. */
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Renders a sandboxed, poster-backed interactive embed below the story. */
  embed?: {
    /** Path under public/ to a standalone index.html. */
    src: string;
    /** Shown while loading and if the embed never comes up. Required. */
    poster: string;
    posterAlt: string;
    title: string;
  };
};

export type Project = {
  slug: string;
  name: string;
  /** "YYYY-MM". Machine-sortable — never parse the display string. */
  start: string;
  /** "YYYY-MM", or null for ongoing work. */
  end: string | null;
  status: ProjectStatus;
  featured: boolean;
  /** Grid card summary. Keep to roughly two lines. */
  blurb: string;
  /**
   * Exactly three, shown as bullets at the top of the detail page. This is the
   * scannable version of the project — stack, awards, hard numbers. It runs
   * ABOVE the prose, because a visitor who reads nothing else should still
   * leave knowing these three things. Validated at exactly 3 so it stays a
   * summary rather than drifting into a list.
   */
  highlights: [string, string, string];
  /** Escape hatch for dates the formatter can't express (e.g. "granted"). */
  dateLabel?: string;
  story?: ProjectStory;
  links: ProjectLink[];
  pills: string[];
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const CATEGORIES: { key: CategoryKey; label: string; chip: string }[] = [
  { key: "fe", label: "frontend", chip: "border-purple-300/60 bg-purple-100/60 text-purple-800" },
  { key: "be", label: "backend", chip: "border-emerald-300/60 bg-emerald-100/60 text-emerald-800" },
  { key: "hw", label: "hardware", chip: "border-orange-300/70 bg-orange-100/60 text-orange-800" },
  { key: "ai", label: "AI/ML", chip: "border-pink-300/60 bg-pink-100/60 text-pink-800" },
  { key: "sci", label: "modeling", chip: "border-sky-300/60 bg-sky-100/60 text-sky-800" },
];

export const CATEGORY_BY_KEY = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, (typeof CATEGORIES)[number]>;

// A label maps to exactly one category, here and nowhere else. This is what
// makes "product design is orange on one card and purple on another"
// impossible rather than merely unlikely.
export const PILL_CATEGORY: Record<string, CategoryKey> = {
  // frontend
  "Next.js": "fe",
  "React Native": "fe",
  "UI/UX": "fe",
  "mobile dev": "fe",
  "product design": "fe",
  "HTML canvas": "fe",
  // backend
  TypeScript: "be",
  Python: "be",
  FastAPI: "be",
  "full-stack": "be",
  algorithms: "be",
  "Google APIs": "be",
  // hardware
  "embedded systems": "hw",
  "circuit design": "hw",
  "digital logic": "hw",
  schematics: "hw",
  robotics: "hw",
  "sensor fusion": "hw",
  "environmental sensing": "hw",
  hardware: "hw",
  // AI/ML
  "computer vision": "ai",
  NLP: "ai",
  "machine learning": "ai",
  "speech recognition": "ai",
  "Claude API": "ai",
  "data augmentation": "ai",
  // modeling & simulation
  simulation: "sci",
  "mathematical modeling": "sci",
  "differential equations": "sci",
  eutrophication: "sci",
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
//
// FEATURED: exactly three — thinkclear, nemo, and the granted patent. The
// grid is built for three; change EXPECTED_FEATURED in scripts/validate-
// projects.ts and the lg:grid-cols-3 in ProjectsIndex together if that changes.
//
// STATUS: only mark `active` what you are genuinely still building. A live
// indicator on a dormant repo is worse than no indicator.

export const projects: Project[] = [
  {
    slug: "thinkclear",
    name: "thinkclear",
    start: "2025-07",
    end: null,
    status: "active",
    featured: true,
    blurb:
      "Smart glasses with real-time facial recognition and AI memory assistance, built for memory-impaired users.",
    highlights: [
      "Demoed to an 8-figure digital therapeutics CEO and Penn faculty at M&TSI 2025",
      "400K+ interactions across demos and deployments",
      "Computer vision running on embedded hardware, with a full-stack application layer",
    ],
    story: {
      problem:
        "People living with memory impairment lose the thread of who they are talking to. The social cost compounds: conversations get avoided, isolation deepens, and the tools that exist are clinical rather than wearable.",
      approach:
        "A smart glasses platform pairing real-time facial recognition with AI-powered memory assistance, spanning embedded hardware, computer vision, and a full-stack application layer.",
      outcome:
        "Demoed to an 8-figure digital therapeutics CEO and Penn faculty at M&TSI 2025. 400K+ interactions across demos and deployments.",
    },
    links: [{ kind: "live", label: "thinkclear.net", href: "https://thinkclear.net" }],
    pills: ["computer vision", "embedded systems", "full-stack"],
  },
  {
    slug: "nemo",
    name: "nemo",
    start: "2026-03",
    end: "2026-03",
    status: "shipped",
    featured: true,
    blurb:
      "Autonomous underwater vehicle for aquatic environmental monitoring, paired with a live global modeling dashboard.",
    highlights: [
      "Competed at SMath Hacks 2026",
      "Live global dashboard tracking water quality and ecological indicators",
      "Autonomous underwater vehicle over a FastAPI backend",
    ],
    story: {
      problem:
        "Aquatic monitoring data is gathered by hand, from a handful of fixed points, on a slow cadence. By the time a water-quality problem surfaces in a report, the conditions that produced it have already moved.",
      approach:
        "An autonomous underwater vehicle that samples aquatic conditions in real time, paired with a live global modeling dashboard served from a FastAPI backend.",
      outcome:
        "Competed at SMath Hacks 2026, tracking water quality and ecological indicators.",
    },
    links: [{ kind: "demo", label: "Devpost", href: "https://devpost.com/software/nemo-7vrum0" }],
    pills: ["robotics", "environmental sensing", "FastAPI"],
  },
  {
    slug: "patent-11610482",
    name: "patent 11610482",
    start: "2023-03",
    end: "2023-03",
    dateLabel: "granted mar 2023",
    status: "active",
    featured: true,
    blurb:
      "Granted patent: embedded sensor system that detects pedestrians in active crosswalks and alerts approaching motorists.",
    highlights: [
      "Granted as US Patent 11610482",
      "In compliance testing with 20+ Department of Transportation officials",
      "Sensor fusion and custom circuit design in a roadside unit",
    ],
    story: {
      problem:
        "Drivers approaching a crosswalk often cannot see a pedestrian already in it — at night, in rain, or around a blind corner. The warning has to reach the driver before the sightline does.",
      approach:
        "An embedded sensor system that detects pedestrians in an active crosswalk and alerts approaching motorists in real time, combining circuit design and sensor fusion in a roadside unit.",
      outcome:
        "Granted as US Patent 11610482. Currently in compliance testing with 20+ Department of Transportation officials, working toward municipal deployment.",
    },
    links: [
      { kind: "patent", label: "US 11610482", href: "https://patents.justia.com/patent/11610482" },
    ],
    pills: ["circuit design", "sensor fusion", "hardware"],
  },

  // ----- everything else -------------------------------------------------

  {
    slug: "tagopt",
    name: "tagopt",
    start: "2025-11",
    end: null,
    status: "active",
    featured: false,
    blurb:
      "AI hashtag optimization engine that reads platform algorithms and post intent to surface high-signal tags.",
    highlights: [
      "Pitched to VCs as a standalone growth tool for creators",
      "Reads platform algorithms and post intent, not just keyword frequency",
      "Next.js front end over an NLP scoring engine",
    ],
    story: {
      problem:
        "Organic reach on social platforms is gated by tag selection, and creators pick tags by folklore. There is no SEO layer for the part of content distribution that actually decides who sees it.",
      approach:
        "An engine that analyzes platform algorithms and post intent to surface high-signal tags, built as a standalone growth tool rather than a feature bolted onto a scheduler.",
      outcome: "Pitched to VCs as a standalone growth tool for creators.",
    },
    links: [{ kind: "live", label: "tagopt.com", href: "https://tagopt.com" }],
    pills: ["Next.js", "NLP", "full-stack"],
  },
  {
    slug: "engage360",
    name: "engage360",
    start: "2024-10",
    end: "2025-01",
    status: "shipped",
    featured: false,
    blurb:
      "Civic engagement app connecting constituents to representatives and simplifying local legislation tracking.",
    highlights: [
      "Won the Congressional App Challenge 2025",
      "Presented to Congressman Timmons",
      "React Native and TypeScript, built and shipped end to end",
    ],
    story: {
      problem:
        "Local legislation is where policy actually touches people, and it is also where it is hardest to follow. Constituents who want to engage cannot easily find what is being voted on or who to contact about it.",
      approach:
        "A React Native mobile app that connects constituents to their representatives and simplifies tracking of local legislation, built and shipped end to end.",
      outcome:
        "Won the Congressional App Challenge 2025 and presented to Congressman Timmons.",
    },
    links: [
      {
        kind: "award",
        label: "Congressional App Challenge",
        href: "https://www.congressionalappchallenge.us/24-sc04/",
      },
    ],
    pills: ["React Native", "mobile dev", "TypeScript"],
  },
  {
    slug: "voice-assistant",
    name: "voice assistant",
    start: "2026-05",
    end: "2026-05",
    status: "shipped",
    featured: false,
    blurb:
      "macOS push-to-talk assistant that answers questions about your Calendar, Tasks, and Gmail out loud. Transcription runs on-device.",
    highlights: [
      "On-device transcription via Whisper — only the text query leaves the machine",
      "Claude reasons over live Google Calendar, Tasks and Gmail data",
      "Python, push-to-talk hotkey, spoken responses on macOS",
    ],
    links: [
      { kind: "repo", label: "GitHub", href: "https://github.com/tanujkart/voice-assistant" },
    ],
    pills: ["Python", "speech recognition", "Claude API", "Google APIs"],
  },
  {
    slug: "algal-bloom-simulator",
    name: "algal bloom simulator",
    start: "2026-05",
    end: "2026-05",
    status: "shipped",
    featured: false,
    blurb:
      "Interactive eutrophication model that drives a virtual lake toward a toxic cyanobacterial bloom in real time.",
    highlights: [
      "Tune fertilizer runoff, temperature, sunlight and water flow live",
      "Models dissolved oxygen crash, microcystin toxicity and fish die-off",
      "HTML canvas visualization of the nutrient-pollution feedback loop",
    ],
    // To turn on the live embed: drop the standalone build into
    // public/demos/algal-bloom/, add a screenshot, then add a `story` with an
    // `embed` block. The component renders the poster until the sim loads and
    // keeps showing it if the sim never does.
    links: [{ kind: "repo", label: "GitHub", href: "https://github.com/tanujkart/esfinal26" }],
    pills: ["eutrophication", "simulation", "HTML canvas"],
  },
  {
    slug: "4-bit-adder-subtractor",
    name: "4-bit adder/subtractor",
    start: "2026-04",
    end: "2026-05",
    status: "shipped",
    featured: false,
    blurb:
      "Physical binary arithmetic circuit built from scratch. Real-time addition and subtraction on 4-bit inputs via a single mode toggle.",
    highlights: [
      "Addition and subtraction on 4-bit inputs from a single mode toggle",
      "Carry-out and sum wired to indicator LEDs",
      "Designed from schematic through to the physical build",
    ],
    links: [
      { kind: "pdf", label: "Writeup (PDF)", href: "/projects/4-bit-adder-subtractor.pdf" },
    ],
    pills: ["circuit design", "digital logic", "schematics"],
  },
  {
    slug: "memo",
    name: "memo",
    start: "2025-08",
    end: "2025-12",
    status: "shipped",
    featured: false,
    blurb:
      "Wearable recorder with on-device AI summarization and structured note output. No cloud dependency.",
    highlights: [
      "Backed by the NCSSM Colopy Entrepreneurship Fund",
      "2nd most innovative product at the NCSSM entrepreneurship fair",
      "On-device summarization with no cloud dependency",
    ],
    // TODO(receipts): both claims above are checkable but have no link. A fair
    // listing or a photo would close this.
    links: [],
    pills: ["embedded systems", "NLP", "product design"],
  },
  {
    slug: "portfolio",
    name: "portfolio",
    start: "2025-08",
    end: null,
    status: "active",
    featured: false,
    blurb:
      "This site. Built from scratch, no templates. Static, typed, and validated at build time.",
    highlights: [
      "Next.js and TypeScript from scratch, no templates",
      "Every page statically generated; project data validated at build time",
      "Documented design system: five-step type scale, 24px touch-target floor",
    ],
    links: [{ kind: "repo", label: "GitHub", href: "https://github.com/tanujkart/portfolio" }],
    pills: ["Next.js", "UI/UX", "TypeScript"],
  },
  {
    slug: "predator-prey-model",
    name: "predator-prey model",
    start: "2025-01",
    end: "2025-01",
    status: "shipped",
    featured: false,
    blurb:
      "Lotka-Volterra population dynamics in Mathematica, with adjustable parameters, phase plane plots, and equilibrium analysis.",
    highlights: [
      "Lotka-Volterra differential equations modeled in Mathematica",
      "Adjustable parameters, time-series plots and phase plane visualizations",
      "Equilibrium analysis of cyclical population behavior",
    ],
    links: [{ kind: "repo", label: "GitHub", href: "https://github.com/tanujkart/predatorprey" }],
    pills: ["mathematical modeling", "differential equations", "simulation"],
  },
  {
    slug: "student-work-optimization-tool",
    name: "student work optimization tool",
    start: "2023-12",
    end: "2024-02",
    status: "archived",
    featured: false,
    blurb:
      "Student productivity tool with algorithm-driven task prioritization and real-time assignment tracking.",
    highlights: [
      "Algorithm-driven task prioritization",
      "Real-time assignment tracking",
      "Designed to reduce cognitive load around deadlines",
    ],
    // TODO(receipts): no artifact. A repo, a screenshot, or a short writeup
    // would make this checkable instead of asserted.
    links: [],
    pills: ["algorithms", "full-stack", "product design"],
  },
  {
    slug: "pneumonia-detection",
    name: "pneumonia detection algorithm",
    start: "2023-06",
    end: "2023-07",
    status: "archived",
    featured: false,
    blurb:
      "ML model trained on 2,400 labeled lung images, detecting pneumonia at 85% accuracy with augmentation for robustness.",
    highlights: [
      "85% accuracy on 2,400 labeled lung images",
      "Data augmentation applied to improve model robustness",
      "Findings and clinical applications presented to a technical audience",
    ],
    // TODO(receipts): the 85%-on-2,400-images claim is the most specific
    // number on this page and the least verifiable. Slides or a notebook
    // would fix that.
    links: [],
    pills: ["machine learning", "computer vision", "data augmentation"],
  },
];

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function parse(ym: string): { year: number; month: number } {
  const [y, m] = ym.split("-");
  return { year: Number(y), month: Number(m) };
}

/** "jul 2025 – present", "apr – may 2026", "may 2026". */
export function formatDateRange(project: Project): string {
  if (project.dateLabel) return project.dateLabel;

  const s = parse(project.start);
  const startLabel = `${MONTHS[s.month - 1]} ${s.year}`;

  if (project.end === null) return `${startLabel} – present`;

  const e = parse(project.end);
  if (e.year === s.year && e.month === s.month) return startLabel;
  if (e.year === s.year) {
    return `${MONTHS[s.month - 1]} – ${MONTHS[e.month - 1]} ${e.year}`;
  }
  return `${startLabel} – ${MONTHS[e.month - 1]} ${e.year}`;
}

export function categoryOf(pill: string): CategoryKey | undefined {
  return PILL_CATEGORY[pill];
}

export function categoriesOf(project: Project): CategoryKey[] {
  const seen = new Set<CategoryKey>();
  for (const pill of project.pills) {
    const key = categoryOf(pill);
    if (key) seen.add(key);
  }
  return [...seen];
}

/** Ongoing work first, then most recently finished. Stable and total. */
export function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    const aEnd = a.end ?? "9999-99";
    const bEnd = b.end ?? "9999-99";
    if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
    if (a.start !== b.start) return b.start.localeCompare(a.start);
    return a.slug.localeCompare(b.slug);
  });
}

export const sortedProjects = sortProjects(projects);

export function projectsForTag(key: CategoryKey): Project[] {
  return sortedProjects.filter((p) => categoriesOf(p).includes(key));
}

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
