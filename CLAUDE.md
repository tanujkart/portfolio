# Portfolio

Personal site for Tanuj Karthikeyan. Next.js 16 (App Router) / React 19 / Tailwind v4 / TypeScript, deployed on Vercel.

## Layout

- `src/app/` — routes. `page.tsx` (home), `projects/`, `research/`, `contact/`, plus placeholder stubs at `blog/`, `writing/`, `photos/`.
- `src/data/` — content data, separated from render.
- `src/components/` — currently unreferenced by any route.
- `public/` — static assets, PDFs under `public/research/` and `public/projects/`.

## Conventions

- Content lives in `src/data/*.ts`, not inline in page components.
- External links get `target="_blank" rel="noopener noreferrer"` and a visible `↗` affordance.
- Light theme only; dark mode is deliberately disabled in `globals.css`.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
