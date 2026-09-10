"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Award,
  BookOpen,
  CheckCircle,
  Code,
  Edit3,
  Save,
  Globe,
  ExternalLink,
  Trophy,
  Cpu,
} from "lucide-react";

const BACKEND_BASE = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-ai-backend-prc3.onrender.com"
).replace(/\/$/, "");

export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  cgpa?: string;
  summary?: string;
  milestones?: Array<{ title: string; desc: string }>;
  skills?: string[];
  experiences?: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  projects?: string[];
  education?: string[];
  certifications?: string[];
}

interface ResumeDrawerProps {
  resume: ResumeData | null;
  isOpen: boolean;
  onClose: () => void;
  onResumeUpdated?: (updated: ResumeData) => void;
}

export default function ResumeDrawer({
  resume,
  isOpen,
  onClose,
  onResumeUpdated,
}: ResumeDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  if (!isOpen || !resume) return null;

  const handleStartEdit = () => {
    setJsonText(JSON.stringify(resume, null, 2));
    setIsEditing(true);
    setSaveStatus("");
  };

  const handleSaveEdit = async () => {
    try {
      const parsed = JSON.parse(jsonText);
      setSaveStatus("Saving...");
      let res: Response;
      if (BACKEND_BASE) {
        try {
          res = await fetch(`${BACKEND_BASE}/api/resume`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          });
          if (!res.ok) throw new Error(`Backend returned status ${res.status}`);
        } catch (backendErr) {
          console.warn("Backend save failed, falling back to Next.js API:", backendErr);
          res = await fetch("/api/resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
          });
        }
      } else {
        res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed),
        });
      }
      const data = await res.json();
      setSaveStatus("Saved successfully!");
      if (onResumeUpdated && data.resume) onResumeUpdated(data.resume);
      setTimeout(() => {
        setIsEditing(false);
        setSaveStatus("");
      }, 1000);
    } catch (err) {
      setSaveStatus("Invalid JSON format");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-[540px] max-w-full h-full bg-[#171717] border-l border-white/10 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 font-devanagari"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between bg-[#202123]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#10a37f]/20 border border-[#10a37f]/40 flex items-center justify-center text-[#10a37f] shrink-0">
              <User size={18} className="sm:hidden" />
              <User size={20} className="hidden sm:block" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-semibold text-white truncate">
                {resume.name || "Sagar Bhatiya"}
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#10a37f]">
                <CheckCircle size={12} className="shrink-0" />
                <span className="truncate">Verified Portfolio & Resume Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {!isEditing ? (
              <button
                className="flex items-center gap-1.5 bg-[#10a37f]/15 border border-[#10a37f] text-[#10a37f] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs hover:bg-[#10a37f]/25 transition"
                onClick={handleStartEdit}
                title="Edit Profile JSON"
              >
                <Edit3 size={13} />
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-1.5 bg-[#10a37f] text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs hover:bg-[#10a37f]/90 transition"
                onClick={handleSaveEdit}
              >
                <Save size={13} />
                <span>Save</span>
              </button>
            )}

            <button
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition"
              onClick={onClose}
              title="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {saveStatus && (
          <div
            className={`px-4 py-2 text-xs font-medium text-center ${
              saveStatus.includes("Invalid")
                ? "bg-red-500/20 text-red-400"
                : "bg-[#10a37f]/20 text-[#10a37f]"
            }`}
          >
            {saveStatus}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 sm:space-y-6 text-zinc-200">
          {isEditing ? (
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 font-mono">
                Edit Candidate Resume JSON:
              </label>
              <textarea
                className="w-full bg-[#1e1e1e] text-[#a9b7c6] border border-white/10 rounded-lg p-3 font-mono text-xs focus:outline-none focus:border-[#10a37f]"
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={22}
              />
            </div>
          ) : (
            <>
              {/* Contact Info & Social Links Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white/[0.03] p-3 rounded-xl border border-white/10 text-xs">
                {resume.email && (
                  <a
                    href={`mailto:${resume.email}`}
                    className="flex items-center gap-2 text-zinc-300 hover:text-[#10a37f] transition min-w-0"
                  >
                    <Mail size={15} className="text-[#10a37f] shrink-0" />
                    <span className="truncate">{resume.email}</span>
                  </a>
                )}
                {resume.linkedin && (
                  <a
                    href={resume.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-zinc-300 hover:text-[#10a37f] transition"
                  >
                    <Globe size={15} className="text-[#10a37f] shrink-0" />
                    <span>LinkedIn</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {resume.github && (
                  <a
                    href={resume.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-zinc-300 hover:text-[#10a37f] transition"
                  >
                    <Globe size={15} className="text-[#10a37f] shrink-0" />
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <div className="flex items-center gap-2 text-zinc-300">
                  <Award size={15} className="text-[#10a37f] shrink-0" />
                  <span>CGPA: 8.4 / 10</span>
                </div>
              </div>

              {/* Coding Milestones Highlight Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="bg-gradient-to-br from-[#10a37f]/15 to-purple-500/10 border border-[#10a37f]/30 rounded-xl p-3 flex items-center gap-3">
                  <Trophy size={20} className="text-[#10a37f] shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-white">
                      500+ DSA Solved
                    </span>
                    <span className="block text-[11px] text-zinc-400">
                      LeetCode & GeeksforGeeks
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#10a37f]/15 to-blue-500/10 border border-[#10a37f]/30 rounded-xl p-3 flex items-center gap-3">
                  <Cpu size={20} className="text-[#10a37f] shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-white">
                      AI & RAG Systems
                    </span>
                    <span className="block text-[11px] text-zinc-400">
                      ChromaDB & Groq LLMs
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Summary
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-300">
                    {resume.summary}
                  </p>
                </div>
              )}

              {/* Technical Skills Badges */}
              {resume.skills && resume.skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Code size={14} className="text-[#10a37f]" />
                    <span>Skills & Toolkit</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#10a37f]/15 border border-[#10a37f]/30 text-[#10a37f] px-2.5 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Award size={14} className="text-[#10a37f]" />
                    <span>Featured Projects</span>
                  </h3>
                  <div className="space-y-2">
                    {resume.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-xs text-zinc-300 leading-relaxed"
                      >
                        {proj}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Certifications */}
              {(resume.education?.length || resume.certifications?.length) && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#10a37f]" />
                    <span>Education & Certifications</span>
                  </h3>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {resume.education?.map((edu, idx) => (
                      <li key={`edu-${idx}`} className="flex items-center gap-2">
                        🎓 {edu}
                      </li>
                    ))}
                    {resume.certifications?.map((cert, idx) => (
                      <li key={`cert-${idx}`} className="flex items-center gap-2">
                        🏆 {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
