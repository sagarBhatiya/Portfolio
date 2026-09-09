"use client";

import React from "react";
import { Mail } from "lucide-react";
import GithubIcon from "@/components/ui/github-icon";
import LinkedinIcon from "@/components/ui/linkedin-icon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright */}
        <div className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {currentYear} Sagar Bhatiya. All rights reserved.
        </div>

        {/* Center: Tech tags */}
        <div className="text-xs text-muted-foreground/80 font-mono text-center">
          Built with <span className="text-brand-blue">Next.js 16</span> • <span className="text-brand-cyan">Tailwind CSS v4</span> • TypeScript
        </div>

        {/* Right: Quick Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com/sagarBhatiya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-brand-cyan transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sagar-bhatiya-3570a2282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-brand-blue transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:sagarbhatiya12211@gmail.com"
            className="text-muted-foreground hover:text-brand-cyan transition-colors"
            aria-label="Email Address"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
