"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
  FileText,
  MessageSquare,
  PanelLeft,
} from "lucide-react";
import Sidebar, { SessionItem, ModelOption } from "./sidebar";
import ChatWindow, { MessageItem } from "./chat-window";
import MessageInput from "./message-input";
import ResumeDrawer, { ResumeData } from "./resume-drawer";

const BACKEND_BASE = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-ai-backend-prc3.onrender.com"
).replace(/\/$/, "");

export interface ChatWidgetProps {
  initialQuestion?: string;
  autoOpen?: boolean;
}

export default function ChatWidget({
  initialQuestion = "",
  autoOpen = false,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resumeDrawerOpen, setResumeDrawerOpen] = useState(false);
  const [backendActive, setBackendActive] = useState(false);

  // Set initial sidebar state based on screen width
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, []);

  // Data & Models State
  const [models, setModels] = useState<ModelOption[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("openai/gpt-oss-120b");
  const [candidateResume, setCandidateResume] = useState<ResumeData | null>(null);

  // Sessions & Messages State
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  // Input & Streaming State
  const [input, setInput] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // Load initial model & candidate data
  useEffect(() => {
    async function loadData() {
      const apiTarget = BACKEND_BASE ? `${BACKEND_BASE}/api` : "/api";
      let modelsRes: any = null;
      let resumeRes: any = null;

      try {
        const [mRes, rRes] = await Promise.all([
          fetch(`${apiTarget}/models`).then((r) => (r.ok ? r.json() : null)),
          fetch(`${apiTarget}/resume`).then((r) => (r.ok ? r.json() : null)),
        ]);
        if (mRes || rRes) {
          modelsRes = mRes;
          resumeRes = rRes;
          if (BACKEND_BASE) setBackendActive(true);
        }
      } catch (err) {
        console.warn("Direct backend request failed, falling back to Next.js API:", err);
      }

      // Fallback to local Next.js API routes if backend didn't respond
      if (!modelsRes) {
        modelsRes = await fetch("/api/models")
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
      }
      if (!resumeRes) {
        resumeRes = await fetch("/api/resume")
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
      }

      if (modelsRes?.models?.length) {
        setModels(modelsRes.models);
        setSelectedModel(modelsRes.models[0].id);
      }

      if (resumeRes) {
        setCandidateResume(resumeRes);
      }
    }
    loadData();
  }, []);

  // Handle Initial Question if passed
  useEffect(() => {
    if (initialQuestion) {
      setIsOpen(true);
      handleSend(initialQuestion);
    }
  }, [initialQuestion]);

  // Session selection
  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages || []);
      if (session.model) setSelectedModel(session.model);
    }
  };

  // Create New Chat
  const handleNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: SessionItem = {
      id: newSessionId,
      title: "New Chat",
      createdAt: "Just now",
      model: selectedModel,
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setMessages([]);
  };

  // Delete Session
  const handleDeleteSession = (sessionId: string) => {
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);
    if (activeSessionId === sessionId) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
        setMessages(updated[0].messages || []);
      } else {
        setActiveSessionId(null);
        setMessages([]);
      }
    }
  };

  // Clear All Sessions
  const handleClearAllSessions = () => {
    setSessions([]);
    setActiveSessionId(null);
    setMessages([]);
  };

  // Send Message Logic (SSE Live Streaming)
  const handleSend = async (userPromptText?: string) => {
    const query = userPromptText || input;
    if (!query.trim() || isStreaming) return;

    setInput("");

    // Ensure session exists
    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      currentSessionId = `session-${Date.now()}`;
      const title = query.length > 25 ? query.slice(0, 25) + "..." : query;
      const createdSession: SessionItem = {
        id: currentSessionId,
        title,
        createdAt: "Just now",
        model: selectedModel,
        messages: [],
      };
      setSessions((prev) => [createdSession, ...prev]);
      setActiveSessionId(currentSessionId);
    } else {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId && s.title === "New Chat") {
            return {
              ...s,
              title: query.length > 25 ? query.slice(0, 25) + "..." : query,
            };
          }
          return s;
        })
      );
    }

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: MessageItem = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp,
    };

    const assistantMsgId = `ast-${Date.now()}`;
    const initialAssistantMsg: MessageItem = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp,
    };

    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setIsStreaming(true);

    let accumulatedContent = "";

    try {
      let response: Response;
      if (BACKEND_BASE) {
        try {
          response = await fetch(`${BACKEND_BASE}/api/chat/stream`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: query,
              model: selectedModel,
              session_id: currentSessionId,
            }),
          });
          if (!response.ok || !response.body) {
            throw new Error(`Backend returned status ${response.status}`);
          }
          setBackendActive(true);
        } catch (backendErr) {
          console.warn("Backend stream failed, falling back to local API:", backendErr);
          response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: query,
              model: selectedModel,
              session_id: currentSessionId,
            }),
          });
        }
      } else {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: query,
            model: selectedModel,
            session_id: currentSessionId,
          }),
        });
      }

      if (!response.ok || !response.body) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;

          const dataStr = trimmed.slice(5).trim();
          if (dataStr === "[DONE]") {
            setIsStreaming(false);
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.chunk) {
              accumulatedContent += parsed.chunk;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? { ...m, content: accumulatedContent }
                    : m
                )
              );
            }
          } catch (e) {
            console.warn("Parse stream chunk error:", e);
          }
        }
      }
    } catch (err: any) {
      console.error("Streaming chat error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  accumulatedContent ||
                  `*Error communicating with AI Assistant: ${err.message}*`,
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
      // Persist messages in session
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            const updated = [
              ...(s.messages || []),
              userMsg,
              { ...initialAssistantMsg, content: accumulatedContent },
            ];
            return { ...s, messages: updated };
          }
          return s;
        })
      );
    }
  };

  // Regenerate last response
  const handleRegenerate = () => {
    if (messages.length < 2 || isStreaming) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      setMessages((prev) => prev.slice(0, prev.length - 1));
      handleSend(lastUserMsg.content);
    }
  };

  return (
    <>
      {/* Floating Action Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] bg-gradient-to-r from-[#10a37f] to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white p-3 sm:p-3.5 rounded-full shadow-2xl shadow-[#10a37f]/40 flex items-center gap-2 sm:gap-2.5 transition-all duration-300 transform hover:scale-105 active:scale-95 group font-devanagari"
          title="Open AI Assistant"
        >
          <div className="relative">
            <Bot size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
            Ask Sagar's AI
          </span>
          <Sparkles size={14} className="text-emerald-200 animate-pulse" />
        </button>
      )}

      {/* Main AI Assistant Modal / Drawer Container */}
      {isOpen && (
        <div
          className={`fixed z-[250] transition-all duration-300 flex flex-col bg-[#171717] border-white/10 shadow-2xl overflow-hidden font-devanagari ${
            isFullScreen
              ? "inset-0 sm:inset-4 md:inset-6 rounded-none sm:rounded-2xl border-0 sm:border"
              : "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[500px] md:w-[780px] h-[100dvh] sm:h-[650px] sm:max-h-[88vh] rounded-none sm:rounded-2xl border-0 sm:border"
          }`}
        >
          {/* Top Modal Navigation Header */}
          <div className="bg-[#202123] border-b border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              {/* Sidebar / History toggle button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition flex items-center justify-center shrink-0"
                title={sidebarOpen ? "Close chat history" : "Open chat history"}
                aria-label="Toggle chat history"
              >
                <PanelLeft size={17} className={sidebarOpen ? "text-[#10a37f]" : ""} />
              </button>

              <div className="w-7 h-7 rounded-lg bg-[#10a37f]/20 border border-[#10a37f]/40 flex items-center justify-center text-[#10a37f] shrink-0">
                <Bot size={16} />
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <h3 className="text-xs font-bold text-white tracking-wide truncate">
                  Sagar's AI
                </h3>
                <span className="text-[10px] bg-[#10a37f]/20 border border-[#10a37f]/30 text-[#10a37f] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${backendActive ? "bg-emerald-400 animate-pulse" : "bg-[#10a37f]"}`} />
                  <span>{backendActive ? "FastAPI Live" : "Groq LLM"}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-zinc-400 shrink-0">
              <button
                onClick={() => setResumeDrawerOpen(true)}
                className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg text-xs flex items-center gap-1 transition"
                title="View Candidate Resume"
              >
                <FileText size={15} className="text-[#10a37f]" />
                <span className="hidden sm:inline">Resume</span>
              </button>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="hidden sm:inline-flex p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition"
                title={isFullScreen ? "Minimize" : "Maximize"}
              >
                {isFullScreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition"
                title="Close Assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Modal Main Body (Sidebar + Chat Area) */}
          <div className="flex-1 flex overflow-hidden relative">
            <Sidebar
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={handleSelectSession}
              onNewChat={handleNewChat}
              onDeleteSession={handleDeleteSession}
              onClearAllSessions={handleClearAllSessions}
              isOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              models={models}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              onOpenResume={() => setResumeDrawerOpen(true)}
              candidateName={candidateResume?.name}
            />

            <main className="flex-1 flex flex-col bg-[#212121] overflow-hidden">
              <ChatWindow
                messages={messages}
                isStreaming={isStreaming}
                onSelectSuggestion={(prompt) => handleSend(prompt)}
                candidateName={candidateResume?.name}
                onRegenerate={handleRegenerate}
              />

              <MessageInput
                input={input}
                setInput={setInput}
                onSend={() => handleSend()}
                isStreaming={isStreaming}
                onStop={() => setIsStreaming(false)}
                candidateName={candidateResume?.name}
              />
            </main>
          </div>

          {/* Candidate Resume Slide-Over Drawer Modal */}
          <ResumeDrawer
            resume={candidateResume}
            isOpen={resumeDrawerOpen}
            onClose={() => setResumeDrawerOpen(false)}
            onResumeUpdated={(updated) => setCandidateResume(updated)}
          />
        </div>
      )}
    </>
  );
}
