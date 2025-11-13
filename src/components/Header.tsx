"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "research"];
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

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#research", label: "Research" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b-4 border-blue-300 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("");
          }}
          className="text-base font-bold tracking-tight text-blue-900 transition-all hover:scale-105 drop-shadow-sm"
          style={{ textShadow: '2px 2px 0 rgba(59, 130, 246, 0.2)' }}
        >
          Tanuj Karthikeyan
        </a>
        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, id)}
                className={`relative px-5 py-2 text-base font-bold transition-all transform hover:scale-105 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
                    : "text-blue-700/80 hover:text-blue-900 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}