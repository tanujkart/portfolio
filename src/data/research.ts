// Research entries, same shape as src/data/projects.ts so the two pages share
// one structure: name, period, blurb, exactly three highlights, tags, receipts.
//
// Before this file the research page was four loose paragraphs per entry with
// no dates, no tags, and its three awards buried in the last sentence.

import type { ProjectLink } from "@/data/projects";

export type ResearchEntry = {
  slug: string;
  /** Short name people say out loud. */
  name: string;
  /** The full academic title, if the short name is an acronym. */
  fullTitle?: string;
  /** "YYYY-MM", or null when the timeframe isn't recorded. */
  date: string | null;
  /** One sentence: what question this asks. */
  blurb: string;
  /** Exactly three — awards, methods, hard numbers. Same rule as projects. */
  highlights: [string, string, string];
  /** Body paragraphs. */
  body: string[];
  tags: string[];
  links: ProjectLink[];
  /** Path under public/ to a PDF that can be read inline, behind a toggle. */
  paper?: { src: string; label: string };
};

export const research: ResearchEntry[] = [
  {
    slug: "hotspot",
    name: "HOTSPOT",
    fullTitle: "Hybrid Oceanic Tracking via Satellite Proxy and Optimized Time-Series",
    // The paper's own cover page is dated 27 September 2025.
    date: "2025-09",
    blurb:
      "How remote sensing and time-series modeling can infer nutrient-driven ecological change in marine environments.",
    highlights: [
      "Won the Stockholm Regional Water Prize",
      "3rd at regionals, and advanced to the state science fair",
      "Constraint filters and time-series interpolation to reconstruct missing data",
    ],
    body: [
      "Designed ecological constraint filters and local time-series interpolation to reconstruct missing data and enforce physically consistent predictions.",
      "Focused on reducing false positives and improving reliability so environmental forecasts remain usable in real-world monitoring settings.",
    ],
    tags: ["remote sensing", "time-series", "environmental sensing"],
    links: [{ kind: "pdf", label: "Paper (PDF)", href: "/research/hotspot-paper.pdf" }],
    paper: { src: "/research/hotspot-paper.pdf", label: "HOTSPOT paper" },
  },
  {
    slug: "mechanistic-interpretability",
    name: "Mechanistic Interpretability",
    date: null, // TODO: no timeframe recorded for this one.
    blurb:
      "How neural networks represent concepts internally, read through modern interpretability methods.",
    highlights: [
      "Synthesized 30+ papers on modern mechanistic interpretability",
      "Feature discovery, probing, activation patching and weight-based analysis",
      "NCSSM Research in Computational Science program",
    ],
    body: [
      "Analyzed feature discovery, probing, activation patching, and weight-based analysis to understand how models encode and manipulate information.",
      "Focused on representation geometry, sparse feature directions, and toy models that reveal mechanisms like superposition and grokking.",
    ],
    tags: ["interpretability", "neural networks", "machine learning"],
    // TODO(receipts): no artifact. A writeup or reading list would make this
    // checkable rather than asserted — it is the only entry on either page
    // with nothing to click.
    links: [],
  },
];

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

export function formatResearchDate(entry: ResearchEntry): string | null {
  if (!entry.date) return null;
  const [y, m] = entry.date.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}
