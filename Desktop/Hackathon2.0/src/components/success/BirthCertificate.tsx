function MoroccanEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <polygon
        points="50,15 58,40 85,40 63,55 72,80 50,65 28,80 37,55 15,40 42,40"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

const FIELDS = [
  { label: "Nom complet", value: "Mounir El Alaoui" },
  { label: "CIN", value: "CD123456", mono: true },
  { label: "Date de naissance", value: "15/04/1990" },
  { label: "Lieu de naissance", value: "Rabat" },
];

export function BirthCertificate() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.06]">
      <div className="h-1.5 bg-gradient-to-r from-moroccan via-sahara to-atlas" />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
        aria-hidden
      >
        <MoroccanEmblem className="h-48 w-48" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, #006233 10px, #006233 11px)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-charcoal/[0.02]" />

      <div className="relative p-6 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-charcoal/40">
              Royaume du Maroc
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-charcoal/30">
              Ministère de l&apos;Intérieur · État Civil
            </p>
            <h2 className="mt-2 font-display text-[17px] font-bold leading-tight text-charcoal">
              Extrait d&apos;acte de naissance
            </h2>
            <p className="mt-1 text-[10px] font-medium text-atlas">
              Document numérique certifié EBeztami
            </p>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 scale-110 rounded-full bg-sahara/20 blur-md" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sahara/30 via-sahara/10 to-atlas/10 shadow-inner ring-2 ring-sahara/40">
              <MoroccanEmblem className="h-9 w-9 opacity-80" />
              <div className="absolute inset-1 rounded-full border border-dashed border-sahara/20" />
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          {FIELDS.map((field) => (
            <div
              key={field.label}
              className="border-b border-charcoal/[0.06] pb-3"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-charcoal/40">
                {field.label}
              </p>
              <p
                className={`mt-0.5 text-[15px] font-semibold text-charcoal ${
                  field.mono ? "font-mono tracking-wider" : ""
                }`}
              >
                {field.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-charcoal/35">
              Signature numérique
            </p>
            <p className="mt-1 font-mono text-[10px] text-atlas/70">
              SHA-256 · DGSN-MA-2026
            </p>
            <svg viewBox="0 0 120 30" className="mt-1 h-6 w-28 text-atlas/40">
              <path
                d="M5,20 Q30,5 55,18 T115,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-atlas/10 px-3 py-1.5">
            <span className="text-[10px] font-semibold text-atlas">
              Certifié conforme
            </span>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[9px] tracking-widest text-charcoal/25">
          EBZ-2026-ACTE-CD123456-VERIFIED
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
    </div>
  );
}
