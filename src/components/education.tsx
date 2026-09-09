"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Education() {
  const courses = [
    "Artificial Intelligence & Machine Learning",
    "Data Structures & Algorithms",
    "Object-Oriented Programming (C++)",
    "Database Management Systems (DBMS)",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ];

  return (
    <section id="education" className="py-20 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            Education
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            My academic foundation and coursework that shape my engineering principles.
          </p>
        </div>

        {/* Education Display Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border border-border bg-card/70 dark:bg-card/40 backdrop-blur-md overflow-hidden relative glow-blue hover:border-brand-blue/35 transition-all duration-300">
              
              {/* Highlight bar */}
              <div className="h-2 w-full bg-gradient-to-r from-brand-blue to-brand-cyan" />
              
              <CardContent className="p-8 space-y-8 text-left">
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                        Bachelor of Technology
                      </h3>
                      <p className="text-md font-semibold text-brand-blue dark:text-brand-cyan mt-0.5">
                        Computer Science and Engineering
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">
                        State University / Institute Name Placeholder
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap md:flex-col md:items-end gap-2 text-sm">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background text-muted-foreground font-medium">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      2023 - 2027 (Expected)
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan font-bold">
                      <Award className="w-4 h-4" />
                      CGPA: 8.4 / 10
                    </span>
                  </div>
                </div>

                {/* Coursework & Subsections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  {/* Left: Summary description */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-brand-blue" />
                      Academic Highlights
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Rigorous academic training covering hardware/software design interfaces, algorithmic optimization, database query planners, and software configuration tools.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Consistently participating in coding contests, collaborative student workshops, and technical research forums to apply theoretical concepts into hands-on web platforms.
                    </p>
                  </div>

                  {/* Right: Specific Relevant Courses */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-foreground">
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {courses.map((course, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-secondary/80 dark:bg-secondary/40 text-foreground border border-border/60 hover:border-brand-blue/30 transition-all duration-200"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
