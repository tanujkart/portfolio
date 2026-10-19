// The cards on /projects. Adding a project to the list = adding one object here, in display
// order (newest first). `slug` ties a card to its entry in projects.ts, which still owns the
// /projects/[slug] page; a project flagged `hidden` there is skipped. Text is rendered
// exactly as written below.

export type ListLinkKind = "site" | "github" | "video" | "devpost" | "doc";

export type ListLink = { kind: ListLinkKind; href: string };

/** fe purple, be green, hw coral, ai pink, db blue, sci teal. */
export type SkillCategory = "fe" | "be" | "hw" | "ai" | "db" | "sci";

export type Skill = { label: string; category: SkillCategory };

export type ListImage = {
  /** Under public/, /projects/<slug>.<ext>. */
  src: string;
  alt: string;
};

export type ListedProject = {
  slug: string;
  name: string;
  date: string;
  /** 2 to 3 bullets. */
  bullets: string[];
  skills: Skill[];
  /** Cover image. Without one the card draws a tinted placeholder. */
  image?: ListImage;
  /** Placeholder tint when it should differ from the most common skill colour. */
  placeholderColor?: SkillCategory;
  /** Fill colour for the bars around a "contain"-fitted image. Default #f1efe9. */
  imageBg?: string;
  /** Zoom, default 1. Above 1 enlarges the image inside the clipped frame. */
  imageScale?: number;
  /** CSS object-position, default "center". Shifts the image, most useful once scaled. */
  imagePosition?: string;
  links: ListLink[];
};

// Card images are fitted whole (object-fit: contain) into a 16:9 frame, so nothing is ever
// cropped. Three optional per-project fields tune how an image sits in that frame:
//   imageBg        solid colour behind the image, shown as bars where the aspect ratio does not
//                  match 16:9. Match it to the image's own background so the bars disappear.
//   imageScale     1 = whole image. Try 1.1 to 1.2 for a small subject; anything the scale
//                  pushes past the frame is clipped, so check the edges after changing it.
//   imagePosition  object-position, e.g. "center 30%" or "left center". Shifts the image
//                  inside the frame; it only shows once the image is scaled up.
// Projects with no `image` draw a tinted placeholder and ignore all three.

export const PROJECT_LIST: ListedProject[] = [
  {
    slug: "onbrdy",
    name: "onbrdy",
    date: "may 2026 to present",
    bullets: [
      "Company brain that connects to a team's tools (GitHub, Slack, Notion, Google Workspace) and builds a personalized ramp plan for each new hire",
      "Digs through real work like code, past discussions, and incident history, so new hires get the context they need to start contributing",
      "Running with three pilot companies, after conversations with 30+ startups",
    ],
    skills: [
      { label: "next.js", category: "fe" },
      { label: "python", category: "be" },
      { label: "fastapi", category: "be" },
      { label: "supabase", category: "db" },
      { label: "pgvector", category: "db" },
      { label: "claude api", category: "ai" },
      { label: "knowledge graph", category: "ai" },
    ],
    image: {
      src: "/projects/onbrdy.jpg",
      alt: "onbrdy logo: a black ring with a diagonal gap",
    },
    imageBg: "#fefefe",
    imageScale: 1.4,
    links: [{ kind: "site", href: "https://onbrdy.vercel.app" }],
  },
  {
    slug: "synced",
    name: "synced",
    date: "sep 2026 to present",
    bullets: [
      "NFC keychain tag linked to an encrypted, patient-controlled health profile that first responders can pull up in an emergency",
      "Tag works without wifi or cell service, and the profile updates as new health information comes in",
      "Designed for uninsured, migrant, and unstably housed patients; pitched at the UNC Gillings School competition with a working prototype",
    ],
    skills: [
      { label: "nfc", category: "hw" },
      { label: "encryption", category: "be" },
      { label: "front end", category: "fe" },
    ],
    // Temporary: a video thumbnail. Replace with a prototype photo at /projects/synced.jpg.
    image: {
      src: "/projects/synced.jpg",
      alt: "synced team in the pitch video (temporary thumbnail)",
    },
    links: [{ kind: "video", href: "https://youtu.be/NOHQLEZcKQA" }],
  },
  {
    slug: "reachcare",
    name: "reachcare",
    date: "oct 2026",
    bullets: [
      "Scores 2,637 census tracts on health need and transportation barriers, then picks free mobile clinic sites with a greedy coverage algorithm",
      "Reruns site selection across seven need versus access weightings so planners can see which recommendations hold up",
      "Texts nearby residents when a clinic is scheduled and replies to texts and voice notes in their own language",
    ],
    skills: [
      { label: "python", category: "be" },
      { label: "numpy", category: "ai" },
      { label: "node.js", category: "be" },
      { label: "javascript", category: "fe" },
      { label: "gemini api", category: "ai" },
      { label: "voice ai", category: "ai" },
      { label: "geospatial analysis", category: "sci" },
    ],
    image: {
      src: "/projects/reachcare.jpg",
      alt: "reachcare simulation result: a map of census tracts around a hospital with three suggested clinic sites",
    },
    imageBg: "#ffffff",
    imageScale: 1.12,
    links: [
      { kind: "site", href: "https://reachcare.vercel.app/" },
      { kind: "github", href: "https://github.com/jimmxchen/ReachCare" },
      { kind: "video", href: "https://youtu.be/Fim365-ljyM" },
      { kind: "devpost", href: "https://devpost.com/software/reach-17fimz" },
    ],
  },
  {
    slug: "nemo",
    name: "nemo",
    date: "mar 2026",
    bullets: [
      "Small submarine carrying temperature, turbidity, and pH sensors on an ESP32, sending readings with GPS location and time",
      "Live dashboard maps readings on a 3D and 2D globe with ocean color mapping and click-to-measure",
      "Built at SMathHacks 2026 as a prototype; sensor calibration is the next step",
    ],
    skills: [
      { label: "embedded systems", category: "hw" },
      { label: "c++", category: "hw" },
      { label: "iot", category: "hw" },
      { label: "3d printing", category: "hw" },
      { label: "data visualization", category: "fe" },
    ],
    image: {
      src: "/projects/nemo.jpg",
      alt: "nemo mini submarine prototype on a table",
    },
    imageBg: "#c9b595",
    links: [
      { kind: "site", href: "https://nemo-brown.vercel.app/" },
      { kind: "github", href: "https://github.com/tanujkart/nemo" },
      { kind: "video", href: "https://youtu.be/F3uLsprVWcY" },
      { kind: "devpost", href: "https://devpost.com/software/nemo-7vrum0" },
    ],
  },
  {
    slug: "4-bit-adder-subtractor",
    name: "4-bit adder/subtractor",
    date: "apr to may 2026",
    bullets: [
      "Physical circuit that adds and subtracts two 4-bit numbers, switching modes with a single toggle",
      "Subtraction uses XOR gates to invert the second input plus a carry-in of 1, implementing two's complement",
      "Results show on LEDs and seven-segment displays, built from TTL logic chips for an electrical engineering final project",
    ],
    skills: [
      { label: "digital logic", category: "hw" },
      { label: "circuit design", category: "hw" },
      { label: "hardware debugging", category: "hw" },
    ],
    image: {
      src: "/projects/4-bit-adder-subtractor.jpg",
      alt: "4-bit adder/subtractor circuit built on breadboards with seven-segment displays",
    },
    imageBg: "#484f51",
    imageScale: 1.12,
    links: [
      {
        kind: "doc",
        href: "https://tanujk.com/projects/4-bit-adder-subtractor.pdf",
      },
    ],
  },
  {
    slug: "hotspot",
    name: "hotspot",
    date: "jan 2025 to may 2026",
    bullets: [
      "Combines MODIS Aqua satellite data with World Ocean Atlas phosphate records to flag harmful algal bloom conditions early",
      "Ensemble of logistic regression and random forest, scored with spatially blocked cross-validation and a penalty that treats a missed bloom as five times worse than a false alarm",
      "Mentored by Dr. Daniel Egger at Duke; presented at the NCSSM Research Symposium",
    ],
    skills: [
      { label: "python", category: "be" },
      { label: "remote sensing", category: "sci" },
      { label: "time-series modeling", category: "sci" },
      { label: "machine learning", category: "ai" },
    ],
    image: {
      src: "/projects/hotspot.jpg",
      alt: "hotspot cover illustration: a surface with red peaks above translucent grid columns",
    },
    imageBg: "#ffffff",
    imageScale: 1.05,
    links: [
      { kind: "doc", href: "https://tanujk.com/research/hotspot-paper.pdf" },
    ],
  },
  {
    slug: "tagopt",
    name: "tagopt",
    date: "nov 2025 to present",
    bullets: [
      "AI hashtag optimization tool that reads platform algorithms and post intent to recommend high-signal tags",
      "Full-stack web app with authentication and a Postgres database, deployed on Vercel",
    ],
    // No github link: the repo is still private.
    skills: [
      { label: "next.js", category: "fe" },
      { label: "typescript", category: "fe" },
      { label: "nlp", category: "ai" },
      { label: "postgres", category: "db" },
      { label: "authentication", category: "be" },
    ],
    image: {
      src: "/projects/tagopt.svg",
      alt: "tagopt logo: a hashtag in an indigo rounded square",
    },
    imageBg: "#e9ebfa",
    links: [{ kind: "site", href: "https://tagopt.com" }],
  },
  {
    slug: "memo",
    name: "memo",
    date: "aug to dec 2025",
    bullets: [
      "Wearable recorder built on a Raspberry Pi that captures speech and turns it into structured notes",
      "Paired with a React Native companion app",
      "Funded by the NCSSM Colopy Entrepreneurship Fund",
    ],
    skills: [
      { label: "embedded systems", category: "hw" },
      { label: "speech-to-text", category: "ai" },
      { label: "react native", category: "fe" },
      { label: "product design", category: "fe" },
    ],
    image: {
      src: "/projects/memo.svg",
      alt: "memo logo: a coral circle with sound-wave bars",
    },
    imageBg: "#fff1ec",
    links: [],
  },
  {
    slug: "thinkclear",
    name: "thinkclear",
    date: "jul to dec 2025",
    bullets: [
      "Smart glasses on a Raspberry Pi that recognize faces and surface who someone is for people with memory loss",
      "Companion caregiver dashboard backed by a Flask API",
      "Started at Penn's Management and Technology Summer Institute; reached 400K+ web interactions in 7 days",
    ],
    skills: [
      { label: "computer vision", category: "ai" },
      { label: "embedded systems", category: "hw" },
      { label: "python", category: "be" },
      { label: "flask", category: "be" },
      { label: "next.js", category: "fe" },
    ],
    image: {
      src: "/projects/thinkclear.jpg",
      alt: "thinkclear team slide from Penn M&TSI 2025 with the blue hippo logo",
    },
    links: [
      { kind: "video", href: "https://youtu.be/kr45kQ00uWc" },
      { kind: "devpost", href: "https://devpost.com/software/thi-k-clear" },
    ],
  },
  {
    slug: "engage360",
    name: "engage360",
    date: "oct 2024 to jan 2025",
    bullets: [
      "Mobile app with daily civic quizzes, local events with RSVP, civic news, and a community feed",
      "Built with React Native and Expo",
      "Winner of the 2024 Congressional App Challenge for South Carolina's 4th district",
    ],
    skills: [
      { label: "react native", category: "fe" },
      { label: "expo", category: "fe" },
      { label: "mobile development", category: "fe" },
    ],
    image: {
      src: "/projects/engage360.svg",
      alt: "engage360 logo: a circular arrow around a check mark",
    },
    imageBg: "#e8eefb",
    links: [
      {
        kind: "site",
        href: "https://www.congressionalappchallenge.us/24-sc04/",
      },
      { kind: "github", href: "https://github.com/tanujkart/engage360" },
    ],
  },
  {
    slug: "patent-11610482",
    name: "patent 11610482",
    date: "granted mar 2023",
    bullets: [
      "Adds a white warning light to existing traffic signals that tells approaching drivers a pedestrian is crossing",
      "Syncs with the standard signal and walk light, staying off for normal green traffic and flashing while pedestrians cross",
      "Filed March 2021 and granted March 2023; one of six named inventors",
    ],
    skills: [
      { label: "systems design", category: "hw" },
      { label: "intellectual property", category: "sci" },
    ],
    image: {
      src: "/projects/patent-11610482.jpg",
      alt: "rendering of a traffic signal with an added white warning light beside the red, yellow and green lights",
    },
    imageBg: "#625e5b",
    links: [
      { kind: "doc", href: "https://patents.justia.com/patent/11610482" },
    ],
  },
];
