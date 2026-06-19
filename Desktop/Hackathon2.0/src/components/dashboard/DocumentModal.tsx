"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import {
  X,
  Download,
  Share2,
  Send,
  RefreshCw,
  Eye,
  Timer,
} from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { STATUS_CONFIG, type WalletDocument } from "./types";

const ACTIONS = [
  { icon: Eye, label: "Aperçu" },
  { icon: Download, label: "Télécharger" },
  { icon: Share2, label: "Partager" },
  { icon: Send, label: "Envoyer" },
  { icon: RefreshCw, label: "Renouveler" },
] as const;

export function DocumentModal({
  document: doc,
  onClose,
}: {
  document: WalletDocument;
  onClose: () => void;
}) {
  const countdown = useCountdown(doc.expiresAt);
  const status = STATUS_CONFIG[doc.status];
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  function handleAction(label: string) {
    setActionFeedback(label);
    setTimeout(() => setActionFeedback(null), 1800);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
        className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg"
      >
        <div className="max-h-[92dvh] overflow-y-auto rounded-t-3xl glass shadow-card">
          <div className="sticky top-0 z-10 flex justify-center bg-white/80 pb-1 pt-3 backdrop-blur-xl">
            <div className="h-1 w-10 rounded-full bg-charcoal/10" />
          </div>

          <div className="px-6 pb-8 pt-2">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span>{status.emoji}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.bg} ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-xl font-bold text-charcoal">
                  {doc.name}
                </h2>
                <p className="mt-1 text-xs text-charcoal/50">
                  {doc.issuingAuthority}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-charcoal/5"
              >
                <X className="h-4 w-4 text-charcoal/60" />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`relative aspect-[1.58/1] overflow-hidden rounded-2xl bg-gradient-to-br ${doc.previewColor} ring-1 ring-black/[0.06]`}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                  <div className="h-1 w-16 rounded-full bg-gradient-to-r from-moroccan via-sahara to-atlas opacity-70" />
                  <div className="rounded-lg bg-white/90 p-1.5 shadow-sm">
                    <QRCode
                      value={`E-BEZTAMI://verify/${doc.id}`}
                      size={56}
                      level="M"
                      fgColor="#006233"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-3/4 rounded bg-charcoal/10" />
                  <div className="h-2 w-1/2 rounded bg-charcoal/8" />
                  <div className="h-2 w-2/3 rounded bg-charcoal/6" />
                </div>
                <p className="font-mono text-[10px] text-charcoal/30">
                  E-Beztami · {doc.id.toUpperCase()}
                </p>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            </motion.div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InfoCell label="Date d'émission" value={doc.issueDate} />
              <InfoCell
                label="Date d'expiration"
                value={doc.expirationDate ?? "Sans expiration"}
              />
            </div>

            {doc.expiresAt && (
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-sahara/10 px-4 py-3">
                <Timer className="h-4 w-4 text-sahara" />
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-charcoal/40">
                    Compte à rebours
                  </p>
                  <p className="font-mono text-sm font-bold tabular-nums text-charcoal">
                    {countdown}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-5 gap-2">
              {ACTIONS.map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAction(label)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl bg-charcoal/[0.04] px-1 py-3 transition-colors hover:bg-atlas/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-atlas" strokeWidth={1.75} />
                  </div>
                  <span className="text-[9px] font-semibold text-charcoal/60">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>

            {actionFeedback && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-center text-[11px] font-medium text-atlas"
              >
                {actionFeedback} · simulation en cours...
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-charcoal/[0.03] px-3 py-2.5">
      <p className="text-[9px] font-medium uppercase tracking-wider text-charcoal/35">
        {label}
      </p>
      <p className="mt-0.5 text-[12px] font-semibold text-charcoal/80">
        {value}
      </p>
    </div>
  );
}
