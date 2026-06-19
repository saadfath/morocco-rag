"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CinematicIntro } from "./CinematicIntro";
import { BirthCertificate } from "./BirthCertificate";
import { QRVerification } from "./QRVerification";
import { VerificationTimeline } from "./VerificationTimeline";
import { PDFExportButton } from "./PDFExportButton";
import { CelebrationOverlay } from "./CelebrationOverlay";

type Phase =
  | "intro-analyzing"
  | "intro-generated"
  | "document-reveal"
  | "qr-reveal"
  | "checks-reveal"
  | "celebration"
  | "complete";

const TIMELINE: { phase: Phase; delay: number }[] = [
  { phase: "intro-analyzing", delay: 0 },
  { phase: "intro-generated", delay: 1800 },
  { phase: "document-reveal", delay: 3400 },
  { phase: "qr-reveal", delay: 4200 },
  { phase: "checks-reveal", delay: 5400 },
  { phase: "celebration", delay: 6900 },
  { phase: "complete", delay: 7500 },
];

export function SuccessScreen() {
  const [phase, setPhase] = useState<Phase>("intro-analyzing");

  useEffect(() => {
    const timers = TIMELINE.slice(1).map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const showIntro =
    phase === "intro-analyzing" || phase === "intro-generated";
  const showDocument = !showIntro;
  const showQR = ["qr-reveal", "checks-reveal", "celebration", "complete"].includes(
    phase
  );
  const showChecks = ["checks-reveal", "celebration", "complete"].includes(
    phase
  );
  const showCelebration = ["celebration", "complete"].includes(phase);
  const showFAB = phase === "complete";

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-warm zellige-bg">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-atlas/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sahara/10 blur-[100px]" />
      </div>

      <AnimatePresence>
        {showIntro && <CinematicIntro phase={phase} />}
      </AnimatePresence>

      <div className="mx-auto max-w-md px-5 py-8 pb-36 pt-safe">
        <AnimatePresence>
          {showDocument && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div id="certificate-export" className="space-y-6 rounded-2xl bg-white/50 p-1">
                <BirthCertificate />
                {showQR && (
                  <QRVerification cin="CD123456" showChecks={showChecks} />
                )}
              </div>

              <VerificationTimeline visible={showDocument} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CelebrationOverlay active={showCelebration} />
      <PDFExportButton visible={showFAB} targetId="certificate-export" />
    </main>
  );
}
