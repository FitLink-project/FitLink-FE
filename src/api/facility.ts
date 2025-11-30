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