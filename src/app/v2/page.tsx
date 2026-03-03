import Link from "next/link";

const featuredProjects = [
  {
    title: "ThinkClear",
    summary:
      "AI memory-assistance platform with production-grade ML and backend systems.",
    meta: "400K+ interactions",
    href: "https://www.thinkclear.net",
  },
  {
    title: "HOTSPOT",
    summary:
      "Satellite-driven harmful algal bloom forecasting using interpretable time-series models.",
    meta: "Duke AI research",
    href: "#research",
  },
  {
    title: "Engage360",
    summary:
      "Mobile civic engagement platform for events, quizzes, and local participation.",
    meta: "Congressional App Challenge",
    href: "https://github.com/tanujkart/engage360",
  },
];

const keyWins = [
  "Innovate Award World Champion (2025)",
  "2nd Place Stockholm Junior Water Prize (2026)",
  "Champion, Stanford Invitational Debate Tournament (2025)",
  "National Merit Finalist (2026)",
];

export default function V2Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 pt-10 sm:px-8 md:pt-16">
      <section className="border-b border-blue-100 pb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
          V2
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-blue-950 sm:text-5xl">
          Building intelligent systems with measurable impact.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-blue-900/75 sm:text-lg">
          I design and ship AI products across research, healthcare, and civic technology.
          Current focus: reliable ML systems, thoughtful UX, and fast execution loops.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/v1"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View v1
          </Link>
          <Link
            href="mailto:soccertanuj@gmail.com"
            className="rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-50"
          >
            Contact
          </Link>
        </div>
      </section>

      <section id="projects" className="pt-12">
        <h2 className="text-2xl font-semibold text-blue-950">Selected Work</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-2xl border border-blue-100 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-500">
                {project.meta}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-blue-900">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-900/75">{project.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="research" className="pt-12">
        <h2 className="text-2xl font-semibold text-blue-950">Research Focus</h2>
        <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-6">
          <p className="text-sm leading-relaxed text-blue-900/80 sm:text-base">
            At Duke Pratt, I work on climate modeling via time-series and spatial inference.
            My HOTSPOT pipeline predicts harmful algal bloom risk from satellite-only inputs,
            combining interpretable ensemble learning with ecological constraints.
          </p>
        </div>
      </section>

      <section id="awards" className="pt-12">
        <h2 className="text-2xl font-semibold text-blue-950">Highlights</h2>
        <ul className="mt-4 space-y-3 rounded-2xl border border-blue-100 bg-white p-6">
          {keyWins.map((win) => (
            <li key={win} className="text-sm text-blue-900/85 sm:text-base">
              {win}
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="pt-12">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
          <h2 className="text-2xl font-semibold text-blue-950">Let’s build something useful.</h2>
          <p className="mt-2 text-sm text-blue-900/75 sm:text-base">
            Open to research collaborations, speaking invitations, and product partnerships.
          </p>
          <a
            href="mailto:soccertanuj@gmail.com"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Email me
          </a>
        </div>
      </section>
    </main>
  );
}
