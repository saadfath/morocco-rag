"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileCheck } from "lucide-react";

export function CinematicIntro({ phase }: { phase: string }) {
  const isAnalyzing = phase === "intro-analyzing";

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="px-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-atlas/20 ring-1 ring-atlas/30"
            >
              <Sparkles className="h-8 w-8 text-atlas" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Analyse IA terminée
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="mx-auto mt-4 h-0.5 max-w-[200px] bg-gradient-to-r from-transparent via-atlas to-transparent"
            />
          </motion.div>
        ) : (
          <motion.div
            key="generated"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="px-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-atlas shadow-[0_0_40px_rgba(0,98,51,0.5)]"
            >
              <FileCheck className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Document généré avec succès
            </h1>
            <p className="mt-3 text-sm text-white/50">
              Extrait d&apos;acte de naissance · EBeztami
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
