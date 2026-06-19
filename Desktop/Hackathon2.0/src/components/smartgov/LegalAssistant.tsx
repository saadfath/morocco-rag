"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Scale, FileText, Clock, CheckCircle2 } from "lucide-react";
import { LEGAL_RESPONSE } from "@/lib/smartgov-data";
import { GlassPanel, SectionHeader } from "./GlassPanel";

const PROMPT =
  "Quels documents sont nécessaires pour une demande de permis de construire ?";

export function LegalAssistant() {
  const [showResponse, setShowResponse] = useState(false);
  const [streaming, setStreaming] = useState(false);

  function handleSubmit() {
    if (showResponse) return;
    setStreaming(true);
    setTimeout(() => {
      setStreaming(false);
      setShowResponse(true);
    }, 1500);
  }

  return (
    <GlassPanel delay={0.35} className="flex h-full flex-col p-5">
      <SectionHeader
        title="Assistant Juridique IA"
        subtitle="Analyse réglementaire instantanée"
      />

      <div className="flex flex-1 flex-col gap-3 overflow-hidden">
        {/* User message */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <div className="max-w-[90%] rounded-xl rounded-br-sm bg-atlas/20 px-4 py-3 ring-1 ring-atlas/20">
            <p className="text-sm text-gov-text">{PROMPT}</p>
          </div>
        </motion.div>

        {/* AI response */}
        <AnimatePresence>
          {(streaming || showResponse) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[95%] rounded-xl rounded-bl-sm border border-white/[0.06] bg-gov-bg/80 px-4 py-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-atlas/20">
                    <Bot className="h-3.5 w-3.5 text-atlas-light" />
                  </div>
                  <span className="text-[11px] font-semibold text-atlas-light">
                    SmartGov Legal AI
                  </span>
                </div>

                {streaming ? (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        className="h-2 w-2 rounded-full bg-atlas"
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="mb-2 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-gov-muted" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gov-muted">
                          Documents requis
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {LEGAL_RESPONSE.documents.map((doc, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-2 text-xs text-gov-text"
                          >
                            <CheckCircle2 className="mt-0.5 h-3 w-3 flex-shrink-0 text-atlas" />
                            {doc}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-1.5">
                        <Scale className="h-3.5 w-3.5 text-gov-muted" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gov-muted">
                          Références réglementaires
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {LEGAL_RESPONSE.references.map((ref, i) => (
                          <li key={i} className="text-xs text-gov-muted">
                            · {ref}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-sahara" />
                        <span className="text-xs text-gov-text">
                          Délai :{" "}
                          <strong className="text-sahara">
                            {LEGAL_RESPONSE.delay}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 flex justify-between text-[11px]">
                        <span className="text-gov-muted">
                          Taux de complétude moyen
                        </span>
                        <span className="font-semibold text-atlas-light">
                          {LEGAL_RESPONSE.completeness}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${LEGAL_RESPONSE.completeness}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-atlas to-atlas-light"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Posez une question juridique..."
          defaultValue={PROMPT}
          className="flex-1 rounded-lg border border-white/[0.08] bg-gov-bg/60 px-4 py-2.5 text-sm text-gov-text placeholder:text-gov-muted/50 focus:border-atlas/40 focus:outline-none"
          readOnly
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={showResponse}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-atlas text-white disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </GlassPanel>
  );
}
