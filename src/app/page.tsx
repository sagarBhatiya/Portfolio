import React from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Achievements from "@/components/achievements";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import LoadingScreen from "@/components/loading-screen";

export default function Home() {
  return (
    <>
      {/* First-load premium transition */}
      <LoadingScreen />
      
      {/* Global Navigation */}
      <Navbar />
      
      {/* Portfolio Sections */}
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* Footer and Utilities */}
      <Footer />
      <ScrollToTop />
    </>
  );
}
