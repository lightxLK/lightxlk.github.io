import { create } from "zustand";

interface VaultStore {
  isLocked: boolean;
  isMuted: boolean;
  toggleLock: () => void;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
}

export const useVaultStore = create<VaultStore>((set) => ({
  isLocked: true,
  isMuted: false, // Start unmuted, but browser will block autoplay until interaction
  toggleLock: () => set((state) => ({ isLocked: !state.isLocked })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setMuted: (muted: boolean) => set({ isMuted: muted }),
}));
