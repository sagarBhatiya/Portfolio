"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import GithubIcon from "@/components/ui/github-icon";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  techStack: string[];
  category: "ai" | "fullstack" | "nextjs";
  githubLink: string;
  liveLink: string;
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const projectList: ProjectItem[] = [
    {
      id: "ai-assistant",
      title: "ChatGPT-Style AI Assistant & Resume RAG",
      description: "A full-featured conversational AI assistant interface powered by Groq LLMs, character-by-character SSE live text streaming, dynamic candidate resume parsing, multi-session management, and slide-over profile drawer.",
      image: "/ai-assistant.png",
      features: [
        "Groq LLM integration with model switcher (GPT-OSS 120B, Qwen 3.6 27B, Compound)",
        "Server-Sent Events (SSE) `/api/chat` character-by-character live streaming",
        "Dynamic candidate resume PDF parsing with slide-over preview drawer & JSON editor",
        "Collapsible ChatGPT-style sidebar with multi-session chat history management",
      ],
      techStack: ["Next.js 16", "React 19", "Python", "FastAPI", "Groq LLM", "PyMuPDF", "Tailwind CSS"],
      category: "ai",
      githubLink: "https://github.com/sagar9125508",
      liveLink: "https://github.com/sagar9125508",
    },
    {
      id: "finance-tracker",
      title: "AI-Powered Personal Finance Tracker",
      description: "A comprehensive financial management application with AI-driven expense insights, automated budget analysis, and interactive spending metrics.",
      image: "/finance-tracker.png",
      features: [
        "LLM & OpenAI API integration for intelligent spending advice",
        "Secure cookie-based authentication and protected API endpoints",
        "Dynamic transaction analytics with interactive Chart.js charts",
        "Automated alerts and smart category budgeting caps",
      ],
      techStack: ["Python", "OpenAI API", "React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      category: "ai",
      githubLink: "https://github.com/sagarBhatiya",
      liveLink: "https://github.com/sagarBhatiya",
    },
    {
      id: "vehicle-booking",
      title: "Vehicle Reservation & AI Fleet System",
      description: "An interactive rental reservation portal featuring intelligent vehicle recommendation search, real-time availability checks, and reservation logs.",
      image: "/vehicle-booking.png",
      features: [
        "RAG & Vector search for natural language vehicle query matching",
        "Dynamic vehicle fleet catalogue with real-time scheduling",
        "Secure API endpoints and data schema validation",
        "Admin dashboard to manage fleet logs and booking stats",
      ],
      techStack: ["Next.js", "TypeScript", "Python", "Tailwind CSS", "MySQL", "Prisma ORM"],
      category: "nextjs",
      githubLink: "https://github.com/sagarBhatiya",
      liveLink: "https://github.com/sagarBhatiya",
    },
  ];

  const filteredProjects = activeFilter === "all"
    ? projectList
    : projectList.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A showcase of my AI Engineering and full-stack web applications, complete with repository links and intelligent features.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 pointer-events-auto cursor-pointer ${
              activeFilter === "all"
                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setActiveFilter("ai")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 pointer-events-auto cursor-pointer ${
              activeFilter === "ai"
                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            AI & LLM Solutions
          </button>
          <button
            onClick={() => setActiveFilter("nextjs")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 pointer-events-auto cursor-pointer ${
              activeFilter === "nextjs"
                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            Next.js / Full Stack
          </button>
        </div>

        {/* Projects Cards Grid */}
        <motion.div layout className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
              >
                <Card className="border border-border bg-card/60 dark:bg-card/30 backdrop-blur-md overflow-hidden hover:border-brand-blue/30 dark:hover:border-brand-cyan/30 transition-all duration-300 group shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
                    
                    {/* Left: Image Panel */}
                    <div className="lg:col-span-5 relative w-full aspect-video rounded-xl overflow-hidden border border-border flex items-center justify-center bg-muted/20 dark:bg-muted/10 shadow-sm shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, 400px"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm">
                          {project.category === "fullstack" ? "MERN Stack" : "Next.js / MySQL"}
                        </span>
                      </div>
                    </div>

                    {/* Right: Content details */}
                    <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground group-hover:text-brand-cyan transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        {/* Features Bullet list */}
                        <div className="space-y-2 pt-2">
                          <h4 className="text-xs font-extrabold text-foreground/80 uppercase tracking-widest">Key Features</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {project.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2 text-muted-foreground">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tech Stack and Redirection buttons */}
                      <div className="space-y-4 pt-2">
                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech, tIdx) => (
                            <Badge
                              key={tIdx}
                              variant="secondary"
                              className="text-[10px] sm:text-xs font-semibold tracking-wide bg-secondary/80 dark:bg-secondary/40 text-foreground border border-border/80"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Direct redirect buttons */}
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-border bg-background hover:bg-accent/40 text-foreground transition-all duration-200 pointer-events-auto"
                          >
                            <GithubIcon className="w-4 h-4 text-brand-blue" />
                            GitHub Code
                          </a>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-90 text-white shadow-md shadow-brand-blue/15 transition-all duration-200 pointer-events-auto"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
