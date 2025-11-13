"use client";

export default function ScrollButtons() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <button
        onClick={() => scrollToSection("robotics")}
        className="group flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white/80 px-5 py-3 text-sm text-zinc-800 shadow-sm backdrop-blur transition hover:border-zinc-400 hover:bg-zinc-50"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 ring-1 ring-purple-200">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path fill="currentColor" d="M11 3V2a1 1 0 1 1 2 0v1a5 5 0 0 1 5 5v1h1a1 1 0 1 1 0 2h-1v6a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-6H4a1 1 0 1 1 0-2h1V8a5 5 0 0 1 6-5Zm5 8V8a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v3h8Zm-7.5 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
          </svg>
        </span>
        <span className="font-medium">Robotics</span>
      </button>
      <button
        onClick={() => scrollToSection("thinkclear")}
        className="group flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white/80 px-5 py-3 text-sm text-zinc-800 shadow-sm backdrop-blur transition hover:border-zinc-400 hover:bg-zinc-50"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path fill="currentColor" d="M12 2a7 7 0 0 0-4 12.748V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.252A7 7 0 0 0 12 2Zm2 15h-4v-1h4v1Zm-4 2h4v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1Z"/>
          </svg>
        </span>
        <span className="font-medium">ThinkClear</span>
      </button>
      <button
        onClick={() => scrollToSection("research")}
        className="group flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white/80 px-5 py-3 text-sm text-zinc-800 shadow-sm backdrop-blur transition hover:border-zinc-400 hover:bg-zinc-50"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path fill="currentColor" d="M10 2h4a1 1 0 1 1 0 2v3.586l4.95 8.567A3 3 0 0 1 16.316 20H7.684a3 3 0 0 1-2.634-3.847L10 7.586V4a1 1 0 1 1 0-2Zm1 6.414-5.115 8.855A1 1 0 0 0 7.684 18h8.632a1 1 0 0 0 .799-1.731L12 8.414ZM9 4h6v1H9V4Z"/>
          </svg>
        </span>
        <span className="font-medium">Research</span>
      </button>
    </div>
  );
}

