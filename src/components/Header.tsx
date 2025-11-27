"use client";

import { useEffect, useState, useRef } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["awards", "projects", "research", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (navRef.current && !navRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on scroll
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#research", label: "Research" },
    { href: "#awards", label: "Awards" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false); // Close menu on navigation
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b-4 border-blue-300 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-lg">
      <nav ref={navRef} className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("");
            setMenuOpen(false);
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-blue-900 transition-all hover:scale-105"
        >
          Tanuj Karthikeyan
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, id)}
                className={`relative px-4 lg:px-5 py-2 text-sm lg:text-base font-bold transition-all transform hover:scale-105 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white border-2 border-blue-700"
                    : "text-blue-700/80 hover:text-blue-900 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-blue-900 hover:bg-blue-50 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-blue-200 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 space-y-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`block px-4 py-3 text-base font-bold transition-all rounded-lg ${
                    isActive
                      ? "bg-blue-600 text-white border-2 border-blue-700"
                      : "text-blue-700/80 hover:text-blue-900 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
