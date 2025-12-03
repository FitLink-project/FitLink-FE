// src/types/facilityTypes.ts

export interface Facility {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number; // 선택적
}

export interface FacilityDetail {
  facilityId: number;
  facilityName: string;
  address: string;
  latitude: number;
  longitude: number;
  programNames?: string[]; // 프로그램명 (2개)
  homepageUrl?: string;
}
