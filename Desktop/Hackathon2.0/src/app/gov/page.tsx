"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, X, CheckCircle2, Clock,
  User, Hash, CalendarDays, AlertTriangle,
  Sparkles, Check,
} from "lucide-react";
import { useDemoStore } from "@/lib/store";

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      onAnimationComplete={() => setTimeout(onDone, 2200)}
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-emerald-500 px-5 py-3.5 shadow-xl"
    >
      <Check className="h-5 w-5 text-white" />
      <span className="font-display text-sm font-semibold text-white">{message}</span>
    </motion.div>
  );
}

export default function GovPage() {
  const { demoDocument: { status, citizenName, shareCode: _sc }, govApprove: approvePassport, resetDemo: reset } = useDemoStore();
  const [toast, setToast] = useState("");

  function handleApprove() {
    approvePassport();
    setToast("✅ Passport approved — Citizen notified");
  }

  function handleReject() {
    reset();
    setToast("❌ Application rejected");
  }

  return (
    <div className="min-h-[100dvh] bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col border-r border-white/[0.06] bg-slate-900/95 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-atlas to-atlas-dark">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-display text-[14px] font-bold text-white">SmartGov</p>
            <p className="text-[10px] text-white/30">E-Beztami Portal</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {[
            { label: "Review Queue", active: true, count: status === "PENDING_GOV" ? 1 : 0 },
            { label: "Approved", active: false, count: 0 },
            { label: "Rejected", active: false, count: 0 },
          ].map(({ label, active, count }) => (
            <div
              key={label}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-[13px] font-medium ${
                active ? "bg-white/10 text-white" : "text-white/40"
              }`}
            >
              {label}
              {count > 0 && (
                <span className="rounded-full bg-moroccan px-2 py-0.5 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="ml-60 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/[0.06] bg-slate-900/80 px-8 py-5 backdrop-blur-xl">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Review Queue</h1>
            <p className="text-[12px] text-white/30">
              {status === "PENDING_GOV" ? "1 application pending review" : "No pending applications"}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-[12px] font-medium text-white/60">AI Assist Active</span>
          </div>
        </header>

        <main className="p-8">
          <AnimatePresence mode="wait">
            {status === "PENDING_GOV" ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="mx-auto max-w-2xl"
              >
                {/* Review card */}
                <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-800">
                  {/* Card header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <User className="h-5 w-5 text-white/70" />
                      </div>
                      <div>
                        <p className="font-display text-[15px] font-semibold text-white">{citizenName}</p>
                        <p className="text-[11px] text-white/30">Passport Application</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-[11px] font-semibold text-amber-400">PENDING REVIEW</span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-3 gap-px border-b border-white/[0.06] bg-white/[0.04]">
                    {[
                      { icon: <Hash className="h-4 w-4" />, label: "Passport No.", value: "MA-2024-887734" },
                      { icon: <CalendarDays className="h-4 w-4" />, label: "Expiry Date", value: "2034-06-15" },
                      { icon: <User className="h-4 w-4" />, label: "Full Name", value: citizenName },
                    ].map(({ icon, label, value }) => (
                      <div key={label} className="bg-slate-800 px-6 py-5">
                        <div className="mb-2 flex items-center gap-2 text-white/30">
                          {icon}
                          <span className="text-[11px] uppercase tracking-wider">{label}</span>
                        </div>
                        <p className="font-mono text-[14px] font-medium text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Risk assessment */}
                  <div className="border-b border-white/[0.06] px-8 py-6">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                      AI Risk Assessment
                    </p>
                    <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                          <ShieldCheck className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-display text-[15px] font-bold text-emerald-400">
                            Fraud Risk: Low (12%)
                          </p>
                          <p className="text-[11px] text-white/30">
                            Document integrity verified · No anomalies detected
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "12%" }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-full rounded-full bg-emerald-500"
                          />
                        </div>
                        <span className="text-[10px] text-white/30">12 / 100</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-3">
                      <Sparkles className="h-4 w-4 shrink-0 text-atlas-light" />
                      <p className="text-[12px] text-white/50">
                        <span className="font-semibold text-white/80">AI Recommendation:</span>{" "}
                        Approve — all biometric and document checks passed.
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4 px-8 py-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleApprove}
                      className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-emerald-500 py-4 font-display text-[15px] font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      Approve (AI Recommended)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReject}
                      className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-4 font-display text-[15px] font-bold text-white/60 hover:bg-white/[0.08]"
                    >
                      <X className="h-5 w-5" />
                      Reject
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5">
                  {status === "VERIFIED" ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-white/20" />
                  )}
                </div>
                <p className="font-display text-lg font-semibold text-white/40">
                  {status === "VERIFIED" ? "All applications processed" : "No pending applications"}
                </p>
                <p className="mt-1 text-[13px] text-white/20">
                  {status === "VERIFIED"
                    ? "The passport was successfully approved."
                    : "New submissions will appear here automatically."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key={toast} message={toast} onDone={() => setToast("")} />}
      </AnimatePresence>
    </div>
  );
}
