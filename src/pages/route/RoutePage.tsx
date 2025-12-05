import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../../components/BottomBar";
import BackIcon from "../../assets/Icon/Back-Default.png";
import RouteMapContainer from "../../components/RouteMapContainer";
import RouteDetailCard from "./RouteDetailCard";
import { getRouteByType } from "../../api/facility";
import RouteDefaultIcon from "../../assets/Icon/Route-Default.png";
import RouteClickIcon from "../../assets/Icon/Route-Click.png";
import ClickLocationIcon from "../../assets/Icon/Click-Location.png";
import UserLocationIcon from "../../assets/Icon/User-Location.png";

export default function RoutePage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const originName = state?.originName || "출발지 없음";
    const destName = state?.destName || "도착지 없음";

    const userLat = state?.userLat;
    const userLng = state?.userLng;
    const destLat = state?.destLat;
    const destLng = state?.destLng;

    const [routes, setRoutes] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    /* ----------------------------
       📌 Waypoint → 상세 정보 변환
    ----------------------------*/
    function estimateDuration(instruction: string) {
        const match = instruction.match(/(\d+)m/);
        if (!match) return 1;
        const meters = Number(match[1]);
        return Math.max(1, Math.round(meters / 70)); // 70m/min 보행 기준
    }

    function convertToRouteDetail(result: any) {
        const steps = result.waypoints.map((wp: any) => ({
            mode: "walk",
            instruction: wp.description,
            duration: estimateDuration(wp.description),
        }));

        return {
            total_duration: result.duration,
            routes: steps,
        };
    }

    /* -----------------------------------------
       3종(walk/car/transit) 요청 후 duration 정렬
    ------------------------------------------*/
    useEffect(() => {
        if (!userLat || !userLng || !destLat || !destLng) return;

        async function loadAllRoutes() {
            const types = ["walk", "car", "transit"];

            const results = await Promise.all(
                types.map((t) =>
                    getRouteByType(userLat, userLng, destLat, destLng, t)
                )
            );

            const routeList = results
                .filter((r) => r?.result)
                .map((r, idx) => ({
                    type: types[idx],
                    duration: r.result.duration,
                    detail: convertToRouteDetail(r.result),
                    path: r.result.path,
                }));

            // duration 오름차순
            routeList.sort((a, b) => a.duration - b.duration);

            setRoutes(routeList);
            setSelectedIndex(0);
        }

        loadAllRoutes();
    }, [userLat, userLng, destLat, destLng]);

    const currentRoute = routes[selectedIndex];

    return (
        <div className="w-full min-h-screen bg-softWhite pb-24">
            {/* 🔙 헤더 */}
            <div className="relative w-full px-4 py-3 bg-white shadow-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                >
                    <img src={BackIcon} alt="뒤로가기" className="w-5 h-5" />
                </button>
                <div className="text-center text-base font-semibold">길찾기</div>
            </div>

            {/* 출발지 / 도착지 */}
            <div className="mx-4 mt-3 bg-white rounded-2xl shadow-md p-4">

                {/* 출발지 */}
                <div className="flex items-center gap-2 mb-4">
                    {/* 출발지 아이콘 */}
                    <img
                        src={UserLocationIcon}
                        alt="origin"
                        className="w-5 h-auto"
                        style={{ objectFit: "contain" }}
                    />

                    {/* 출발지 이름 */}
                    <p className="text-sm font-medium">{originName}</p>
                </div>
                <div className="w-full h-[1px] bg-[#E5E7EB] mb-4"></div>

                {/* 도착지 */}
                <div className="flex items-center gap-2">
                    {/* 도착지 아이콘 */}
                    <img
                        src={ClickLocationIcon}
                        alt="dest"
                        className="w-5 h-auto"
                        style={{ objectFit: "contain" }}
                    />
                    {/* 도착지 이름 */}
                    <p className="text-sm font-medium">{destName}</p>
                </div>
            </div>



            {/* ⭐ 최적 경로 버튼 */}
            <div className="flex gap-3 mx-4 mt-4">
                {routes.map((r, idx) => {
                    const isActive = selectedIndex === idx;

                    return (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`
          px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2
          ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}
        `}
                        >
                            {/* 아이콘 */}
                            <img
                                src={isActive ? RouteClickIcon : RouteDefaultIcon}
                                alt="route icon"
                                className="w-4 h-4"
                            />

                            {/* 텍스트 */}
                            최적 경로 {idx + 1}
                        </button>
                    );
                })}
            </div>

            {/* ⭐ 지도 */}
            <div className="mx-4 mt-6 h-56 rounded-xl overflow-hidden">
                <RouteMapContainer
                    user={userLat && userLng ? { lat: userLat, lng: userLng } : null}
                    destination={destLat && destLng ? { lat: destLat, lng: destLng } : null}
                    path={currentRoute?.path || []}
                />
            </div>

            {/* ⭐ 상세 경로 */}
            <div className="mt-4">
                {currentRoute && (
                    <RouteDetailCard
                        startName={originName}
                        endName={destName}
                        route={currentRoute.detail}
                    />
                )}
            </div>

            <BottomBar />
        </div>
    );
}
