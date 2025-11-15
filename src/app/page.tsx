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

// Debate experiences - add your debate locations and topics here
const debateExperiences = [
  {
    location: "Stanford Invitational",
    topic: "The United States should accede to the Rome Statute of the International Criminal Court.",
    result: "1st place",
  },
  {
    location: "Georgetown Spring Tournament",
    topic: "In the United States, the benefits of the use of generative artificial intelligence in education outweigh the harms.",
    result: "1st place",
  },
  {
    location: "Georgetown Fall",
    topic: "Resolved: The United States federal government should substantially expand its surveillance infrastructure along its southern border.",
    result: "Quarter-Finalist",
  },
  {
    location: "National Speech and Debate Tournament",
    topic: "Resolved: The United States federal government should substantially increase fiscal redistribution in the United States by adopting a federal jobs guarantee, expanding Social Security, and/or providing a basic income.",
    result: "Qualifier",
  },
  {
    location: "Harvard Invitational",
    topic: "Resolved: The United States should accede to the Rome Statute of the International Criminal Court.",
    result: "Qualifier",
  },
  {
    location: "Emory Forum",
    topic: "Resolved: The United States federal government should repeal Section 230 of the Communications Decency Act.",
    result: "Qualifier",
  },
];

export default function Home() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };


  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentPhotoIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentPhotoIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-8">
      <section id="photos" className="scroll-mt-24 pt-16 pb-16 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Photos</h2>
        <p className="mb-10 text-center text-lg italic text-blue-700/70 font-medium">
          "Someone once told me if you didn't take a photo, it didn't happen"
        </p>
        <div className="relative max-w-6xl mx-auto px-12">
          {/* Main photo display - 3 photos at once */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(calc(33.333% - ${currentPhotoIndex} * (33.333% + 1rem)))` }}>
              {galleryPhotos.map((photo, index) => {
                // Get the 3 photos to show: previous, current, next
                const getPhotoIndex = (offset: number) => {
                  let idx = currentPhotoIndex + offset;
                  if (idx < 0) idx = galleryPhotos.length + idx;
                  if (idx >= galleryPhotos.length) idx = idx - galleryPhotos.length;
                  return idx;
                };
                
                const leftIndex = getPhotoIndex(-1);
                const centerIndex = currentPhotoIndex;
                const rightIndex = getPhotoIndex(1);
                
                const isVisible = index === leftIndex || index === centerIndex || index === rightIndex;
                const isCenter = index === centerIndex;
                
                if (!isVisible) return null;
                
                return (
                  <div
                    key={`${index}-${currentPhotoIndex}`}
                    className="flex-shrink-0 w-full md:w-1/3"
                  >
                    <div className={`relative overflow-hidden rounded-2xl border-4 shadow-xl bg-white group transition-all duration-300 ${
                      isCenter 
                        ? 'border-blue-600 scale-105 z-10' 
                        : 'border-blue-200 scale-95 opacity-80'
                    }`}>
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-medium text-sm">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 text-blue-700 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-3 text-blue-700 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {galleryPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentPhotoIndex
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-blue-300 hover:bg-blue-400"
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Photo counter */}
          <div className="mt-4 text-center text-blue-600 font-medium">
            {currentPhotoIndex + 1} / {galleryPhotos.length}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 pt-16 pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-10 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                Traffic Signal Modification
              </h3>
              <a 
                href="https://patents.justia.com/inventor/tanuj-karthikeyan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button"
                aria-label="Visit patent page"
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

      <section id="debate" className="scroll-mt-24 pt-16 pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Debate</h2>
        <p className="mb-10 text-center text-lg italic text-blue-700/70 font-medium">
          "I love to talk."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {debateExperiences.map((debate, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border-2 border-blue-200/50"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-blue-900">
                  {debate.location}
                </h3>
                {debate.result && (
                  <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 border border-blue-300 rounded">
                    {debate.result}
                  </span>
                )}
              </div>
              <p className="text-sm text-blue-900/80 leading-relaxed">
                {debate.topic}
              </p>
            </div>
          ))}
        </div>
        {debateExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-600/60 text-lg">Add your debate experiences to the debateExperiences array</p>
          </div>
        )}
      </section>

      </main>
  );
}
