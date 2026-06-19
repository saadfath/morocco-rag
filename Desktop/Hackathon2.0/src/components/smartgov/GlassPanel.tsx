"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-xl border border-white/[0.06] bg-gov-surface/80 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-gov-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-0.5 text-xs text-gov-muted">{subtitle}</p>
      )}
    </div>
  );
}
