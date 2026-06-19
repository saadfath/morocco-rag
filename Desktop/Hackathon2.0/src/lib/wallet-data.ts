import type {
  AISuggestion,
  DocumentCategory,
  WalletDocument,
} from "@/components/dashboard/types";

const daysFromNow = (days: number) => Date.now() + days * 86400000;
const daysAgo = (days: number) => Date.now() - days * 86400000;

export const USER = {
  name: "Mounir El Alaoui",
  initials: "ME",
  howiyatiVerified: true,
  city: "Rabat",
};

export const CATEGORIES: DocumentCategory[] = [
  {
    id: "administrative",
    name: "Documents Administratifs",
    emoji: "📄",
    documentCount: 5,
    verificationPercent: 100,
    lastUpdated: "12 juin 2026",
    gradient: "from-atlas/25 via-atlas/10 to-transparent",
    accent: "bg-atlas",
  },
  {
    id: "academic",
    name: "Documents Académiques",
    emoji: "🎓",
    documentCount: 3,
    verificationPercent: 67,
    lastUpdated: "28 mai 2026",
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
    accent: "bg-blue-600",
  },
  {
    id: "professional",
    name: "Documents Professionnels",
    emoji: "💼",
    documentCount: 4,
    verificationPercent: 75,
    lastUpdated: "5 juin 2026",
    gradient: "from-violet-500/20 via-violet-400/10 to-transparent",
    accent: "bg-violet-600",
  },
  {
    id: "health",
    name: "Documents de Santé",
    emoji: "🏥",
    documentCount: 2,
    verificationPercent: 50,
    lastUpdated: "1 juin 2026",
    gradient: "from-rose-500/20 via-rose-400/10 to-transparent",
    accent: "bg-rose-500",
  },
  {
    id: "property",
    name: "Documents Immobiliers",
    emoji: "🏠",
    documentCount: 2,
    verificationPercent: 100,
    lastUpdated: "20 avr. 2026",
    gradient: "from-amber-500/20 via-amber-400/10 to-transparent",
    accent: "bg-amber-600",
  },
  {
    id: "transport",
    name: "Documents de Transport",
    emoji: "🚗",
    documentCount: 3,
    verificationPercent: 67,
    lastUpdated: "8 juin 2026",
    gradient: "from-teal-500/20 via-teal-400/10 to-transparent",
    accent: "bg-teal-600",
  },
  {
    id: "legal",
    name: "Documents Juridiques",
    emoji: "⚖",
    documentCount: 2,
    verificationPercent: 50,
    lastUpdated: "15 mai 2026",
    gradient: "from-slate-500/20 via-slate-400/10 to-transparent",
    accent: "bg-slate-600",
  },
];

export const WALLET_DOCUMENTS: WalletDocument[] = [
  {
    id: "cin",
    categoryId: "administrative",
    name: "Carte Nationale d'Identité",
    status: "verified",
    issuingAuthority: "DGSN — Direction Générale de la Sûreté Nationale",
    issueDate: "15 mars 2021",
    expirationDate: "15 mars 2031",
    expiresAt: daysFromNow(1825),
    previewColor: "from-atlas/30 to-atlas/5",
  },
  {
    id: "acte-naissance",
    categoryId: "administrative",
    name: "Acte de Naissance",
    status: "verified",
    issuingAuthority: "Ministère de l'Intérieur — État Civil",
    issueDate: "12 janv. 1995",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-sahara/25 to-sahara/5",
  },
  {
    id: "livret-famille",
    categoryId: "administrative",
    name: "Livret de Famille",
    status: "verified",
    issuingAuthority: "Adoul — Tribunal de Rabat",
    issueDate: "3 juin 2018",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-moroccan/15 to-moroccan/5",
  },
  {
    id: "cert-residence",
    categoryId: "administrative",
    name: "Certificat de Résidence",
    status: "expiring",
    issuingAuthority: "Commune de Rabat",
    issueDate: "10 juin 2025",
    expirationDate: "10 juin 2026",
    expiresAt: daysFromNow(22),
    previewColor: "from-sahara/20 to-sahara/5",
  },
  {
    id: "passeport",
    categoryId: "administrative",
    name: "Passeport Biométrique",
    status: "verified",
    issuingAuthority: "DGSN — Service des Passeports",
    issueDate: "28 fév. 2024",
    expirationDate: "28 fév. 2029",
    expiresAt: daysFromNow(1015),
    previewColor: "from-atlas/20 to-sahara/10",
  },
  {
    id: "diplome-licence",
    categoryId: "academic",
    name: "Diplôme de Licence",
    status: "verified",
    issuingAuthority: "Université Mohammed V — Rabat",
    issueDate: "15 juil. 2019",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-blue-500/20 to-blue-400/5",
  },
  {
    id: "releve-notes",
    categoryId: "academic",
    name: "Relevé de Notes Officiel",
    status: "verified",
    issuingAuthority: "Université Mohammed V — Rabat",
    issueDate: "20 juil. 2019",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-blue-400/15 to-blue-300/5",
  },
  {
    id: "attestation-equivalence",
    categoryId: "academic",
    name: "Attestation d'Équivalence",
    status: "pending",
    issuingAuthority: "ENNES — Équivalence Nationale",
    issueDate: "2 juin 2026",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-blue-600/10 to-blue-400/5",
  },
  {
    id: "attestation-travail",
    categoryId: "professional",
    name: "Attestation de Travail",
    status: "verified",
    issuingAuthority: "OCP Group — Direction RH",
    issueDate: "1 janv. 2024",
    expirationDate: "31 déc. 2026",
    expiresAt: daysFromNow(195),
    previewColor: "from-violet-500/20 to-violet-400/5",
  },
  {
    id: "cnss",
    categoryId: "professional",
    name: "Attestation CNSS",
    status: "verified",
    issuingAuthority: "CNSS — Caisse Nationale de Sécurité Sociale",
    issueDate: "1 juin 2026",
    expirationDate: "30 juin 2026",
    expiresAt: daysFromNow(12),
    previewColor: "from-violet-400/15 to-violet-300/5",
  },
  {
    id: "carte-pro",
    categoryId: "professional",
    name: "Carte Professionnelle",
    status: "expiring",
    issuingAuthority: "Ministère de l'Emploi",
    issueDate: "15 mars 2024",
    expirationDate: "15 juil. 2026",
    expiresAt: daysFromNow(27),
    previewColor: "from-violet-600/15 to-violet-400/5",
  },
  {
    id: "contrat-travail",
    categoryId: "professional",
    name: "Contrat de Travail CDI",
    status: "verified",
    issuingAuthority: "OCP Group — Direction Juridique",
    issueDate: "1 sept. 2020",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-indigo-500/15 to-indigo-400/5",
  },
  {
    id: "carte-amal",
    categoryId: "health",
    name: "Carte AMO / RAMED",
    status: "verified",
    issuingAuthority: "CNOPS — Assurance Maladie Obligatoire",
    issueDate: "1 janv. 2025",
    expirationDate: "31 déc. 2026",
    expiresAt: daysFromNow(195),
    previewColor: "from-rose-500/20 to-rose-400/5",
  },
  {
    id: "cert-vaccination",
    categoryId: "health",
    name: "Carnet de Vaccination Digital",
    status: "expired",
    issuingAuthority: "Ministère de la Santé — SI Santé",
    issueDate: "10 mars 2023",
    expirationDate: "10 mars 2025",
    expiresAt: daysAgo(101),
    previewColor: "from-rose-400/15 to-rose-300/5",
  },
  {
    id: "titre-foncier",
    categoryId: "property",
    name: "Titre Foncier",
    status: "verified",
    issuingAuthority: "ANCFCC — Conservation Foncière Rabat",
    issueDate: "5 avr. 2019",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-amber-500/20 to-amber-400/5",
  },
  {
    id: "contrat-bail",
    categoryId: "property",
    name: "Contrat de Bail",
    status: "verified",
    issuingAuthority: "Adoul — Tribunal de Rabat",
    issueDate: "1 sept. 2023",
    expirationDate: "31 août 2026",
    expiresAt: daysFromNow(74),
    previewColor: "from-amber-400/15 to-amber-300/5",
  },
  {
    id: "permis-conduire",
    categoryId: "transport",
    name: "Permis de Conduire",
    status: "expiring",
    issuingAuthority: "NARSA — Agence Nationale de Sécurité Routière",
    issueDate: "20 juin 2016",
    expirationDate: "20 juin 2026",
    expiresAt: daysFromNow(2),
    previewColor: "from-teal-500/20 to-teal-400/5",
  },
  {
    id: "carte-grise",
    categoryId: "transport",
    name: "Carte Grise",
    status: "verified",
    issuingAuthority: "NARSA — Immatriculation Véhicules",
    issueDate: "12 mars 2022",
    expirationDate: null,
    expiresAt: null,
    previewColor: "from-teal-400/15 to-teal-300/5",
  },
  {
    id: "assurance-auto",
    categoryId: "transport",
    name: "Attestation d'Assurance Auto",
    status: "expiring",
    issuingAuthority: "Wafa Assurance",
    issueDate: "1 juin 2025",
    expirationDate: "1 juil. 2026",
    expiresAt: daysFromNow(13),
    previewColor: "from-teal-600/15 to-teal-400/5",
  },
  {
    id: "casier-judiciaire",
    categoryId: "legal",
    name: "Bulletin n°3 — Casier Judiciaire",
    status: "verified",
    issuingAuthority: "Ministère de la Justice — Casier Judiciaire",
    issueDate: "10 mai 2026",
    expirationDate: "10 août 2026",
    expiresAt: daysFromNow(53),
    previewColor: "from-slate-500/20 to-slate-400/5",
  },
  {
    id: "procuration",
    categoryId: "legal",
    name: "Procuration Notariée",
    status: "pending",
    issuingAuthority: "Notaire — Étude Benjelloun, Rabat",
    issueDate: "15 mai 2026",
    expirationDate: "15 mai 2027",
    expiresAt: daysFromNow(330),
    previewColor: "from-slate-400/15 to-slate-300/5",
  },
];

export const AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: "renew-permis",
    type: "renew",
    title: "Renouveler votre permis de conduire",
    description:
      "Votre permis expire dans 2 jours. Renouvelez-le en ligne via NARSA sans vous déplacer.",
    action: "Renouveler maintenant",
    priority: "high",
  },
  {
    id: "renew-cert-residence",
    type: "renew",
    title: "Certificat de résidence à renouveler",
    description:
      "Expire le 10 juin 2026. Demandez un renouvellement auprès de la commune de Rabat.",
    action: "Lancer la procédure",
    priority: "high",
  },
  {
    id: "missing-casier",
    type: "missing",
    title: "Casier judiciaire recommandé",
    description:
      "Pour votre dossier de mobilité interne OCP, un casier judiciaire récent est requis.",
    action: "Demander le document",
    priority: "medium",
  },
  {
    id: "procedure-equivalence",
    type: "procedure",
    title: "Suivi équivalence ENNES",
    description:
      "Votre attestation d'équivalence est en cours de validation. Délai estimé : 5 jours ouvrables.",
    action: "Voir le statut",
    priority: "medium",
  },
  {
    id: "gov-request-impots",
    type: "request",
    title: "Demande DGI en attente",
    description:
      "La Direction Générale des Impôts demande votre attestation CNSS actualisée avant le 30 juin.",
    action: "Répondre à la demande",
    priority: "high",
  },
  {
    id: "renew-vaccination",
    type: "renew",
    title: "Carnet de vaccination expiré",
    description:
      "Mettez à jour votre carnet digital via le portail SI Santé du Ministère de la Santé.",
    action: "Mettre à jour",
    priority: "low",
  },
];

export function getWalletStats(documents: WalletDocument[]) {
  const total = documents.length;
  const pending = documents.filter((d) => d.status === "pending").length;
  const expiring = documents.filter((d) => d.status === "expiring").length;
  return { total, pending, expiring };
}

export function getDocumentsByCategory(
  documents: WalletDocument[],
  categoryId: string
) {
  return documents.filter((d) => d.categoryId === categoryId);
}

export function getCategoryStats(
  documents: WalletDocument[],
  categoryId: string
) {
  const docs = getDocumentsByCategory(documents, categoryId);
  const verified = docs.filter(
    (d) => d.status === "verified" || d.status === "expiring"
  ).length;
  const percent = docs.length ? Math.round((verified / docs.length) * 100) : 0;
  return { count: docs.length, percent };
}

const MONTHS_FR = [
  "janv.",
  "fév.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

export function formatLastUpdated(date: Date) {
  return `${date.getDate()} ${MONTHS_FR[date.getMonth()]} ${date.getFullYear()}`;
}

export function getCategoriesWithStats(documents: WalletDocument[]) {
  return CATEGORIES.map((cat) => {
    const docs = getDocumentsByCategory(documents, cat.id);
    const { count, percent } = getCategoryStats(documents, cat.id);
    const lastUpdated =
      docs.length > 0
        ? formatLastUpdated(new Date())
        : cat.lastUpdated;

    return {
      ...cat,
      documentCount: count,
      verificationPercent: percent,
      lastUpdated,
    };
  });
}

export const SCANNABLE_DOCUMENT: WalletDocument = {
  id: "attestation-fiscale",
  categoryId: "administrative",
  name: "Attestation de Situation Fiscale",
  status: "verified",
  issuingAuthority: "DGI — Direction Générale des Impôts",
  issueDate: "19 juin 2026",
  expirationDate: "19 déc. 2026",
  expiresAt: daysFromNow(183),
  previewColor: "from-atlas/25 to-sahara/10",
};
