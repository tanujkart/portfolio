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

Prose columns cap at `max-w-prose` (65ch), never the container width.

At 768px and 15px the detail-page prose rendered **116 characters per line** — roughly
double the comfortable range. On the return sweep the eye has to travel that whole
distance and re-find the line, which is where re-reading and line-skipping come from.
Nobody reports this. They just read less.

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

**Project images are never cropped.** Grid cards box images in a fixed `4/3` with
`object-contain`, so every card in a row is the same height while each image still
shows whole. Detail pages drop the fixed ratio entirely and size from the image's own
dimensions with a `max-h-[70vh]` cap — sources range from 16:9 renders to 2:3
photographs, and forcing one ratio either crops the image or strands it in empty space.

`object-cover` was the original choice and it cut the top and bottom off a portrait
photograph on the most important card on the page.

## Placeholder plates

A featured project with no `story.media` renders a flat neutral wordmark plate so the
three-up row keeps its titles aligned. It is a placeholder, not a design goal — a real
screenshot always wins.

**The plate is suppressed below `sm`.** Its only job is aligning a row, and there is
no row at one card per column. On mobile it cost 191px of an 844px viewport to render
a word that repeated 60px below it.

No gradients on the plate. A purple gradient is the most recognizable AI-generated
visual signature there is, and it was the least specific thing on a page that otherwise
earns its keep through content.

## What keeps this page from looking generated

Not the layout — a card grid is the most generic structure on the web. It is the
content: a granted patent number, a Congressional App Challenge link, a live
eutrophication simulation. Uniform styling would sand those differences off. When a
project has something specific to show, show it rather than normalizing it into the
grid.
