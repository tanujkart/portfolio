"use client";

import { useState, useEffect } from "react";

interface Person {
  name: string;
  statement: string;
}

const people: Person[] = [
  {
    name: "tanuj karthikeyan",
    statement: "i am a researcher",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am an engineer",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a public speaker",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a debater",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a builder",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a creator",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a designer",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am an innovator",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a programmer",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a problem-solver",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a leader",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a mentor",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a communicator",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a strategist",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am an entrepreneur",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a storyteller",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am an analyst",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a developer",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a scientist",
  },
  {
    name: "tanuj karthikeyan",
    statement: "i am a visionary",
  },
];

export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = people[selectedIndex];
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;
    let advanceTimeout: NodeJS.Timeout | null = null;
    const text = current.statement;

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        // After typing finishes, wait 2 seconds then advance to next statement
        advanceTimeout = setTimeout(() => {
          setSelectedIndex((prevIndex) => (prevIndex + 1) % people.length);
        }, 2000);
      }
    }, 50); // Typing speed - adjust as needed

    return () => {
      clearInterval(typeInterval);
      if (advanceTimeout) {
        clearTimeout(advanceTimeout);
      }
    };
  }, [current.statement]);


  return (
    <div className="mx-auto max-w-7xl px-8 pt-32 pb-8">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
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
          <div className="mt-8 flex gap-3">
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
            <a
              href="mailto:soccertanuj@gmail.com"
              className="flex h-12 w-12 items-center justify-center rounded-lg border-4 border-blue-300 bg-blue-50 text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100 hover:scale-110 shadow-lg transform"
              aria-label="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

