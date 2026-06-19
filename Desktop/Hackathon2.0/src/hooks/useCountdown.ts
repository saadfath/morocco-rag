"use client";

import { useEffect, useState } from "react";

export function useCountdown(expiresAt: number | null) {
  const [remaining, setRemaining] = useState<string>("—");

  useEffect(() => {
    if (!expiresAt) {
      setRemaining("Sans expiration");
      return;
    }

    function tick() {
      const diff = expiresAt! - Date.now();
      if (diff <= 0) {
        setRemaining("Expiré");
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      if (days > 30) {
        setRemaining(`${days}j restants`);
      } else if (days > 0) {
        setRemaining(`${days}j ${hours}h ${minutes}m`);
      } else {
        setRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return remaining;
}
