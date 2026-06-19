"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  LogIn,
  LogOut,
  FileCheck,
  Clock,
  BadgeCheck,
  AlertCircle,
  CheckCircle2,
  User,
  Hash,
  CalendarDays,
  Check,
  X,
  TrendingDown,
  Sparkles,
  ShieldAlert,
  BarChart2,
  Zap,
  Bot,
  Send
} from "lucide-react";
import { useDemoStore } from "@/lib/store";

/* ─── Toast ─────────────────────────────────────────────────── */
function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 shadow-xl"
    >
      <Check className="h-4 w-4 text-white" />
      <span className="text-sm font-semibold text-white">{msg}</span>
    </motion.div>
  );
}

/* ─── Static queue items ─────────────────────────────────────── */
const QUEUE_ITEMS = [
  { id: "q1", name: "Leila Benjelloun", type: "Renouvellement CIN", status: "Validé", color: "emerald" },
  { id: "q2", name: "Karim Oufkir", type: "Acte de naissance", status: "Validé", color: "emerald" },
  { id: "q3", name: "Nadia Filali", type: "Permis de conduire", status: "En cours", color: "amber" },
  { id: "q4", name: "Hassan Berrada", type: "Renouvellement Passeport", status: "Validé", color: "emerald" },
];

/* ─── GovPilot AI Chat ─────────────────────────────────────── */
const SUGGESTED_PROMPTS = [
  "Quels dossiers présentent un risque élevé ?",
  "Quels services sont les plus sollicités ?",
  "Résume les alertes critiques.",
];

const AI_RESPONSE_LINES = [
  "Analyse terminée.",
  "",
  "• 12 487 demandes analysées",
  "• 11 931 validées automatiquement",
  "• 556 nécessitent une vérification humaine",
  "• 42 dossiers présentent un risque élevé",
  "",
  "Recommandation :",
  "Prioriser l'examen manuel des 42 dossiers à risque élevé.",
];

function StreamingText({ visible, responseKey }: { visible: boolean; responseKey: number }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible) { setLines([]); setDone(false); return; }
    let li = 0; let ci = 0; const acc: string[] = [];
    const iv = setInterval(() => {
      if (li >= AI_RESPONSE_LINES.length) { setDone(true); clearInterval(iv); return; }
      const cur = AI_RESPONSE_LINES[li];
      if (ci === 0) acc.push("");
      if (cur === "") { acc[li] = ""; li++; ci = 0; setLines([...acc]); return; }
      ci++; acc[li] = cur.slice(0, ci); setLines([...acc]);
      if (ci >= cur.length) { li++; ci = 0; }
    }, 20);
    return () => clearInterval(iv);
  }, [visible, responseKey]);

  if (!visible) return null;

  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-4 text-sm leading-relaxed text-gray-700 space-y-0.5">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-xs font-bold text-blue-700">GovPilot AI</span>
        {!done && (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Analyse en cours…
          </span>
        )}
      </div>
      {lines.map((l, i) => {
        if (l === "") return <div key={i} className="h-1.5" />;
        if (l.startsWith("•")) return <p key={i} className="text-gray-600">{l}</p>;
        if (l === "Recommandation :") return <p key={i} className="font-semibold text-amber-600 mt-2">{l}</p>;
        if (l === "Analyse terminée.") return <p key={i} className="font-semibold text-blue-700">{l}</p>;
        return <p key={i}>{l}</p>;
      })}
      {!done && <span className="inline-block h-4 w-0.5 bg-blue-400 animate-pulse" />}
    </div>
  );
}

function GovPilotChat() {
  const [inputText, setInputText] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "responding">("idle");
  const [conversation, setConversation] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const runDemo = useCallback((msg: string) => {
    if (!msg.trim()) return;
    setUserMessage(msg);
    setInputText("");
    setConversation(true);
    setPhase("thinking");
    setResponseKey((k) => k + 1);
    setTimeout(() => setPhase("responding"), 1400);
  }, []);

  function handleSubmit() {
    if (phase === "thinking" || !inputText.trim()) return;
    runDemo(inputText);
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 flex items-center justify-center rounded-xl bg-blue-700">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">GovPilot Chat</h3>
            <p className="text-[10px] text-gray-400">Posez vos questions à l'IA</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0 bg-gray-50/50">
        {/* Sidebar */}
        <div className="w-full md:w-48 shrink-0 border-r border-gray-100 p-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Suggestions</p>
          <div className="space-y-1.5 flex flex-row md:flex-col overflow-x-auto">
            {SUGGESTED_PROMPTS.map((p) => (
              <button key={p} onClick={() => runDemo(p)}
                className="w-full text-left rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] leading-snug text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors shrink-0 max-w-[200px] md:max-w-none mr-2 md:mr-0">
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px]">
            <AnimatePresence>
              {conversation && (
                <>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl bg-blue-700 px-4 py-3 shadow-sm">
                      <p className="text-sm text-white">{userMessage}</p>
                    </div>
                  </motion.div>
                  {phase === "thinking" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-3 w-fit shadow-sm">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="h-2 w-2 rounded-full bg-blue-400" />
                      ))}
                      <span className="text-xs text-gray-500 font-medium">L'IA analyse les données…</span>
                    </motion.div>
                  )}
                  {phase === "responding" && (
                    <StreamingText visible={true} responseKey={responseKey} />
                  )}
                </>
              )}
              {!conversation && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-3 text-gray-400 py-10">
                  <Bot className="h-12 w-12 text-gray-300" />
                  <p className="text-sm font-medium">Comment puis-je vous aider aujourd'hui ?</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Posez une question stratégique…"
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button onClick={handleSubmit} disabled={phase === "thinking" || !inputText.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm hover:bg-blue-800 disabled:opacity-40 transition-colors">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────── */
export function SmartGovDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState("");
  const { demoDocument, govApprove, resetDemo } = useDemoStore();
  const { status, citizenName } = demoDocument;
  const isPending = status === "PENDING_GOV";

  function handleApprove() {
    govApprove();
    setToast("Passeport vérifié et approuvé ✅");
  }
  function handleReject() {
    resetDemo();
    setToast("Document rejeté ❌");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">

        {/* ── LOGIN ── */}
        {!loggedIn && (
          <motion.div key="login"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex min-h-screen items-center justify-center px-4"
          >
            <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <div className="mb-8 flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 shadow-md">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Portail Agent SmartGov</h1>
                  <p className="mt-1 text-sm text-gray-400">Ministère de l'Intérieur · Maroc</p>
                </div>
              </div>

              <div className="mb-4 space-y-3">
                <input type="text" defaultValue="agent.alaoui@gov.ma" readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none" />
                <input type="password" defaultValue="••••••••" readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none" />
              </div>

              <button onClick={() => setLoggedIn(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                <LogIn className="h-4 w-4" />
                Connexion Agent
              </button>
            </div>
          </motion.div>
        )}

        {/* ── DASHBOARD ── */}
        {loggedIn && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Top Nav */}
            <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-[15px] font-bold text-gray-900">SmartGov</span>
                  <span className="ml-2 text-sm text-gray-400">Centre de Commandement</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isPending && (
                  <motion.div animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                    className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-[11px] font-bold text-red-600">ALERTE LIVE</span>
                  </motion.div>
                )}
                <button onClick={() => setLoggedIn(false)}
                  className="flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-600">
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            </header>

            <main className="mx-auto max-w-5xl space-y-10 px-6 py-8">

              {/* ── SECTION 1 · TOP STATS BAR ── */}
              <section>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Impact &amp; ROI — E-Beztami Platform
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                  {/* Card 1 */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                      <FileCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">18,492</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">Documents Traités</p>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600">
                      <TrendingDown className="h-3 w-3" />
                      Ce mois · +12% vs. mois précédent
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                      <Clock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold text-gray-900">5 min</p>
                      <p className="mb-1 text-sm font-medium text-gray-400 line-through">5 jours</p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-600">Temps Moyen de Traitement</p>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600">
                      <Zap className="h-3 w-3" />
                      Réduit de 99.3% grâce à l'IA
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                      <BadgeCheck className="h-5 w-5 text-indigo-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">99.2%</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">Score de Fiabilité IA</p>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600">
                      <Sparkles className="h-3 w-3" />
                      Certifié ISO 27001 · GovPilot AI
                    </p>
                  </div>
                </div>
              </section>

              {/* ── SECTION 2 · REQUEST QUEUE ── */}
              <section>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Requêtes en attente de validation
                </h2>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                  {/* Live Demo Urgent Card */}
                  <AnimatePresence>
                    {isPending && (
                      <motion.div
                        key="urgent"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-b-2 border-red-200 bg-red-50 px-6 py-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Urgent</span>
                                  <p className="font-bold text-gray-900">
                                    Vérification de Passeport — {citizenName || "Ahmed Alami"}
                                  </p>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-4">
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <Hash className="h-3.5 w-3.5 text-gray-400" />
                                    MA-2024-887734
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <User className="h-3.5 w-3.5 text-gray-400" />
                                    {citizenName || "Ahmed Alami"}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
                                    Expire: 2034-06-15
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-shrink-0 gap-2">
                              <button onClick={handleApprove}
                                className="flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                                <CheckCircle2 className="h-4 w-4" />
                                Approuver
                              </button>
                              <button onClick={handleReject}
                                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-50">
                                <X className="h-4 w-4" />
                                Rejeter
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Standard Queue Table */}
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-100 bg-gray-50">
                      <tr>
                        {["Citoyen", "Type de Document", "Statut", "Heure"].map((h) => (
                          <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {QUEUE_ITEMS.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                          <td className="px-6 py-4 text-gray-500">{item.type}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${item.color === "emerald"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                              }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${item.color === "emerald" ? "bg-emerald-400" : "bg-amber-400"
                                }`} />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400">il y a {Math.floor(Math.random() * 20 + 2)} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── SECTION 3 · AI STRATEGIC INSIGHTS ── */}
              <section>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Insights GovPilot
                </h2>

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-6">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Analyse Stratégique</p>
                        <p className="text-xs text-gray-400">Mise à jour automatique en continu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
                      <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-semibold text-emerald-700">IA Active</span>
                    </div>
                  </div>

                  {/* Insight cards */}
                  <div className="grid grid-cols-1 divide-y divide-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                    <div className="flex flex-col gap-3 px-6 py-6 border-transparent">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                        <ShieldAlert className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Alertes de Fraude</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">0 détectées</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                          Aucune anomalie sur les 18 492 documents traités ce mois.
                          Système de détection opérationnel à 100%.
                        </p>
                      </div>
                      <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 max-w-fit">
                        <Check className="h-3 w-3" /> Tout est nominal
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 px-6 py-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                        <BarChart2 className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tendances Détectées</p>
                        <p className="mt-1 text-sm font-bold text-gray-900 leading-snug">
                          Forte augmentation des demandes de bourses à Tanger
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                          +34% de requêtes vs. semaine précédente.
                          GovPilot recommande d'augmenter les capacités de traitement dans la région.
                        </p>
                      </div>
                      <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 max-w-fit">
                        <AlertCircle className="h-3 w-3" /> Action recommandée
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 px-6 py-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                        <Zap className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Action IA</p>
                        <p className="mt-1 text-sm font-bold text-gray-900 leading-snug">
                          Auto-génération des formulaires activée
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                          85% des requêtes traitées sans intervention humaine.
                          Formulaires pré-remplis grâce au modèle de langage GovPilot 3.1.
                        </p>
                      </div>
                      <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 max-w-fit">
                        <Sparkles className="h-3 w-3" /> 85% automatisé
                      </span>
                    </div>

                  </div>
                </div>

                {/* Chat Section */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <GovPilotChat />
                </div>
              </section>

            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast} msg={toast} onDone={() => setToast("")} />}
      </AnimatePresence>
    </div>
  );
}
