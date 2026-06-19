import { create } from "zustand";

type PassportStatus = "UNUPLOADED" | "PENDING_REVIEW" | "VERIFIED";

interface PassportData {
  name: string;
  passportNumber: string;
  expiry: string;
}

interface PassportState {
  id: string;
  status: PassportStatus;
  data: PassportData;
  shareCode: string;
  // Actions
  uploadPassport: () => void;
  approvePassport: () => void;
  reset: () => void;
}

const STORAGE_KEY = "ebeztami_passport";

const defaultData: PassportData = {
  name: "Youssef El Mansouri",
  passportNumber: "MA-2024-887734",
  expiry: "2034-06-15",
};

function rand6(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function load(): Partial<PassportState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(state: Partial<PassportState>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Notify other tabs
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
}

const saved = load();

export const usePassportStore = create<PassportState>((set) => {
  // Cross-tab sync via storage event
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        const fresh = load();
        set({ ...fresh } as Partial<PassportState>);
      }
    });
  }

  return {
    id: (saved as PassportState).id ?? "PASSPORT-001",
    status: (saved as PassportState).status ?? "UNUPLOADED",
    data: (saved as PassportState).data ?? defaultData,
    shareCode: (saved as PassportState).shareCode ?? "",

    uploadPassport() {
      set((s) => {
        const next = { ...s, status: "PENDING_REVIEW" as PassportStatus };
        save({ id: next.id, status: next.status, data: next.data, shareCode: next.shareCode });
        return next;
      });
    },

    approvePassport() {
      set((s) => {
        const next = { ...s, status: "VERIFIED" as PassportStatus, shareCode: rand6() };
        save({ id: next.id, status: next.status, data: next.data, shareCode: next.shareCode });
        return next;
      });
    },

    reset() {
      const next = {
        id: "PASSPORT-001",
        status: "UNUPLOADED" as PassportStatus,
        data: defaultData,
        shareCode: "",
      };
      save(next);
      set(next);
    },
  };
});
