"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, FileText, AlertTriangle,
  ShieldCheck, Upload, CheckCircle,
} from "lucide-react";
import { usePassportStore } from "@/lib/store";

type Role = "CITIZEN" | "GOVERNMENT" | "THIRD_PARTY";

const ROLE_CONFIG = {
  CITIZEN: {
    badge: "🟢 Citizen Mode",
    greeting: "Salam! I am your administrative copilot. How can I assist you today?",
    suggestions: ["📄 Request Birth Certificate", "🛂 Renew Passport", "🎓 View Academic Documents"],
  },
  GOVERNMENT: {
    badge: "🔵 Government Mode",
    greeting: "SmartGov AI Copilot active. 127 documents are pending review.",
    suggestions: ["📑 Review Pending Requests", "🚨 View Fraud Alerts", "📊 Generate Weekly Report"],
  },
  THIRD_PARTY: {
    badge: "🟣 Verification Mode",
    greeting: "Verification Assistant ready. Please upload a document or scan a QR code.",
    suggestions: ["🔍 Verify Document", "📷 Scan QR Code", "📄 Check Authenticity"],
  },
};

interface Message {
  role: "user" | "system";
  content: string;
  type: "text" | "action-card-citizen" | "action-card-gov" | "passport-status";
}

export default function AICopilot() {
  const [role, setRole] = useState<Role>("CITIZEN");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: ROLE_CONFIG.CITIZEN.greeting, type: "text" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { demoDocument, scanDocument, govApprove, resetDemo } = usePassportStore();
  const { status, citizenName, shareCode } = demoDocument;
  const uploadPassport = scanDocument;
  const approvePassport = govApprove;
  const reset = resetDemo;

  // Passport status badge colors
  const statusColor: Record<string, string> = {
    UNUPLOADED: "text-charcoal/50 bg-charcoal/5",
    PENDING_GOV: "text-sahara bg-sahara/10",
    VERIFIED: "text-atlas bg-atlas/10",
    PENDING_CONSENT: "text-blue-600 bg-blue-50",
    SHARED: "text-emerald-600 bg-emerald-50",
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setMessages([{ role: "system", content: ROLE_CONFIG[newRole].greeting, type: "text" }]);
  };

  const handleSend = (text?: string) => {
    const userMsg = (text ?? input).trim();
    if (!userMsg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg, type: "text" }]);

    setTimeout(() => {
      const q = userMsg.toLowerCase();
      if (role === "CITIZEN" && (q.includes("birth certificate") || q.includes("birth"))) {
        setMessages((prev) => [...prev, {
          role: "system",
          content: "I found your birth certificate in Administrative Documents.",
          type: "action-card-citizen",
        }]);
      } else if (role === "CITIZEN" && (q.includes("passport") || q.includes("renew"))) {
        setMessages((prev) => [...prev, {
          role: "system",
          content: "Here is your passport status:",
          type: "passport-status",
        }]);
      } else if (role === "GOVERNMENT" && q.includes("show")) {
        setMessages((prev) => [...prev, {
          role: "system",
          content: "Highest Priority Anomaly Detected:",
          type: "action-card-gov",
        }]);
      } else {
        setMessages((prev) => [...prev, {
          role: "system",
          content: "I am analyzing your request...",
          type: "text",
        }]);
      }
    }, 800);
  };

  // statusColor defined above with full status map
  const statusColorClass = statusColor[status] ?? "text-charcoal/50 bg-charcoal/5";

  return (
    <div className="flex h-[100dvh] flex-col bg-warm">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-charcoal/10 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-atlas to-atlas-dark shadow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-charcoal">E-Beztami AI</h1>
            <span className="text-xs font-semibold tracking-wide text-charcoal/60">
              {ROLE_CONFIG[role].badge}
            </span>
          </div>
        </div>
        <select
          className="rounded-lg bg-charcoal/5 px-3 py-1 text-xs text-charcoal outline-none"
          value={role}
          onChange={(e) => handleRoleChange(e.target.value as Role)}
        >
          <option value="CITIZEN">Citizen Demo</option>
          <option value="GOVERNMENT">Gov Demo</option>
          <option value="THIRD_PARTY">Third-Party Demo</option>
        </select>
      </header>

      {/* Messages */}
      <main className="flex-1 space-y-4 overflow-y-auto p-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "rounded-br-none bg-atlas text-white shadow-md"
                    : "rounded-bl-none border border-white/40 bg-white/80 text-charcoal shadow-sm backdrop-blur-sm"
                }`}
              >
                <p className="text-sm">{msg.content}</p>

                {/* Birth certificate card */}
                {msg.type === "action-card-citizen" && (
                  <div className="mt-3 rounded-xl border border-charcoal/10 bg-white p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                      <FileText className="h-4 w-4 text-atlas" /> État Civil — Verified
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button className="rounded-lg bg-charcoal/5 py-2 text-xs font-medium hover:bg-charcoal/10">
                        Preview
                      </button>
                      <button className="rounded-lg bg-atlas py-2 text-xs font-medium text-white shadow-sm">
                        Generate QR
                      </button>
                    </div>
                  </div>
                )}

                {/* Passport status card */}
                {msg.type === "passport-status" && (
                  <div className="mt-3 rounded-xl border border-charcoal/10 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-charcoal">
                        {"MA-2024-887734"}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColorClass}`}>
                        {status}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal/50">{citizenName} · Expires {"2034-06-15"}</p>
                    {shareCode && status === "VERIFIED" && (
                      <div className="flex items-center gap-2 rounded-lg bg-atlas/10 px-3 py-2">
                        <ShieldCheck className="h-4 w-4 text-atlas" />
                        <span className="font-mono text-sm font-bold text-atlas tracking-widest">
                          {shareCode}
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={uploadPassport}
                        disabled={status !== "UNUPLOADED"}
                        className="flex items-center justify-center gap-1 rounded-lg bg-charcoal/5 py-2 text-[10px] font-medium disabled:opacity-30 hover:bg-charcoal/10"
                      >
                        <Upload className="h-3 w-3" /> Upload
                      </button>
                      <button
                        onClick={approvePassport}
                        disabled={status !== "PENDING_GOV"}
                        className="flex items-center justify-center gap-1 rounded-lg bg-atlas py-2 text-[10px] font-medium text-white disabled:opacity-30"
                      >
                        <CheckCircle className="h-3 w-3" /> Approve
                      </button>
                      <button
                        onClick={reset}
                        className="rounded-lg border border-charcoal/10 py-2 text-[10px] font-medium text-charcoal/50 hover:bg-charcoal/5"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}

                {/* Gov fraud card */}
                {msg.type === "action-card-gov" && (
                  <div className="mt-3 rounded-xl border border-red-500/20 bg-red-50 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                      <AlertTriangle className="h-4 w-4" /> Social Assistance Application
                    </div>
                    <p className="mt-1 text-xs text-red-600/80">Fraud Risk Score: 89%</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button className="rounded-lg border border-red-200 bg-white py-2 text-xs font-medium text-red-600">
                        Reject
                      </button>
                      <button className="rounded-lg bg-red-600 py-2 text-xs font-medium text-white shadow-sm">
                        Require Human Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="border-t border-white/20 bg-white/60 p-4 backdrop-blur-xl">
        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
          {ROLE_CONFIG[role].suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s.replace(/[\u{1F300}-\u{1FFFF}]/gu, "").trim())}
              className="whitespace-nowrap rounded-full border border-charcoal/10 bg-white/80 px-4 py-1.5 text-[11px] font-medium text-charcoal shadow-sm transition-colors hover:bg-atlas hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-charcoal/10 bg-white p-2 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Demandez à votre assistant..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/40"
          />
          <button
            onClick={() => handleSend()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-atlas text-white shadow-md transition-transform hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
