"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { AI_SUGGESTIONS } from "@/lib/wallet-data";

export function ProactiveBanner({
  onOpenAssistant,
}: {
  onOpenAssistant: () => void;
}) {
  const top = AI_SUGGESTIONS.find((s) => s.priority === "high") ?? AI_SUGGESTIONS[0];

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpenAssistant}
      className="mb-6 w-full text-left"
    >
      <div className="relative overflow-hidden rounded-2xl border border-atlas/15 bg-gradient-to-r from-atlas/8 via-white/80 to-sahara/8 p-4 shadow-ambient">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-atlas/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-atlas to-atlas-dark shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-atlas">
              Assistant IA · Suggestion
            </p>
            <p className="mt-0.5 truncate font-display text-[13px] font-semibold text-charcoal">
              {top.title}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-charcoal/45">
              {top.description}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-atlas/40" />
        </div>
      </div>
    </motion.button>
  );
}
