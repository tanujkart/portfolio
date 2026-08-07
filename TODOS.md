# TODOS

Deferred work with enough context to pick up cold. Created 2026-08-07 by `/plan-ceo-review` on the projects-section rebuild.

---

## P1 — Verify or drop the interaction-count claims

**What:** `src/app/projects/page.tsx:61` claims the portfolio has "30K+ interactions across visitors." Line 37 claims thinkclear has "400K+ interactions across demos and deployments." Either link a source or remove the numbers.

**Why:** Nothing in this repo measures anything — there is no analytics code of any kind. The projects rebuild is organized entirely around making claims verifiable (that is what the receipts row exists for). An unverifiable claim about the page itself, sitting on that page, is the weakest link in the argument. A sharp reader checks the one number they can check.

**Pros:** Removes the only self-undermining claim on a page built to be checkable. If the numbers are real, linking the source turns a soft claim into a hard receipt.

**Cons:** If the numbers were estimates, dropping them makes the cards look slightly less impressive. That is the correct trade.

**Context:** Vercel Web Analytics is being added as part of the projects rebuild, so from now on the portfolio number will be real and linkable. The thinkclear number predates this site and would need a source from the M&TSI deployment. Start by checking whether the Vercel dashboard has historical data for this project.

**Effort:** S (human ~30 min / CC ~5 min) · **Priority:** P1
**Depends on:** nothing. Can be done before or after the rebuild.

---

## P2 — Homepage featured strip (E6, deferred from CEO review)

**What:** Render three featured projects as a compact strip on `/`, under the About text, reading from the same `featured` flag in `src/data/projects.ts`.

**Why:** The homepage is a two-column composition — About text left, full-height photo right. Projects is reachable only through one 15px bold text link competing with Research and Contact. A visitor who reads the About and leaves never sees a single thing you built.

**Pros:** Work becomes the first thing a root-landing visitor encounters. Reads from the same data as the projects page, so the two can never drift apart.

**Cons:** That two-column composition is one of the better things about the site. A strip either pushes the hero image down or makes the page scroll on desktop.

**Context:** Deliberately deferred during the CEO review as a taste call, not a rejection. The reasoning: the projects redesign may solve the burial problem on its own, and it is cheaper to judge that after seeing it live than to guess now. Revisit once the rebuilt `/projects` has been live for a few weeks. The decision hinges on a fact only analytics can settle — if most traffic arrives via a direct `/projects` link from a resume or DM, the homepage barely matters.

**Effort:** S (human ~half day / CC ~15 min) · **Priority:** P2
**Depends on:** `src/data/projects.ts` with the `featured` flag. Also wants Vercel Analytics data on landing-page distribution.

---

## P2 — Real screenshots for tagopt and engage360

**What:** Capture a screenshot of tagopt.com and one of the engage360 Congressional App Challenge page, drop them in `public/projects/`, and add a `story` block with `media` to each project in `src/data/projects.ts`.

**Why:** Two of the four featured cards currently render a wordmark plate instead of a picture of the thing. The plate is a placeholder wearing a design — it exists to keep the four-up row's titles aligned, not because a word is a good thing to show. Four featured cards showing four real objects is what the tier was built for.

**Pros:** The plate disappears on its own — the card already prefers an image whenever one is present, so no component changes are needed. Also removes the last placeholder surface from the page.

**Cons:** None beyond your time. Both sources are live and public, so this is a browser screenshot each.

**Context:** Surfaced by `/plan-design-review` on 2026-08-07 as Issue 4. The interim fix was to suppress the plate below `sm` and drop its purple gradient for a flat neutral — good enough to ship, not the real answer. The build-time validator (`scripts/validate-projects.ts`) already warns on every build for exactly these two projects and will confirm the files exist once added. The prior learning on this repo applies: on a portfolio the binding constraint is your content, not the code, which is why this is written down rather than assumed.

**Effort:** S (human ~15 min / CC: cannot do this — needs you) · **Priority:** P2
**Depends on:** nothing.

---

## P3 — Content-Security-Policy header

**What:** Add a CSP header via `next.config.ts` headers or `middleware.ts`.

**Why:** The site currently has no CSP at all. The projects rebuild introduces the first iframe on the site (the algal bloom canvas embed). That iframe is sandboxed with `allow-scripts` and deliberately without `allow-same-origin`, which handles the immediate risk — but a CSP is the layer that makes the whole site's script and frame policy explicit rather than implicit.

**Pros:** Explicit policy for scripts, frames, and connections. Catches a whole class of injection issues by default rather than case by case.

**Cons:** CSP is easy to get subtly wrong and break your own page. Next.js inline scripts need a nonce, and Vercel Analytics needs an allowlist entry.

**Context:** Not urgent — this is a static site with no auth, no user input beyond route segments, and no user data. The threat model is thin. Do this when touching `next.config.ts` for another reason. Start with `Content-Security-Policy-Report-Only` to see what would break before enforcing.

**Effort:** M (human ~half day / CC ~15 min) · **Priority:** P3
**Depends on:** the iframe embed landing first, so the frame-src policy is written against real usage.

---

## P3 — Print stylesheet for /projects

**What:** An `@media print` block so `Cmd+P` on `/projects` produces a clean one-page project sheet.

**Why:** You attach things to applications. A printable project sheet generated from the same data as the site means the attachment can never drift out of sync with the live page the way a separately maintained PDF does.

**Pros:** Costs almost nothing — hide nav, hide the filter row, collapse cards to rows, force black text on white, show link URLs inline via `a::after { content: " (" attr(href) ")" }`. Nothing to maintain, since it reads the same data.

**Cons:** Fitting thirteen projects onto one page means aggressive truncation, so the print view will necessarily say less than the web view.

**Context:** Surfaced during the CEO review as a low-priority delight item. Real value if you attach anything to applications; skip entirely if you do not. Worth doing right after the rebuild lands, while the markup is fresh.

**Effort:** S (human ~2 hrs / CC ~10 min) · **Priority:** P3
**Depends on:** the projects rebuild.
