"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { KPI_DATA } from "@/lib/smartgov-data";
import { GlassPanel } from "./GlassPanel";

export function KPIScorecard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {KPI_DATA.map((kpi, i) => (
        <GlassPanel key={kpi.title} delay={i * 0.08} className="p-5">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gov-muted">
              {kpi.title}
            </p>
            {kpi.alert && (
              <AlertTriangle className="h-4 w-4 text-moroccan" />
            )}
          </div>

          <div className="mt-3 flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              className="font-display text-3xl font-bold text-gov-text"
            >
              {kpi.value}
            </motion.span>
            {kpi.unit && (
              <span className="text-sm font-medium text-gov-muted">
                {kpi.unit}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs leading-relaxed text-gov-muted">
            {kpi.description}
          </p>

          <div className="mt-3 flex items-center gap-1.5">
            <TrendingUp
              className={`h-3.5 w-3.5 ${
                kpi.trendUp ? "text-atlas-light" : "text-moroccan"
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                kpi.trendUp ? "text-atlas-light" : "text-moroccan"
              }`}
            >
              {kpi.trend}
            </span>
            <span className="text-[10px] text-gov-muted">vs mois dernier</span>
          </div>

          <motion.div
            className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${60 + i * 8}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: "easeOut" }}
              className={`h-full rounded-full ${
                kpi.accent === "red"
                  ? "bg-gradient-to-r from-moroccan/60 to-moroccan"
                  : kpi.accent === "gold"
                    ? "bg-gradient-to-r from-sahara/60 to-sahara"
                    : "bg-gradient-to-r from-atlas/60 to-atlas"
              }`}
            />
          </motion.div>
        </GlassPanel>
      ))}
    </div>
  );
}
