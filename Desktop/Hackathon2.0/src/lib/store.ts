import { create } from "zustand";
import { persist } from "zustand/middleware";

type DocStatus = "UNUPLOADED" | "PENDING_GOV" | "VERIFIED" | "PENDING_CONSENT" | "SHARED";

interface DemoDocument {
  id: string;
  citizenName: string;
  status: DocStatus;
  shareCode: string;
}

interface DemoStore {
  demoDocument: DemoDocument;
  scanDocument: () => void;
  govApprove: () => void;
  requestVerification: (code: string) => boolean;
  citizenAuthorize: () => void;
  resetDemo: () => void;
}

const DEFAULT: DemoDocument = {
  id: "PASSPORT-001",
  citizenName: "",
  status: "UNUPLOADED",
  shareCode: "",
};

const rand6 = () => Math.floor(100000 + Math.random() * 900000).toString();

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      demoDocument: { ...DEFAULT },

      scanDocument() {
        set((s) => ({
          demoDocument: { ...s.demoDocument, status: "PENDING_GOV", citizenName: "Ahmed Alami" },
        }));
      },

      govApprove() {
        set((s) => ({
          demoDocument: { ...s.demoDocument, status: "VERIFIED", shareCode: rand6() },
        }));
      },

      requestVerification(code) {
        const { demoDocument } = get();
        if (code === demoDocument.shareCode && demoDocument.status === "VERIFIED") {
          set((s) => ({
            demoDocument: { ...s.demoDocument, status: "PENDING_CONSENT" },
          }));
          return true;
        }
        return false;
      },

      citizenAuthorize() {
        set((s) => ({
          demoDocument: { ...s.demoDocument, status: "SHARED" },
        }));
      },

      resetDemo() {
        set({ demoDocument: { ...DEFAULT } });
      },
    }),
    { name: "ebeztami_demo" }
  )
);

// Keep backward compat — old pages used usePassportStore
export const usePassportStore = useDemoStore;
