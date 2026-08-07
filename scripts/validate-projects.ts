/**
 * Build-time validation for src/data/projects.ts.
 *
 * Runs as `prebuild`, so a data error fails the Vercel deploy instead of
 * shipping a broken card you notice three weeks later. This exists because
 * the realistic failure on a static portfolio is not a logic bug — it is
 * adding a project at 1am and typoing an image path.
 *
 *   npm run validate     check without building
 *   npm run build        runs this first, aborts on any error
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  projects,
  PILL_CATEGORY,
  CATEGORIES,
  type Project,
} from "../src/data/projects";

const PUBLIC_DIR = join(process.cwd(), "public");

/** Width of the generated OG card leaves room for roughly this many chars. */
const MAX_NAME_LENGTH = 42;
const EXPECTED_FEATURED = 4;

const errors: string[] = [];
const warnings: string[] = [];

const fail = (p: Project | null, msg: string) =>
  errors.push(p ? `${p.slug}: ${msg}` : msg);
const warn = (p: Project | null, msg: string) =>
  warnings.push(p ? `${p.slug}: ${msg}` : msg);

function assetExists(publicPath: string): boolean {
  if (!publicPath.startsWith("/")) return false;
  return existsSync(join(PUBLIC_DIR, decodeURIComponent(publicPath.slice(1))));
}

const YM = /^\d{4}-(0[1-9]|1[0-2])$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// --- per-project checks ----------------------------------------------------

for (const p of projects) {
  if (!SLUG.test(p.slug)) {
    fail(p, `slug must be lowercase kebab-case, got "${p.slug}"`);
  }
  // /projects/tag/[tag] is a real route; a project slugged "tag" would be
  // shadowed by it and become unreachable.
  if (p.slug === "tag") {
    fail(p, 'slug "tag" collides with the /projects/tag/[tag] filter route');
  }

  if (!p.name.trim()) fail(p, "name is empty");
  if (p.name.length > MAX_NAME_LENGTH) {
    fail(p, `name is ${p.name.length} chars, overflows the OG card at ${MAX_NAME_LENGTH}`);
  }

  if (!p.blurb.trim()) fail(p, "blurb is empty");

  if (!YM.test(p.start)) fail(p, `start must be "YYYY-MM", got "${p.start}"`);
  if (p.end !== null) {
    if (!YM.test(p.end)) fail(p, `end must be "YYYY-MM" or null, got "${p.end}"`);
    else if (p.end < p.start) fail(p, `end (${p.end}) is before start (${p.start})`);
  }

  // `end: null` means ongoing. Anything ongoing must say so in its status,
  // or the live indicator and the date range disagree with each other.
  if (p.end === null && p.status !== "active") {
    fail(p, `end is null (ongoing) but status is "${p.status}" — pick one`);
  }
  // A dateLabel means the date is a point-in-time event ("granted mar 2023")
  // rather than a build window, so ongoing work after it is not a conflict.
  if (p.end !== null && p.status === "active" && !p.dateLabel) {
    warn(p, `status is "active" but end is set to ${p.end} — is it still live?`);
  }

  if (p.pills.length === 0) fail(p, "has no pills, so it can never appear under any filter");
  for (const pill of p.pills) {
    if (!(pill in PILL_CATEGORY)) {
      fail(p, `pill "${pill}" has no category in PILL_CATEGORY`);
    }
  }

  for (const link of p.links) {
    if (!link.href.trim()) fail(p, `link "${link.label}" has an empty href`);
    if (link.href.startsWith("/") && !assetExists(link.href)) {
      fail(p, `link "${link.label}" points at ${link.href}, which is not in public/`);
    }
  }

  if (p.links.length === 0 && !p.story) {
    warn(p, "no links and no story — nothing here is verifiable by a visitor");
  }

  const media = p.story?.media;
  if (media) {
    if (!assetExists(media.src)) {
      fail(p, `story.media.src is ${media.src}, which is not in public/`);
    }
    if (!media.alt.trim()) fail(p, "story.media.alt is empty");
    if (media.width <= 0 || media.height <= 0) {
      fail(p, "story.media needs real width and height for next/image");
    }
  }

  const embed = p.story?.embed;
  if (embed) {
    if (!assetExists(embed.src)) {
      fail(p, `story.embed.src is ${embed.src}, which is not in public/`);
    }
    // The poster is the loading state, the error state, and the data-saver
    // state. Without it the embed degrades to a blank rectangle.
    if (!assetExists(embed.poster)) {
      fail(p, `story.embed.poster is ${embed.poster}, which is not in public/`);
    }
    if (!embed.posterAlt.trim()) fail(p, "story.embed.posterAlt is empty");
  }

  if (p.featured && !p.story) {
    fail(p, "is featured but has no story — featured cards carry the writeup");
  }
  if (p.featured && !p.story?.media) {
    warn(p, "is featured with no image — falling back to a category plate; a real screenshot would carry more");
  }
}

// --- collection-wide checks ------------------------------------------------

const slugs = projects.map((p) => p.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
for (const d of [...new Set(dupes)]) {
  fail(null, `duplicate slug "${d}" — two projects would fight over the same route`);
}

const featuredCount = projects.filter((p) => p.featured).length;
if (featuredCount !== EXPECTED_FEATURED) {
  fail(
    null,
    `${featuredCount} projects are featured, expected exactly ${EXPECTED_FEATURED} (the grid is built for four)`,
  );
}

// Every category needs at least one project, or its filter chip links to a
// page with nothing on it.
for (const c of CATEGORIES) {
  const n = projects.filter((p) =>
    p.pills.some((pill) => PILL_CATEGORY[pill] === c.key),
  ).length;
  if (n === 0) {
    fail(null, `category "${c.key}" (${c.label}) has no projects — its filter page would be empty`);
  }
}

// A pill defined but never used is dead weight that will drift out of sync.
for (const pill of Object.keys(PILL_CATEGORY)) {
  if (!projects.some((p) => p.pills.includes(pill))) {
    warn(null, `PILL_CATEGORY defines "${pill}" but no project uses it`);
  }
}

// --- report ----------------------------------------------------------------

for (const w of warnings) console.warn(`  warn  ${w}`);

if (errors.length > 0) {
  console.error(`\nvalidate-projects: ${errors.length} error(s)\n`);
  for (const e of errors) console.error(`  error  ${e}`);
  console.error("");
  process.exit(1);
}

console.log(
  `validate-projects: ${projects.length} projects OK ` +
    `(${featuredCount} featured, ${warnings.length} warning(s))`,
);
