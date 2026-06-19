"use client";

import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { ChevronRight, Timer } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { STATUS_CONFIG, type WalletDocument } from "./types";

export function WalletDocumentCard({
  document: doc,
  onTap,
  index = 0,
}: {
  document: WalletDocument;
  onTap: () => void;
  index?: number;
}) {
  const countdown = useCountdown(doc.expiresAt);
  const status = STATUS_CONFIG[doc.status];

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 28 }}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className="group relative w-full text-left"
    >
      <div className="relative overflow-hidden rounded-2xl glass shadow-ambient">
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${doc.previewColor}`}
        />

        <div className="relative p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">{status.emoji}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.bg} ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
              <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-charcoal">
                {doc.name}
              </h3>
              <p className="mt-1 text-[11px] text-charcoal/45 line-clamp-1">
                {doc.issuingAuthority}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-1">
              <div className="rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/[0.04]">
                <QRCode
                  value={`E-BEZTAMI://${doc.id}/${doc.status}`}
                  size={44}
                  level="M"
                  fgColor="#006233"
                  bgColor="#ffffff"
                />
              </div>
              <span className="text-[8px] font-semibold uppercase tracking-wider text-atlas/60">
                QR Vérifié
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-charcoal/[0.06] pt-3">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider text-charcoal/35">
                Émission
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-charcoal/70">
                {doc.issueDate}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider text-charcoal/35">
                Expiration
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-charcoal/70">
                {doc.expirationDate ?? "—"}
              </p>
            </div>
          </div>

          {doc.expiresAt && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-white/60 px-2.5 py-1.5">
              <Timer className="h-3 w-3 text-sahara" />
              <span className="font-mono text-[11px] font-semibold tabular-nums text-charcoal/70">
                {countdown}
              </span>
            </div>
          )}

          <div className="mt-3 flex items-center justify-end">
            <span className="flex items-center gap-0.5 text-[11px] font-medium text-atlas/60 group-hover:text-atlas">
              Voir le document
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
