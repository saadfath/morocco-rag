"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import {
  EDUCATION_DATA,
  HEALTHCARE_DATA,
  WORKLOAD_DATA,
  AI_RECOMMENDATIONS,
} from "@/lib/smartgov-data";
import { GlassPanel, SectionHeader } from "./GlassPanel";

const chartTooltipStyle = {
  contentStyle: {
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    fontSize: "11px",
  },
  labelStyle: { color: "#F9FAFB" },
};

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/[0.04] bg-gov-bg/50 p-3">
      <p className="mb-3 text-[11px] font-medium text-gov-muted">{title}</p>
      <div className="h-[160px]">{children}</div>
    </div>
  );
}

export function PolicyEngine() {
  return (
    <GlassPanel delay={0.25} className="p-5">
      <SectionHeader
        title="Prédictions Stratégiques IA"
        subtitle="Moteur de politique publique prédictive"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Demande éducative future">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={EDUCATION_DATA}>
              <defs>
                <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#006233" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#006233" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="demand" stroke="#006233" fill="url(#demandGrad)" strokeWidth={2} name="Demande" />
              <Line type="monotone" dataKey="capacity" stroke="#D4A017" strokeWidth={2} dot={false} name="Capacité" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Prévision demande santé">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HEALTHCARE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="consultations" stroke="#006233" strokeWidth={2} dot={{ r: 3, fill: "#006233" }} name="Consultations" />
              <Line type="monotone" dataKey="forecast" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Prévision" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Charge administrative (automatisation)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WORKLOAD_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar dataKey="auto" stackId="a" fill="#006233" name="Automatisé %" radius={[0, 0, 0, 0]} />
              <Bar dataKey="manual" stackId="a" fill="#C1272D" name="Manuel %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4 space-y-2">
        {AI_RECOMMENDATIONS.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-start gap-3 rounded-lg border border-sahara/20 bg-sahara/5 p-3"
          >
            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-sahara" />
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-sahara">
                Recommandation IA
              </span>
              <p className="mt-0.5 text-sm text-gov-text">{rec}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
