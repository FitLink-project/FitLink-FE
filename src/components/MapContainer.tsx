import { useEffect } from "react";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

export default function MapContainer({
  center = { lat: 37.5665, lng: 126.978 },
}) {
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.Tmapv3) {
        console.log("Tmapv3 로딩 완료!");

        new window.Tmapv3.Map("mapDiv", {
          center: new window.Tmapv3.LatLng(center.lat, center.lng),
          width: "100%",
          height: "100%",
          zoom: 16,
        });

        clearInterval(timer);
      } else {
        console.log("Tmapv3 로딩 대기중…");
      }
    }, 150);

    return () => clearInterval(timer);
  }, [center]);

  return (
    <div
      id="mapDiv"
      style={{ width: "100%", height: "100%", background: "#eee" }}
    />
  );
}
