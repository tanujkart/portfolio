"use client";

import { cn } from "@/utils/cn";

type Brick = {
  id: number;
  cols: 1 | 2 | 3 | 4;
  rows: 1 | 2;
  /** tailwind background color class for the brick body */
  color: string;
  /** tailwind background color class for the studs (slightly darker tint) */
  studColor: string;
  /** percent — top position within container */
  top: string;
  /** percent — left position within container */
  left: string;
  /** initial rotation in degrees */
  rotate: number;
  /** animation duration in seconds */
  duration: number;
  /** animation delay in seconds */
  delay: number;
  /** which keyframe animation to use */
  motion: "drift-a" | "drift-b" | "drift-c" | "drift-d";
};

const UNIT_PX = 26;

// Deterministic brick layout — no SSR/CSR mismatch.
// Positions are placed around the perimeter / outer ring of the right
// half so the name + nav in the center stays readable.
const BRICKS: Brick[] = [
  // top edge
  { id: 1,  cols: 2, rows: 1, color: "bg-rose-300",    studColor: "bg-rose-400",    top: "6%",  left: "8%",  rotate: -10, duration: 9,  delay: 0,   motion: "drift-a" },
  { id: 2,  cols: 3, rows: 1, color: "bg-amber-300",   studColor: "bg-amber-400",   top: "12%", left: "62%", rotate: 6,   duration: 11, delay: 1.2, motion: "drift-b" },
  { id: 3,  cols: 1, rows: 1, color: "bg-sky-300",     studColor: "bg-sky-400",     top: "4%",  left: "44%", rotate: 14,  duration: 7,  delay: 2.5, motion: "drift-d" },

  // upper-mid
  { id: 4,  cols: 2, rows: 2, color: "bg-violet-300",  studColor: "bg-violet-400",  top: "26%", left: "4%",  rotate: 4,   duration: 13, delay: 0.6, motion: "drift-b" },
  { id: 5,  cols: 1, rows: 1, color: "bg-emerald-300", studColor: "bg-emerald-400", top: "30%", left: "82%", rotate: -16, duration: 8,  delay: 1.8, motion: "drift-c" },

  // mid (outer ring — avoid centerline)
  { id: 6,  cols: 2, rows: 1, color: "bg-blue-300",    studColor: "bg-blue-400",    top: "48%", left: "78%", rotate: 22,  duration: 12, delay: 0.3, motion: "drift-a" },
  { id: 7,  cols: 1, rows: 2, color: "bg-rose-300",    studColor: "bg-rose-400",    top: "52%", left: "2%",  rotate: -6,  duration: 10, delay: 3.0, motion: "drift-c" },

  // lower-mid
  { id: 8,  cols: 3, rows: 1, color: "bg-sky-300",     studColor: "bg-sky-400",     top: "70%", left: "10%", rotate: -14, duration: 10, delay: 0.9, motion: "drift-b" },
  { id: 9,  cols: 1, rows: 1, color: "bg-amber-300",   studColor: "bg-amber-400",   top: "66%", left: "70%", rotate: 8,   duration: 8,  delay: 2.1, motion: "drift-d" },

  // bottom edge
  { id: 10, cols: 2, rows: 1, color: "bg-emerald-300", studColor: "bg-emerald-400", top: "84%", left: "54%", rotate: -4,  duration: 12, delay: 1.5, motion: "drift-c" },
  { id: 11, cols: 1, rows: 1, color: "bg-violet-300",  studColor: "bg-violet-400",  top: "88%", left: "30%", rotate: 12,  duration: 7,  delay: 0,   motion: "drift-a" },
  { id: 12, cols: 2, rows: 2, color: "bg-blue-300",    studColor: "bg-blue-400",    top: "78%", left: "84%", rotate: -8,  duration: 14, delay: 2.7, motion: "drift-b" },
];

function BrickEl({ brick }: { brick: Brick }) {
  const width = brick.cols * UNIT_PX;
  const height = brick.rows * UNIT_PX;
  const studCount = brick.cols;

  return (
    <div
      className="absolute will-change-transform"
      style={{
        top: brick.top,
        left: brick.left,
        // CSS var consumed by the keyframes for the resting rotation
        ["--rot" as string]: `${brick.rotate}deg`,
        animation: `${brick.motion} ${brick.duration}s ease-in-out ${brick.delay}s infinite`,
      }}
    >
      <div
        className={cn(
          "relative rounded-[5px] shadow-[0_4px_10px_-3px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-black/10",
          brick.color
        )}
        style={{ width, height }}
      >
        {/* studs row */}
        <div
          className="absolute left-0 right-0 flex justify-evenly"
          style={{ top: -7 }}
        >
          {Array.from({ length: studCount }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-full ring-1 ring-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
                brick.studColor
              )}
              style={{ width: 12, height: 12 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FloatingBricks({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    >
      {BRICKS.map((b) => (
        <BrickEl key={b.id} brick={b} />
      ))}
    </div>
  );
}

export default FloatingBricks;
