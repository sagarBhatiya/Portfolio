"use client";

import React from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bot,
  Sparkles,
  Layers,
} from "lucide-react";

export interface SessionItem {
  id: string;
  title: string;
  createdAt: string;
  model: string;
  messages: any[];
}

export interface ModelOption {
  id: string;
  name: string;
}

interface SidebarProps {
  sessions: SessionItem[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  onClearAllSessions: () => void;
  isOpen: boolean;
  onToggleSidebar: () => void;
  models: ModelOption[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onOpenResume: () => void;
  candidateName?: string;
}

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onClearAllSessions,
  isOpen,
  onToggleSidebar,
  models,
  selectedModel,
  onSelectModel,
  onOpenResume,
  candidateName = "Sagar Bhatiya",
}: SidebarProps) {
  return (
    <>
      {/* Sidebar Panel */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-0 md:w-14"
        } transition-all duration-300 ease-in-out bg-[#171717] border-r border-white/10 flex flex-col h-full shrink-0 relative overflow-hidden text-zinc-300 select-none z-20`}
      >
        {/* Top Branding / Header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between min-h-[56px]">
          {isOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#10a37f]/20 border border-[#10a37f]/40 flex items-center justify-center text-[#10a37f]">
                <Bot size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wide flex items-center gap-1">
                  AI Assistant
                  <Sparkles size={11} className="text-[#10a37f]" />
                </span>
                <span className="text-[10px] text-zinc-400">
                  {candidateName} Portfolio
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-8 h-8 rounded-lg bg-[#10a37f]/20 border border-[#10a37f]/40 flex items-center justify-center text-[#10a37f]">
              <Bot size={18} />
            </div>
          )}

          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-2.5">
          <button
            onClick={onNewChat}
            className="w-full bg-[#10a37f] hover:bg-[#10a37f]/90 text-white font-medium text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#10a37f]/10 transition"
          >
            <Plus size={16} />
            {isOpen && <span>New Chat</span>}
          </button>
        </div>

        {/* Model Selection Dropdown (Inside Sidebar when open) */}
        {isOpen && models.length > 0 && (
          <div className="px-3 py-2 border-b border-white/5">
            <label className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider flex items-center gap-1 mb-1">
              <Layers size={11} className="text-[#10a37f]" />
              <span>Groq LLM Model</span>
            </label>
            <select
              value={selectedModel}
              onChange={(e) => onSelectModel(e.target.value)}
              className="w-full bg-[#202123] border border-white/10 text-white text-xs rounded-lg p-2 focus:outline-none focus:border-[#10a37f]"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Chat History Session List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {isOpen && sessions.length === 0 && (
            <div className="text-center py-8 px-4 text-xs text-zinc-500">
              No chat history yet. Ask a question to start!
            </div>
          )}

          {sessions.map((session) => {
            const isActive = session.id === activeSessionId;
            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <MessageSquare
                    size={14}
                    className={isActive ? "text-[#10a37f]" : "text-zinc-400"}
                  />
                  {isOpen && <span className="truncate">{session.title}</span>}
                </div>

                {isOpen && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-400 transition"
                    title="Delete Chat"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-2 border-t border-white/10 space-y-1">
          <button
            onClick={onOpenResume}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 transition"
          >
            <FileText size={15} className="text-[#10a37f]" />
            {isOpen && <span>Candidate Resume</span>}
          </button>

          {isOpen && sessions.length > 0 && (
            <button
              onClick={onClearAllSessions}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 size={14} />
              <span>Clear All History</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
