"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, ShieldX, Loader2, User, Hash,
  CalendarDays, Fingerprint, ArrowLeft, CheckCircle2,
} from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function VerifyPage() {
  const { demoDocument, requestVerification } = useDemoStore();
  const { status, citizenName } = demoDocument;

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Determine which screen to show purely from store status
  const showForm = status !== "PENDING_CONSENT" && status !== "SHARED";
  const showWaiting = status === "PENDING_CONSENT";
  const showSuccess = status === "SHARED";

  function handleDigit(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (p.length === 6) { setDigits(p.split("")); inputs.current[5]?.focus(); }
  }

  function verify() {
    const code = digits.join("");
    const ok = requestVerification(code);
    if (!ok) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  }

  function reset() {
    setDigits(["", "", "", "", "", ""]);
    setError(false);
  }

  const isComplete = digits.every(Boolean);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-white px-5 py-16">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col items-center gap-3 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark shadow-ambient">
          <Fingerprint className="h-7 w-7 text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-charcoal">E-Beztami Verify</h1>
        <p className="text-[13px] text-charcoal/40">Portail de Vérification Tiers</p>
      </motion.div>

      <AnimatePresence mode="wait">

        {/* ── INPUT FORM ── */}
        {showForm && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
          >
            <h2 className="font-display text-[17px] font-bold text-charcoal">
              Entrer le Code de Vérification
            </h2>
            <p className="mt-1 text-[13px] text-charcoal/40">
              Demandez au citoyen son code à 6 chiffres E-Beztami.
            </p>

            <div className="mt-8 flex justify-center gap-3" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`h-14 w-12 rounded-2xl border-2 text-center font-mono text-xl font-bold text-charcoal outline-none transition-all focus:border-atlas focus:ring-2 focus:ring-atlas/20 ${error
                      ? "border-red-400 bg-red-50 text-red-600"
                      : d
                        ? "border-atlas/30 bg-atlas/[0.03]"
                        : "border-gray-200 bg-gray-50"
                    }`}
                />
              ))}
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center justify-center gap-2"
                >
                  <ShieldX className="h-4 w-4 text-red-500" />
                  <span className="text-[13px] font-medium text-red-500">
                    Code invalide ou expiré
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={verify}
              disabled={!isComplete}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-atlas to-atlas-dark py-4 font-display text-[15px] font-bold text-white shadow-ambient disabled:opacity-30 transition-opacity"
            >
              Vérifier
            </motion.button>

            <p className="mt-4 text-center text-[11px] text-charcoal/25">
              Sécurisé · ISO 27001 · Propulsé par E-Beztami API
            </p>
          </motion.div>
        )}

        {/* ── SPINNER — waiting for citizen consent ── */}
        {showWaiting && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-xl"
          >
            {/* Animated ring */}
            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-60" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              </div>
            </div>

            <h2 className="font-display text-xl font-semibold text-charcoal">
              Code accepté
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal/50">
              En attente du consentement du citoyen…
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-blue-500">
                EN ATTENTE
              </span>
            </div>

            <p className="mt-8 text-[11px] text-charcoal/20">
              Le citoyen doit approuver la demande sur son appareil.
            </p>
          </motion.div>
        )}

        {/* ── SUCCESS — full green screen ── */}
        {showSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Massive green header */}
            <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-emerald-500 to-emerald-700 px-10 py-14 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20"
              >
                <CheckCircle2 className="h-14 w-14 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="font-display text-3xl font-bold text-white">
                  Accès Autorisé
                </p>
                <p className="mt-2 text-[16px] font-medium text-white/85">
                  Données Certifiées par l'État
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5">
                  <ShieldCheck className="h-4 w-4 text-white" />
                  <span className="text-[12px] font-bold uppercase tracking-wide text-white">
                    via E-Beztami API · Howiyati
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Passport data rows */}
            <div className="divide-y divide-gray-100 bg-white px-8 py-2">
              {[
                { icon: <User className="h-4 w-4 text-gray-400" />, label: "Nom complet", value: citizenName },
                { icon: <Hash className="h-4 w-4 text-gray-400" />, label: "Numéro Passeport", value: "MA-2024-887734" },
                { icon: <CalendarDays className="h-4 w-4 text-gray-400" />, label: "Expiration", value: "2034-06-15" },
                {
                  icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />,
                  label: "Statut",
                  value: "VÉRIFIÉ & PARTAGÉ",
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-2 text-[13px] text-gray-400">
                    {icon}
                    {label}
                  </div>
                  <span
                    className={`text-[14px] font-semibold ${label === "Statut" ? "text-emerald-600" : "text-charcoal"
                      }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Reset button */}
            <div className="bg-white px-8 pb-8">
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-[13px] font-medium text-gray-400 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Nouvelle Vérification
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
