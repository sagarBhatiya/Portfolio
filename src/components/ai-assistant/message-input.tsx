"use client";

import React, { useRef, useEffect } from "react";
import { Send, Square, Sparkles, CornerDownLeft } from "lucide-react";

interface MessageInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: (text?: string) => void;
  isStreaming: boolean;
  onStop: () => void;
  candidateName?: string;
}

export default function MessageInput({
  input,
  setInput,
  onSend,
  isStreaming,
  onStop,
  candidateName = "Sagar Bhatiya",
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        180
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isStreaming && input.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-1 sm:pt-2 shrink-0">
      <div className="bg-[#202123] border border-white/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-xl focus-within:border-[#10a37f] transition flex flex-col gap-1.5 sm:gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask anything about ${candidateName}'s experience, skills, projects, or background...`}
          rows={1}
          className="w-full bg-transparent text-white text-base sm:text-sm focus:outline-none resize-none max-h-[140px] sm:max-h-[180px] leading-relaxed placeholder-zinc-500 font-sans"
        />

        <div className="flex items-center justify-between pt-1 gap-2">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-500 truncate min-w-0">
            <Sparkles size={12} className="text-[#10a37f] shrink-0" />
            <span className="truncate">Groq LLM & Portfolio Context</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
              <span>Enter</span>
              <CornerDownLeft size={10} />
            </span>

            {isStreaming ? (
              <button
                onClick={onStop}
                className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition active:scale-95"
                title="Stop generation"
              >
                <Square size={14} />
              </button>
            ) : (
              <button
                onClick={() => onSend()}
                disabled={!input.trim()}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition active:scale-95 ${
                  input.trim()
                    ? "bg-[#10a37f] text-white hover:bg-[#10a37f]/90"
                    : "bg-white/10 text-zinc-500 cursor-not-allowed"
                }`}
                title="Send Message"
              >
                <Send size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-center text-zinc-500 mt-1.5 sm:mt-2 truncate sm:overflow-visible">
        AI may produce inaccurate info. Verify with Sagar directly.
      </p>
    </div>
  );
}
