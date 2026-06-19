"use client";

import { motion } from "framer-motion";

export function ZelligeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden zellige-bg">
      <motion.div
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-atlas/10 blur-[120px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-sahara/10 blur-[140px]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-moroccan/5 blur-[100px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </div>
  );
}
