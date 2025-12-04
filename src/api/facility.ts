/**
 * Facility 관련 API 모듈 (Axios 기반)
 * - 주변 체육시설 조회
 * - 통합 검색 (지하철역 + 체육시설)
 */

import { axiosConfig } from "./axios.config";
import type { ApiResponse } from "../types/api";
import type { FacilityProgramsResponseDTO } from "../types/facilityTypes";

/* -------------------------------
   1. 주변 체육시설 조회 API
-------------------------------- */
export const getNearbyFacilities = async (
  latitude: number,
  longitude: number
) => {
  try {
    const res = await axiosConfig.post("/api/facility/nearby", {
      latitude,
      longitude,
    });

    return res.data; // { isSuccess, code, message, result }
  } catch (err) {
    console.error("주변 체육시설 조회 실패:", err);
    throw err;
  }
};

/* -------------------------------
   2. 통합 검색 API (지하철역 + 체육시설)
-------------------------------- */
export const searchFacilities = async (keyword: string) => {
  try {
    const res = await axiosConfig.get(`/api/facility`, {
      params: { keyword }, // Axios 자동 encodeURIComponent 적용
    });

    return res.data; // { isSuccess, code, message, result }
  } catch (err) {
    console.error("시설 검색 실패:", err);
    throw err;
  }
};

/* -------------------------------
   3. 시설 상세 조회 API
-------------------------------- */
export async function getFacilityDetail(facilityId: number) {
  const res = await axiosConfig.get(`/api/facility/${facilityId}`);
  return res.data.result;
}

/* -------------------------------
   4. 체육 시설 프로그램 가져오는 API
-------------------------------- */
export const getFacilityPrograms = async (
  facilityId: number
): Promise<ApiResponse<FacilityProgramsResponseDTO>> => {
  try {
    const res = await axiosConfig.get(`/api/facility/${facilityId}/programs`);

    return res.data;
  } catch (err) {
    console.error("체육시설 프로그램 조회 실패:", err);
    throw err;
  }
};


/* -------------------------------
  5. 경로(Route) API 3종 호출
-------------------------------- */
export const getRouteByType = async (
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  type: "walk" | "car" | "transit"
) => {
  try {
    const res = await axiosConfig.get(`/api/facility/route`, {
      params: {
        originLat, // 사용자 위치 위도
        originLng, // 사용자 위치 경도
        destLat, // 목적지 위도
        destLng, // 목적지 경도
        type,
      },
    });

    return res.data;
  } catch (err) {
    console.error(`${type} 경로 조회 실패`, err);
    return null; 
  }
};