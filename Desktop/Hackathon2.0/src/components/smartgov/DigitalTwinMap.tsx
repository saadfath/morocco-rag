"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { REGIONS } from "@/lib/smartgov-data";
import { GlassPanel, SectionHeader } from "./GlassPanel";

export function DigitalTwinMap() {
  const [activeRegion, setActiveRegion] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const regionInterval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % REGIONS.length);
    }, 4000);

    const pulseInterval = setInterval(() => {
      setPulseKey((k) => k + 1);
    }, 3000);

    return () => {
      clearInterval(regionInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const current = REGIONS[activeRegion];

  return (
    <GlassPanel delay={0.2} className="relative h-full min-h-[480px] overflow-hidden p-5">
      <SectionHeader
        title="Jumeau Numérique National"
        subtitle="Cartographie temps réel des flux administratifs"
      />

      <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/[0.06] bg-[#0a1628]">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,98,51,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,98,51,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Stylized Morocco silhouette */}
        <svg
          viewBox="0 0 100 85"
          className="absolute inset-0 h-full w-full p-6"
          fill="none"
        >
          <path
            d="M15,25 Q20,15 35,12 Q50,8 65,15 Q78,20 82,30 Q88,42 85,55 Q82,68 75,75 Q65,82 50,80 Q35,78 25,72 Q15,65 12,50 Q10,38 15,25 Z"
            fill="rgba(0,98,51,0.08)"
            stroke="rgba(0,98,51,0.3)"
            strokeWidth="0.5"
          />

          {REGIONS.map((region, i) => (
            <g key={region.id}>
              <motion.circle
                cx={region.x}
                cy={region.y}
                r={region.intensity * 12 + 4}
                fill={
                  i === activeRegion
                    ? "rgba(0,98,51,0.4)"
                    : `rgba(0,98,51,${region.intensity * 0.25})`
                }
                animate={
                  i === activeRegion
                    ? { r: [region.intensity * 12 + 4, region.intensity * 14 + 6, region.intensity * 12 + 4] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                key={`pulse-${region.id}-${pulseKey}`}
                cx={region.x}
                cy={region.y}
                r={3}
                fill={i === activeRegion ? "#006233" : "#94A3B8"}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 2 }}
              />
              <circle
                cx={region.x}
                cy={region.y}
                r={2}
                fill={i === activeRegion ? "#D4A017" : "#006233"}
              />
              <text
                x={region.x}
                y={region.y + 8}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="3"
              >
                {region.name.split("-")[0]}
              </text>
            </g>
          ))}
        </svg>

        {/* Scan line */}
        <motion.div
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas/40 to-transparent"
        />
      </div>

      {/* Floating AI alert card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="absolute bottom-6 left-6 right-6 rounded-lg border border-atlas/20 bg-gov-bg/95 p-4 backdrop-blur-xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-atlas/20">
              <Sparkles className="h-4 w-4 text-atlas-light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-sahara" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sahara">
                  Prédiction IA · {current.name}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-gov-text">
                {current.alert}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Region legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {REGIONS.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setActiveRegion(i)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
              i === activeRegion
                ? "bg-atlas/20 text-atlas-light ring-1 ring-atlas/30"
                : "bg-white/[0.04] text-gov-muted hover:text-gov-text"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}
