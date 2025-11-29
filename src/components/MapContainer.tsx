import { useEffect } from "react";

interface MapContainerProps {
  center?: { lat: number; lng: number };
}

export default function MapContainer({
  center = { lat: 37.5665, lng: 126.978 },
}: MapContainerProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://apis.openapi.sk.com/tmap/js?version=1&appKey=${
      import.meta.env.VITE_TMAP_API_KEY
    }`;
    script.onload = () => {
      new window.Tmapv2.Map("mapDiv", {
        center: new window.Tmapv2.LatLng(center.lat, center.lng),
        width: "100%",
        height: "100%",
      });
    };

    document.head.appendChild(script);
  }, [center]);

  return <div id="mapDiv" className="w-full h-full" />;
}
