import { axiosConfig } from "./axios.config";
import type { ApiResponse } from "../types/api";
import type { FacilityProgramsResponseDTO } from "../types/facilityTypes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/** 주변 체육시설 조회 API */
export async function getNearbyFacilities(lat: number, lng: number) {
  const response = await fetch(`${BASE_URL}/api/facility/nearby`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
    }),
  });

  if (!response.ok) {
    throw new Error("체육시설 조회 실패");
  }

  return response.json();
}
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
   3. 체육 시설 프로그램 가져오는 API
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
