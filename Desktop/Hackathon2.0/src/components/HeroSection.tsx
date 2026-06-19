"use client";

import { motion } from "framer-motion";
import { ShieldLogo } from "./ShieldLogo";
import { IdentityCard } from "./IdentityCard";
import { HowiyatiButton } from "./HowiyatiButton";
import { ZelligeBackground } from "./ZelligeBackground";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 py-10 sm:px-6">
      <ZelligeBackground />

      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <motion.div {...fadeUp} transition={{ delay: 0 }}>
          <ShieldLogo />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.05 }}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-atlas/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-atlas" />
          Plateforme officielle de confiance
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="mt-6 font-display text-[clamp(2rem,7vw,3rem)] font-bold leading-none tracking-tight text-charcoal"
        >
          E-Beztami
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.15 }}
          className="mt-2 font-display text-base font-medium text-atlas sm:text-lg"
        >
          Wraqi F E-Beztami
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="mt-3 max-w-[320px] text-sm leading-relaxed text-charcoal/60"
        >
          Le portefeuille digital national — tous vos documents vérifiés,
          sécurisés et accessibles. Maroc 2030.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.25 }}
          className="mt-8 w-full"
        >
          <IdentityCard />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.35 }}
          className="mt-8 w-full"
        >
          <HowiyatiButton />
        </motion.div>
      </div>
    </main>
  );
}
