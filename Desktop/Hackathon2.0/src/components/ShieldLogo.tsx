import { Shield } from "lucide-react";

export function ShieldLogo() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-atlas/20 to-atlas/5 blur-sm" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl glass shadow-ambient">
        <Shield className="h-7 w-7 text-atlas" strokeWidth={1.5} />
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-sahara ring-2 ring-warm" />
      </div>
    </div>
  );
}
