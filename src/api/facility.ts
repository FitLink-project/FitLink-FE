/**
 * Facility 관련 API 모듈 (Axios 기반)
 * - 주변 체육시설 조회
 * - 통합 검색 (지하철역 + 체육시설)
 */

import { axiosConfig } from "./axios.config";

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
    const res = await axiosConfig.get(
      `/api/facility`,
      {
        params: { keyword }, // Axios 자동 encodeURIComponent 적용
      }
    );

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