"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, LogIn, User, Hash, CalendarDays, CheckCircle2, X, Check } from "lucide-react";
import { useDemoStore } from "@/lib/store";

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      onAnimationComplete={() => setTimeout(onDone, 2000)}
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 shadow-xl"
    >
      <Check className="h-4 w-4 text-white" />
      <span className="text-sm font-semibold text-white">{msg}</span>
    </motion.div>
  );
}

export default function GovPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState("");
  const { demoDocument, govApprove, resetDemo } = useDemoStore();
  const { status, citizenName } = demoDocument;

  function handleApprove() {
    govApprove();
    setToast("Document vérifié et approuvé ✅");
  }

  function handleReject() {
    resetDemo();
    setToast("Document rejeté ❌");
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <AnimatePresence mode="wait">

        {/* ── LOGIN ── */}
        {!loggedIn && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-[100dvh] items-center justify-center px-4"
          >
            <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <div className="mb-6 flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-gray-900">Portail Agent SmartGov</h1>
                  <p className="mt-1 text-sm text-gray-400">Ministère de l'Intérieur · Maroc</p>
                </div>
              </div>

              <div className="mb-4 space-y-3">
                <input
                  type="text"
                  defaultValue="agent.alaoui@gov.ma"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={() => setLoggedIn(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <LogIn className="h-4 w-4" />
                Connexion Agent
              </button>
            </div>
          </motion.div>
        )}

        {/* ── DASHBOARD ── */}
        {loggedIn && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top nav */}
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="font-display text-[15px] font-bold text-gray-900">SmartGov · File d'attente</span>
              </div>
              <button
                onClick={() => setLoggedIn(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Déconnexion
              </button>
            </header>

            <main className="mx-auto max-w-3xl px-6 py-10">
              <h2 className="mb-6 font-display text-lg font-semibold text-gray-800">
                Documents en attente de vérification
              </h2>

              <AnimatePresence mode="wait">
                {status === "PENDING_GOV" ? (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    {/* Card header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{citizenName}</p>
                          <p className="text-xs text-gray-400">Demande de passeport · Reçu maintenant</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 border border-amber-200">
                        EN ATTENTE
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                      {[
                        { icon: <Hash className="h-4 w-4 text-gray-400" />, label: "Numéro", value: "MA-2024-887734" },
                        { icon: <CalendarDays className="h-4 w-4 text-gray-400" />, label: "Expiration", value: "2034-06-15" },
                        { icon: <User className="h-4 w-4 text-gray-400" />, label: "Nom complet", value: citizenName },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="px-6 py-4">
                          <div className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">{icon}{label}</div>
                          <p className="text-sm font-medium text-gray-800">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 px-6 py-5">
                      <button
                        onClick={handleApprove}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Vérifier Manuellement
                      </button>
                      <button
                        onClick={handleReject}
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                      >
                        <X className="h-4 w-4" />
                        Rejeter
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-gray-200 bg-white"
                  >
                    <table className="w-full text-sm">
                      <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <tr>
                          {["Citoyen", "Type", "Date", "Statut"].map((h) => (
                            <th key={h} className="px-6 py-3 text-left">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={4} className="py-16 text-center text-gray-400">
                            Aucun document en attente
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast key={toast} msg={toast} onDone={() => setToast("")} />}
      </AnimatePresence>
    </div>
  );
}
