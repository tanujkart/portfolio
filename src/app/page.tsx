"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Photo gallery - add your photos here
const galleryPhotos = [
  {
    src: "/tanuj.png",
    alt: "Tanuj working on projects",
    caption: "Working on robotics projects",
  },
  {
    src: "/researcher.png",
    alt: "Research work",
    caption: "Research and innovation",
  },
  {
    src: "/public speaker.png",
    alt: "Public speaking",
    caption: "Public speaking",
  },
  // Add more photos here as needed
];

// Awards - add your awards here
const awards = [
  {
    organization: "FIRST Robotics",
    name: "1st Innovate at World Championship",
    year: "2025",
  },
  {
    organization: "FIRST Robotics",
    name: "1st Impact Award at State Championship",
    year: "2024",
  },
  {
    organization: "FIRST Robotics",
    name: "1st Inspire Award at State Championship",
    year: "2025",
  },
  {
    organization: "National Speech And Debate Association",
    name: "1st at Stanford Invitational",
    year: "2025",
  },
  {
    organization: "National Speech And Debate Association",
    name: "1st at Georgetown Spring Tournament",
    year: "2025",
  },
  {
    organization: "National Speech And Debate Association",
    name: "National Speech and Debate Tournament Qualifier",
    year: "2024",
  },
  {
    organization: "Future Business Leaders of America (FBLA)",
    name: "National Leadership Conference Qualifier",
    year: "2025",
  },
  {
    organization: "US Congress",
    name: "Congressional App Challenge - Grand Award Winner",
    year: "2025",
  },
];

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const photoWidth = 480; // w-[480px] = 480px
    const gap = 16; // gap-4 = 16px
    const totalWidth = (photoWidth + gap) * galleryPhotos.length;
    
    const scroll = () => {
      setScrollPosition((prev) => {
        const newPos = prev + 0.5;
        // Reset when we've scrolled through all photos
        if (newPos >= totalWidth) {
          return 0;
        }
        return newPos;
      });
    };

    const interval = setInterval(scroll, 20); // Smooth scrolling
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-8">
      {/* Photo strip */}
      <div className="pt-8 pb-12 overflow-hidden">
        <div 
          className="flex gap-4"
          style={{ 
            transform: `translateX(-${scrollPosition}px)`,
            width: 'max-content'
          }}
        >
          {/* Duplicate photos for seamless loop */}
          {[...galleryPhotos, ...galleryPhotos].map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[480px] h-64 relative rounded-lg overflow-hidden border-2 border-blue-200 group hover:border-blue-400 hover:scale-105 transition-all duration-300"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                unoptimized
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-medium text-sm">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section id="projects" className="scroll-mt-24 pt-20 pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-10 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Projects</h2>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-4 gap-4">
              <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors flex-shrink min-w-0">
                Traffic Signal Modification
              </h3>
              <a 
                href="https://patents.justia.com/inventor/tanuj-karthikeyan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button whitespace-nowrap flex-shrink-0"
                aria-label="Visit patent page"
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform flex-shrink-0"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <span className="text-sm font-semibold whitespace-nowrap">Take me there</span>
              </a>
            </div>
            <p className="text-base leading-relaxed text-blue-900/70 mb-6">
              Developed an innovative traffic signal modification system (Patent 11610482) that improves intersection safety and efficiency through intelligent signal timing and adaptive control mechanisms.
            </p>
            <div className="mt-auto pt-6 border-t border-blue-100 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Arduino / ESP32", "Microcontrollers", "C / C++", "Bluetooth", "PCB Design", "3D CAD", "3D Printing"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Hardware Prototyping", "Circuit Design", "Firmware Development", "CAD Modeling", "System Architecture"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group bg-white p-8 rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                ThinkClear
              </h3>
              <a 
                href="https://www.thinkclear.net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button"
                aria-label="Visit ThinkClear website"
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="transform group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <span className="text-sm font-semibold">Take me there</span>
              </a>
            </div>
            <p className="text-base leading-relaxed text-blue-900/70 mb-6">
              A dementia care application designed to support patients and caregivers through innovative technology solutions, improving quality of life and care management.
            </p>
            <div className="mt-auto pt-6 border-t border-blue-100 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "OpenCV", "Flask", "Face Recognition", "SQLite", "Node.js", "Raspberry Pi", "Bluetooth LE"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Full-Stack Development", "Computer Vision", "Facial Recognition", "API Design", "UI/UX", "Embedded Integration", "Rapid Prototyping"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group bg-white p-8 rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                Engage 360
              </h3>
              <a 
                href="https://github.com/tanujkart/engage360"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button"
                aria-label="Visit Engage 360 GitHub repository"
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="transform group-hover/button:scale-110 transition-transform"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-semibold">Take me there</span>
              </a>
            </div>
            <p className="text-base leading-relaxed text-blue-900/70 mb-6">
              A congressional app challenge project designed to engage communities and promote civic participation through innovative technology solutions.
            </p>
            <div className="mt-auto pt-6 border-t border-blue-100 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["React Native", "Expo", "TypeScript", "Expo Router", "Firebase Auth", "REST APIs"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Mobile App Development", "Cross-Platform UI Design", "State Management", "API Consumption", "User Authentication Flow"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
          {showAllProjects && (
            <div className="flex justify-center gap-8">
              <div className="group bg-white p-8 rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col w-full max-w-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                    Lotka-Volterra Model
                  </h3>
                  <a 
                    href="https://github.com/tanujkart/predatorprey"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button"
                    aria-label="Visit Predator-Prey Model GitHub repository"
                  >
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className="transform group-hover/button:scale-110 transition-transform"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm font-semibold whitespace-nowrap">Take me there</span>
                  </a>
                </div>
                <p className="text-base leading-relaxed text-blue-900/70 mb-6">
                  Built a Mathematica-based predator–prey simulation that uses the Lotka–Volterra equations to model how predator and prey populations co-evolve over time.
                </p>
                <div className="mt-auto pt-6 border-t border-blue-100 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Wolfram Mathematica", "Wolfram Cloud", "Lotka–Volterra ODE System", "Symbolic & Numerical Solvers"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Differential Equations Modeling", "Nonlinear Dynamics & Stability Analysis", "Simulation & Phase-Plane Analysis", "Scientific Visualization"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="group bg-white p-8 rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col w-full max-w-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                    Memo – AI Memory-Assist Pendant
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-blue-900/70 mb-6">
                  A privacy-first wearable that captures brief audio moments and summarizes them on-device to help users remember key conversations and tasks in real time.
                </p>
                <div className="mt-auto pt-6 border-t border-blue-100 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Embedded AI", "ESP32", "Bluetooth LE", "Python", "Flask", "On-Device NLP", "SQLite", "Low-Power Microcontrollers", "Mobile App (React Native)"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Hardware Prototyping", "Embedded Systems", "AI Summarization", "Product Design", "System Architecture", "Human-Centered Design", "Rapid Prototyping"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {!showAllProjects && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAllProjects(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              See more
            </button>
          </div>
        )}
      </section>

      <section id="research" className="scroll-mt-24 pt-16 pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-10 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Research</h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - cover image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-4xl rounded-2xl shadow-lg border-2 border-blue-200/50 group hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
            <Image
                src="/HOTSPOTcover.png"
                alt="HOTSPOT Research Cover"
                width={800}
                height={600}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          {/* Right side - text content */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-blue-900 mb-6">
              HOTSPOT
            </h3>
            <p className="text-lg leading-relaxed text-blue-900/70">
              <strong className="text-blue-700 font-semibold">HOTSPOT</strong> (Hybrid Oceanic Tracking via Satellite Proxy & Optimized Time-Series) is an AI-powered early-warning system that predicts harmful algal blooms up to two months in advance using open satellite and ocean data. By blending interpretable machine-learning models with ecological reasoning, <strong className="text-blue-700 font-semibold">HOTSPOT</strong> pinpoints bloom risk across global waters to support scientists and policymakers in protecting marine ecosystems and coastal communities.
            </p>
            <div className="mt-8 pt-6 border-t border-blue-100">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "scikit-learn", "pandas", "NumPy", "xarray", "Jupyter Notebook", "VS Code", "MODIS Aqua", "WOA", "GeoPandas", "Cartopy", "GitHub"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "Ensemble Modeling", "Geospatial Analysis", "Data Processing", "Model Evaluation", "Visualization", "Statistical Analysis"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="awards" className="scroll-mt-24 pt-12 pb-20 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-10 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Awards</h2>
        <div className="overflow-x-auto rounded-xl border-2 border-blue-200/50 shadow-lg bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b-2 border-blue-300">
                <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Organization</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Name</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-blue-900 uppercase tracking-wider">Year</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((award, index) => {
                // Check if this is the first award for this organization
                const isFirstOfOrganization = index === 0 || awards[index - 1].organization !== award.organization;
                const rowSpan = isFirstOfOrganization 
                  ? awards.filter(a => a.organization === award.organization).length 
                  : 0;
                const isEven = index % 2 === 0;
                
                return (
                  <tr
                    key={index}
                    className={`border-b border-blue-100/50 transition-all ${
                      isEven ? 'bg-white' : 'bg-blue-50/30'
                    } hover:bg-blue-100/50 hover:shadow-sm`}
                  >
                    {isFirstOfOrganization && (
                      <td 
                        rowSpan={rowSpan}
                        className="py-5 px-6 text-base font-semibold text-blue-900 align-top border-r border-blue-200/50"
                      >
                        {award.organization}
                      </td>
                    )}
                    <td className="py-5 px-6 text-base text-blue-900 font-medium">{award.name}</td>
                    <td className="py-5 px-6 text-base text-blue-700 font-semibold">{award.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {awards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-600/60 text-lg">Add your awards to the awards array</p>
          </div>
        )}
      </section>

      <section id="contact" className="scroll-mt-24 pt-16 pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-10 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Contact</h2>
        <div className="max-w-5xl mx-auto">
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              setFormStatus("submitting");
              
              const formData = new FormData(e.currentTarget);
              const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
              };

              try {
                const response = await fetch("https://formspree.io/f/mwpadglv", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  setFormStatus("success");
                  (e.target as HTMLFormElement).reset();
                } else {
                  setFormStatus("error");
                }
              } catch (error) {
                setFormStatus("error");
              }
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left side - Name and Email */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={formStatus === "submitting"}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={formStatus === "submitting"}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              {/* Right side - Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-blue-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  disabled={formStatus === "submitting"}
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Your message..."
                />
              </div>
            </div>
            {formStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-green-700 text-sm font-medium">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {formStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm font-medium">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {formStatus === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      </main>
  );
}
