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

export let RESUME_DATA: ResumeData = {
  name: "Sagar Bhatiya",
  email: "sagarbhatiya12211@gmail.com",
  phone: "+91 91255 08xxx",
  linkedin: "https://linkedin.com/in/sagarbhatiya",
  github: "https://github.com/sagar9125508",
  cgpa: "8.4 / 10",
  summary:
    "Full-Stack Web & AI Developer specializing in building modern web applications, AI Assistant/RAG systems, FastAPI microservices, Next.js, and high-performance frontend interfaces. Passionate about solving complex problems with 500+ DSA problems solved.",
  milestones: [
    { title: "500+ DSA Solved", desc: "LeetCode, GeeksforGeeks & CodeStudio (C++)" },
    { title: "AI & RAG Systems", desc: "ChromaDB, Vector Search & LLM Pipelines" },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Python",
    "FastAPI",
    "Groq API / LLMs",
    "Vector Search & RAG",
    "C++",
    "Data Structures & Algorithms",
    "Git / GitHub",
    "Node.js",
    "RESTful APIs",
  ],
  experiences: [
    {
      company: "Full Stack & AI Projects",
      role: "Software Developer",
      duration: "2023 - Present",
      description:
        "Architected and built full-stack web applications, ChatGPT-style AI Assistant RAG interfaces, and finance tracking platforms using Next.js, React, Python FastAPI, Groq LLMs, and Tailwind CSS.",
      skills: ["Next.js", "React", "Python", "FastAPI", "Groq", "Tailwind CSS"],
    },
  ],
  projects: [
    "AI Assistant & Resume RAG System: Built a ChatGPT-style conversational assistant powered by Groq LLMs, SSE live streaming, PyMuPDF parsing, and session history.",
    "Personal Finance Tracker: Interactive financial dashboard with expense tracking, budgeting charts, dark mode UI, and analytical insights.",
    "Modern Portfolio Website: High-performance portfolio built with Next.js 16, React 19, Framer Motion, and Tailwind CSS v4.",
  ],
  education: ["Bachelor of Technology in Computer Science & Engineering (CGPA: 8.4)"],
  certifications: ["Data Structures & Algorithms in C++", "Full-Stack Web Development"],
};

export function getResumeData(): ResumeData {
  return RESUME_DATA;
}

export function updateResumeData(updated: Partial<ResumeData>): ResumeData {
  RESUME_DATA = { ...RESUME_DATA, ...updated };
  return RESUME_DATA;
}
