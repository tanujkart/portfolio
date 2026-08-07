# Design system

Written 2026-08-07 during `/plan-design-review` of the projects section. Before this
file existed there were nine ad-hoc font sizes across two pages and a 116-character
prose measure. Sizes get picked per-component when there is no scale to check against.

## Type scale

Five steps. Every size on the site is one of these. If a new component seems to need
a sixth, it almost certainly needs one of these five instead.

| Token | Size | Role |
|---|---|---|
| `--fs-display` | 32px / 2rem | Page titles (`h1`) |
| `--fs-title` | 20px / 1.25rem | Featured card titles |
| `--fs-body` | 16px / 1rem | Prose, header blurbs, compact card titles |
| `--fs-sub` | 14px / 0.875rem | Card blurbs, filter chips, detail-page receipts |
| `--fs-meta` | 12px / 0.75rem | Dates, section labels, pills, grid receipts |

## Detail page structure

Every project page leads with the same three blocks, in this order:

1. **Name, date, one-sentence blurb**
2. **Exactly three bullets** — stack, awards, hard numbers. Enforced at three in
   `scripts/validate-projects.ts`; at four it stops being a summary and becomes the
   list the prose already is.
3. **Receipts** — labelled links that let a stranger check the claims

Only then the prose. A visitor who reads nothing past the bullets should still leave
knowing what was built, what it ran on, and what happened.

**Body text is never below 16px.** The story prose was 15px before this file; that is
below the readability floor for sustained reading.

## Measure

Prose columns cap at `max-w-measure` (`--container-measure: 33rem`), never the
container width. That measures **~75 characters** at 16px, the top of the comfortable
range.

At 768px and 15px the detail-page prose rendered **116 characters per line** — roughly
double. On the return sweep the eye has to travel that whole distance and re-find the
line, which is where re-reading and line-skipping come from. Nobody reports this. They
just read less.

**Do not use Tailwind's `max-w-prose`.** It is 65`ch`, and `ch` is the advance width of
the "0" glyph, which is wider than Figtree's average character — it measured 94, not 65.
That was the first fix attempted here and it was not enough. Measure with
`ctx.measureText(text).length` in a real browser before trusting any width.

Header, imagery and receipts may span the full `max-w-3xl`. Only running prose is
constrained.

## Color

| Role | Value | Contrast on `#fcfcfc` |
|---|---|---|
| Page background | `#fcfcfc` | — |
| Foreground / headings | `#1e3a5f` | 11.21 |
| Card titles | black | 20.47 |
| Body prose | `gray-600` | 7.37 – 10.04 |
| Metadata (dates, labels, receipts) | `gray-500` | 4.71 |

**`gray-500` is the floor.** At 4.71 it clears WCAG AA (4.5) by 0.21 across four
different text roles. Never go lighter, and if the page background ever darkens,
all four break together — re-measure before changing `--background`.

`gray-400` measured 2.5 and failed AA. It is not used for text anywhere. It survives
only as `decoration-gray-400` on link underlines, which are decorative accents on
already-contrasting text.

Light theme only. Dark mode is deliberately disabled in `globals.css`.

## Category colors

Five categories, each a tint + text pair, defined once in `src/data/projects.ts`
(`CATEGORIES`). Pills and filter chips read from that array; nothing hardcodes a
category color anywhere else. Contrast on their own tints measures 6.4–7.5.

Color is never the sole encoding — the filter row names every category in text, and
each pill carries its label.

## Touch targets

**24px minimum** on every interactive element (WCAG 2.5.8 AA). Filter chips are 44px.

Card click targets use the stretched-link pattern: the title's `::after` covers the
card, receipts sit above it on `z-10`. The card's effective target is its full area
(342×424 on mobile), not the 23px the title's bounding box reports. Verified by
probing four points with `elementFromPoint`.

## Imagery

**The projects section currently carries no imagery.** It is text and type. The support
below stays in the code because it costs nothing to keep and the moment a real
screenshot exists it should go in.

When images do return:

- **Never cropped.** Grid cards box them in a fixed `4/3` with `object-contain`, so a
  row keeps even card heights while each image still shows whole. Detail pages drop the
  fixed ratio entirely and size from the image's own dimensions with a `max-h-[70vh]`
  cap — sources range from 16:9 renders to 2:3 photographs, and one ratio cannot serve
  both without cropping or stranding.
- `object-cover` was the original choice and it cut the top and bottom off a portrait
  photograph on the most important card on the page.

## Placeholder plates

A featured project with no `story.media` can render a flat neutral wordmark plate so a
mixed row keeps its titles aligned. Three rules govern it, and together they mean the
plate is currently invisible everywhere:

1. **Only when something to align to exists.** `ProjectsIndex` passes `showPlate` only
   if at least one featured project has an image. With none, the plate would be the
   project's name printed above the project's name.
2. **Never below `sm`.** Its only job is aligning a row, and there is no row at one card
   per column. On mobile it cost 191px of an 844px viewport.
3. **No gradients.** A purple gradient is the most recognizable AI-generated visual
   signature there is, and it was the least specific thing on a page that otherwise
   earns its keep through content.

## Embedded documents

A PDF is never mounted open. It sits behind a native `<details>`, closed by default.

Chrome renders an inline `<object data="*.pdf">` with its own black toolbar and
thumbnail rail — on a warm `#fcfcfc` page that slab becomes the loudest thing on screen
and sets the aesthetic for everything around it. The research page was 80vh of it.

Closing the `<details>` also defers the fetch: verified with
`performance.getEntriesByType('resource')` that the 1 MB paper is not requested on load
and only appears after the toggle opens. No JavaScript involved.

A direct link to the file always sits in the receipts row too, so the document is
reachable without expanding anything.

## One list, not two

There is no research section. HOTSPOT and the interpretability work are projects, in
`src/data/projects.ts`, with the same shape as everything else. Two pages that render
the same blocks from the same fields were two places to keep in sync for no reader
benefit — nobody arrives wanting to know which bucket a thing was filed under.

`/research` permanently redirects to `/projects/hotspot`; the page was live for months
and may be linked from a resume or an application.

## Contact is four icons

There is no contact page. Gmail, GitHub, LinkedIn and Substack sit as a row of icon
links on the homepage. The page it replaced was a table of label plus URL, and nobody
reads a URL they are about to click.

The marks are monochrome, not brand-colored: four saturated logos would be the loudest
thing on a page that is otherwise black text on `#fcfcfc`, and they would fight the
category pills for attention. They darken to black on hover.

Each is a 44px target with an `aria-label` and a `title` carrying the destination —
an icon with no text needs an accessible name, and sighted users get the same
information on hover. The mailto deliberately has no `target="_blank"`; opening a mail
client in a new browser tab leaves a dead tab behind.

`/contact` permanently redirects to `/`.

## Undated entries

`start` may be `null` when a timeframe genuinely isn't recorded. The card renders no
date and the entry sorts to the end of its status group. An undated entry cannot be
`active` — the validator rejects it, since there is no start to be ongoing from.

Inventing a plausible date to satisfy a sort puts a wrong fact on the page. An absent
date says nothing; a wrong one lies.

## Absence

Pages do not apologize for what they lack. A project without a writeup shows its name,
dates, three highlights, tags and receipts, and then stops. It previously ended with
"No writeup for this one yet" — an apology that drew attention to a gap the reader had
not noticed, on a page that was never actually empty.

## What keeps this page from looking generated

Not the layout — a card grid is the most generic structure on the web. It is the
content: a granted patent number, a Congressional App Challenge link, a live
eutrophication simulation. Uniform styling would sand those differences off. When a
project has something specific to show, show it rather than normalizing it into the
grid.
