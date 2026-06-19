"use client";

import { motion } from "framer-motion";
import { FileStack, Clock, ShieldAlert } from "lucide-react";

const stats = [
  {
    key: "total",
    label: "Documents",
    icon: FileStack,
    color: "text-atlas",
    bg: "bg-atlas/10",
  },
  {
    key: "pending",
    label: "En validation",
    icon: ShieldAlert,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    key: "expiring",
    label: "Expirent bientôt",
    icon: Clock,
    color: "text-sahara",
    bg: "bg-sahara/15",
  },
] as const;

export function WalletStats({
  total,
  pending,
  expiring,
}: {
  total: number;
  pending: number;
  expiring: number;
}) {
  const values = { total, pending, expiring };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06, type: "spring", stiffness: 200, damping: 25 }}
      className="mb-6 grid grid-cols-3 gap-2.5"
    >
      {stats.map(({ key, label, icon: Icon, color, bg }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.04 }}
          className="relative overflow-hidden rounded-2xl glass p-3.5 shadow-ambient"
        >
          <div
            className={`mb-2.5 flex h-8 w-8 items-center justify-center rounded-xl ${bg}`}
          >
            <Icon className={`h-4 w-4 ${color}`} strokeWidth={2} />
          </div>
          <p className="font-display text-2xl font-bold tabular-nums text-charcoal">
            {values[key]}
          </p>
          <p className="mt-0.5 text-[10px] font-medium leading-tight text-charcoal/45">
            {label}
          </p>
        </motion.div>
      ))}
    </motion.section>
  );
}
