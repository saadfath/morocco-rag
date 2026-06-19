"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useRef } from "react";

export function IdentityCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="perspective-[1200px] mx-auto w-full max-w-[340px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative animate-float"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="absolute -inset-4 rounded-3xl bg-atlas/10 blur-2xl" />

        <div className="relative overflow-hidden rounded-[24px] glass shadow-card">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-moroccan via-sahara to-atlas" />

          <div className="p-6 pt-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50">
                  Carte Nationale d&apos;Identité
                </p>
                <p className="mt-0.5 font-display text-lg font-semibold text-charcoal">
                  E-Beztami
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-atlas/10 px-2.5 py-1">
                <BadgeCheck className="h-3.5 w-3.5 text-atlas" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-atlas">
                  Vérifié
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-atlas/20 to-charcoal/5 ring-1 ring-atlas/10">
                <span className="font-display text-2xl font-bold text-atlas/60">
                  ME
                </span>
              </div>
              <div>
                <p className="text-xs text-charcoal/50">Numéro CIN</p>
                <p className="font-mono text-sm font-semibold tracking-wider text-charcoal">
                  CD123456
                </p>
                <p className="mt-1 text-xs text-charcoal/60">
                  Mounir El Alaoui
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-charcoal/[0.03] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-atlas" />
                <span className="text-[11px] text-charcoal/60">
                  Identité numérique active
                </span>
              </div>
              <span className="text-[10px] font-medium text-atlas">🇲🇦</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
