"use client";

import { motion } from "framer-motion";
import { Link2, Fingerprint, Blocks, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: Fingerprint,
    label: "Identité Howiyati authentifiée",
    time: "14:32:01",
  },
  {
    icon: Link2,
    label: "Hash enregistré sur registre DGSN",
    time: "14:32:03",
  },
  {
    icon: Blocks,
    label: "Ancrage blockchain · Block #4,892,103",
    time: "14:32:04",
  },
  {
    icon: CheckCircle2,
    label: "Document certifié et disponible",
    time: "14:32:05",
  },
];

export function VerificationTimeline({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-5 rounded-2xl glass p-4 shadow-ambient"
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal/40">
        Chaîne de vérification
      </p>

      <div className="relative space-y-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="relative flex items-start gap-3 pb-4 last:pb-0"
          >
            {i < STEPS.length - 1 && (
              <div className="absolute bottom-0 left-[15px] top-8 w-px bg-gradient-to-b from-atlas/30 to-atlas/5" />
            )}

            <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-atlas/10 ring-1 ring-atlas/15">
              <step.icon className="h-4 w-4 text-atlas" />
              <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-atlas ring-2 ring-white" />
            </div>

            <div className="pt-0.5">
              <p className="text-[12px] font-medium leading-snug text-charcoal">
                {step.label}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-charcoal/30">
                {step.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
