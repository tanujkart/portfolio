"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

//  STATE MACHINE
//  ─────────────
//    ┌────────┐ in viewport ┌─────────┐ iframe load ┌─────────┐
//    │ POSTER │────────────►│ LOADING │────────────►│ RUNNING │
//    │(initial)│            │(poster  │             │(sim live)│
//    └────────┘             │ visible)│             └────┬────┘
//         ▲                 └────┬────┘                  │ out of
//         │                      │ error / 8s timeout    │ viewport
//         │                      ▼                       ▼
//         │                 ┌────────┐              ┌────────┐
//         └─────────────────│ FAILED │◄─────────────│ PAUSED │
//           poster persists │(poster │    error     │(iframe  │
//           + external link │ + link)│              │unmounted)│
//                           └────────┘              └────────┘
//
//  IMPOSSIBLE: RUNNING → POSTER. Once the sim has loaded it either runs or
//  pauses; it never falls back to the cold initial state.
//
//  The poster is doing three jobs at once: it is the loading state, the error
//  state, and the mobile-data-saver state. Without it every failure here looks
//  identical to a blank rectangle, which is a silent failure.

type State = "poster" | "loading" | "running" | "paused" | "failed";

const LOAD_TIMEOUT_MS = 8000;

export default function CanvasEmbed({
  src,
  poster,
  posterAlt,
  title,
  fallbackHref,
  fallbackLabel,
}: {
  src: string;
  poster: string;
  posterAlt: string;
  title: string;
  fallbackHref?: string;
  fallbackLabel?: string;
}) {
  const [state, setState] = useState<State>("poster");
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy-mount on first intersection, and unmount the iframe when it scrolls
  // away so a requestAnimationFrame loop can't quietly cook someone's battery.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((prev) => {
          if (prev === "failed") return prev;
          if (entry.isIntersecting) {
            return prev === "paused" ? "running" : prev === "poster" ? "loading" : prev;
          }
          return prev === "running" ? "paused" : prev;
        });
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state !== "loading") return;
    timeoutRef.current = setTimeout(() => setState("failed"), LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [state]);

  const mounted = state === "loading" || state === "running";
  const posterVisible = state !== "running";

  return (
    <figure ref={containerRef} className="my-8">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-black/10 bg-gray-50">
        {mounted ? (
          <iframe
            // No allow-same-origin: the embedded code cannot reach this page's
            // DOM, storage, or origin even though it is served from it.
            sandbox="allow-scripts"
            src={src}
            title={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
            onLoad={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setState("running");
            }}
            onError={() => setState("failed")}
          />
        ) : null}

        {posterVisible ? (
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={poster}
              alt={posterAlt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            {state === "loading" ? (
              <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] text-white">
                loading…
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <figcaption className="mt-2 flex items-baseline justify-between gap-4 font-mono text-[12px] text-gray-500">
        <span>
          {state === "failed"
            ? "Interactive demo could not load — showing a screenshot."
            : state === "paused"
              ? "Paused while off screen."
              : title}
        </span>
        {fallbackHref ? (
          <a
            href={fallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm underline decoration-gray-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {fallbackLabel ?? "source"} ↗
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
