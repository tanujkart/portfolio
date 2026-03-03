"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const stickers = [
  { id: "duke", src: "/stickers/duke.svg", alt: "Duke University", rotation: -8 },
  { id: "thinkclear", src: "/stickers/thinkclear.svg", alt: "ThinkClear", rotation: 12 },
  { id: "ncssm", src: "/stickers/ncssm.svg", alt: "NCSSM", rotation: -5 },
  { id: "first", src: "/stickers/first.svg", alt: "FIRST Robotics", rotation: 7 },
  { id: "nsda", src: "/stickers/nsda.svg", alt: "NSDA Debate", rotation: -10 },
  { id: "bcvp", src: "/stickers/bcvp.svg", alt: "Bull City Venture Partners", rotation: 15 },
  { id: "docubridge", src: "/stickers/docubridge.svg", alt: "DocuBridge", rotation: -12 },
  { id: "spikeball", src: "/stickers/spikeball.svg", alt: "Spikeball", rotation: 6 },
];

function getInitialPositions(count: number, windowW: number, windowH: number) {
  const positions: Array<{ x: number; y: number }> = [];
  const stickerSize = 90;
  const padding = 20;

  const safeZone = {
    left: windowW * 0.2,
    right: windowW * 0.8,
    top: windowH * 0.15,
    bottom: windowH * 0.75,
  };

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let attempts = 0;
    do {
      const side = Math.floor(Math.random() * 4);
      switch (side) {
        case 0: // top
          x = padding + Math.random() * (windowW - stickerSize - padding * 2);
          y = padding + Math.random() * (safeZone.top - stickerSize - padding);
          break;
        case 1: // bottom
          x = padding + Math.random() * (windowW - stickerSize - padding * 2);
          y = safeZone.bottom + Math.random() * (windowH - safeZone.bottom - stickerSize - padding);
          break;
        case 2: // left
          x = padding + Math.random() * (safeZone.left - stickerSize - padding);
          y = padding + Math.random() * (windowH - stickerSize - padding * 2);
          break;
        default: // right
          x = safeZone.right + Math.random() * (windowW - safeZone.right - stickerSize - padding);
          y = padding + Math.random() * (windowH - stickerSize - padding * 2);
          break;
      }
      attempts++;
    } while (
      attempts < 50 &&
      positions.some(
        (p) => Math.abs(p.x - x!) < stickerSize + 10 && Math.abs(p.y - y!) < stickerSize + 10
      )
    );
    positions.push({ x: x!, y: y! });
  }
  return positions;
}

function DraggableSticker({
  sticker,
  position,
  onDragEnd,
}: {
  sticker: (typeof stickers)[number];
  position: { x: number; y: number };
  onDragEnd: (id: string, x: number, y: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: position.x, y: position.y });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    pos.current = { x: position.x, y: position.y };
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${sticker.rotation}deg)`;
    }
  }, [position.x, position.y, sticker.rotation]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      dragging.current = true;
      setIsDragging(true);
      const rect = ref.current!.getBoundingClientRect();
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const x = e.clientX - offset.current.x;
      const y = e.clientY - offset.current.y;
      pos.current = { x, y };
      if (ref.current) {
        ref.current.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
      }
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);
      onDragEnd(sticker.id, pos.current.x, pos.current.y);
    },
    [onDragEnd, sticker.id]
  );

  return (
    <div
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute top-0 left-0 select-none touch-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${sticker.rotation}deg)`,
        zIndex: isDragging ? 50 : 10,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "transform 0.3s ease",
      }}
    >
      <div className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] relative hover:scale-110 transition-transform duration-200">
        <Image
          src={sticker.src}
          alt={sticker.alt}
          fill
          className="object-contain drop-shadow-lg pointer-events-none"
          unoptimized
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [stickerPositions, setStickerPositions] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const positions = getInitialPositions(
      stickers.length,
      window.innerWidth,
      window.innerHeight
    );
    setStickerPositions(positions);
  }, []);

  const handleDragEnd = useCallback(
    (id: string, x: number, y: number) => {
      setStickerPositions((prev) => {
        const idx = stickers.findIndex((s) => s.id === id);
        if (idx === -1) return prev;
        const next = [...prev];
        next[idx] = { x, y };
        return next;
      });
    },
    []
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Stickers */}
      {mounted &&
        stickerPositions.length === stickers.length &&
        stickers.map((sticker, i) => (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            position={stickerPositions[i]}
            onDragEnd={handleDragEnd}
          />
        ))}

      {/* Center content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center pointer-events-none">
        <div className="pointer-events-auto text-center px-6">
          <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-gray-400 mb-6">
            click the stickers
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.95]">
            tanuj
            <br />
            karthikeyan
          </h1>

          <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:text-base">
            <a href="/v1#projects" className="text-black font-medium hover:underline underline-offset-4 transition-all">
              robotics
            </a>
            <span className="text-gray-300">|</span>
            <a href="/v1#research" className="text-black font-medium hover:underline underline-offset-4 transition-all">
              research
            </a>
            <span className="text-gray-300">|</span>
            <a href="/v1#projects" className="text-black font-medium hover:underline underline-offset-4 transition-all">
              projects
            </a>
            <span className="text-gray-300">|</span>
            <a href="/v1#awards" className="text-black font-medium hover:underline underline-offset-4 transition-all">
              debate
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom-right links */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex flex-col items-end gap-1.5">
        <a
          href="https://www.linkedin.com/in/tanujkart/"
          target="_blank"
          rel="noreferrer"
          className="text-xs sm:text-sm text-gray-400 hover:text-black transition-colors"
        >
          check my linkedin
        </a>
        <a
          href="https://medium.com/@tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-xs sm:text-sm text-gray-400 hover:text-black transition-colors"
        >
          read articles on my medium
        </a>
        <a
          href="https://github.com/tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-xs sm:text-sm text-gray-400 hover:text-black transition-colors"
        >
          check out projects on my github
        </a>
        <a
          href="mailto:soccertanuj@gmail.com"
          className="text-xs sm:text-sm text-gray-400 hover:text-black transition-colors"
        >
          send an email
        </a>
      </div>
    </main>
  );
}
