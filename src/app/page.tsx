"use client";

import Image from "next/image";
import Link from "next/link";

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
                In 2024, I interned at{" "}
                <a
                  href="https://docubridge.ai"
                  className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DocuBridge
                </a>
                , an agentic financial modeling start-up, where I helped raise 7 figures.
              </p>
              <p>
                In 2025, I was all in on AI. At Duke University, I was working on AI modeling
                research. At Penn, I built AI for dementia care (400k interactions in 7 days).
              </p>
              <p>
                So far, in 2026, I&apos;ve been in the Bay working at{" "}
                <a
                  href="https://effluent.ai"
                  className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Effluent
                </a>
                , helping build AI for wastewater facilities. I&apos;m also an analyst for{" "}
                <a
                  href="https://moe-capital.com/"
                  className="underline underline-offset-2 decoration-gray-400 hover:decoration-black hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MoE Capital
                </a>
                , helping build internal AI tools for scouting.
              </p>
              <p>And now, I&apos;m building in the company brain and context space…</p>
              <p>I also like ravioli and running :)</p>
            </div>

            {/* Link, not <a>. These were full page reloads on the site's only
                navigation — the route into everything else. */}
            <nav className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-body font-bold text-black">
              <Link href="/projects" className="inline-flex min-h-6 items-center transition-all hover:underline">
                Projects
              </Link>
              <span className="text-gray-500 select-none">|</span>
              <Link href="/research" className="inline-flex min-h-6 items-center transition-all hover:underline">
                Research
              </Link>
              <span className="text-gray-500 select-none">|</span>
              <Link href="/contact" className="inline-flex min-h-6 items-center transition-all hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </section>

        {/* Right half — Hero image, anchored toward the screen center */}
        <section className="w-full md:w-1/2 flex items-center justify-center md:justify-start px-6 py-12 md:py-0 md:pl-4 lg:pl-8">
          {/* Source is 2.4 MB. next/image serves a sized WebP instead. */}
          <Image
            src="/tanujhero.png"
            alt="Tanuj Karthikeyan"
            width={1024}
            height={1536}
            priority
            sizes="(max-width: 768px) 80vw, 45vw"
            className="h-[60vh] sm:h-[75vh] md:h-[88vh] lg:h-[92vh] w-auto"
            draggable={false}
          />
        </section>
      </div>
    </main>
  );
}
