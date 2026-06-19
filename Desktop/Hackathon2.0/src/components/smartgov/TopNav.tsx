"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Bell,
  ChevronDown,
  Shield,
  Activity,
} from "lucide-react";
import { MINISTRIES } from "@/lib/smartgov-data";
import { LiveClock } from "./DataParticles";

export function TopNav() {
  const [ministry, setMinistry] = useState(MINISTRIES[0]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-gov-bg/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-atlas/30 to-atlas/10 ring-1 ring-atlas/30">
              <Brain className="h-5 w-5 text-atlas-light" />
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-atlas animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold tracking-tight text-gov-text">
                  SmartGov AI
                </h1>
                <span className="text-base">🇲🇦</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gov-muted">
                Morocco 2030 · Command Center
              </p>
            </div>
          </div>
        </div>

        <LiveClock />

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-gov-surface/60 px-3 py-2 text-xs text-gov-text transition hover:border-atlas/30"
            >
              <Shield className="h-3.5 w-3.5 text-atlas" />
              {ministry}
              <ChevronDown className="h-3.5 w-3.5 text-gov-muted" />
            </button>
            {open && (
              <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-white/[0.08] bg-gov-surface py-1 shadow-xl">
                {MINISTRIES.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMinistry(m);
                      setOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-xs text-gov-muted hover:bg-white/[0.04] hover:text-gov-text"
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(0,98,51,0)", "0 0 20px rgba(0,98,51,0.3)", "0 0 0px rgba(0,98,51,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 rounded-full border border-atlas/30 bg-atlas/10 px-3 py-1.5"
          >
            <Activity className="h-3.5 w-3.5 text-atlas-light" />
            <span className="text-[11px] font-semibold text-atlas-light">
              National AI Active
            </span>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-atlas" />
          </motion.div>

          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-gov-surface/60 text-gov-muted transition hover:text-gov-text">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moroccan text-[9px] font-bold text-white">
              3
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
