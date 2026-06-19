"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Bell, Settings } from "lucide-react";
import { USER } from "@/lib/wallet-data";

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex items-center justify-between pb-2 pt-6"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-atlas to-atlas-dark shadow-ambient ring-2 ring-white">
            <span className="font-display text-sm font-bold text-white">
              {USER.initials}
            </span>
          </div>
          {USER.howiyatiVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sahara ring-2 ring-warm">
              <BadgeCheck className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="font-display text-[15px] font-semibold leading-tight text-charcoal">
              {USER.name}
            </h2>
          </div>
          <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-atlas/10 px-2 py-0.5">
            <BadgeCheck className="h-3 w-3 text-atlas" />
            <span className="text-[10px] font-semibold text-atlas">
              Howiyati Vérifié
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {[
          { Icon: Bell, label: "Notifications", badge: 3 },
          { Icon: Settings, label: "Paramètres" },
        ].map(({ Icon, label, badge }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={label}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl glass text-charcoal/60 transition-colors hover:text-charcoal"
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            {badge ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-moroccan text-[9px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>
    </motion.header>
  );
}
