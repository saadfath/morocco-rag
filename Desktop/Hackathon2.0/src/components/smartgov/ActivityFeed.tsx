"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Radio } from "lucide-react";
import { ACTIVITY_ITEMS } from "@/lib/smartgov-data";
import { GlassPanel, SectionHeader } from "./GlassPanel";

export function ActivityFeed() {
  const [items, setItems] = useState(ACTIVITY_ITEMS.slice(0, 5));
  useEffect(() => {
    let idx = 5;
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = ACTIVITY_ITEMS[idx % ACTIVITY_ITEMS.length];
        idx += 1;
        return [next, ...prev.slice(0, 6)];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassPanel delay={0.4} className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <SectionHeader
          title="Activité IA Gouvernementale"
          subtitle="Flux en temps réel"
        />
        <div className="flex items-center gap-1.5 rounded-full bg-atlas/10 px-2.5 py-1">
          <Radio className="h-3 w-3 animate-pulse text-atlas" />
          <span className="text-[10px] font-semibold text-atlas-light">LIVE</span>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <motion.div
              key={`${item.text}-${i}`}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 ${
                item.type === "warning"
                  ? "border-moroccan/20 bg-moroccan/[0.06]"
                  : "border-white/[0.04] bg-white/[0.02]"
              }`}
            >
              {item.type === "warning" ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-moroccan" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-atlas" />
              )}
              <div>
                <p className="text-xs leading-relaxed text-gov-text">
                  {item.text}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-gov-muted">
                  {new Date().toLocaleTimeString("fr-MA")}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}
