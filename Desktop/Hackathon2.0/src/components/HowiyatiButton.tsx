"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Fingerprint, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { delay } from "@/lib/utils";

type State = "idle" | "loading" | "scanning" | "success";

export function HowiyatiButton() {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");

  async function handleClick() {
    if (state !== "idle") return;
    setState("loading");
    await delay(400);
    setState("scanning");
    await delay(2000);
    setState("success");
    await delay(300);
    router.push("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
      <motion.button
        onClick={handleClick}
        disabled={state !== "idle"}
        whileHover={state === "idle" ? { scale: 1.02 } : {}}
        whileTap={state === "idle" ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full font-display text-[15px] font-semibold transition-all duration-300 ${
          state === "idle"
            ? "cursor-pointer bg-atlas text-white shadow-ambient hover:bg-atlas-light hover:shadow-glow"
            : "cursor-wait bg-charcoal/90 text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5"
            >
              <Fingerprint className="h-5 w-5" />
              Continuer avec Howiyati
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              Connexion...
            </motion.span>
          )}
          {state === "scanning" && (
            <motion.span
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Fingerprint className="h-5 w-5" />
              </motion.div>
              Authentification...
            </motion.span>
          )}
          {state === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              ✓ Identifié
            </motion.span>
          )}
        </AnimatePresence>

        {state === "scanning" && (
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {(state === "loading" || state === "scanning") && (
          <motion.p
            key="status"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-charcoal/50"
          >
            {state === "loading"
              ? "Préparation de l'authentification..."
              : "Authentification sécurisée DGSN..."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
