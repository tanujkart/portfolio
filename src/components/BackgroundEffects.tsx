"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Draws a cursor-following blue circle outline on desktop (mouse only).
 */
export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let smoothX = mouseX;
    let smoothY = mouseY;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    const SMOOTHING = 0.15;
    const CIRCLE_RADIUS = 20;

    const drawCursorOutline = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.beginPath();
      ctx.arc(smoothX, smoothY, CIRCLE_RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    let animationFrameId = 0;

    const animate = () => {
      smoothX += (mouseX - smoothX) * SMOOTHING;
      smoothY += (mouseY - smoothY) * SMOOTHING;

      drawCursorOutline();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawCursorOutline();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  return (
    <>
      {/* White base background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-white"
      />
      {/* Cursor outline layer */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-0"
      />
    </>
  );
}


