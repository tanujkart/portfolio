"use client";

import { cn } from "@/utils/cn";

type Props = {
  className?: string;
};

/**
 * Newton's cradle. Five pendulums hanging from a frame; the leftmost and
 * rightmost balls swing while the middle three stay still — mimicking the
 * classic energy-transfer toy. Pure HTML + CSS, animation defined in
 * globals.css (cradle-swing-left / cradle-swing-right).
 */
export default function NewtonsCradle({ className }: Props) {
  // physical sizing — kept in JS so the geometry stays in sync
  const BALL = 36; // ball diameter (px)
  const STRING = 150; // string length (px)
  const GAP = 1; // px gap between balls in the resting row
  const FRAME_W = 5 * BALL + 4 * GAP + 32; // frame extends past balls

  return (
    <div
      className={cn("pointer-events-none select-none flex items-center justify-center", className)}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{ width: FRAME_W, height: STRING + BALL + 40 }}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-900 rounded-sm" />
        {/* Left support */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gray-900 rounded-sm" />
        {/* Right support */}
        <div className="absolute top-0 right-0 w-1.5 h-full bg-gray-900 rounded-sm" />
        {/* Base */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-900 rounded-sm" />

        {/* Pendulum row — origin is the top bar */}
        <div
          className="absolute top-1.5 left-1/2 -translate-x-1/2 flex"
          style={{ gap: GAP }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`cradle-pendulum cradle-pendulum-${i} relative`}
              style={{
                width: BALL,
                height: STRING + BALL,
                transformOrigin: "top center",
                willChange: "transform",
              }}
            >
              {/* String */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 bg-gray-400"
                style={{ width: 1, height: STRING }}
              />
              {/* Ball */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: BALL,
                  height: BALL,
                  top: STRING - BALL / 2,
                  background:
                    "radial-gradient(circle at 30% 30%, #f1f5f9 0%, #94a3b8 45%, #334155 100%)",
                  boxShadow:
                    "inset -3px -4px 6px rgba(0,0,0,0.35), inset 2px 2px 4px rgba(255,255,255,0.5), 0 4px 8px -3px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
