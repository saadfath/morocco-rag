"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { STATUS_CONFIG, type WalletDocument } from "./types";

export function WalletHero({
  documents,
  onSelect,
}: {
  documents: WalletDocument[];
  onSelect: (doc: WalletDocument) => void;
}) {
  const featured = [...documents]
    .filter((d) => d.status === "expiring" || d.status === "verified")
    .sort((a, b) => {
      const priority = { expiring: 0, verified: 1, pending: 2, expired: 3 };
      const diff = priority[a.status] - priority[b.status];
      if (diff !== 0) return diff;
      return (a.expiresAt ?? Infinity) - (b.expiresAt ?? Infinity);
    })
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04, type: "spring", stiffness: 200, damping: 26 }}
      className="mb-6"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/40">
          Accès rapide
        </p>
        <span className="text-[10px] font-medium text-charcoal/35">
          {featured.length} documents
        </span>
      </div>

      <div className="relative h-[168px]">
        {featured.map((doc, i) => {
          const status = STATUS_CONFIG[doc.status];
          const offset = i * 14;
          const scale = 1 - i * 0.04;

          return (
            <motion.button
              key={doc.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: offset,
                scale,
              }}
              transition={{ delay: 0.08 + i * 0.06, type: "spring", stiffness: 260, damping: 28 }}
              whileHover={i === 0 ? { y: offset - 4, scale: scale + 0.01 } : {}}
              whileTap={{ scale: scale * 0.98 }}
              onClick={() => onSelect(doc)}
              style={{ zIndex: featured.length - i }}
              className="absolute inset-x-0 top-0 w-full text-left"
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${doc.previewColor} p-4 shadow-card ring-1 ring-black/[0.06]`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-moroccan via-sahara to-atlas" />
                <div className="pointer-events-none absolute inset-0 wallet-card-shine" />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{status.emoji}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${status.bg} ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-tight text-charcoal">
                      {doc.name}
                    </h3>
                    <p className="mt-0.5 truncate text-[10px] text-charcoal/45">
                      {doc.issuingAuthority}
                    </p>
                  </div>
                  {i === 0 && (
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-charcoal/25" />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}
