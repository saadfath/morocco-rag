"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Loader2, Check } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function PDFExportButton({
  visible,
  targetId,
}: {
  visible: boolean;
  targetId: string;
}) {
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");

  async function handleExport() {
    const el = document.getElementById(targetId);
    if (!el || status !== "idle") return;

    setStatus("generating");

    try {
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
        onclone: (clonedDoc) => {
          const clone = clonedDoc.getElementById(targetId);
          if (clone) clone.style.transform = "none";
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const yOffset = Math.max(margin, (pageHeight - imgHeight) / 2);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 98, 51);
      pdf.text("EBeztami — Document Officiel Numérique", margin, 10);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100);
      pdf.text(
        `Généré le ${new Date().toLocaleDateString("fr-MA")}`,
        margin,
        15
      );

      pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);

      pdf.setFontSize(7);
      pdf.setTextColor(150);
      pdf.text(
        "Ce document est vérifiable sur https://ebeztami.ma/verify",
        margin,
        pageHeight - 8
      );

      pdf.save("EBeztami_Extrait_Naissance_Mounir_El_Alaoui.pdf");
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setStatus("idle");
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-x-0 bottom-8 z-40 flex justify-center px-5"
        >
          <motion.button
            onClick={handleExport}
            disabled={status === "generating"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-14 items-center gap-3 rounded-full bg-atlas px-8 font-display text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(0,98,51,0.35)] disabled:opacity-80"
          >
            {status === "generating" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Génération du PDF...
              </>
            ) : status === "done" ? (
              <>
                <Check className="h-5 w-5" />
                PDF téléchargé !
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Télécharger le PDF officiel
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
