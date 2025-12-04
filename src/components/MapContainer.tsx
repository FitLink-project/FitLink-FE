import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

interface MapContainerProps {
  center: { lat: number; lng: number };
  facilities?: any[];
  selectedFacility?: any | null;
  onSelectFacility?: (facility: any) => void;
}

export default function MapContainer({
  center,
  facilities = [],
  selectedFacility = null,
  onSelectFacility = () => {},
}: MapContainerProps) {
  const mapRef = useRef<any>(null);

  const userMarkerRef = useRef<any>(null);
  const facilityMarkersRef = useRef<any[]>([]);
  const selectedMarkerRef = useRef<any>(null);

  const initializedRef = useRef(false);

  /* -------------------------
     지도 초기화
  --------------------------*/
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const waitForTmap = () => {
      const el = document.getElementById("mapDiv");

      if (!window.Tmapv3 || !el) {
        setTimeout(waitForTmap, 80);
        return;
      }

      const map = new window.Tmapv3.Map("mapDiv", {
        center: new window.Tmapv3.LatLng(center.lat, center.lng),
        width: "100%",
        height: "100%",
        zoom: 16,
      });

      mapRef.current = map;
    };

    waitForTmap();
  }, []);

  /* -------------------------
     center 변경 시 지도 중심 이동 + 사용자 위치 마커 갱신
  --------------------------*/
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setCenter(new window.Tmapv3.LatLng(center.lat, center.lng));

    // 기존 사용자 마커 제거
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }

    // 새 사용자 위치 마커
    userMarkerRef.current = new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(center.lat, center.lng),
      map: mapRef.current,
      color: "#FF9B3D", // 🔶 사용자 현재 위치
    });
  }, [center]);

  /* -------------------------
     공공시설 마커
  --------------------------*/
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 제거
    facilityMarkersRef.current.forEach((m) => m.setMap(null));
    facilityMarkersRef.current = [];

    facilities.forEach((f) => {
      const marker = new window.Tmapv3.Marker({
        position: new window.Tmapv3.LatLng(f.latitude, f.longitude),
        map: mapRef.current,
        color: "#3C7DFF", // 🔵 체육시설
      });

      marker.on("click", () => onSelectFacility(f));

      facilityMarkersRef.current.push(marker);
    });
  }, [facilities]);

  /* -------------------------
     선택된 시설 마커
  --------------------------*/
  useEffect(() => {
    if (!mapRef.current || !selectedFacility) return;

    const pos = new window.Tmapv3.LatLng(
      selectedFacility.latitude,
      selectedFacility.longitude
    );

    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
    }

    selectedMarkerRef.current = new window.Tmapv3.Marker({
      position: pos,
      map: mapRef.current,
      color: "#EB4E48", // 🔴 선택된 시설
    });

    mapRef.current.setCenter(pos);
  }, [selectedFacility]);

  return <div id="mapDiv" style={{ width: "100%", height: "100%" }} />;
}
