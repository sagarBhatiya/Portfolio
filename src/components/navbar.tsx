"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Background scroll check
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy logic
      const sections = navItems.map((item) => {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold based on viewport height and header offset
          const offsetTop = rect.top + window.scrollY - 120;
          return {
            id: item.href.slice(1),
            offset: offsetTop,
            height: rect.height,
          };
        }
        return null;
      }).filter(Boolean) as { id: string; offset: number; height: number }[];

      const scrollPos = window.scrollY + 150;
      let currentSection = "home";

      for (let i = 0; i < sections.length; i++) {
        const { id, offset, height } = sections[i];
        if (scrollPos >= offset && scrollPos < offset + height) {
          currentSection = id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "glassmorphism-nav shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleClick(e, "#home")} className="group flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
            SB
          </span>
          <span className="hidden sm:inline-block font-semibold text-sm tracking-wide text-foreground/80 group-hover:text-foreground transition-colors">
            Sagar Bhatiya
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? "text-brand-cyan"
                  : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {item.name}
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-brand-blue/10 dark:bg-brand-cyan/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border bg-card hover:bg-accent/40 text-foreground/80 hover:text-foreground transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-brand-blue" />
            ) : (
              <Sun className="w-5 h-5 text-brand-cyan" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-border bg-card hover:bg-accent/40 text-foreground/80 hover:text-foreground md:hidden transition-all duration-300"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glassmorphism border-b border-border shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all ${
                    activeSection === item.href.slice(1)
                      ? "bg-gradient-to-r from-brand-blue/15 to-brand-cyan/15 text-brand-cyan border-l-4 border-brand-cyan"
                      : "text-foreground/75 hover:bg-accent/20 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
