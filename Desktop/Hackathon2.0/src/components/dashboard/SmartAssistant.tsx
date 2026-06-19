"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, ScanLine, Loader2, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function SmartAssistant({
  open,
  onToggle,
  onScan,
}: {
  open: boolean;
  onToggle: () => void;
  onScan: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salam! Je suis votre assistant administratif E-Beztami 🇲🇦\nPosez-moi vos questions sur les démarches administratives au Maroc.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => m.role !== "assistant" || messages.indexOf(m) > 0),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "Erreur inconnue.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur s'est produite. Réessayez." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg flex flex-col"
              style={{ height: "70dvh" }}
            >
              <div className="flex flex-col h-full rounded-t-3xl glass shadow-card overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-charcoal/[0.06] bg-white/90 px-6 py-4 backdrop-blur-xl shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-charcoal">
                        Assistant Administratif IA
                      </h3>
                      <p className="text-[11px] text-charcoal/40">
                        Démarches Maroc — Propulsé par Groq
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onToggle}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5"
                  >
                    <X className="h-4 w-4 text-charcoal/50" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          msg.role === "assistant"
                            ? "bg-gradient-to-br from-atlas to-atlas-dark"
                            : "bg-charcoal/10"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <Bot className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-charcoal/60" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                          msg.role === "assistant"
                            ? "bg-white/80 text-charcoal shadow-sm border border-charcoal/[0.06]"
                            : "bg-atlas text-white"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-atlas to-atlas-dark">
                        <Bot className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl bg-white/80 px-4 py-2.5 border border-charcoal/[0.06] shadow-sm">
                        <Loader2 className="h-3.5 w-3.5 text-atlas animate-spin" />
                        <span className="text-[12px] text-charcoal/40">En cours...</span>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t border-charcoal/[0.06] bg-white/90 px-4 py-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                      placeholder="Ex: Comment obtenir un passeport ?"
                      className="flex-1 rounded-xl bg-charcoal/[0.04] px-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal/30 outline-none focus:ring-2 focus:ring-atlas/20"
                    />
                    <button
                      onClick={send}
                      disabled={!input.trim() || loading}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-atlas text-white disabled:opacity-40 transition-opacity"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-warm via-warm/90 to-transparent" />
        <div className="relative mx-auto flex max-w-lg gap-3 px-5 pb-8 pt-4 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onScan}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-atlas to-atlas-dark py-3.5 text-white shadow-ambient"
          >
            <ScanLine className="h-4 w-4" />
            <span className="text-[12px] font-semibold">Scanner</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onToggle}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 shadow-card transition-colors ${
              open ? "bg-atlas text-white" : "glass text-charcoal hover:shadow-ambient"
            }`}
          >
            <Sparkles className={`h-4 w-4 ${open ? "text-white" : "text-atlas"}`} />
            <span className="text-[12px] font-semibold">Assistant IA</span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
