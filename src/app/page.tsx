"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const stickers = [
  { id: "thinkclear", src: "/stickers/thinkclear.png", alt: "ThinkClear" },
  { id: "foundation", src: "/stickers/foundation.png", alt: "NCSSM Foundation" },
  { id: "first", src: "/stickers/first.png", alt: "FIRST Robotics" },
  { id: "nsda", src: "/stickers/nsda.png", alt: "NSDA Debate" },
  { id: "bcvp", src: "/stickers/bcvp.png", alt: "Bull City Venture Partners" },
  { id: "docubridge", src: "/stickers/docubridge.png", alt: "DocuBridge" },
  { id: "spikeball", src: "/stickers/spikeball.png", alt: "Spikeball" },
  { id: "ncdot", src: "/stickers/ncdot.png", alt: "NC DOT" },
  { id: "medium", src: "/stickers/medium.png", alt: "Medium" },
];

function getStickerPositionsOnLaptop(imgRect: DOMRect, count: number) {
  // Full laptop cover/lid front face in tanujhero.png
  const coverLeft = imgRect.left + imgRect.width * 0.10;
  const coverTop = imgRect.top + imgRect.height * 0.58;
  const coverW = imgRect.width * 0.55;
  const coverH = imgRect.height * 0.24;

  const stickerSize = Math.min(36, imgRect.width * 0.09);
  const pad = stickerSize * 0.3;
  const positions: Array<{ x: number; y: number; rotation: number }> = [];

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let attempts = 0;
    do {
      x = coverLeft + pad + Math.random() * (coverW - stickerSize - pad * 2);
      y = coverTop + pad + Math.random() * (coverH - stickerSize - pad * 2);
      attempts++;
    } while (
      attempts < 200 &&
      positions.some(
        (p) => Math.abs(p.x - x) < stickerSize * 0.65 && Math.abs(p.y - y) < stickerSize * 0.65
      )
    );
    const rotation = Math.round((Math.random() - 0.5) * 40);
    positions.push({ x, y, rotation });
  }
  return positions;
}

function Sticker({
  sticker,
  position,
  size,
}: {
  sticker: (typeof stickers)[number];
  position: { x: number; y: number; rotation: number };
  size: number;
}) {
  return (
    <div
      className="absolute top-0 left-0 select-none pointer-events-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
        zIndex: 10,
      }}
    >
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <Image
          src={sticker.src}
          alt={sticker.alt}
          fill
          className="object-contain drop-shadow-lg"
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
    setStickerSize(Math.min(36, rect.width * 0.09));
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

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Stickers layer */}
      {mounted &&
        stickerPositions.length === stickers.length &&
        stickers.map((sticker, i) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            position={stickerPositions[i]}
            size={stickerSize}
          />
        ))}

      {/* Centered composition — matches Charlotte Rosario layout */}
      <div className="relative z-5 flex min-h-screen items-center justify-center">
        <div className="relative flex items-start">
          {/* Name + nav — left side, overlapping closer to the face */}
          <div className="relative z-20 flex flex-col mt-[5%] mr-[-80px] sm:mr-[-120px] md:mr-[-150px]">
            <h1 className="text-[28px] sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-[1.15]">
              tanuj
              <br />
              karthikeyan
            </h1>

            <nav className="mt-5 sm:mt-6 flex flex-col gap-0.5 text-[13px] sm:text-sm font-sans tracking-wide font-bold">
              <a href="/v1#projects" className="text-black hover:underline transition-all">
                robotics
              </a>
              <a href="/v1#research" className="text-black hover:underline transition-all">
                research
              </a>
              <a href="/v1#projects" className="text-black hover:underline transition-all">
                projects
              </a>
              <a href="/v1#awards" className="text-black hover:underline transition-all">
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

      {/* Bottom-right links */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-20 flex flex-col items-end gap-0.5 font-mono">
        <a
          href="mailto:soccertanuj@gmail.com"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          email
        </a>
        <a
          href="https://medium.com/@tkart"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          medium
        </a>
        <a
          href="https://github.com/tanujkart"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/tanujkart/"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] sm:text-[11px] text-gray-400 hover:text-black transition-colors"
        >
          linkedin
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
