"use client";

import Image from "next/image";

const projects = [
  {
    name: "ThinkClear",
    role: "Co-Founder",
    period: "Jul 2025 – Present",
    description:
      "Real-time ML system for memory assistance using vision-based recognition and interactive recall. 400K+ interactions. Backed by Penn M&T.",
    link: "https://www.thinkclear.net",
  },
  {
    name: "HOTSPOT",
    role: "AI Researcher @ Duke Pratt",
    period: "Sep 2024 – Present",
    description:
      "Hybrid Oceanic Tracking via Satellite Proxy and Optimized Time-Series. Integrated multi-source satellite data to model global marine bloom risk with interpretable ensemble models.",
    link: null,
  },
  {
    name: "Memo",
    role: "Builder",
    period: "Aug – Dec 2025",
    description:
      "On-device audio capture wearable for real-time memory logging and recall. Edge-processing pipeline for privacy-preserving speech analysis.",
    link: null,
  },
  {
    name: "Engage360",
    role: "Builder",
    period: "2024",
    description:
      "Civic engagement mobile app built with React Native & Expo. Presented to Congressman Timmons and invited to Capitol Hill.",
    link: "https://github.com/tanujkart/engage360",
  },
];

const awards = {
  Research: [
    "2nd Place Stockholm Junior Water Prize ('26)",
    "3rd Place NC Region 3B Science Fair ('26)",
  ],
  Robotics: [
    "Innovate Award World Champion ('25)",
    "Inspire Award State Champion ('25, '26)",
    "Impact Award State Champion ('24)",
    "3x Worlds Qualifier ('24, '25, '26)",
  ],
  Debate: [
    "Champion of Stanford Invitational ('25)",
    "Champion of Georgetown Invitational ('25)",
    "Quarter-Finalist Georgetown Fall ('24)",
    "2x Nationals Qualifier ('24, '25)",
  ],
  Technology: [
    "Congressional App Challenge Grand Champion ('25)",
    "2nd Most Innovative — NCSSM Entrepreneurship Fair ('25)",
  ],
  Academic: ["National Merit Finalist ('26)"],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 max-w-4xl">
          <div className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tanujhero.png"
              alt="Tanuj Karthikeyan"
              className="h-[45vh] md:h-[55vh] w-auto"
              draggable={false}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              tanuj
              <br />
              karthikeyan
            </h1>
            <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-md leading-relaxed">
              building at the intersection of AI and impact. co-founder of{" "}
              <a href="https://www.thinkclear.net" target="_blank" rel="noreferrer" className="underline hover:text-black">
                ThinkClear
              </a>
              . AI researcher at Duke. foundation attaché at NCSSM. UPenn M&TSI.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start text-xs font-mono text-gray-400">
              <a href="mailto:soccertanuj@gmail.com" className="hover:text-black transition-colors">email</a>
              <a href="https://medium.com/@tkart" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">medium</a>
              <a href="https://github.com/tanujkart" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">github</a>
              <a href="https://www.linkedin.com/in/tanujkart/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">linkedin</a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">about</h2>
          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              after playing with legos, i fell in love with tech. now i&apos;m interested in
              intelligent systems and how they translate to impact.
            </p>
            <p>
              i&apos;m currently co-founding ThinkClear, a memory assistance platform backed by
              Penn M&T with 400K+ interactions. at Duke, i research climate modeling using
              time-series analysis and gradient-based interpolation.
            </p>
            <p>
              beyond tech, i&apos;m a national circuit debater (champion of Stanford and Georgetown),
              a 3x FIRST robotics world championship qualifier, and a foundation attaché
              coordinating an 8-figure alumni engagement campaign at NCSSM.
            </p>
          </div>
        </div>
      </section>

      {/* Robotics */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">robotics</h2>
          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              co-captain of a FIRST robotics team since 2015, making STEM accessible for 3M+ learners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {[
                "Innovate Award World Champion ('25)",
                "Inspire Award State Champion ('25, '26)",
                "Impact Award State Champion ('24)",
                "3x Worlds Qualifier ('24, '25, '26)",
              ].map((item) => (
                <div key={item} className="bg-white rounded-lg px-4 py-3 text-sm border border-gray-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">research</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">HOTSPOT — Duke Pratt School of Engineering</h3>
              <p className="text-gray-400 text-sm mt-1">Sep 2024 – Present</p>
              <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
                Integrated multi-source satellite and climatological data to model global marine
                bloom risk. Developed gradient-aware spatial gap filling and time-series feature
                pipelines. Trained interpretable ensemble models with spatially independent
                validation. Authored a 20-page research paper for the Regeneron Science Talent Search.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["2nd Stockholm Junior Water Prize", "3rd NC Region 3B Science Fair", "Regeneron STS Paper"].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">projects</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.name} className="bg-white rounded-lg p-5 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-semibold text-lg">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="hover:underline">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span className="text-gray-400 text-sm">{project.period}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{project.role}</p>
                <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">awards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(awards).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-3">
                  {category}
                </h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; 2026 Tanuj Karthikeyan</p>
          <div className="flex gap-4 text-xs font-mono text-gray-400">
            <a href="mailto:soccertanuj@gmail.com" className="hover:text-black transition-colors">email</a>
            <a href="https://medium.com/@tkart" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">medium</a>
            <a href="https://github.com/tanujkart" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">github</a>
            <a href="https://www.linkedin.com/in/tanujkart/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">linkedin</a>
          </div>
          <span className="text-xs text-gray-400">
            inspired by{" "}
            <a href="https://www.charlotterosario.com/" target="_blank" rel="noreferrer" className="underline hover:text-black transition-colors">
              charlotterosario.com
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
