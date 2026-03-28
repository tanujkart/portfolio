"use client";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Centered composition */}
      <div className="relative z-5 flex min-h-screen items-center justify-center">
        <div className="relative flex items-start">
          {/* Name + nav — left side, overlapping closer to the face */}
          <div className="relative z-20 flex flex-col mt-[5%] mr-[-80px] sm:mr-[-120px] md:mr-[-150px]">
            <h1 className="text-[28px] sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-[1.15]">
              tanuj
              <br />
              karthikeyan
            </h1>

            <nav className="mt-5 sm:mt-6 flex flex-col gap-0.5 text-[16px] sm:text-lg font-sans tracking-wide font-bold">
              <a href="/about" className="text-black hover:underline transition-all">
                about
              </a>
              <a href="/projects" className="text-black hover:underline transition-all">
                projects
              </a>
              <a href="/research" className="text-black hover:underline transition-all">
                research
              </a>
              <a href="/awards" className="text-black hover:underline transition-all">
                awards
              </a>
              <a href="/extras" className="text-black hover:underline transition-all">
                extras
              </a>
            </nav>
          </div>

          {/* Hero sketch — blends into white bg naturally */}
          <div className="relative flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tanujhero.png"
              alt="Tanuj Karthikeyan"
              className="h-[60vh] sm:h-[68vh] md:h-[75vh] lg:h-[82vh] w-auto"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom-right links */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 flex flex-col items-end gap-0.5 font-mono">
        <a
          href="mailto:soccertanuj@gmail.com"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          email
        </a>
        <a
          href="https://medium.com/@tkart"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          medium
        </a>
        <a
          href="https://github.com/tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/tanujkart/"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          linkedin
        </a>
        <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
          inspired by{" "}
          <a
            href="https://www.charlotterosario.com/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-black transition-colors"
          >
            charlotterosario.com
          </a>
        </span>
      </div>
    </main>
  );
}
