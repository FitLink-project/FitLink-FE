import axios from "axios";

export async function getNearbyFacilities(lat: number, lng: number) {
  try {
    const res = await axios.post("/api/facility/nearby", {
      latitude: lat,
      longitude: lng,
    });

    return res.data.result;  
  } catch (err) {
    console.error("getNearbyFacilities error:", err);
    return [];
  }
}
