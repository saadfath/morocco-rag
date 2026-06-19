"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getCategoriesWithStats } from "@/lib/wallet-data";
import type { DocumentCategory, WalletDocument } from "./types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export function CategoryGrid({
  documents,
  onSelect,
}: {
  documents: WalletDocument[];
  onSelect: (category: DocumentCategory) => void;
}) {
  const categories = getCategoriesWithStats(documents);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-charcoal/40">
          Mes catégories
        </h3>
        <span className="text-[11px] font-medium text-atlas">
          {categories.length} catégories
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onTap={() => onSelect(cat)}
          />
        ))}
      </motion.div>
    </section>
  );
}

function CategoryCard({
  category,
  onTap,
}: {
  category: DocumentCategory;
  onTap: () => void;
}) {
  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className="group relative w-full text-left"
    >
      <div className="relative overflow-hidden rounded-2xl glass p-4 shadow-ambient transition-shadow group-hover:shadow-card">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-moroccan via-sahara to-atlas opacity-80" />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${category.gradient}`}
        />
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-2xl shadow-sm ring-1 ring-black/[0.04]">
            {category.emoji}
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-semibold text-charcoal">
              {category.name}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-charcoal/50">
              <span className="font-medium">
                {category.documentCount} documents
              </span>
              <span className="text-charcoal/20">·</span>
              <span className="font-semibold text-atlas">
                {category.verificationPercent}% vérifiés
              </span>
            </div>
            <p className="mt-1 text-[10px] text-charcoal/35">
              Mis à jour · {category.lastUpdated}
            </p>
          </div>

          <ChevronRight className="h-5 w-5 shrink-0 text-charcoal/20 transition-colors group-hover:text-atlas/50" />
        </div>

        <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-charcoal/5">
          <div
            className={`h-full rounded-full ${category.accent} transition-all`}
            style={{ width: `${category.verificationPercent}%` }}
          />
        </div>
      </div>
    </motion.button>
  );
}
