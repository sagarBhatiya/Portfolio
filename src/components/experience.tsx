"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Experience() {
  const offerings = [
    "Expertise in AI solutions: LLM integration, RAG pipeline design, OpenAI API, PyTorch & LangChain.",
    "Proficient full-stack builds using Next.js, React, Node.js, Python FastAPI, and SQL/NoSQL databases.",
    "Strong algorithmic foundation with 500+ solved data structure & algorithm problems.",
    "Familiarity with version control (Git/GitHub), REST APIs, vector databases, and modern dev tooling.",
  ];

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-brand-blue/5 blur-[100px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            Professional Experience
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Work history, collaboration details, and professional capabilities.
          </p>
        </div>

        {/* Opportunity Card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="border border-border bg-card/60 dark:bg-card/35 backdrop-blur-md glow-cyan relative overflow-hidden text-left p-8 hover:border-brand-cyan/35 transition-all duration-300">
              
              {/* Decorative accent element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-cyan/20 to-transparent rounded-bl-full pointer-events-none" />

              <CardContent className="p-0 space-y-6">
                
                {/* Header info */}
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0 animate-bounce-slow">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                      Open to Internship Opportunities
                    </h3>
                    <p className="text-sm font-semibold text-brand-cyan mt-0.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      AI Engineer Intern / Software Development Engineer Intern
                    </p>
                  </div>
                </div>

                {/* Subtext description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I am actively seeking Software Development Internship, Graduate Engineer, or Junior Developer opportunities starting immediately. I bring high-energy commitment, solid engineering fundamentals, and a passion for crafting responsive user journeys.
                </p>

                {/* Qualities / Offerings list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold text-foreground/80 uppercase tracking-widest">What I bring to your team</h4>
                  <ul className="space-y-2.5">
                    {offerings.map((offering, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-cyan shrink-0 mt-0.5" />
                        <span>{offering}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button Action redirect */}
                <div className="pt-4">
                  <button
                    onClick={handleContactClick}
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white hover:opacity-90 active:scale-95 transition-all shadow-md shadow-brand-blue/15 pointer-events-auto cursor-pointer"
                  >
                    Discuss Opportunities
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
