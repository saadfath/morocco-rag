"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  FileSearch,
  Download,
  FileBarChart,
  User,
  Zap,
  Clock,
} from "lucide-react";
import { GlassPanel } from "./GlassPanel";

const SUGGESTED_PROMPTS = [
  "Quels dossiers présentent un risque élevé aujourd'hui ?",
  "Quels services sont les plus sollicités ?",
  "Quelles régions nécessitent davantage de ressources ?",
  "Résume-moi les alertes critiques de cette semaine.",
];

const DEMO_AGENT_MSG =
  "Analyse les demandes d'aide sociale de cette semaine.";

const AI_RESPONSE_LINES = [
  "Analyse terminée.",
  "",
  "• 12 487 demandes analysées",
  "• 11 931 validées automatiquement",
  "• 556 nécessitent une vérification humaine",
  "• 42 dossiers présentent un risque élevé de fraude",
  "",
  "Principales anomalies détectées :",
  "",
  "• Adresses fiscales contradictoires",
  "• Revenus déclarés incohérents",
  "• Demandes multiples provenant d'un même foyer",
  "",
  "Recommandation :",
  "Prioriser l'examen manuel des 42 dossiers à risque élevé.",
];

const HUMAN_HOURS = 18;
const AI_SECONDS = 14;

function AnimatedTimeSaved({ targetHours }: { targetHours: number }) {
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setHours(Math.round(targetHours * eased * 10) / 10);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetHours]);

  return <span>{hours}h économisées</span>;
}

function StreamingResponse({
  visible,
  responseKey,
}: {
  visible: boolean;
  responseKey: number;
}) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible) {
      setDisplayedLines([]);
      setDone(false);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    const lines: string[] = [];

    const interval = setInterval(() => {
      if (lineIndex >= AI_RESPONSE_LINES.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }

      const currentLine = AI_RESPONSE_LINES[lineIndex];
      if (charIndex === 0) lines.push("");

      if (currentLine === "") {
        lines[lineIndex] = "";
        lineIndex++;
        charIndex = 0;
        setDisplayedLines([...lines]);
        return;
      }

      charIndex++;
      lines[lineIndex] = currentLine.slice(0, charIndex);
      setDisplayedLines([...lines]);

      if (charIndex >= currentLine.length) {
        lineIndex++;
        charIndex = 0;
      }
    }, 18);

    return () => clearInterval(interval);
  }, [visible, responseKey]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl rounded-bl-sm border border-white/[0.06] bg-gov-bg/80 px-5 py-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-atlas/20">
          <Bot className="h-4 w-4 text-atlas-light" />
        </div>
        <span className="text-xs font-semibold text-atlas-light">
          SmartGov AI Copilot
        </span>
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-auto flex items-center gap-1.5 text-[10px] text-gov-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-atlas" />
            Analyse en cours...
          </motion.span>
        )}
      </div>

      <div className="space-y-0.5 text-sm leading-relaxed text-gov-text">
        {displayedLines.map((line, i) => {
          if (line === "") return <div key={i} className="h-2" />;
          if (line.startsWith("•")) {
            return (
              <p key={i} className="text-gov-text/90">
                {line}
              </p>
            );
          }
          if (line === "Principales anomalies détectées :") {
            return (
              <p key={i} className="mt-2 font-semibold text-gov-text">
                {line}
              </p>
            );
          }
          if (line === "Recommandation :") {
            return (
              <p key={i} className="mt-2 font-semibold text-sahara">
                {line}
              </p>
            );
          }
          if (line.startsWith("Prioriser")) {
            return (
              <p key={i} className="text-gov-muted">
                {line}
              </p>
            );
          }
          if (line === "Analyse terminée.") {
            return (
              <p key={i} className="font-semibold text-atlas-light">
                {line}
              </p>
            );
          }
          return (
            <p key={i} className="text-gov-text/90">
              {line}
            </p>
          );
        })}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block h-4 w-0.5 bg-atlas"
          />
        )}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: FileSearch, label: "Voir les dossiers" },
                { icon: Download, label: "Exporter le rapport" },
                { icon: FileBarChart, label: "Générer un résumé exécutif" },
              ].map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 rounded-lg border border-atlas/30 bg-atlas/10 px-4 py-2 text-xs font-semibold text-atlas-light transition hover:bg-atlas/20"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </motion.button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gov-muted">
                  <Clock className="h-3 w-3" />
                  Analyse humaine estimée
                </div>
                <p className="mt-1 font-display text-xl font-bold text-gov-muted line-through decoration-moroccan/60">
                  {HUMAN_HOURS} heures
                </p>
              </div>

              <div className="rounded-lg border border-atlas/20 bg-atlas/5 px-4 py-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-atlas-light">
                  <Zap className="h-3 w-3" />
                  SmartGov AI
                </div>
                <p className="mt-1 font-display text-xl font-bold text-atlas-light">
                  {AI_SECONDS} secondes
                </p>
              </div>

              <div className="rounded-lg border border-sahara/20 bg-sahara/5 px-4 py-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-sahara">
                  <Sparkles className="h-3 w-3" />
                  Temps économisé
                </div>
                <p className="mt-1 font-display text-xl font-bold text-sahara">
                  <AnimatedTimeSaved
                    targetHours={HUMAN_HOURS - AI_SECONDS / 3600}
                  />
                </p>
                <p className="text-[10px] text-gov-muted">
                  vs {HUMAN_HOURS}h d&apos;analyse manuelle
                </p>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-gov-muted"
            >
              La même IA qui alimente{" "}
              <span className="font-semibold text-atlas-light">E-Beztami</span>{" "}
              pour les citoyens agit ici comme copilote intelligent pour les
              agents publics et décideurs.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SmartGovCopilot() {
  const [input, setInput] = useState(DEMO_AGENT_MSG);
  const [phase, setPhase] = useState<"idle" | "thinking" | "responding">(
    "idle"
  );
  const [showConversation, setShowConversation] = useState(false);
  const [responseKey, setResponseKey] = useState(0);

  const runDemo = useCallback((message: string) => {
    setInput(message);
    setShowConversation(true);
    setPhase("thinking");
    setResponseKey((k) => k + 1);

    setTimeout(() => {
      setPhase("responding");
    }, 1400);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runDemo(DEMO_AGENT_MSG), 1200);
    return () => clearTimeout(timer);
  }, [runDemo]);

  function handleSubmit() {
    if (phase === "thinking") return;
    runDemo(input);
  }

  return (
    <GlassPanel delay={0.35} className="overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-atlas/30 to-atlas/10 ring-1 ring-atlas/30">
                <Bot className="h-5 w-5 text-atlas-light" />
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-gov-surface bg-atlas"
                />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-gov-text">
                  SmartGov AI Copilot
                </h2>
                <p className="text-xs text-gov-muted">
                  Assistant stratégique pour les administrations publiques
                </p>
              </div>
            </div>
          </div>

          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(0,98,51,0)",
                "0 0 16px rgba(0,98,51,0.4)",
                "0 0 0px rgba(0,98,51,0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex items-center gap-2 rounded-full border border-atlas/25 bg-atlas/10 px-3 py-1.5"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-atlas"
            />
            <span className="text-[11px] font-semibold text-atlas-light">
              IA Nationale Active
            </span>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
        {/* Suggested prompts sidebar */}
        <div className="border-b border-white/[0.06] p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-gov-muted">
            Suggestions
          </p>
          <div className="space-y-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <motion.button
                key={prompt}
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => runDemo(prompt)}
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left text-xs leading-relaxed text-gov-muted transition hover:border-atlas/20 hover:bg-atlas/5 hover:text-gov-text"
              >
                <span className="text-atlas">•</span> {prompt}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col lg:col-span-9">
          <div className="flex-1 space-y-4 p-5 lg:min-h-[420px]">
            <AnimatePresence>
              {showConversation && (
                <>
                  {/* Agent message */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[85%] rounded-xl rounded-br-sm border border-white/[0.06] bg-white/[0.04] px-4 py-3">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <User className="h-3 w-3 text-gov-muted" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gov-muted">
                          Agent gouvernemental
                        </span>
                      </div>
                      <p className="text-sm text-gov-text">{input}</p>
                    </div>
                  </motion.div>

                  {/* Thinking state */}
                  {phase === "thinking" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-gov-bg/60 px-4 py-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                              className="h-2 w-2 rounded-full bg-atlas"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gov-muted">
                          Analyse de 12 487 dossiers en cours...
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* AI response */}
                  {phase === "responding" && (
                    <StreamingResponse
                      visible={true}
                      responseKey={responseKey}
                    />
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="border-t border-white/[0.06] p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Posez une question stratégique à SmartGov AI..."
                className="flex-1 rounded-xl border border-white/[0.08] bg-gov-bg/60 px-4 py-3 text-sm text-gov-text placeholder:text-gov-muted/40 focus:border-atlas/40 focus:outline-none focus:ring-1 focus:ring-atlas/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={phase === "thinking"}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-atlas text-white shadow-[0_4px_20px_rgba(0,98,51,0.35)] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
