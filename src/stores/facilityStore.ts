import { create } from "zustand";
import type { Facility } from "../types/facilityTypes";

interface Location {
  lat: number;
  lng: number;
}

interface FacilityStore {
  currentLocation: Location | null;
  facilities: Facility[];
  setCurrentLocation: (loc: Location) => void;
  setFacilities: (list: Facility[]) => void;
}

export const useFacilityStore = create<FacilityStore>((set) => ({
  currentLocation: null,
  facilities: [],

  setCurrentLocation: (loc) => set({ currentLocation: loc }),
  setFacilities: (list) => set({ facilities: list }),
}));
