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
  const markersRef = useRef<any[]>([]);
  const selectedMarkerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  /* 지도 초기화 */
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

  /* 현재 위치 파란 마커 */
  useEffect(() => {
    if (!mapRef.current) return;

    new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(center.lat, center.lng),
      map: mapRef.current,
      color: "#3C7DFF",
    });
  }, [center]);

  /* 시설 마커 표시 */
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    facilities.forEach((f) => {
      const marker = new window.Tmapv3.Marker({
        position: new window.Tmapv3.LatLng(f.latitude, f.longitude),
        map: mapRef.current,
        color: "#3C7DFF",
      });

      // ⭐ 마커 클릭 이벤트 추가 → 클릭하면 selectedFacility 변경됨
      marker.on("click", () => {
        onSelectFacility(f);
      });

      markersRef.current.push(marker);
    });
  }, [facilities]);

  /* 선택된 시설 빨간 마커 */
  useEffect(() => {
    if (!mapRef.current || !selectedFacility) return;

    const pos = new window.Tmapv3.LatLng(
      selectedFacility.latitude,
      selectedFacility.longitude
    );

    // 기존 빨간 마커 제거
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
    }

    // 새 빨간 마커
    const redMarker = new window.Tmapv3.Marker({
      position: pos,
      map: mapRef.current,
      color: "#EB4E48", // 빨간색
    });

    selectedMarkerRef.current = redMarker;

    mapRef.current.setCenter(pos);
  }, [selectedFacility]);

  return (
    <div id="mapDiv" style={{ width: "100%", height: "100%" }} />
  );
}
