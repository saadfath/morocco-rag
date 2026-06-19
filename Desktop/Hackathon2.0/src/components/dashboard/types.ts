export type DocumentStatus =
  | "verified"
  | "expiring"
  | "expired"
  | "pending";

export type DocumentCategoryId =
  | "administrative"
  | "academic"
  | "professional"
  | "health"
  | "property"
  | "transport"
  | "legal";

export interface DocumentCategory {
  id: DocumentCategoryId;
  name: string;
  emoji: string;
  documentCount: number;
  verificationPercent: number;
  lastUpdated: string;
  gradient: string;
  accent: string;
}

export interface WalletDocument {
  id: string;
  categoryId: DocumentCategoryId;
  name: string;
  status: DocumentStatus;
  issuingAuthority: string;
  issueDate: string;
  expirationDate: string | null;
  expiresAt: number | null;
  previewColor: string;
}

export type ValidationState = "pending-review" | "approved" | "rejected";

export type ScanPhase =
  | "camera"
  | "ocr"
  | "validation"
  | "complete";

export type UploadState = "idle" | "dragging" | "processing" | "success";

export interface AISuggestion {
  id: string;
  type: "renew" | "missing" | "procedure" | "request";
  title: string;
  description: string;
  action: string;
  priority: "high" | "medium" | "low";
}

export const STATUS_CONFIG: Record<
  DocumentStatus,
  { label: string; emoji: string; color: string; bg: string }
> = {
  verified: {
    label: "Vérifié",
    emoji: "🟢",
    color: "text-atlas",
    bg: "bg-atlas/10",
  },
  expiring: {
    label: "Expire bientôt",
    emoji: "🟡",
    color: "text-sahara",
    bg: "bg-sahara/15",
  },
  expired: {
    label: "Expiré",
    emoji: "🔴",
    color: "text-moroccan",
    bg: "bg-moroccan/10",
  },
  pending: {
    label: "En validation",
    emoji: "🔵",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
};
