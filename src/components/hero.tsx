"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, FileText, ArrowRight, Code2 } from "lucide-react";
import GithubIcon from "@/components/ui/github-icon";
import LinkedinIcon from "@/components/ui/linkedin-icon";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-radial from-brand-blue/5 via-transparent to-transparent dark:from-brand-cyan/5"
    >
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-brand-blue/10 blur-[100px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-brand-cyan/10 blur-[120px] animate-pulse-slow -z-10" />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Info Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Tagline */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 dark:border-brand-cyan/30 dark:bg-brand-cyan/10 text-xs font-semibold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              Open to AI Engineering & SDE Internships
            </motion.div>

            {/* Main Title */}
            <div className="space-y-2">
              <motion.h3 variants={itemVariants} className="text-lg font-semibold tracking-wide text-foreground/75">
                Hi, my name is
              </motion.h3>
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-brand-blue via-blue-500 to-brand-cyan bg-clip-text text-transparent">
                  Sagar Bhatiya
                </span>
              </motion.h1>
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground/90"
              >
                AI Engineer | Full Stack & AI Solutions Developer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              I am a Computer Science student and AI Engineer specializing in Artificial Intelligence, Large Language Models (LLMs), RAG architectures, and Full Stack Web Applications. I build intelligent web systems, optimize algorithms, and turn complex data problems into fast, interactive user experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              <button
                onClick={handleContactClick}
                className="group relative flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-90 active:scale-95 shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/35 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="mailto:sagarbhatiya12211@gmail.com"
                className="group flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl border border-border bg-card hover:bg-accent/40 text-foreground active:scale-95 transition-all duration-300"
              >
                <FileText className="w-4 h-4 text-brand-blue dark:text-brand-cyan" />
                Email Me Directly
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Connect:</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/sagarBhatiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-border bg-card hover:bg-accent/40 text-foreground/80 hover:text-brand-cyan hover:scale-110 active:scale-95 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sagar-bhatiya-3570a2282/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-border bg-card hover:bg-accent/40 text-foreground/80 hover:text-brand-blue hover:scale-110 active:scale-95 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:sagarbhatiya12211@gmail.com"
                  className="p-2.5 rounded-full border border-border bg-card hover:bg-accent/40 text-foreground/80 hover:text-brand-cyan hover:scale-110 active:scale-95 transition-all duration-300"
                  aria-label="Email Address"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Graphics Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[450px] aspect-square rounded-2xl bg-slate-950 dark:bg-[#0b0f19]/90 border border-slate-800 shadow-2xl p-5 overflow-hidden flex flex-col justify-between text-slate-100">
              
              {/* Fake Terminal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Code2 className="w-3.5 h-3.5" />
                  ai_engineer.py
                </div>
              </div>

              {/* Code Snippet content */}
              <div className="font-mono text-xs sm:text-sm text-left space-y-1.5 py-4 flex-grow overflow-auto select-none text-slate-200">
                <p><span className="text-blue-400 font-bold">class</span> <span className="text-emerald-400 font-bold">AIEngineer</span>:</p>
                <p className="pl-4">name = <span className="text-cyan-300">&quot;Sagar Bhatiya&quot;</span></p>
                <p className="pl-4">role = <span className="text-cyan-300">&quot;AI Engineer &amp; Full Stack Dev&quot;</span></p>
                <p className="pl-4">education = <span className="text-cyan-300">&quot;B.Tech CSE Student&quot;</span></p>
                <p className="pl-4">focus = [</p>
                <p className="pl-8"><span className="text-cyan-300">&quot;LLMs / RAG Architecture&quot;</span>,</p>
                <p className="pl-8"><span className="text-cyan-300">&quot;Python &amp; PyTorch&quot;</span>,</p>
                <p className="pl-8"><span className="text-cyan-300">&quot;Next.js &amp; Full Stack Systems&quot;</span></p>
                <p className="pl-4">]</p>
                <p className="pl-4">ai_passionate = <span className="text-yellow-400">True</span></p>
                <p className="pl-4">problem_solver = <span className="text-yellow-400">True</span></p>
              </div>

              {/* Footer Stat panel */}
              <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-3 text-[11px] font-mono text-slate-400">
                <div>
                  <span className="text-cyan-400 font-semibold">DSA Solved:</span> 500+
                </div>
                <div className="text-right">
                  <span className="text-blue-400 font-semibold">Domain:</span> AI &amp; Web Apps
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
