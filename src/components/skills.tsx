"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Code, Layout, Server, Database, Wrench, GraduationCap, CheckCircle2, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type SkillItem = {
  name: string;
  level?: string; // e.g. "Advanced", "Intermediate"
};

type SkillCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const skillCategories: SkillCategory[] = [
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: <Cpu className="w-5 h-5 text-brand-cyan" />,
      skills: [
        { name: "Python" },
        { name: "PyTorch" },
        { name: "LLMs & OpenAI API" },
        { name: "LangChain" },
        { name: "RAG Architecture" },
        { name: "Vector DB (ChromaDB)" },
        { name: "Hugging Face" },
        { name: "Prompt Engineering" },
      ],
    },
    {
      id: "programming",
      title: "Programming",
      icon: <Code className="w-5 h-5 text-brand-blue" />,
      skills: [
        { name: "Python" },
        { name: "C++" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "Java" },
      ],
    },
    {
      id: "frontend",
      title: "Frontend",
      icon: <Layout className="w-5 h-5 text-brand-cyan" />,
      skills: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "Tailwind CSS" },
        { name: "React" },
        { name: "Next.js" },
      ],
    },
    {
      id: "backend",
      title: "Backend & Cloud",
      icon: <Server className="w-5 h-5 text-brand-blue" />,
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
        { name: "REST APIs" },
        { name: "FastAPI / Python" },
      ],
    },
    {
      id: "database",
      title: "Database",
      icon: <Database className="w-5 h-5 text-brand-cyan" />,
      skills: [
        { name: "MongoDB" },
        { name: "MySQL" },
        { name: "Vector Databases" },
      ],
    },
    {
      id: "tools",
      title: "Tools & DevOps",
      icon: <Wrench className="w-5 h-5 text-brand-blue" />,
      skills: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "VS Code" },
        { name: "Postman" },
        { name: "Jupyter Notebooks" },
      ],
    },
    {
      id: "subjects",
      title: "Core Subjects",
      icon: <GraduationCap className="w-5 h-5 text-brand-cyan" />,
      skills: [
        { name: "Artificial Intelligence" },
        { name: "Data Structures & Algorithms" },
        { name: "Object-Oriented Programming" },
        { name: "DBMS" },
        { name: "Operating Systems" },
      ],
    },
  ];

  // Filters categories based on selection
  const filteredCategories = activeCategory === "all"
    ? skillCategories
    : skillCategories.filter((cat) => cat.id === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-brand-blue/5 blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-1/10 w-72 h-72 rounded-full bg-brand-cyan/5 blur-[100px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A breakdown of my technical toolkit, programming languages, framework proficiencies, and computer science core subjects.
          </p>
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4.5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 pointer-events-auto cursor-pointer ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent shadow-md"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-accent/40"
            }`}
          >
            All Skills
          </button>
          
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4.5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 pointer-events-auto cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent shadow-md"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-accent/40"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                layout
                key={category.id}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Card className="h-full border border-border bg-card/65 dark:bg-card/45 backdrop-blur-md hover:border-brand-blue/35 dark:hover:border-brand-cyan/35 transition-all duration-300 shadow-sm flex flex-col justify-between">
                  <CardContent className="p-6 space-y-6 text-left">
                    
                    {/* Category Title Header */}
                    <div className="flex items-center gap-3 border-b border-border/80 pb-4">
                      <div className="p-2.5 rounded-xl border border-border bg-background flex items-center justify-center shrink-0">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                    </div>

                    {/* Skills Lists */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-grow">
                      {category.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-muted/40 dark:bg-muted/10 hover:border-brand-blue/20 dark:hover:border-brand-cyan/20 transition-all duration-300 group hover:bg-background"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-blue dark:text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-semibold text-foreground/85 group-hover:text-foreground">
                            {skill.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
