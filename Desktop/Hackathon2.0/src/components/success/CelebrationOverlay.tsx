"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function CelebrationOverlay({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;

    const colors = ["#006233", "#C1272D", "#D4A017", "#FAFAFA"];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.3 },
        colors: ["#D4A017", "#006233"],
        ticks: 200,
      });
    }, 600);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="pointer-events-none fixed inset-x-0 bottom-28 z-30 flex justify-center px-6"
        >
          <div className="max-w-sm text-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="font-display text-lg font-bold leading-snug text-charcoal sm:text-xl"
            >
              <span className="text-atlas">0 papier.</span>{" "}
              <span className="text-moroccan">0 déplacement.</span>{" "}
              <span className="text-sahara">100% numérique.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-2 text-[12px] text-charcoal/40"
            >
              L&apos;avenir de l&apos;administration marocaine, aujourd&apos;hui.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
