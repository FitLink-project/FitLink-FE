import { create } from "zustand";
import type { FitnessGeneralRequest } from "../types/fitness";

interface FitnessGeneralStore {
  formData: FitnessGeneralRequest;
  setFormData: (data: Partial<FitnessGeneralRequest>) => void;
}

export const useFitnessGeneralStore = create<FitnessGeneralStore>((set) => ({
  formData: {
    sex: "M",
    birthDate: "",
    height: null,
    weight: null,
    sliderStrength: 50,
    sliderAgility: 50,
    sliderPower: 50,
    ymcaStepTest: null,
    sitAndReach: null,
    sitUp: null,
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
