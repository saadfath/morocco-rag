"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, UserCheck } from "lucide-react";
import { FRAUD_ROWS } from "@/lib/smartgov-data";
import { GlassPanel, SectionHeader } from "./GlassPanel";

function RiskBadge({ score }: { score: number }) {
  const color =
    score >= 70
      ? "text-moroccan bg-moroccan/10 ring-moroccan/30"
      : score >= 40
        ? "text-sahara bg-sahara/10 ring-sahara/30"
        : "text-atlas-light bg-atlas/10 ring-atlas/30";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ring-1 ${color}`}
    >
      {score}%
    </span>
  );
}

export function FraudDetectionTable() {
  return (
    <GlassPanel delay={0.3} className="overflow-hidden p-5">
      <SectionHeader
        title="Centre de Détection de Fraude"
        subtitle="Surveillance IA en temps réel · DGSN & CNSS"
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left">
              {["Citoyen", "Service", "Score Risque", "Analyse IA", "Action"].map(
                (col) => (
                  <th
                    key={col}
                    className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-wider text-gov-muted"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {FRAUD_ROWS.map((row, i) => (
              <motion.tr
                key={row.citizen}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className={`border-b border-white/[0.04] transition ${
                  row.highRisk
                    ? "border-l-2 border-l-moroccan bg-moroccan/[0.04]"
                    : ""
                }`}
              >
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2">
                    {row.highRisk && (
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <AlertTriangle className="h-4 w-4 text-moroccan" />
                      </motion.div>
                    )}
                    <span className="text-sm font-medium text-gov-text">
                      {row.citizen}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 pr-4 text-sm text-gov-muted">
                  {row.service}
                </td>
                <td className="py-3.5 pr-4">
                  <RiskBadge score={row.risk} />
                </td>
                <td className="max-w-[240px] py-3.5 pr-4 text-xs leading-relaxed text-gov-muted">
                  {row.analysis}
                </td>
                <td className="py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      row.highRisk
                        ? "bg-moroccan/10 text-moroccan ring-1 ring-moroccan/20"
                        : "bg-atlas/10 text-atlas-light ring-1 ring-atlas/20"
                    }`}
                  >
                    {row.highRisk ? (
                      <UserCheck className="h-3 w-3" />
                    ) : (
                      <ShieldCheck className="h-3 w-3" />
                    )}
                    {row.action}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}
