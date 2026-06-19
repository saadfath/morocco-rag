"use client";

import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { BadgeCheck, ShieldCheck, Globe } from "lucide-react";

const CHECKS = [
  { label: "Vérifié", icon: BadgeCheck },
  { label: "Signé", icon: ShieldCheck },
  { label: "Disponible", icon: Globe },
];

export function QRVerification({
  cin,
  showChecks,
}: {
  cin: string;
  showChecks: boolean;
}) {
  const verifyUrl = `https://ebeztami.ma/verify/${cin}`;

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-atlas" />
        <span className="text-[12px] font-semibold text-atlas">
          Document vérifiable en temps réel
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="relative mx-auto w-fit"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-3xl bg-atlas/30 blur-xl"
        />

        <div className="relative rounded-2xl glass p-5 shadow-ambient ring-1 ring-atlas/10">
          <QRCode
            value={verifyUrl}
            size={180}
            level="H"
            fgColor="#111827"
            bgColor="transparent"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
          <p className="mt-3 break-all text-center font-mono text-[10px] text-charcoal/40">
            {verifyUrl}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-charcoal px-3 py-1 shadow-lg"
        >
          <ShieldCheck className="h-3 w-3 text-sahara" />
          <span className="text-[9px] font-semibold tracking-wide text-white">
            SIGNATURE NUMÉRIQUE VALIDÉE
          </span>
        </motion.div>
      </motion.div>

      {showChecks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex justify-center gap-6"
        >
          {CHECKS.map((check, i) => (
            <motion.div
              key={check.label}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
                delay: i * 0.2,
              }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-atlas/10 ring-1 ring-atlas/20">
                <check.icon className="h-5 w-5 text-atlas" />
              </div>
              <span className="text-[11px] font-semibold text-charcoal/70">
                ✓ {check.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
