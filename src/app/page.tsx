"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const stickers = [
  { id: "duke", src: "/stickers/duke.png", alt: "Duke University", rotation: -8 },
  { id: "thinkclear", src: "/stickers/thinkclear.png", alt: "ThinkClear", rotation: 12 },
  { id: "foundation", src: "/stickers/foundation.png", alt: "NCSSM Foundation", rotation: -5 },
  { id: "first", src: "/stickers/first.png", alt: "FIRST Robotics", rotation: 7 },
  { id: "nsda", src: "/stickers/nsda.png", alt: "NSDA Debate", rotation: -10 },
  { id: "bcvp", src: "/stickers/bcvp.png", alt: "Bull City Venture Partners", rotation: 15 },
  { id: "docubridge", src: "/stickers/docubridge.png", alt: "DocuBridge", rotation: -12 },
  { id: "spikeball", src: "/stickers/spikeball.png", alt: "Spikeball", rotation: 6 },
];

function getStickerPositionsOnLaptop(
  imgRect: DOMRect,
  count: number
) {
  const laptopLeft = imgRect.left + imgRect.width * 0.08;
  const laptopTop = imgRect.top + imgRect.height * 0.63;
  const laptopW = imgRect.width * 0.84;
  const laptopH = imgRect.height * 0.28;

  const stickerSize = Math.min(55, imgRect.width * 0.14);
  const positions: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let attempts = 0;
    do {
      x = laptopLeft + Math.random() * (laptopW - stickerSize);
      y = laptopTop + Math.random() * (laptopH - stickerSize);
      attempts++;
    } while (
      attempts < 100 &&
      positions.some(
        (p) => Math.abs(p.x - x) < stickerSize * 0.85 && Math.abs(p.y - y) < stickerSize * 0.85
      )
    );
    positions.push({ x, y });
  }
  return positions;
}

function DraggableSticker({
  sticker,
  position,
  size,
  onDragEnd,
}: {
  sticker: (typeof stickers)[number];
  position: { x: number; y: number };
  size: number;
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

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    setIsDragging(true);
    const rect = ref.current!.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const x = e.clientX - offset.current.x;
    const y = e.clientY - offset.current.y;
    pos.current = { x, y };
    if (ref.current) {
      ref.current.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    onDragEnd(sticker.id, pos.current.x, pos.current.y);
  }, [onDragEnd, sticker.id]);

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
      <div
        className="relative hover:scale-110 transition-transform duration-200"
        style={{ width: size, height: size }}
      >
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
  const [stickerPositions, setStickerPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [stickerSize, setStickerSize] = useState(55);
  const [mounted, setMounted] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const placeStickers = useCallback(() => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const positions = getStickerPositionsOnLaptop(rect, stickers.length);
    setStickerSize(Math.min(55, rect.width * 0.14));
    setStickerPositions(positions);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(placeStickers, 200);
    window.addEventListener("resize", placeStickers);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", placeStickers);
    };
  }, [mounted, placeStickers]);

  const handleDragEnd = useCallback((id: string, x: number, y: number) => {
    setStickerPositions((prev) => {
      const idx = stickers.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = { x, y };
      return next;
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1a1a2e]">
      {/* Stickers layer */}
      {mounted &&
        stickerPositions.length === stickers.length &&
        stickers.map((sticker, i) => (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            position={stickerPositions[i]}
            size={stickerSize}
            onDragEnd={handleDragEnd}
          />
        ))}

      {/* Centered composition */}
      <div className="relative z-5 flex min-h-screen items-center justify-center">
        <div className="relative flex items-start">
          {/* Text content — positioned to the left, overlapping the image */}
          <div className="relative z-20 flex flex-col mr-[-40px] sm:mr-[-60px] md:mr-[-80px] mt-[10%]">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]"
              style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
            >
              tanuj
              <br />
              karthikeyan
            </h1>

            <nav className="mt-6 flex flex-col gap-1 text-sm sm:text-base font-mono">
              <a href="/v1#projects" className="text-gray-400 hover:text-white transition-colors">
                robotics
              </a>
              <a href="/v1#research" className="text-gray-400 hover:text-white transition-colors">
                research
              </a>
              <a href="/v1#projects" className="text-gray-400 hover:text-white transition-colors">
                projects
              </a>
              <a href="/v1#awards" className="text-gray-400 hover:text-white transition-colors">
                debate
              </a>
            </nav>
          </div>

          {/* Hero image */}
          <div className="relative flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src="/tanujhero.png"
              alt="Tanuj Karthikeyan"
              onLoad={placeStickers}
              className="h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] w-auto object-contain"
              draggable={false}
            />
            <p
              className="mt-3 text-[11px] sm:text-xs tracking-[0.2em] text-gray-500 font-mono"
            >
              click the stickers
            </p>
          </div>
        </div>
      </div>

      {/* Bottom-right links */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex flex-col items-end gap-1 font-mono">
        <a
          href="mailto:soccertanuj@gmail.com"
          className="text-[11px] sm:text-xs text-gray-500 hover:text-white transition-colors"
        >
          send an email
        </a>
        <a
          href="https://medium.com/@tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] sm:text-xs text-gray-500 hover:text-white transition-colors"
        >
          read articles on my medium
        </a>
        <a
          href="https://github.com/tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] sm:text-xs text-gray-500 hover:text-white transition-colors"
        >
          check out projects on my github
        </a>
        <a
          href="https://www.linkedin.com/in/tanujkart/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] sm:text-xs text-gray-500 hover:text-white transition-colors"
        >
          check my linkedin
        </a>
      </div>
    </main>
  );
}
