import Groq from "groq-sdk";
import { getResumeData } from "./resume.service";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export const DEFAULT_MODEL = "openai/gpt-oss-120b";

export const AVAILABLE_MODELS = [
  { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B (Groq Fast)" },
  { id: "qwen/qwen3.6-27b", name: "Qwen 3.6 27B" },
  { id: "groq/compound", name: "Groq Compound LLM" },
  { id: "groq/compound-mini", name: "Groq Compound Mini" },
];

export function buildSystemPrompt(): string {
  const resume = getResumeData();
  return `
You are an intelligent, professional AI assistant representing the candidate Sagar Bhatiya on his personal portfolio website.

CANDIDATE PROFILE & RESUME DATA:
${JSON.stringify(resume, null, 2)}

Rules for your responses:
1. Answer questions as a representative of Sagar Bhatiya based on his resume, projects, skills, and background.
2. Be articulate, polite, professional, and enthusiastic, as if interviewing for a software engineering or full-stack/AI role.
3. If asked about information not in Sagar's profile, politely respond: "I don't have that specific detail in Sagar's portfolio resume, but feel free to reach out to Sagar directly via email (${resume.email}) or LinkedIn!"
4. Format all responses cleanly using Markdown (bold text, bullet lists, code blocks when suitable).
5. Keep responses concise and engaging.
`;
}

export async function createChatStream(question: string, model?: string) {
  const selectedModel = model || DEFAULT_MODEL;
  const systemPrompt = buildSystemPrompt();

  return await groq.chat.completions.create({
    model: selectedModel,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    stream: true,
  });
}
