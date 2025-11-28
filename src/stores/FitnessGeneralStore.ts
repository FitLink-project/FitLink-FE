import { create } from "zustand";
import type { FitnessGeneralRequest } from "../types/fitness";

interface FitnessGeneralStore {
  formData: FitnessGeneralRequest;
  setFormData: (data: Partial<FitnessGeneralRequest>) => void;
}

export const useFitnessKookminStore = create<FitnessGeneralStore>((set) => ({
  formData: {
    gender: "M",
    birthDate: "",
    height: null,
    weight: null,
    sliderStrength: null,
    sliderAgility: null,
    sliderPower: null,
    ymcaStepTest: null,
    sitAndReach: null,
    sitUp: null,
    crossSitUp: null,
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
