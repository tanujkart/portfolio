"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Photo gallery - photos from pics folder (excluding HEIC and TrafficSignal)
const allPhotos = [
  { src: "/pics/2024FRCRobot.jpg", alt: "2024 FRC Robot" },
  { src: "/pics/4thGradeCapitolRobotics.jpg", alt: "4th Grade Capitol Robotics" },
  { src: "/pics/AttacheAlumniWknd.JPG", alt: "Attache Alumni Weekend" },
  { src: "/pics/AttacheGroupPhoto.jpg", alt: "Attache Group Photo" },
  { src: "/pics/FirstDebateTournament.JPG", alt: "First Debate Tournament" },
  { src: "/pics/GlassesDesign.PNG", alt: "Glasses Design" },
  { src: "/pics/LemonadeStand.jpg", alt: "Lemonade Stand" },
  { src: "/pics/M&TSIGlassDesign.png", alt: "M&TSI Glass Design" },
  { src: "/pics/M&TSIOnStage.jpg", alt: "M&TSI On Stage" },
  { src: "/pics/M&TSIPracticeBeforeStage.jpg", alt: "M&TSI Practice Before Stage" },
  { src: "/pics/M&TSIStage.png", alt: "M&TSI Stage" },
  { src: "/pics/OutstandingVolunteerAward.JPG", alt: "Outstanding Volunteer Award" },
  { src: "/pics/PresentingToFireDept.JPG", alt: "Presenting To Fire Department" },
  { src: "/pics/SigmaLolaPhoto.jpg", alt: "Sigma Lola Photo" },
  { src: "/pics/SigmaTeamPhoto.jpg", alt: "Sigma Team Photo" },
  { src: "/pics/Soccer.JPG", alt: "Soccer" },
  { src: "/pics/SoccerAgain.JPG", alt: "Soccer Again" },
  { src: "/pics/SpeakerEventMcFarland.jpg", alt: "Speaker Event McFarland" },
  { src: "/pics/VolunteeringAtFLL.JPG", alt: "Volunteering At FLL" },
  { src: "/pics/VolunteeringAtTitle1.jpg", alt: "Volunteering At Title 1" },
  { src: "/pics/WinningImpact.jpeg", alt: "Winning Impact" },
];

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const awards = [
  {
    organization: "Research",
    name: "2nd Place Stockholm Junior Water Prize",
    year: "2026",
  },
  {
    organization: "Research",
    name: "3rd Place NC Region 3B Science Fair - Earth and Environmental Science",
    year: "2026",
  },
  {
    organization: "Robotics",
    name: "Innovate Award World Champion",
    year: "2025",
  },
  {
    organization: "Robotics",
    name: "Inspire Award State Champion",
    year: "2025, 2026",
  },
  {
    organization: "Robotics",
    name: "Impact Award State Champion",
    year: "2024",
  },
  {
    organization: "Robotics",
    name: "3x Worlds Qualifier",
    year: "2024, 2025, 2026",
  },
  {
    organization: "Debate",
    name: "Champion of Stanford Invitational Debate Tournament",
    year: "2025",
  },
  {
    organization: "Debate",
    name: "Champion of Georgetown Invitational Debate Tournament",
    year: "2025",
  },
  {
    organization: "Debate",
    name: "Quarter-Finalist of Georgetown Fall Debate Tournament",
    year: "2024",
  },
  {
    organization: "Debate",
    name: "2x Nationals Qualifier",
    year: "2024, 2025",
  },
  {
    organization: "Business",
    name: "Sales Presentation Finalist",
    year: "2023",
  },
  {
    organization: "Business",
    name: "Data Analysis Finalist",
    year: "2024",
  },
  {
    organization: "Business",
    name: "Help Desk Finalist",
    year: "2025",
  },
  {
    organization: "Business",
    name: "Nationals Qualifier",
    year: "2025",
  },
  {
    organization: "Academic",
    name: "National Merit Finalist",
    year: "2026",
  },
];

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState(allPhotos);

  useEffect(() => {
    // Shuffle photos on the client after hydration to avoid SSR mismatch
    setGalleryPhotos(shuffleArray(allPhotos));
  }, []);

  // Responsive photo dimensions
  const [photoWidth, setPhotoWidth] = useState(600);
  const [windowWidth, setWindowWidth] = useState(1024);
  const gap = 16; // gap-4 = 16px
  
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 640) {
        setPhotoWidth(280); // Mobile: smaller photos
      } else if (width < 1024) {
        setPhotoWidth(400); // Tablet: medium photos
      } else {
        setPhotoWidth(600); // Desktop: full size
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  const totalWidth = (photoWidth + gap) * galleryPhotos.length;
  const displayPhotos = [...galleryPhotos, ...galleryPhotos];
  const normalizedScroll =
    totalWidth === 0 ? 0 : ((scrollPosition % totalWidth) + totalWidth) % totalWidth;
  const visibleWidth = Math.min(photoWidth * 3 + gap * 2, windowWidth - 32);
  const scrollAmount = photoWidth + gap; // Scroll by one photo width + gap
  const photoHeight = windowWidth < 640 ? 200 : windowWidth < 1024 ? 250 : 320;

  useEffect(() => {
    const scroll = () => {
      setScrollPosition((prev) => prev + 0.5);
    };

    const interval = setInterval(scroll, 20); // Smooth scrolling
    return () => clearInterval(interval);
  }, [totalWidth]);

  const handlePrevious = () => {
    setScrollPosition((prev) => prev - scrollAmount);
  };

  const handleNext = () => {
    setScrollPosition((prev) => prev + scrollAmount);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Photo strip */}
      <div className="pt-4 sm:pt-8 pb-8 sm:pb-12 overflow-hidden relative">
        {/* Left arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white rounded-full p-2 sm:p-3 hover:bg-blue-700 transition-all transform hover:scale-110 shadow-lg"
          aria-label="Previous photo"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white rounded-full p-2 sm:p-3 hover:bg-blue-700 transition-all transform hover:scale-110 shadow-lg"
          aria-label="Next photo"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="overflow-hidden mx-auto" style={{ width: `min(100%, ${visibleWidth}px)` }}>
          <div 
            className="flex gap-3 sm:gap-4"
            style={{ 
              transform: `translateX(-${normalizedScroll}px)`,
              width: `${displayPhotos.length * (photoWidth + gap)}px`,
              transition: 'transform 0s linear'
            }}
          >
            {/* Duplicate photos multiple times for truly seamless infinite loop */}
            {displayPhotos.map((photo, index) => {
              // Get the actual photo index (modulo to handle duplicates)
              const actualPhotoIndex = index % galleryPhotos.length;
              const actualPhoto = galleryPhotos[actualPhotoIndex];
              
              // Custom positioning for specific images
              const getImageStyle = () => {
                if (photo.src.includes('WinningImpact')) {
                  return { objectPosition: 'center 30%' }; // Center up a little
                }
                if (photo.src.includes('4thGradeCapitolRobotics')) {
                  return { objectPosition: 'center 20%' }; // Move higher
                }
                if (photo.src.includes('M&TSIGlassDesign')) {
                  return { transform: 'scale(0.85)' }; // Zoom out
                }
                return {};
              };
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPhoto(actualPhoto)}
                  className="flex-shrink-0 relative rounded-lg overflow-hidden border-2 border-blue-200 group hover:border-blue-400 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ 
                    width: `${photoWidth}px`,
                    height: `${photoHeight}px`
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    style={getImageStyle()}
                    unoptimized
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Photo Modal/Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all transform hover:scale-110 backdrop-blur-sm"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div
              className="relative w-full h-full max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain rounded-lg"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}

      <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-6 sm:mb-8 lg:mb-10 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm px-4 sm:px-0" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Projects</h2>
        <div className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="group bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                Traffic Signal Modification
              </h3>
              <a 
                href="https://patents.justia.com/inventor/tanuj-karthikeyan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button whitespace-nowrap text-sm sm:text-base"
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
          <div className="group bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                ThinkClear
              </h3>
              <a 
                href="https://www.thinkclear.net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button text-sm sm:text-base"
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
          <div className="group bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                Engage 360
              </h3>
              <a 
                href="https://github.com/tanujkart/engage360"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button text-sm sm:text-base"
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
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8">
              <div className="group bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col w-full max-w-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                    Lotka-Volterra Model
                  </h3>
                  <a 
                    href="https://github.com/tanujkart/predatorprey"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg group/button text-sm sm:text-base"
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
              <div className="group bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200/50 shadow-lg hover:shadow-2xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-300 flex flex-col w-full max-w-lg">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
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
          <div className="mt-6 sm:mt-8 flex justify-center">
            <button
              onClick={() => setShowAllProjects(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              See more
            </button>
          </div>
        )}
      </section>

      <section id="research" className="scroll-mt-20 sm:scroll-mt-24 pt-12 sm:pt-16 pb-16 sm:pb-24 lg:pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-6 sm:mb-8 lg:mb-10 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm px-4 sm:px-0" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Research</h2>
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center justify-center px-4 sm:px-0">
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
          <div className="flex flex-col justify-center px-4 sm:px-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">
              HOTSPOT
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-blue-900/70">
              <strong className="text-blue-700 font-semibold">HOTSPOT</strong> (Hybrid Oceanic Tracking via Satellite Proxy & Optimized Time-Series) is an AI-powered early-warning system that predicts harmful algal blooms up to two months in advance using open satellite and ocean data. By blending interpretable machine-learning models with ecological reasoning, <strong className="text-blue-700 font-semibold">HOTSPOT</strong> pinpoints bloom risk across global waters to support scientists and policymakers in protecting marine ecosystems and coastal communities.
            </p>
            <div className="mt-8 pt-6 border-t border-blue-100">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "scikit-learn", "pandas", "NumPy", "xarray", "Jupyter Notebook", "MODIS Aqua", "GeoPandas", "Cartopy", "GitHub"].map((tech) => (
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
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Outcomes</h4>
                  <div className="flex flex-wrap gap-2">
                    {["2nd Place Stockholm Junior Water Prize (2026)", "3rd Place NC Region 3B Science Fair (2026)", "20-page Regeneron STS research paper"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="awards" className="scroll-mt-20 sm:scroll-mt-24 pt-12 sm:pt-16 pb-12 sm:pb-20 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-6 sm:mb-8 lg:mb-10 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm px-4 sm:px-0" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Awards</h2>
        <div className="overflow-x-auto rounded-xl border-2 border-blue-200/50 shadow-lg bg-white mx-4 sm:mx-0">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b-2 border-blue-300">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-blue-900 uppercase tracking-wider">Category</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-blue-900 uppercase tracking-wider">Award</th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-bold text-blue-900 uppercase tracking-wider">Year</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((award, index) => {
                const isFirstOfOrganization = index === 0 || awards[index - 1].organization !== award.organization;
                const rowSpan = isFirstOfOrganization
                  ? awards.filter((a) => a.organization === award.organization).length
                  : 0;
                const isEven = index % 2 === 0;

                return (
                  <tr
                    key={`${award.organization}-${award.name}`}
                    className={`border-b border-blue-100/50 transition-all ${
                      isEven ? "bg-white" : "bg-blue-50/30"
                    } hover:bg-blue-100/50 hover:shadow-sm`}
                  >
                    {isFirstOfOrganization && (
                      <td
                        rowSpan={rowSpan}
                        className="py-4 sm:py-5 px-3 sm:px-6 text-sm sm:text-base font-semibold text-blue-900 align-top border-r border-blue-200/50"
                      >
                        {award.organization}
                      </td>
                    )}
                    <td className="py-4 sm:py-5 px-3 sm:px-6 text-sm sm:text-base text-blue-900 font-medium">{award.name}</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-6 text-sm sm:text-base text-blue-700 font-semibold">{award.year}</td>
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

      <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 pt-12 sm:pt-16 pb-16 sm:pb-24 lg:pb-32 border-t-4 border-blue-200 bg-white">
        <h2 className="mb-6 sm:mb-8 lg:mb-10 text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-blue-600 drop-shadow-sm px-4 sm:px-0" style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)', letterSpacing: '-0.03em' }}>Contact</h2>
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Left side - Name and Email */}
              <div className="space-y-4 sm:space-y-6">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 text-sm sm:text-base resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {formStatus === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-6 sm:py-8 lg:py-10 text-center text-xs sm:text-sm text-blue-700 border-t border-blue-100 bg-white px-4">
        <p className="font-semibold">Designed and Built by Tanuj Karthikeyan</p>
        <p className="mt-2">&copy; 2026 All Rights Reserved</p>
      </footer>

      </main>
  );
}
