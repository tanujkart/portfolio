"use client";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="relative z-5 flex min-h-screen flex-col-reverse md:flex-row items-center md:items-stretch">
        {/* Left half — About + inline nav */}
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

            <nav className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-bold text-black">
              <a href="/projects" className="hover:underline transition-all">
                Projects
              </a>
              <span className="text-gray-400 select-none">|</span>
              <a href="/research" className="hover:underline transition-all">
                Research
              </a>
              <span className="text-gray-400 select-none">|</span>
              <a href="/updates" className="hover:underline transition-all">
                Updates
              </a>
              <span className="text-gray-400 select-none">|</span>
              <a href="/contact" className="hover:underline transition-all">
                Contact
              </a>
            </nav>
          </div>
        </section>

        {/* Right half — Hero image only */}
        <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tanujhero.png"
            alt="Tanuj Karthikeyan"
            className="h-[60vh] sm:h-[75vh] md:h-[88vh] lg:h-[92vh] w-auto"
            draggable={false}
          />
        </section>
      </div>
    </main>
  );
}
