import { create } from "zustand";
import type { FitnessKookminRequest } from "../types/fitness";

interface FitnessKookminStore {
  formData: FitnessKookminRequest;
  setFormData: (data: Partial<FitnessKookminRequest>) => void;
}

export const useFitnessKookminStore = create<FitnessKookminStore>((set) => ({
  formData: {
    gender: "M",
    birthDate: "",
    height: null,
    weight: null,
    gripStrength: null,
    shuttleRun: null,
    sprint: null,
    standingLongJump: null,
    sitAndReach: null,
    sitUp: null,
    crossSitUp: null,
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
