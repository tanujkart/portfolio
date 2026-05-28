"use client";

import FloatingBricks from "@/components/FloatingBricks";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="relative z-5 flex min-h-screen flex-col-reverse md:flex-row items-center md:items-stretch">
        {/* Left half — About */}
        <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-24 md:pl-12 lg:pl-20">
          <div className="max-w-md w-full">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-6">
              Tanuj Karthikeyan
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
              <p>I&apos;m Tanuj (tuh-nooj).</p>
              <p>I like figuring out why things work the way they do.</p>
              <p>
                In 2024, I interned at an agentic financial modeling start-up where I helped raise
                7-figures.
              </p>
              <p>
                In 2025, I was all in on AI. Over the summer I was at the University of Pennsylvania
                working on an AI dementia care product, now with over 400k interactions. I was also
                doing AI modeling research at Duke.
              </p>
              <p>
                Now, I&apos;m looking for opportunities in tech and/or venture. I&apos;m also
                working on{" "}
                <a
                  href="https://tagopt.com"
                  className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TagOpt
                </a>
                : agents for SEO.
              </p>
              <p>I also like ravioli and running :)</p>
            </div>
          </div>
        </section>

        {/* Right half — Floating bricks behind name + nav */}
        <section className="relative w-full md:w-1/2 min-h-[60vh] md:min-h-screen flex items-center justify-center px-6 py-12 md:py-0 overflow-hidden">
          {/* Floating LEGO bricks fill the half */}
          <FloatingBricks className="absolute inset-0" />

          {/* Name + nav — focal foreground */}
          <div className="relative z-10 flex flex-col items-start">
            <h1 className="text-[36px] sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.05]">
              Tanuj
              <br />
              Karthikeyan
            </h1>

            <nav className="mt-6 flex flex-col gap-0.5 text-[16px] sm:text-lg font-sans tracking-wide font-bold">
              <a href="/projects" className="text-black hover:underline transition-all">
                Projects
              </a>
              <a href="/research" className="text-black hover:underline transition-all">
                Research
              </a>
              <a href="/extras" className="text-black hover:underline transition-all">
                Extras
              </a>
              <a href="/contact" className="text-black hover:underline transition-all">
                Contact
              </a>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}
