import { create } from "zustand";

import type { Period } from "../types/elderCare";

interface UIState {
  // State untuk tampilan sidebar
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // State untuk pilihan hari pada grafik aktivitas
  selectedActivityDay: string | null;
  setSelectedActivityDay: (day: string | null) => void;

  // State untuk filter periode riwayat anomali
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

export const useUIStore = create<UIState>((set) => ({
  collapsed: false,

  setCollapsed: (collapsed) => set({ collapsed }),

  toggleSidebar: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),

  selectedActivityDay: null,

  setSelectedActivityDay: (day) =>
    set({
      selectedActivityDay: day,
    }),

  selectedPeriod: "7 Hari",

  setSelectedPeriod: (period) =>
    set({
      selectedPeriod: period,
    }),
}));
