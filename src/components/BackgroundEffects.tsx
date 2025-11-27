"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Draws a blue line trail that follows cursor/finger movement.
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

    // Store the trail of points
    const trail: Array<{ x: number; y: number; timestamp: number }> = [];
    const MAX_TRAIL_LENGTH = 50; // Maximum number of points in the trail
    const TRAIL_DURATION = 500; // How long points stay in the trail (ms)
    const LINE_WIDTH = 3;

    let currentX = width / 2;
    let currentY = height / 2;
    let isDrawing = false;

    const addPoint = (x: number, y: number) => {
      const now = Date.now();
      trail.push({ x, y, timestamp: now });
      
      // Remove old points
      while (trail.length > 0 && now - trail[0].timestamp > TRAIL_DURATION) {
        trail.shift();
      }
      
      // Limit trail length
      if (trail.length > MAX_TRAIL_LENGTH) {
        trail.shift();
      }
    };

    const handleMove = (x: number, y: number) => {
      currentX = x;
      currentY = y;
      // Always add points when moving, whether drawing or not
      addPoint(x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleStart = (x: number, y: number) => {
      isDrawing = true;
      addPoint(x, y);
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleStart(e.clientX, e.clientY);
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    // Only add mouse event listeners (desktop only - no touch events for mobile)
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const drawLine = () => {
      const now = Date.now();
      
      // Clear canvas completely for crisp lines
      ctx.clearRect(0, 0, width, height);
      
      // Remove expired points
      while (trail.length > 0 && now - trail[0].timestamp > TRAIL_DURATION) {
        trail.shift();
      }

      if (trail.length < 2) return;

      // Draw the line trail
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = LINE_WIDTH;
      
      // Draw each segment with appropriate opacity
      for (let i = 1; i < trail.length; i++) {
        const prevPoint = trail[i - 1];
        const point = trail[i];
        
        const prevAge = now - prevPoint.timestamp;
        const age = now - point.timestamp;
        
        const prevOpacity = Math.max(0, 1 - prevAge / TRAIL_DURATION);
        const opacity = Math.max(0, 1 - age / TRAIL_DURATION);
        
        // Use average opacity for smoother transitions
        const avgOpacity = (prevOpacity + opacity) / 2;
        
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${avgOpacity * 0.9})`;
        ctx.stroke();
      }
      
      ctx.restore();
    };

    let animationFrameId = 0;

    const animate = () => {
      drawLine();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Clear trail on resize
      trail.length = 0;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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


