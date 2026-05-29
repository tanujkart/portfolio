import Link from "next/link";

type Category = "fe" | "be" | "hw" | "ai" | "db";

type Pill = {
  label: string;
  category: Category;
};

type Project = {
  name: string;
  date: string;
  href?: string;
  description: string;
  pills: Pill[];
};

const categoryStyles: Record<Category, string> = {
  // frontend — purple
  fe: "border-purple-300/60 bg-purple-100/60 text-purple-700",
  // backend — green
  be: "border-emerald-300/60 bg-emerald-100/60 text-emerald-700",
  // hardware — coral/orange
  hw: "border-orange-300/70 bg-orange-100/60 text-orange-700",
  // AI/ML — pink
  ai: "border-pink-300/60 bg-pink-100/60 text-pink-700",
  // database — blue
  db: "border-sky-300/60 bg-sky-100/60 text-sky-700",
};

const projects: Project[] = [
  {
    name: "thinkclear",
    date: "jul 2025 – present",
    href: "https://thinkclear.net",
    description:
      "Smart glasses platform with real-time facial recognition and AI-powered memory assistance — built for memory-impaired users. Demoed to an 8-figure digital therapeutics CEO and Penn faculty at M&TSI 2025. 400K+ interactions across demos and deployments.",
    pills: [
      { label: "computer vision", category: "ai" },
      { label: "embedded systems", category: "hw" },
      { label: "full-stack", category: "fe" },
    ],
  },
  {
    name: "tagopt",
    date: "nov 2025 – present",
    href: "https://tagopt.com",
    description:
      "AI-powered hashtag optimization engine that analyzes platform algorithms and post intent to surface high-signal tags — an SEO layer for organic content growth. Pitched to VCs as a standalone growth tool for creators.",
    pills: [
      { label: "Next.js", category: "fe" },
      { label: "NLP", category: "ai" },
      { label: "full-stack", category: "fe" },
    ],
  },
  {
    name: "portfolio",
    date: "aug 2025 – present",
    href: "https://github.com/tanujkart/portfolio",
    description:
      "Personal site built from scratch — no templates. Documents projects, research, and writing with a focus on clarity and load speed. 30K+ interactions across visitors.",
    pills: [
      { label: "Next.js", category: "fe" },
      { label: "UI/UX", category: "fe" },
      { label: "TypeScript", category: "be" },
    ],
  },
  {
    name: "memo",
    date: "aug – dec 2025",
    description:
      "Wearable recorder with on-device AI summarization and structured note output — no cloud dependency. Backed by the NCSSM Colopy Entrepreneurship Fund and awarded 2nd most innovative product at the NCSSM entrepreneurship fair.",
    pills: [
      { label: "embedded systems", category: "hw" },
      { label: "NLP", category: "ai" },
      { label: "product design", category: "hw" },
    ],
  },
  {
    name: "engage360",
    date: "oct 2024 – jan 2025",
    href: "https://www.congressionalappchallenge.us/24-sc04/",
    description:
      "Civic engagement app connecting constituents to representatives and simplifying local legislation tracking. Built and shipped end-to-end — won the Congressional App Challenge 2025 and presented to Congressman Timmons.",
    pills: [
      { label: "React Native", category: "fe" },
      { label: "mobile dev", category: "fe" },
      { label: "TypeScript", category: "be" },
    ],
  },
  {
    name: "nemo",
    date: "mar 2026",
    href: "https://devpost.com/software/nemo-7vrum0",
    description:
      "Autonomous underwater vehicle for real-time aquatic environmental monitoring, paired with a live global modeling dashboard. Competed at SMath Hacks 2026 tracking water quality and ecological indicators.",
    pills: [
      { label: "robotics", category: "hw" },
      { label: "environmental sensing", category: "hw" },
      { label: "FastAPI", category: "be" },
    ],
  },
  {
    name: "4-bit adder/subtractor",
    date: "apr – may 2026",
    description:
      "Designed and built a physical binary arithmetic circuit from scratch. Performs real-time addition and subtraction on 4-bit binary inputs via a single mode toggle, with carry-out and sum outputs wired to indicator LEDs.",
    pills: [
      { label: "circuit design", category: "hw" },
      { label: "digital logic", category: "hw" },
      { label: "schematics", category: "hw" },
    ],
  },
  {
    name: "student work optimization tool",
    date: "dec 2023 – feb 2024",
    description:
      "Built a student productivity tool with algorithm-driven task prioritization and real-time assignment tracking. Designed to reduce cognitive load and help students manage deadlines more effectively.",
    pills: [
      { label: "algorithms", category: "be" },
      { label: "full-stack", category: "fe" },
      { label: "product design", category: "fe" },
    ],
  },
  {
    name: "pneumonia detection algorithm",
    date: "jun – jul 2023",
    description:
      "Trained a machine learning model on 2,400 labeled lung images to detect pneumonia with 85% accuracy. Applied data augmentation to improve model robustness, then presented findings and real-world clinical applications to a technical audience.",
    pills: [
      { label: "machine learning", category: "ai" },
      { label: "computer vision", category: "ai" },
      { label: "data augmentation", category: "ai" },
    ],
  },
  {
    name: "predator-prey model",
    date: "jan 2025",
    href: "https://github.com/tanujkart/predatorprey",
    description:
      "Simulated predator and prey population dynamics using the Lotka-Volterra differential equations in Mathematica. Built adjustable parameter controls, time-series plots, phase plane visualizations, and equilibrium analysis to model cyclical ecological behavior.",
    pills: [
      { label: "mathematical modeling", category: "ai" },
      { label: "differential equations", category: "ai" },
      { label: "simulation", category: "be" },
    ],
  },
  {
    name: "algal bloom simulator",
    date: "may 2026",
    href: "https://github.com/tanujkart/esfinal26",
    description:
      "Interactive eutrophication model that drives a virtual lake toward a toxic cyanobacterial bloom in real time. Tune fertilizer runoff, temperature, sunlight, and water flow — then watch dissolved oxygen crash, microcystin toxicity spike, and fish die off across the lake. A live canvas visualization turns the nutrient-pollution feedback loop into something you can see and steer.",
    pills: [
      { label: "eutrophication", category: "ai" },
      { label: "simulation", category: "be" },
      { label: "HTML canvas", category: "fe" },
    ],
  },
  {
    name: "patent 11610482",
    date: "granted mar 2023",
    href: "https://patents.justia.com/patent/11610482",
    description:
      "Embedded sensor system that detects pedestrians in active crosswalks and alerts approaching motorists in real time. Currently in compliance testing with 20+ Department of Transportation officials working toward municipal deployment.",
    pills: [
      { label: "circuit design", category: "hw" },
      { label: "sensor fusion", category: "hw" },
      { label: "hardware", category: "hw" },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
      <Link
        href="/"
        className="text-gray-400 hover:text-black text-sm font-mono transition-colors"
      >
        ← Back
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">Projects</h1>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col rounded-[14px] border border-black/10 bg-white/60 p-5 transition-all hover:border-black/30 hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]"
          >
            <header className="flex items-baseline justify-between gap-3 mb-3">
              <h2 className="text-[16px] font-medium text-black leading-tight">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 decoration-gray-300 hover:decoration-black transition-colors"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h2>
              <span className="text-[11px] font-mono text-gray-400 shrink-0 whitespace-nowrap">
                {project.date}
              </span>
            </header>

            <p className="text-[13px] leading-[1.6] text-gray-600 flex-1">
              {project.description}
            </p>

            <hr className="border-0 border-t border-black/10 my-4" />

            <div className="flex flex-wrap gap-1.5">
              {project.pills.map((pill) => (
                <span
                  key={pill.label}
                  className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryStyles[pill.category]}`}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
