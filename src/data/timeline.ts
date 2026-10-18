export type TimelineEntry = {
  dates: string;
  org: string;
  href?: string;
  logo?: string; // under /public
  blurb: string;
  current?: boolean;
};

// Oldest first, by start date.
export const TIMELINE: TimelineEntry[] = [
  {
    dates: "Aug – Dec 2024",
    org: "DocuBridge",
    href: "https://docubridge.ai",
    logo: "/logos/docubridge.png",
    blurb: "Helped build an agentic financial modeling startup and contributed to a 7-figure raise.",
  },
  {
    dates: "Jan 2025 – Jul 2026",
    org: "Duke University",
    logo: "/logos/duke.png",
    blurb: "Performed AI modeling research for spatiotemporal climate forecasting.",
  },
  {
    dates: "Jul 2025",
    org: "University of Pennsylvania",
    logo: "/logos/penn.png",
    blurb: "Built an AI dementia-care smart glasses at Penn’s M&TSI that handled 400k interactions in 7 days.",
  },
  {
    dates: "Aug 2025 – May 2026",
    org: "NCSSM Foundation",
    href: "https://www.ncssm.edu",
    logo: "/logos/ncssm.png",
    blurb: "Digitized paper records into digital donor-tracking dashboards for the 9-figure endowment fund.",
  },
  {
    dates: "May – Aug 2026",
    org: "Effluent",
    href: "https://effluent.ai",
    logo: "/logos/effluent.svg",
    blurb: "Came on for foundational ML work, but pivoted to growth, shifting from utilities to consultants and building a fully automated CRM.",
  },
  {
    dates: "Jun 2026 – Present",
    org: "MoE Capital",
    href: "https://moe-capital.com/",
    logo: "/logos/moe.png",
    blurb: "Building internal AI tools for due diligence and knowledge tracking.",
    current: true,
  },
];

export const INTERESTS = "Broadly interested in medicine and health and the technology around it.";
export const ALSO = "Also interested in ravioli and running :)";
