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

export interface FacilityProgramsResponseDTO {
  facilityId: number;
  facilityName: string;
  address: string;
  homepage: string;
  programs: ProgramInfoDTO[];
}

export interface ProgramInfoDTO {
  programId: number;
  name: string;
  target: string;
  days: string; // 예: "월, 화 | 수, 목"
  time: string;
  capacity: number;
  price: number;
}
