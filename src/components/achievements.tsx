"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Trophy, FileCheck2, Code2, Award, ExternalLink, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Achievements() {
  const stats = [
    {
      icon: <Code2 className="w-6 h-6 text-brand-cyan" />,
      value: "500+",
      label: "DSA Problems Solved",
      desc: "Practiced extensively across LeetCode, GeeksforGeeks, and CodeStudio, mastering complex algorithms and data structure optimization.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-brand-blue" />,
      value: "AI & LLM Pipelines",
      label: "RAG & Prompt Engineering",
      desc: "Built custom Retrieval-Augmented Generation (RAG) pipelines, OpenAI API integrations, and vector search systems with ChromaDB.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-brand-cyan" />,
      value: "Competitive Edge",
      label: "Contest Problem Solving",
      desc: "Regular participant in algorithmic contests, refining optimal time and space execution strategies.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="achievements" className="py-20 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-blue/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            Coding & AI Milestones
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Key problem-solving metrics and artificial intelligence development achievements.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={cardVariants} className="h-full">
              <Card className="h-full border border-border bg-card/65 dark:bg-card/45 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300">
                <CardContent className="p-6 text-left flex flex-col justify-between h-full space-y-4">
                  <div className="p-3 rounded-xl border border-border bg-background flex items-center justify-center shrink-0 w-fit">
                    {stat.icon}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue dark:text-brand-cyan">
                      {stat.value}
                    </div>
                    <h4 className="text-base font-bold text-foreground">{stat.label}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
