"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, Loader2, Bot, User, ChevronDown,
  FileText, Download, QrCode, Eye, RefreshCw, Search,
  ShieldCheck, ClipboardList, ScanLine, Globe,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "CITIZEN" | "GOVERNMENT" | "THIRD_PARTY";

interface Message {
  role: "user" | "assistant";
  content: string;
  card?: CardData;
}

interface CardData {
  title: string;
  subtitle: string;
  status: string;
  color: string;
  actions: { label: string; icon: React.ReactNode }[];
}

// ─── Config ───────────────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<Role, {
  badge: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  label: string;
  placeholder: string;
  chips: { label: string; icon: React.ReactNode }[];
}> = {
  CITIZEN: {
    badge: "🟢",
    label: "Citizen Mode",
    color: "text-atlas",
    bg: "bg-atlas/8",
    border: "border-atlas/20",
    dot: "bg-atlas",
    placeholder: "Demandez une démarche, un document…",
    chips: [
      { label: "Renouveler Passeport", icon: <RefreshCw className="h-3 w-3" /> },
      { label: "Acte de Naissance", icon: <FileText className="h-3 w-3" /> },
      { label: "Casier Judiciaire", icon: <ClipboardList className="h-3 w-3" /> },
      { label: "Certificat de Résidence", icon: <Globe className="h-3 w-3" /> },
      { label: "Inscription Électorale", icon: <ShieldCheck className="h-3 w-3" /> },
    ],
  },
  GOVERNMENT: {
    badge: "🔵",
    label: "Government Mode",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    placeholder: "Rechercher un dossier, vérifier une demande…",
    chips: [
      { label: "Demandes en Attente", icon: <ClipboardList className="h-3 w-3" /> },
      { label: "Vérifier Identité", icon: <ShieldCheck className="h-3 w-3" /> },
      { label: "Statistiques du Jour", icon: <Search className="h-3 w-3" /> },
      { label: "Dossiers Urgents", icon: <RefreshCw className="h-3 w-3" /> },
      { label: "Rapport Mensuel", icon: <FileText className="h-3 w-3" /> },
    ],
  },
  THIRD_PARTY: {
    badge: "🟣",
    label: "Verification Mode",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-500",
    placeholder: "Scanner un QR ou vérifier un document…",
    chips: [
      { label: "Scanner QR Code", icon: <ScanLine className="h-3 w-3" /> },
      { label: "Vérifier Diplôme", icon: <ShieldCheck className="h-3 w-3" /> },
      { label: "Valider CNI", icon: <Eye className="h-3 w-3" /> },
      { label: "Vérifier Passeport", icon: <Globe className="h-3 w-3" /> },
      { label: "Rapport de Vérification", icon: <FileText className="h-3 w-3" /> },
    ],
  },
};

// ─── Card inference ───────────────────────────────────────────────────────────

function inferCard(message: string, query: string): CardData | undefined {
  const q = query.toLowerCase();
  if (q.includes("passeport") || message.toLowerCase().includes("passeport"))
    return {
      title: "Passeport Marocain",
      subtitle: "DGSN · Valide 10 ans · 225 MAD",
      status: "Prêt à initier",
      color: "from-blue-500 to-blue-700",
      actions: [
        { label: "Aperçu", icon: <Eye className="h-3.5 w-3.5" /> },
        { label: "Télécharger PDF", icon: <Download className="h-3.5 w-3.5" /> },
        { label: "Générer QR", icon: <QrCode className="h-3.5 w-3.5" /> },
      ],
    };
  if (q.includes("naissance") || message.toLowerCase().includes("naissance"))
    return {
      title: "Acte de Naissance",
      subtitle: "Commune · Gratuit · Immédiat",
      status: "Disponible",
      color: "from-atlas to-atlas-dark",
      actions: [
        { label: "Aperçu", icon: <Eye className="h-3.5 w-3.5" /> },
        { label: "Télécharger PDF", icon: <Download className="h-3.5 w-3.5" /> },
        { label: "Générer QR", icon: <QrCode className="h-3.5 w-3.5" /> },
      ],
    };
  if (q.includes("casier") || message.toLowerCase().includes("casier"))
    return {
      title: "Bulletin N°3",
      subtitle: "Ministère de la Justice · 20 MAD · 3 jours",
      status: "En ligne disponible",
      color: "from-moroccan to-moroccan-light",
      actions: [
        { label: "Aperçu", icon: <Eye className="h-3.5 w-3.5" /> },
        { label: "Télécharger PDF", icon: <Download className="h-3.5 w-3.5" /> },
        { label: "Générer QR", icon: <QrCode className="h-3.5 w-3.5" /> },
      ],
    };
  if (q.includes("résidence") || message.toLowerCase().includes("résidence"))
    return {
      title: "Certificat de Résidence",
      subtitle: "Commune · Gratuit · Immédiat",
      status: "Disponible",
      color: "from-sahara to-sahara-light",
      actions: [
        { label: "Aperçu", icon: <Eye className="h-3.5 w-3.5" /> },
        { label: "Télécharger PDF", icon: <Download className="h-3.5 w-3.5" /> },
        { label: "Générer QR", icon: <QrCode className="h-3.5 w-3.5" /> },
      ],
    };
  return undefined;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DocumentCard({ card }: { card: CardData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="mt-3 overflow-hidden rounded-2xl border border-white/60 shadow-card"
    >
      <div className={`bg-gradient-to-r ${card.color} p-4`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-[13px] font-bold text-white">{card.title}</p>
            <p className="mt-0.5 text-[11px] text-white/70">{card.subtitle}</p>
          </div>
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {card.status}
          </span>
        </div>
      </div>
      <div className="flex divide-x divide-charcoal/[0.06] bg-white/90 backdrop-blur-xl">
        {card.actions.map(({ label, icon }) => (
          <button
            key={label}
            className="flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-semibold text-charcoal/60 transition-colors hover:bg-charcoal/[0.03] hover:text-charcoal"
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const cfg = ROLE_CONFIG[role];
  return (
    <motion.div
      key={role}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 rounded-full border ${cfg.border} ${cfg.bg} px-3.5 py-1.5`}
    >
      <span className={`h-2 w-2 rounded-full ${cfg.dot} animate-pulse`} />
      <span className={`font-display text-[12px] font-semibold ${cfg.color}`}>
        {cfg.badge} {cfg.label}
      </span>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GovPilot() {
  const [role, setRole] = useState<Role>("CITIZEN");
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salam ! Je suis GovPilot, votre assistant administratif national 🇲🇦\nPosez-moi n'importe quelle question sur vos démarches administratives.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cfg = ROLE_CONFIG[role];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Reset greeting when role changes
  useEffect(() => {
    const greetings: Record<Role, string> = {
      CITIZEN: "Salam ! Je suis GovPilot 🇲🇦\nComment puis-je vous aider avec vos démarches administratives ?",
      GOVERNMENT: "Portail Gouvernemental activé 🔵\nQue souhaitez-vous consulter ou traiter ?",
      THIRD_PARTY: "Mode Vérification activé 🟣\nScannez un QR ou posez une question de vérification.",
    };
    setMessages([{ role: "assistant", content: greetings[role] }]);
  }, [role]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-6) }),
      });
      const data = await res.json();
      const reply = data.reply ?? data.error ?? "Erreur inconnue.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, card: inferCard(reply, msg) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Une erreur s'est produite. Réessayez." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-warm zellige-bg">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-atlas/6 blur-[120px]" />
        <div className="absolute -left-32 bottom-32 h-80 w-80 rounded-full bg-sahara/6 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 mx-auto w-full max-w-2xl px-5 pt-safe"
      >
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark shadow-ambient">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-[17px] font-bold text-charcoal">GovPilot</h1>
              <p className="text-[11px] text-charcoal/40">Assistant Administratif National</p>
            </div>
          </div>

          {/* Hidden role switcher for presenter */}
          <div className="relative">
            <button
              onClick={() => setShowRolePicker((v) => !v)}
              className="flex items-center gap-1.5 rounded-xl bg-charcoal/[0.04] px-3 py-2 text-[11px] font-medium text-charcoal/40 transition-colors hover:bg-charcoal/[0.07] hover:text-charcoal/60"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {role}
              <ChevronDown className="h-3 w-3" />
            </button>
            <AnimatePresence>
              {showRolePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl glass shadow-card"
                >
                  {(["CITIZEN", "GOVERNMENT", "THIRD_PARTY"] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => { setRole(r); setShowRolePicker(false); }}
                      className={`flex w-full items-center gap-2.5 px-4 py-3 text-[12px] font-medium transition-colors hover:bg-charcoal/[0.04] ${
                        role === r ? "text-charcoal" : "text-charcoal/50"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${ROLE_CONFIG[r].dot}`} />
                      {ROLE_CONFIG[r].label}
                      {role === r && <span className="ml-auto text-[10px] text-atlas">✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Role badge */}
        <div className="pb-3">
          <RoleBadge role={role} />
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-5 px-5 py-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                    msg.role === "assistant"
                      ? "bg-gradient-to-br from-atlas to-atlas-dark"
                      : "bg-charcoal/8"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-charcoal/50" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  <div
                    className={`rounded-3xl px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-atlas to-atlas-dark text-white shadow-ambient rounded-br-lg"
                        : "bg-white/80 text-charcoal shadow-sm border border-white/80 backdrop-blur-xl rounded-bl-lg"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.card && <DocumentCard card={msg.card} />}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark shadow-sm">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-lg border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay }}
                    className="h-1.5 w-1.5 rounded-full bg-atlas/40"
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="mx-auto w-full max-w-2xl px-5 pb-safe">
        {/* Chips */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-3 pt-1">
          {cfg.chips.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => send(label)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-charcoal/[0.08] bg-white/80 px-3.5 py-2 text-[11px] font-medium text-charcoal/60 shadow-sm backdrop-blur-xl transition-all hover:border-atlas/20 hover:bg-atlas/[0.04] hover:text-atlas"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Text input */}
        <div className="mb-6 flex items-end gap-3 rounded-3xl border border-white/80 bg-white/80 p-2 shadow-card backdrop-blur-xl">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
            }}
            placeholder={cfg.placeholder}
            className="flex-1 resize-none overflow-hidden bg-transparent px-3 py-2 text-[13.5px] text-charcoal placeholder:text-charcoal/30 outline-none"
            style={{ minHeight: "40px" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark text-white shadow-ambient disabled:opacity-30 transition-opacity"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
