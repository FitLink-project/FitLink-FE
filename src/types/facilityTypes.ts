// src/types/facilityTypes.ts

export interface Facility {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number; // 선택적
}
