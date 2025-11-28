import { create } from "zustand";
import type { FitnessKookminRequest } from "../types/fitness";

interface FitnessKookminStore {
  formData: FitnessKookminRequest;
  setFormData: (data: Partial<FitnessKookminRequest>) => void;
}

export const useFitnessKookminStore = create<FitnessKookminStore>((set) => ({
  formData: {
    gender: "",
    birthDate: "",
    height: 0,
    weight: 0,
    grip_strength: 0,
    shuttle_run: 0,
    sprint: 0,
    standing_long_jump: 0,
    sit_and_reach: 0,
    sit_up: 0,
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
