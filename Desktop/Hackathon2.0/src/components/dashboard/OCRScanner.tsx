"use client";

import { motion, AnimatePresence } from "framer-motion";

export function OCRScanner({
  progress,
  labels = [
    { text: "Nom détecté", threshold: 20 },
    { text: "CIN · CD123456", threshold: 40 },
    { text: "Date de naissance", threshold: 60 },
    { text: "Adresse · Rabat", threshold: 80 },
  ],
}: {
  progress: number;
  labels?: { text: string; threshold: number }[];
}) {
  return (
    <div className="relative">
      <div className="relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-atlas/10 to-charcoal/5 ring-1 ring-atlas/10">
        <div className="absolute inset-0 flex gap-4 p-5">
          <div className="h-20 w-16 rounded-lg bg-charcoal/10" />
          <div className="flex-1 space-y-2 pt-2">
            <div className="h-2 w-3/4 rounded bg-charcoal/10" />
            <div className="h-2 w-1/2 rounded bg-charcoal/8" />
            <div className="h-2 w-2/3 rounded bg-charcoal/6" />
            <div className="h-2 w-1/3 rounded bg-charcoal/5" />
          </div>
        </div>

        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 z-10 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #006233, #D4A017, #006233, transparent)",
            boxShadow: "0 0 20px rgba(0, 98, 51, 0.6)",
          }}
        />

        <div className="absolute inset-0 bg-atlas/[0.03]" />
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-charcoal/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-atlas to-sahara"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-center text-[11px] text-charcoal/40">
        Extraction IA en cours · {progress}%
      </p>

      <div className="mt-3 space-y-1.5">
        <AnimatePresence>
          {labels
            .filter((l) => progress >= l.threshold)
            .map((label) => (
              <motion.div
                key={label.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-atlas" />
                <span className="text-[11px] font-medium text-atlas">
                  {label.text}
                </span>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
