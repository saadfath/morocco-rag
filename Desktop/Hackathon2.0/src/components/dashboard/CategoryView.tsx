"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getDocumentsByCategory, getCategoryStats } from "@/lib/wallet-data";
import { WalletDocumentCard } from "./WalletDocumentCard";
import type { DocumentCategory, WalletDocument } from "./types";

export function CategoryView({
  category,
  documents,
  onBack,
  onSelect,
}: {
  category: DocumentCategory;
  documents: WalletDocument[];
  onBack: () => void;
  onSelect: (doc: WalletDocument) => void;
}) {
  const categoryDocs = getDocumentsByCategory(documents, category.id);
  const { count, percent } = getCategoryStats(documents, category.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-atlas"
      >
        <ArrowLeft className="h-4 w-4" />
        Portefeuille
      </button>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-ambient ring-1 ring-black/[0.04]">
          {category.emoji}
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-charcoal">
            {category.name}
          </h1>
          <p className="mt-0.5 text-sm text-charcoal/50">
            {count} documents · {percent}% vérifiés
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {categoryDocs.map((doc, i) => (
          <WalletDocumentCard
            key={doc.id}
            document={doc}
            index={i}
            onTap={() => onSelect(doc)}
          />
        ))}
      </div>
    </motion.div>
  );
}
