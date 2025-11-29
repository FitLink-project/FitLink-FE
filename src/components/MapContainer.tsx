import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

interface MapContainerProps {
  center: { lat: number; lng: number };
  facilities?: {
    latitude: number;
    longitude: number;
    facility_id: number;
    facility_name: string;
  }[];
}

export default function MapContainer({
  center = { lat: 37.5665, lng: 126.978 },
  facilities = [],
}: MapContainerProps) {
  const mapRef = useRef<any>(null); // map 저장
  const markersRef = useRef<any[]>([]); // 마커 저장해서 cleanup 가능

  useEffect(() => {
    // Tmapv3가 로딩될 때까지 기다림
    const timer = setInterval(() => {
      if (window.Tmapv3) {
        clearInterval(timer);

        const map = new window.Tmapv3.Map("mapDiv", {
          center: new window.Tmapv3.LatLng(center.lat, center.lng),
          width: "100%",
          height: "100%",
          zoom: 16,
        });

        mapRef.current = map;
      }
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // ↳ 중심 이동
  useEffect(() => {
    if (!mapRef.current) return;

    const pos = new window.Tmapv3.LatLng(center.lat, center.lng);
    mapRef.current.setCenter(pos);

    // 현재 위치 표시용 마커
    new window.Tmapv3.Marker({
      position: pos,
      map: mapRef.current,
    });
  }, [center]);

  // ↳ 체육시설 마커 표시
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 삭제
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    facilities.forEach((f) => {
      const marker = new window.Tmapv3.Marker({
        position: new window.Tmapv3.LatLng(f.latitude, f.longitude),
        map: mapRef.current,
      });

      markersRef.current.push(marker);
    });
  }, [facilities]);

  return (
    <div
      id="mapDiv"
      style={{ width: "100%", height: "100%", background: "#eee" }}
    />
  );
}
