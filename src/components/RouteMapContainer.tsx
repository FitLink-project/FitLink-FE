import { useEffect, useRef } from "react";

declare global {
    interface Window {
        Tmapv3: any;
    }
}

interface RouteMapContainerProps {
    user: { lat: number; lng: number } | null;
    destination: { lat: number; lng: number } | null;
    path?: number[][];
}

export default function RouteMapContainer({
    user,
    destination,
    path = [],
}: RouteMapContainerProps) {
    const mapRef = useRef<any>(null);
    const userMarkerRef = useRef<any>(null);
    const destMarkerRef = useRef<any>(null);
    const polylineRef = useRef<any>(null);
    const initializedRef = useRef(false);

    /* -----------------------------
        1) 지도 초기화
    ------------------------------ */
    useEffect(() => {
        if (!user || !destination) return;
        if (initializedRef.current) return;
        initializedRef.current = true;

        const waitForTmap = () => {
            const el = document.getElementById("routeMapDiv");

            if (!window.Tmapv3 || !el) {
                setTimeout(waitForTmap, 50);
                return;
            }

            const map = new window.Tmapv3.Map("routeMapDiv", {
                center: new window.Tmapv3.LatLng(user.lat, user.lng),
                width: "100%",
                height: "100%",
                zoom: 15,
            });

            mapRef.current = map;
        };

        waitForTmap();
    }, [user, destination]);

    /* -----------------------------
        2) 사용자 마커
    ------------------------------ */
    useEffect(() => {
        if (!mapRef.current || !user) return;

        if (userMarkerRef.current) userMarkerRef.current.setMap(null);

        userMarkerRef.current = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(user.lat, user.lng),
            map: mapRef.current,
            color: "#FF9B3D", // 🟧 정상적으로 적용됨
        });
    }, [user]);

    /* -----------------------------
        3) 목적지 마커
    ------------------------------ */
    useEffect(() => {
        if (!mapRef.current || !destination) return;

        if (destMarkerRef.current) destMarkerRef.current.setMap(null);

        destMarkerRef.current = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(destination.lat, destination.lng),
            map: mapRef.current,
            color: "#EB4E48", // 🔴 정상적으로 적용됨
        });
    }, [destination]);

    /* -----------------------------
        4) Polyline
    ------------------------------ */
    useEffect(() => {
        if (!mapRef.current || !path || path.length === 0 || !user) return;

        if (polylineRef.current) polylineRef.current.setMap(null);

        const linePath = path.map(([lat, lng]) => new window.Tmapv3.LatLng(lat, lng));

        polylineRef.current = new window.Tmapv3.Polyline({
            path: linePath,
            strokeColor: "#3A7BFF",
            strokeWeight: 5,
            map: mapRef.current,
        });

        // 출발지(사용자 위치) 기준으로 카메라 이동
        mapRef.current.setCenter(new window.Tmapv3.LatLng(user.lat, user.lng));
        mapRef.current.setZoom(15); // 원하면 zoom 조절 가능
    }, [path, user]);

    return <div id="routeMapDiv" style={{ width: "100%", height: "100%" }} />;
}
