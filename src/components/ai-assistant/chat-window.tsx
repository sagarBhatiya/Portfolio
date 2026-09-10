"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCw,
  Sparkles,
  Briefcase,
  Code,
  FileText,
  Rocket,
} from "lucide-react";

export interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: MessageItem[];
  isStreaming: boolean;
  onSelectSuggestion: (prompt: string) => void;
  candidateName?: string;
  onRegenerate?: () => void;
}

export default function ChatWindow({
  messages,
  isStreaming,
  onSelectSuggestion,
  candidateName = "Sagar Bhatiya",
  onRegenerate,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const SUGGESTION_CARDS = [
    {
      icon: Code,
      title: "Key Skills & Toolkit",
      prompt: `What are ${candidateName}'s core technical skills and tech stack?`,
    },
    {
      icon: Rocket,
      title: "Featured Projects",
      prompt: `Tell me about ${candidateName}'s top projects and AI developments.`,
    },
    {
      icon: Briefcase,
      title: "Work Experience & DSA",
      prompt: `What is ${candidateName}'s background and DSA solving record?`,
    },
    {
      icon: FileText,
      title: "Resume & Education",
      prompt: `What degree and certifications does ${candidateName} hold?`,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Empty State Hero Prompt Cards */}
      {messages.length === 0 && (
        <div className="max-w-2xl mx-auto my-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 py-6 sm:py-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#10a37f]/20 border border-[#10a37f]/40 flex items-center justify-center text-[#10a37f] shadow-xl shadow-[#10a37f]/10 animate-bounce">
            <Bot size={26} />
          </div>

          <div className="space-y-1.5 sm:space-y-2 px-2">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              Chat with {candidateName}'s AI
              <Sparkles size={16} className="text-[#10a37f]" />
            </h2>
            <p className="text-xs text-zinc-400 max-w-md">
              Ask anything about Sagar's software development experience, tech stack, DSA record, and portfolio projects in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full pt-2 sm:pt-4">
            {SUGGESTION_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectSuggestion(card.prompt)}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#202123] border border-white/10 hover:border-[#10a37f]/50 hover:bg-white/[0.04] text-left transition group flex flex-col justify-between gap-1.5 sm:gap-2 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#10a37f]">
                    <Icon size={15} className="text-[#10a37f] shrink-0" />
                    <span className="truncate">{card.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2">
                    "{card.prompt}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Message History Stream */}
      {messages.map((msg, index) => {
        const isUser = msg.role === "user";
        const isLastAssistant =
          !isUser && index === messages.length - 1;

        return (
          <div
            key={msg.id}
            className={`max-w-3xl mx-auto flex gap-2.5 sm:gap-4 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!isUser && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#10a37f]/20 border border-[#10a37f]/40 flex items-center justify-center text-[#10a37f] shrink-0 mt-0.5 sm:mt-1">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`group relative max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed ${
                isUser
                  ? "bg-[#10a37f] text-white rounded-br-none"
                  : "bg-[#202123] text-zinc-200 border border-white/10 rounded-bl-none"
              }`}
            >
              {/* Message Content */}
              <div className="whitespace-pre-wrap font-sans break-words overflow-x-auto">
                {msg.content ? (
                  msg.content
                ) : (
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs py-1">
                    <span className="w-2 h-2 rounded-full bg-[#10a37f] animate-ping" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>

              {/* Message Footer Actions */}
              {!isUser && msg.content && (
                <div className="flex items-center justify-between pt-1.5 sm:pt-2 mt-2 border-t border-white/5 text-[10px] sm:text-[11px] text-zinc-500">
                  <span>{msg.timestamp}</span>

                  <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="p-1 hover:text-white transition rounded"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check size={13} className="text-[#10a37f]" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>

                    {isLastAssistant && onRegenerate && !isStreaming && (
                      <button
                        onClick={onRegenerate}
                        className="p-1 hover:text-white transition rounded"
                        title="Regenerate response"
                      >
                        <RotateCw size={13} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isUser && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white shrink-0 mt-0.5 sm:mt-1 text-xs font-semibold">
                <User size={15} />
              </div>
            )}
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
