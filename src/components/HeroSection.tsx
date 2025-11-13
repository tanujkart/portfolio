"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface LegoPerson {
  image: string;
  name: string;
  statement: string;
}

const people: LegoPerson[] = [
  {
    image: "/tanuj.png",
    name: "tanuj karthikeyan",
    statement: "i am a student at the north carolina school of science and math",
  },
  {
    image: "/researcher.png",
    name: "tanuj karthikeyan",
    statement: "i am a researcher",
  },
  {
    image: "/public speaker.png",
    name: "tanuj karthikeyan",
    statement: "i am a public speaker",
  },
  {
    image: "/tanuj.png",
    name: "tanuj karthikeyan",
    statement: "i am a creator",
  },
];

export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = people[selectedIndex];
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [rotation, setRotation] = useState(0);
  const totalRotationRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;
    const text = current.statement;

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50); // Typing speed - adjust as needed

    return () => clearInterval(typeInterval);
  }, [current.statement]);

  // Continuous 3D rotation animation with character change every 90 degrees
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      const previousTotal = totalRotationRef.current;
      totalRotationRef.current += 0.5;
      const newRotation = totalRotationRef.current % 360;
      setRotation(newRotation);
      
      // Check if we've crossed a 90-degree boundary
      const previousMilestone = Math.floor(previousTotal / 90);
      const currentMilestone = Math.floor(totalRotationRef.current / 90);
      
      // If we've crossed a new 90-degree milestone, change character smoothly
      if (currentMilestone > previousMilestone) {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % people.length);
      }
    }, 50); // Adjust speed: lower = faster rotation

    return () => clearInterval(rotateInterval);
  }, []);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? people.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === people.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mx-auto max-w-7xl px-8 py-32">
      <div className="flex items-center gap-12 md:gap-20">
        <div className="flex flex-col items-center">
          <div className="relative">
            <button
              onClick={handlePrevious}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-blue-100/80 backdrop-blur-sm p-2 text-blue-700 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="group relative">
              <div
                className="cursor-pointer select-none"
                style={{ perspective: "1000px" }}
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const diff = moveEvent.clientX - startX;
                    if (Math.abs(diff) > 50) {
                      if (diff > 0) handlePrevious();
                      else handleNext();
                      document.removeEventListener("mousemove", handleMouseMove);
                      document.removeEventListener("mouseup", handleMouseUp);
                    }
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };
                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
                onTouchStart={(e) => {
                  const startX = e.touches[0].clientX;
                  const handleTouchMove = (moveEvent: TouchEvent) => {
                    const diff = moveEvent.touches[0].clientX - startX;
                    if (Math.abs(diff) > 50) {
                      if (diff > 0) handlePrevious();
                      else handleNext();
                      document.removeEventListener("touchmove", handleTouchMove);
                      document.removeEventListener("touchend", handleTouchEnd);
                    }
                  };
                  const handleTouchEnd = () => {
                    document.removeEventListener("touchmove", handleTouchMove);
                    document.removeEventListener("touchend", handleTouchEnd);
                  };
                  document.addEventListener("touchmove", handleTouchMove);
                  document.addEventListener("touchend", handleTouchEnd);
                }}
                aria-label="Swipe to change figure"
              >
                <div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation}deg)`,
                  }}
                >
                  <Image
                    src={current.image}
                    alt="LEGO figurine"
                    width={220}
                    height={330}
                    priority
                    unoptimized
                    className="hover:scale-105 transition-transform duration-300"
                    style={{ backfaceVisibility: "visible" }}
                    draggable={false}
                  />
                </div>
              </div>
              <button
                onClick={handlePrevious}
                className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-blue-100/80 backdrop-blur-sm p-2 text-blue-700 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          {/* Dots indicator */}
          <div className="mt-4 flex gap-2">
            {people.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`h-1.5 rounded-full border transition-all ${
                  index === selectedIndex ? "w-8 bg-blue-600 border-blue-600" : "w-1.5 bg-blue-300 border-blue-300 hover:bg-blue-400"
                }`}
                aria-label={`Go to ${people[index].statement}`}
              />
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com/tanujkart"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-lg border-4 border-blue-300 bg-blue-50 text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100 hover:scale-110 shadow-lg transform"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/tanujkart/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-lg border-4 border-blue-300 bg-blue-50 text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100 hover:scale-110 shadow-lg transform"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold tracking-tight text-blue-900 sm:text-7xl md:text-8xl text-center drop-shadow-lg" style={{ textShadow: '3px 3px 0 rgba(59, 130, 246, 0.2)' }}>
            {current.name}
          </h1>
          <p className="mt-4 text-xl font-bold text-blue-700/80 sm:text-2xl md:text-3xl transition-all text-center leading-relaxed drop-shadow-sm">
            {displayedText}
            {isTyping && <span className="animate-pulse text-blue-500">|</span>}
          </p>
          <p className="mt-4 max-w-3xl text-center text-base text-blue-600/80 sm:text-lg md:text-xl font-semibold">
            after playing with legos, i fell in love with tech. now i'm interested in intelligent systems and how they translate to impact.
          </p>
        </div>
      </div>
    </div>
  );
}

