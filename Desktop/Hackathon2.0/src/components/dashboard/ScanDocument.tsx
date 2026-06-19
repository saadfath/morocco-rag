"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  CheckCircle2,
  Clock,
  XCircle,
  Building2,
  Shield,
} from "lucide-react";
import { OCRScanner } from "./OCRScanner";
import { SCANNABLE_DOCUMENT } from "@/lib/wallet-data";
import type { ScanPhase, ValidationState, WalletDocument } from "./types";

const OCR_LABELS = [
  { text: "Type · Attestation fiscale", threshold: 15 },
  { text: "Contribuable · Mounir El Alaoui", threshold: 30 },
  { text: "N° fiscal · 12345678", threshold: 50 },
  { text: "Situation · À jour", threshold: 70 },
  { text: "Autorité · DGI Rabat", threshold: 90 },
];

export function ScanDocument({
  onClose,
  onApproved,
}: {
  onClose: () => void;
  onApproved: (doc: WalletDocument) => void;
}) {
  const [phase, setPhase] = useState<ScanPhase>("camera");
  const [progress, setProgress] = useState(0);
  const [validationState, setValidationState] =
    useState<ValidationState>("pending-review");

  const startOCR = useCallback(() => {
    setPhase("ocr");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 3;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setPhase("validation");
        setValidationState("pending-review");
        setTimeout(() => setValidationState("approved"), 3200);
      }
    }, 90);
  }, []);

  useEffect(() => {
    if (validationState === "approved") {
      const timer = setTimeout(() => {
        onApproved(SCANNABLE_DOCUMENT);
        setPhase("complete");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [validationState, onApproved]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-charcoal/50 p-4 backdrop-blur-md sm:items-center"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 32 }}
        className="w-full max-w-md overflow-hidden rounded-3xl glass shadow-card"
      >
        <div className="flex items-center justify-between px-6 pb-2 pt-5">
          <div>
            <h3 className="font-display font-semibold text-charcoal">
              Scanner un document
            </h3>
            <p className="text-[11px] text-charcoal/40">
              Centre de Validation Gouvernemental
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/5"
          >
            <X className="h-4 w-4 text-charcoal/50" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {phase === "camera" && (
              <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="relative h-56 overflow-hidden rounded-2xl bg-charcoal ring-2 ring-atlas/20">
                  <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/80" />
                  <div className="absolute inset-4 rounded-xl border-2 border-dashed border-white/30">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-atlas to-transparent"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-center text-xs font-medium text-white/80">
                      Placez le document dans le cadre
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                    >
                      <Camera className="h-7 w-7 text-white" />
                    </motion.div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startOCR}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-atlas py-3.5 text-sm font-semibold text-white shadow-ambient"
                >
                  <Camera className="h-4 w-4" />
                  Capturer le document
                </motion.button>
              </motion.div>
            )}

            {phase === "ocr" && (
              <motion.div key="ocr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <OCRScanner progress={progress} labels={OCR_LABELS} />
                <p className="mt-3 text-center text-[11px] text-charcoal/40">
                  Extraction OCR · Envoi au Centre de Validation...
                </p>
              </motion.div>
            )}

            {(phase === "validation" || phase === "complete") && (
              <motion.div
                key="validation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-2"
              >
                <ValidationCenter state={validationState} />

                {validationState === "approved" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-2xl border border-atlas/20 bg-atlas/5 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-atlas" />
                      <div>
                        <p className="text-sm font-semibold text-charcoal">
                          {SCANNABLE_DOCUMENT.name}
                        </p>
                        <p className="text-[11px] text-atlas">
                          Ajouté automatiquement à votre portefeuille
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {phase === "complete" && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="mt-4 w-full rounded-2xl bg-atlas py-3.5 text-sm font-semibold text-white"
                  >
                    Retour au portefeuille
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ValidationCenter({ state }: { state: ValidationState }) {
  const steps: { id: ValidationState; label: string; icon: typeof Clock }[] = [
    { id: "pending-review", label: "En cours de revue", icon: Clock },
    { id: "approved", label: "Approuvé", icon: CheckCircle2 },
    { id: "rejected", label: "Rejeté", icon: XCircle },
  ];

  const currentIndex = steps.findIndex((s) => s.id === state);

  return (
    <div className="rounded-2xl bg-charcoal/[0.03] p-4">
      <div className="mb-4 flex items-center gap-2">
        <Building2 className="h-4 w-4 text-atlas" />
        <span className="text-xs font-semibold text-charcoal">
          Centre de Validation Gouvernemental
        </span>
        <Shield className="ml-auto h-4 w-4 text-atlas/50" />
      </div>

      <div className="space-y-3">
        {steps.slice(0, 2).map((step, i) => {
          const Icon = step.icon;
          const isActive = i <= currentIndex;
          const isCurrent = step.id === state;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                isCurrent
                  ? "bg-atlas/10 ring-1 ring-atlas/20"
                  : isActive
                    ? "bg-white"
                    : "opacity-40"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isActive ? "bg-atlas text-white" : "bg-charcoal/10 text-charcoal/40"
                }`}
              >
                {isCurrent && state === "pending-review" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-[11px] font-medium text-charcoal/40">
                  {i === 0 ? "Étape 1" : "Étape 2"}
                </p>
                <p className="text-sm font-semibold text-charcoal">{step.label}</p>
              </div>
              {isCurrent && state === "pending-review" && (
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="ml-auto text-[10px] font-semibold text-blue-600"
                >
                  En attente...
                </motion.span>
              )}
              {step.id === "approved" && state === "approved" && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-atlas" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
