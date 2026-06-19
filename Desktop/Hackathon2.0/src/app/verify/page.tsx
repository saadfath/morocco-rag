"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX, User, Hash, CalendarDays, Fingerprint, ArrowLeft } from "lucide-react";
import { useDemoStore } from "@/lib/store";

type State = "idle" | "success" | "error";

export default function VerifyPage() {
  const { demoDocument: { status, citizenName, shareCode }, requestVerification } = useDemoStore();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [verifyState, setVerifyState] = useState<State>("idle");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

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
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputs.current[5]?.focus();
    }
  }

  function verify() {
    const entered = digits.join("");
    const ok = requestVerification(entered);
    if (ok) {
      setVerifyState("success");
    } else {
      setVerifyState("error");
      setTimeout(() => setVerifyState("idle"), 3000);
    }
  }

  const isComplete = digits.every(Boolean);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-50 px-5 py-16">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col items-center gap-3"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark shadow-ambient">
          <Fingerprint className="h-7 w-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-charcoal">E-Beztami Verify</h1>
          <p className="mt-1 text-[13px] text-charcoal/40">Third-Party Authentication Portal</p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ── SUCCESS ── */}
        {verifyState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl"
          >
            {/* Green header */}
            <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-emerald-500 to-emerald-600 px-8 py-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
              >
                <ShieldCheck className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <p className="font-display text-lg font-bold text-white">Authenticity Verified</p>
                <p className="mt-0.5 text-[12px] text-white/70">by E-Beztami API · Secured by Howiyati</p>
              </div>
            </div>

            {/* Details */}
            <div className="divide-y divide-gray-100 px-8 py-2">
              {[
                { icon: <User className="h-4 w-4 text-gray-400" />, label: "Full Name", value: citizenName },
                { icon: <Hash className="h-4 w-4 text-gray-400" />, label: "Passport Number", value: "MA-2024-887734" },
                { icon: <CalendarDays className="h-4 w-4 text-gray-400" />, label: "Expiry Date", value: "2034-06-15" },
                { icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />, label: "Status", value: "VERIFIED" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2 text-[13px] text-gray-400">
                    {icon} {label}
                  </div>
                  <span className={`text-[14px] font-semibold ${label === "Status" ? "text-emerald-600" : "text-charcoal"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-8 pb-8">
              <button
                onClick={() => { setVerifyState("idle"); setDigits(["","","","","",""]); }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-[13px] font-medium text-gray-400 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" /> New Verification
              </button>
            </div>
          </motion.div>

        ) : (
          /* ── INPUT ── */
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
          >
            <h2 className="font-display text-[17px] font-bold text-charcoal">Enter Verification Code</h2>
            <p className="mt-1 text-[13px] text-charcoal/40">
              Ask the citizen for their 6-digit E-Beztami share code.
            </p>

            {/* 6-digit OTP input */}
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
                  className={`h-14 w-12 rounded-2xl border-2 text-center font-mono text-xl font-bold text-charcoal outline-none transition-all focus:border-atlas focus:ring-2 focus:ring-atlas/20 ${
                    verifyState === "error"
                      ? "border-red-400 bg-red-50 text-red-600"
                      : d
                      ? "border-atlas/30 bg-atlas/[0.03]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              ))}
            </div>

            {/* Error message */}
            <AnimatePresence>
              {verifyState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center justify-center gap-2"
                >
                  <ShieldX className="h-4 w-4 text-red-500" />
                  <span className="text-[13px] font-medium text-red-500">Invalid or Expired Code</span>
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
              Verify Authenticity
            </motion.button>

            <p className="mt-4 text-center text-[11px] text-charcoal/25">
              Secured · ISO 27001 · Powered by E-Beztami API
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
