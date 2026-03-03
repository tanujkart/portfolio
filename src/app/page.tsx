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

function getStickerPositionsOnLaptop(imgRect: DOMRect, count: number) {
  const laptopLeft = imgRect.left + imgRect.width * 0.08;
  const laptopTop = imgRect.top + imgRect.height * 0.63;
  const laptopW = imgRect.width * 0.84;
  const laptopH = imgRect.height * 0.28;

  const stickerSize = Math.min(55, imgRect.width * 0.14);
  const positions: Array<{ x: number; y: number; rotation: number }> = [];

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
    const rotation = Math.round((Math.random() - 0.5) * 40);
    positions.push({ x, y, rotation });
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
  position: { x: number; y: number; rotation: number };
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
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`;
    }
  }, [position.x, position.y, position.rotation]);

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
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
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
  const [stickerPositions, setStickerPositions] = useState<Array<{ x: number; y: number; rotation: number }>>([]);
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
      next[idx] = { ...next[idx], x, y };
      return next;
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
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

      {/* Centered composition — matches Charlotte Rosario layout */}
      <div className="relative z-5 flex min-h-screen items-center justify-center">
        <div className="relative flex items-start">
          {/* Name + nav — left side, overlapping closer to the face */}
          <div className="relative z-20 flex flex-col mt-[5%] mr-[-60px] sm:mr-[-90px] md:mr-[-110px]">
            <h1 className="text-[28px] sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-[1.15]">
              tanuj
              <br />
              karthikeyan
            </h1>

            <nav className="mt-5 sm:mt-6 flex flex-col gap-0.5 text-[13px] sm:text-sm font-mono tracking-wide">
              <a href="/v1#projects" className="text-gray-500 hover:text-black transition-colors">
                robotics
              </a>
              <a href="/v1#research" className="text-gray-500 hover:text-black transition-colors">
                research
              </a>
              <a href="/v1#projects" className="text-gray-500 hover:text-black transition-colors">
                projects
              </a>
              <a href="/v1#awards" className="text-gray-500 hover:text-black transition-colors">
                debate
              </a>
            </nav>
          </div>

          {/* Hero sketch — blends into white bg naturally */}
          <div className="relative flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src="/tanujhero.png"
              alt="Tanuj Karthikeyan"
              onLoad={placeStickers}
              className="h-[60vh] sm:h-[68vh] md:h-[75vh] lg:h-[82vh] w-auto"
              draggable={false}
            />
            <p className="mt-2 text-[10px] sm:text-[11px] tracking-[0.2em] text-gray-400 font-mono">
              click the stickers
            </p>
          </div>
        </div>
      </div>

      {/* Bottom-right links + credit — monospace, gray */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 flex flex-col items-end gap-0.5 font-mono">
        <a
          href="mailto:soccertanuj@gmail.com"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          send an email
        </a>
        <a
          href="https://medium.com/@tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          read articles on my medium
        </a>
        <a
          href="https://github.com/tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          check out projects on my github
        </a>
        <a
          href="https://www.linkedin.com/in/tanujkart/"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          check my linkedin
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
