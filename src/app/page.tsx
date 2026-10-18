"use client";

import Link from "next/link";
import NeuralBrain from "@/components/NeuralBrain";
import SocialLinks from "@/components/SocialLinks";
import Timeline from "@/components/Timeline";
import { ALSO, INTERESTS } from "@/data/timeline";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="relative z-5 flex min-h-screen flex-col-reverse md:flex-row items-center md:items-stretch">
        {/* Left — name, timeline, interests, inline nav */}
        <section className="w-full md:w-[58%] flex items-center justify-center px-6 py-12 md:py-16 md:pl-12 lg:pl-20">
          <div className="max-w-2xl w-full">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <h1 className="text-display font-bold tracking-tight text-black">Tanuj Karthikeyan</h1>

              {/* Replaces the /contact page, which was a table of label + URL.
                  Nobody reads a URL they are about to click. */}
              <SocialLinks className="flex flex-wrap items-center gap-2" />
            </div>

            <Timeline className="mt-8" />

            <p className="mt-6 text-body leading-relaxed text-gray-700">
              {INTERESTS} {ALSO} See more of my work{" "}
              {/* Link, not <a>. These were full page reloads on the site's only
                  navigation — the route into everything else. */}
              <Link
                href="/projects"
                className="font-bold text-black underline underline-offset-2 decoration-gray-400 hover:decoration-black transition-colors"
              >
                here
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Right — the brain, anchored toward the screen centre */}
        <section className="w-full md:w-[42%] flex items-center justify-center md:justify-start px-6 py-12 md:py-0 md:pl-4 lg:pl-8">
          <NeuralBrain className="h-[60vh] max-w-2xl md:h-[80vh]" />
        </section>
      </div>
    </main>
  );
}
