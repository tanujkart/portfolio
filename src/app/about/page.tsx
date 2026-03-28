import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">about</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <p>i&apos;m tanuj (tuh-nooj).</p>
          <p>i like figuring out why things work the way they do.</p>
          <p>
            in 2024, i interned at an agentic financial modeling start-up where i helped raise
            6-figures.
          </p>
          <p>
            in 2025, i was all in on ai. over the summer i was at the university of pennsylvania
            working on an ai dementia care product, now with over 400k interactions. i was also doing
            ai modeling research at duke.
          </p>
          <p>
            now, i&apos;m looking for opportunities in tech and/or venture. i&apos;m also working on{" "}
            <a
              href="https://tagopt.com"
              className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              tagopt
            </a>
            : agents for seo.
          </p>
          <p>i also like food, spikeball, and running :)</p>
        </div>
      </div>
    </main>
  );
}
