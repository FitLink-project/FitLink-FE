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
    height: 0,
    weight: 0,
    gripStrength: 0,
    shuttleRun: 0,
    sprint: 0,
    standingLongJump: 0,
    sitAndReach: 0,
    sitUp: 0,
    crossSitUp: 0,
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
