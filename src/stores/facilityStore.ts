import { create } from "zustand";
import { getNearbyFacilities } from "../api/facility";

interface FacilityStore {
  facilities: any[];
  fetchFacilities: (lat: number, lng: number) => Promise<void>;
}

export const useFacilityStore = create<FacilityStore>((set) => ({
  facilities: [],

  fetchFacilities: async (lat, lng) => {
    const data = await getNearbyFacilities(lat, lng);
    set({ facilities: data.result.facilities });
  },
}));
