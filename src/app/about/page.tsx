import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-black text-sm font-mono transition-colors">
          ← Back
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">About</h1>

        <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
          <p>I&apos;m Tanuj (tuh-nooj).</p>
          <p>I like figuring out why things work the way they do.</p>
          <p>
            In 2024, I interned at an agentic financial modeling start-up where I helped raise
            6-figures.
          </p>
          <p>
            In 2025, I was all in on AI. Over the summer I was at the University of Pennsylvania
            working on an AI dementia care product, now with over 400k interactions. I was also doing
            AI modeling research at Duke.
          </p>
          <p>
            Now, I&apos;m looking for opportunities in tech and/or venture. I&apos;m also working on{" "}
            <a
              href="https://tagopt.com"
              className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tagopt
            </a>
            : agents for SEO.
          </p>
          <p>I also like food, spikeball, and running :)</p>
        </div>
      </div>
    </main>
  );
}
