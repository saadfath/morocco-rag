"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Sparkles, Bot } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WalletStats } from "@/components/dashboard/WalletStats";
import { WalletHero } from "@/components/dashboard/WalletHero";
import { ProactiveBanner } from "@/components/dashboard/ProactiveBanner";
import { CategoryGrid } from "@/components/dashboard/CategoryGrid";
import { CategoryView } from "@/components/dashboard/CategoryView";
import { DocumentModal } from "@/components/dashboard/DocumentModal";
import { ScanDocument } from "@/components/dashboard/ScanDocument";
import { GovPilot } from "@/components/dashboard/GovPilot";
import AICopilot from "@/components/AICopilot";
import { WALLET_DOCUMENTS, getWalletStats, USER } from "@/lib/wallet-data";
import type { DocumentCategory, WalletDocument } from "@/components/dashboard/types";

type Tab = "wallet" | "govpilot" | "copilot";

export function WalletDashboard() {
  const [tab, setTab] = useState<Tab>("wallet");
  const [documents, setDocuments] = useState(WALLET_DOCUMENTS);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<WalletDocument | null>(null);
  const [showScan, setShowScan] = useState(false);

  const stats = getWalletStats(documents);

  const handleApproved = useCallback((doc: WalletDocument) => {
    setDocuments((prev) => prev.some((d) => d.id === doc.id) ? prev : [...prev, doc]);
  }, []);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-warm">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-atlas/8 blur-[100px]" />
        <div className="absolute -left-24 bottom-40 h-80 w-80 rounded-full bg-sahara/8 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-moroccan/5 blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {tab === "copilot" ? (
          <motion.div
            key="copilot"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="h-[100dvh]"
          >
            <AICopilot />
          </motion.div>
        ) : tab === "govpilot" ? (
          <motion.div
            key="govpilot"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="h-[100dvh]"
          >
            <GovPilot />
          </motion.div>
        ) : (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
          >
            <div className="zellige-bg min-h-[100dvh]">
              <div className="mx-auto max-w-lg px-5 pb-36 pt-safe sm:px-6">
                <DashboardHeader />

                {!selectedCategory ? (
                  <>
                    <section className="mb-5 mt-2">
                      <div className="flex items-center gap-2">
                        <h1 className="font-display text-[26px] font-bold tracking-tight text-charcoal">
                          E-Beztami
                        </h1>
                        <span className="rounded-full bg-atlas/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-atlas">
                          2030
                        </span>
                      </div>
                      <p className="mt-1 text-[14px] text-charcoal/50">
                        Salam {USER.name.split(" ")[0]} — votre portefeuille digital national
                      </p>
                    </section>

                    <WalletHero documents={documents} onSelect={setSelectedDoc} />
                    <WalletStats total={stats.total} pending={stats.pending} expiring={stats.expiring} />
                    <ProactiveBanner onOpenAssistant={() => setTab("govpilot")} />
                    <CategoryGrid documents={documents} onSelect={setSelectedCategory} />
                  </>
                ) : (
                  <CategoryView
                    category={selectedCategory}
                    documents={documents}
                    onBack={() => setSelectedCategory(null)}
                    onSelect={setSelectedDoc}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-warm via-warm/90 to-transparent" />
        <div className="relative mx-auto flex max-w-lg gap-3 px-5 pb-8 pt-4 pointer-events-auto">
          <TabButton
            active={tab === "wallet"}
            onClick={() => setTab("wallet")}
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Portefeuille"
          />
          <TabButton
            active={tab === "govpilot"}
            onClick={() => setTab("govpilot")}
            icon={<Sparkles className="h-4 w-4" />}
            label="GovPilot"
            accent
          />
          <TabButton
            active={tab === "copilot"}
            onClick={() => setTab("copilot")}
            icon={<Bot className="h-4 w-4" />}
            label="Copilot"
          />
        </div>
      </div>

      <AnimatePresence>
        {showScan && (
          <ScanDocument onClose={() => setShowScan(false)} onApproved={handleApproved} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDoc && (
          <DocumentModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  active, onClick, icon, label, accent,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 shadow-card transition-colors ${
        active
          ? accent
            ? "bg-gradient-to-r from-atlas to-atlas-dark text-white shadow-ambient"
            : "bg-charcoal text-white"
          : "glass text-charcoal/60 hover:text-charcoal"
      }`}
    >
      {icon}
      <span className="text-[12px] font-semibold">{label}</span>
    </motion.button>
  );
}
