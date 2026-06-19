"use client";

import { TopNav } from "./TopNav";
import { DataParticles } from "./DataParticles";
import { KPIScorecard } from "./KPIScorecard";
import { DigitalTwinMap } from "./DigitalTwinMap";
import { PolicyEngine } from "./PolicyEngine";
import { FraudDetectionTable } from "./FraudDetectionTable";
import { SmartGovCopilot } from "./SmartGovCopilot";
import { ActivityFeed } from "./ActivityFeed";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { SectionHeader } from "./GlassPanel";

export function SmartGovDashboard() {
  return (
    <div className="relative min-h-screen bg-gov-bg text-gov-text">
      <DataParticles />
      <TopNav />

      <main className="mx-auto max-w-[1920px] space-y-6 px-6 py-6">
        {/* Section 1 — KPI Scorecard */}
        <section>
          <SectionHeader
            title="Scorecard d'Impact National IA"
            subtitle="Indicateurs clés de performance · Temps réel"
          />
          <KPIScorecard />
        </section>

        {/* Section 2 + 6 — Map + Activity Feed */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DigitalTwinMap />
          </div>
          <div className="min-h-[480px]">
            <ActivityFeed />
          </div>
        </div>

        {/* Section 3 — Policy Engine */}
        <PolicyEngine />

        {/* Section 5 — SmartGov AI Copilot */}
        <section>
          <SmartGovCopilot />
        </section>

        {/* Section 4 — Fraud Detection */}
        <FraudDetectionTable />

        {/* Section 7 — Executive Summary */}
        <ExecutiveSummary />
      </main>
    </div>
  );
}
