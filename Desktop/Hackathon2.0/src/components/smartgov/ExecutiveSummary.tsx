"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

const STATS = [
  { value: "18.2M", label: "minutes économisées" },
  { value: "2.4M", label: "dossiers automatisés" },
  { value: "14,238", label: "fraudes détectées" },
  { value: "42.3M", label: "documents sans papier" },
];

export function ExecutiveSummary() {
  return (
    <GlassPanel
      delay={0.5}
      className="relative overflow-hidden p-8 lg:p-10"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-atlas/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-sahara/10 blur-[80px]" />

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-atlas/20 bg-atlas/10 px-3 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-atlas-light" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-atlas-light">
              Résumé Exécutif · Morocco 2030
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="font-display text-3xl font-bold leading-tight text-gov-text lg:text-4xl"
          >
            Grâce à{" "}
            <span className="bg-gradient-to-r from-atlas-light via-sahara to-atlas-light bg-clip-text text-transparent">
              SmartGov AI
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-6 font-display text-xl font-medium leading-relaxed text-gov-text/90 lg:text-2xl"
          >
            Une administration{" "}
            <span className="text-atlas-light">proactive</span>,{" "}
            <span className="text-sahara">prédictive</span> et{" "}
            <span className="text-gov-text">centrée sur le citoyen</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 flex items-center gap-2 text-sm text-gov-muted"
          >
            <span>🇲🇦</span>
            <span>Royaume du Maroc · Plateforme Nationale de Gouvernance IA</span>
            <ArrowUpRight className="h-4 w-4 text-atlas" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
              className="rounded-xl border border-white/[0.06] bg-gov-bg/60 p-5 backdrop-blur-sm"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="font-display text-2xl font-bold text-gov-text lg:text-3xl"
              >
                {stat.value}
              </motion.p>
              <p className="mt-1 text-xs text-gov-muted">{stat.label}</p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                className="mt-3 h-0.5 rounded-full bg-gradient-to-r from-atlas/60 to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-moroccan via-sahara to-atlas"
      />
    </GlassPanel>
  );
}
