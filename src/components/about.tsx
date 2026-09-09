"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GraduationCap, Target, Compass, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardDetails = [
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-blue" />,
      title: "Academic & Tech Journey",
      desc: "Pursuing B.Tech in Computer Science & Engineering with a 8.4 CGPA, building solid foundations in AI architectures, databases, and core software systems.",
    },
    {
      icon: <Target className="w-6 h-6 text-brand-cyan" />,
      title: "Career Objective",
      desc: "Targeting AI Engineer, Machine Learning, and Software Development Engineer roles where I can architect LLM pipelines, RAG frameworks, and high-performance web systems.",
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-blue" />,
      title: "Core Specializations",
      desc: "Deep focus on Artificial Intelligence, Prompt Engineering, Vector Databases, Retrieval-Augmented Generation (RAG), PyTorch, Next.js, and Data Structures & Algorithms.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-blue/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A look into my journey as an AI Engineer and Full Stack Developer solving modern intelligence and web challenges.
          </p>
        </div>

        {/* Narrative & Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Narrative Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="flex items-center gap-3 text-brand-blue dark:text-brand-cyan font-bold tracking-wide text-sm uppercase">
              <Terminal className="w-5 h-5" />
              Sagar Bhatiya // ai engineer bio
            </div>
            
            <h3 className="text-2xl font-bold tracking-tight text-foreground/95 leading-snug">
              Combining AI model intelligence with full-stack web architecture.
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              My engineering work bridges the gap between state-of-the-art Artificial Intelligence models and user-facing web applications. I design custom RAG pipelines, fine-tune LLM prompts, and integrate intelligent vector search engines with seamless full-stack user interfaces.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              When I am not training models or coding React and Next.js applications, you will find me sharpening my problem-solving capabilities on LeetCode with over 500+ algorithmic challenges solved.
            </p>
          </motion.div>

          {/* Right: Dimension Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 w-full"
          >
            {cardDetails.map((card, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="border border-border bg-card/65 dark:bg-card/45 backdrop-blur-md hover:border-brand-blue/30 dark:hover:border-brand-cyan/30 shadow-sm transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
                    <div className="p-3 rounded-xl border border-border bg-background flex items-center justify-center shrink-0">
                      {card.icon}
                    </div>
                    <div className="space-y-1.5 text-left">
                      <h4 className="text-lg font-bold text-foreground">{card.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
