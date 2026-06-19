"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanLine, ShieldCheck, Copy, Check, Loader2,
  Fingerprint, BadgeCheck, AlertTriangle, Sparkles,
} from "lucide-react";
import { useDemoStore } from "@/lib/store";

export default function CitizenPage() {
  const { demoDocument, scanDocument, citizenAuthorize } = useDemoStore();
  const { status, citizenName, shareCode } = demoDocument;

  const [scanning, setScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleScan() {
    setScanning(true);
    setTimeout(() => { setScanning(false); scanDocument(); }, 2000);
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareCode.slice(0, 3) + "-" + shareCode.slice(3));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-warm px-5 py-12 zellige-bg">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-atlas/8 blur-[120px]" />
        <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-sahara/6 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-atlas to-atlas-dark shadow-ambient">
          <Fingerprint className="h-7 w-7 text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-charcoal">E-Beztami</h1>
        <p className="text-[13px] text-charcoal/40">Citizen Digital Wallet</p>
        {/* GovPilot badge */}
        <div className="mt-1 flex items-center gap-1.5 rounded-full bg-atlas/10 px-3 py-1">
          <Sparkles className="h-3 w-3 text-atlas" />
          <span className="text-[11px] font-semibold text-atlas">GovPilot AI</span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">

        {/* UNUPLOADED */}
        {status === "UNUPLOADED" && (
          <motion.div key="upload" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
            className="flex w-full max-w-sm flex-col items-center gap-6">
            <div className="w-full rounded-3xl border border-charcoal/[0.06] bg-white/70 p-8 text-center shadow-card backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-atlas/10">
                <ScanLine className="h-8 w-8 text-atlas" />
              </div>
              <h2 className="font-display text-lg font-semibold text-charcoal">Ajouter votre Passeport</h2>
              <p className="mt-1 text-[13px] text-charcoal/40">Scannez pour vérification instantanée</p>
            </div>

            <AnimatePresence mode="wait">
              {scanning ? (
                <motion.div key="scan-anim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex w-full flex-col items-center gap-4 rounded-3xl border border-atlas/20 bg-atlas/5 px-8 py-8">
                  <div className="relative h-20 w-44 overflow-hidden rounded-xl border-2 border-atlas/30 bg-atlas/[0.04]">
                    <motion.div animate={{ y: ["0%", "400%", "0%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-atlas to-transparent" />
                  </div>
                  <p className="font-display text-sm font-medium text-atlas">Analyse en cours…</p>
                </motion.div>
              ) : (
                <motion.button key="scan-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={handleScan}
                  className="flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-atlas to-atlas-dark py-5 shadow-ambient">
                  <ScanLine className="h-5 w-5 text-white" />
                  <span className="font-display text-[16px] font-bold text-white">Scanner Mon Passeport</span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* PENDING_GOV */}
        {status === "PENDING_GOV" && (
          <motion.div key="pending" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm rounded-3xl border border-charcoal/[0.06] bg-white/70 p-8 text-center shadow-card backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-sahara/10">
              <Loader2 className="h-8 w-8 animate-spin text-sahara" />
            </div>
            <h2 className="font-display text-lg font-semibold text-charcoal">En cours de vérification</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-charcoal/40">
              Votre passeport est examiné par un agent SmartGov.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sahara" />
              <span className="text-[12px] font-medium text-sahara">EN ATTENTE — AGENT GOV</span>
            </div>
          </motion.div>
        )}

        {/* VERIFIED */}
        {status === "VERIFIED" && (
          <motion.div key="verified" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="flex w-full max-w-sm flex-col gap-5">
            {/* Passport card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-atlas via-atlas to-atlas-dark p-6 shadow-card">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Royaume du Maroc</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white/70">PASSEPORT</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                  <BadgeCheck className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <p className="font-display text-2xl font-bold text-white">{citizenName}</p>
                <p className="mt-1 font-mono text-[13px] text-white/60">MA-2024-887734</p>
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Expire</p>
                  <p className="font-mono text-[13px] font-medium text-white/80">2034-06-15</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                  <span className="text-[11px] font-bold text-white">VÉRIFIÉ</span>
                </div>
              </div>
            </div>

            {/* Share code */}
            <div className="rounded-3xl border border-charcoal/[0.06] bg-white/70 px-6 py-6 shadow-card backdrop-blur-xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/35">Code de Partage</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[38px] font-bold tracking-[0.12em] text-charcoal">
                  {shareCode.slice(0, 3)}<span className="text-charcoal/20">-</span>{shareCode.slice(3)}
                </span>
                <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handleCopy}
                  className={`flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-[12px] font-semibold transition-colors ${copied ? "bg-atlas/10 text-atlas" : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"}`}>
                  {copied ? <><Check className="h-3.5 w-3.5" />Copié</> : <><Copy className="h-3.5 w-3.5" />Copier</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* SHARED */}
        {status === "SHARED" && (
          <motion.div key="shared" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-card">
            <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
            <h2 className="font-display text-lg font-semibold text-emerald-800">Accès Autorisé</h2>
            <p className="mt-2 text-[13px] text-emerald-600/70">
              Vos documents ont été partagés de manière sécurisée avec le tiers vérifié.
            </p>
          </motion.div>
        )}

      </AnimatePresence>

      {/* PENDING_CONSENT — full-screen overlay */}
      <AnimatePresence>
        {status === "PENDING_CONSENT" && (
          <motion.div
            key="consent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-yellow-50/95 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-sm rounded-3xl border-4 border-yellow-500 bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="font-display text-xl font-bold text-charcoal">Demande d'Accès Tiers</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-charcoal/60">
                Un tiers vérifié demande l'accès à vos documents d'identité via E-Beztami.
                Autorisez-vous cet accès ?
              </p>
              <div className="mt-3 rounded-xl bg-yellow-50 px-4 py-3">
                <p className="text-[12px] font-medium text-yellow-700">
                  ⚠️ Vérifiez l'identité du demandeur avant d'autoriser.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={citizenAuthorize}
                className="mt-6 w-full rounded-2xl bg-atlas py-4 font-display text-[15px] font-bold text-white shadow-ambient"
              >
                Autoriser l'accès numérique
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
