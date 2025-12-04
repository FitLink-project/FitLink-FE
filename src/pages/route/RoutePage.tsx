import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../../components/BottomBar";
import BackIcon from "../../assets/Icon/Back-Default.png";

export default function RoutePage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const originName = state?.originName || "출발지";
  const destName = state?.destName || "도착지";
  const routeData = state?.routeData || { total_duration: 14 };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const routeTabs = ["최적 경로 1", "최적 경로 2", "최적 경로 3"];

  return (
    <div className="w-full min-h-screen bg-softWhite pb-24">
      {/* ---------------------- 상단 헤더 ---------------------- */}
      <div className="relative w-full px-4 py-3 bg-white shadow-sm">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        >
          <img src={BackIcon} alt="뒤로가기" className="w-5 h-5" />
        </button>

        {/* 제목 */}
        <div className="text-center text-base font-semibold">길찾기</div>
      </div>

      {/* ---------------------- 출발지 / 도착지 박스 ---------------------- */}
      <div className="px-4 mt-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col gap-4">

            {/* 출발지 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="text-sm">{originName}</div>
            </div>

            {/* 점선 */}
            <div className="border-l border-dotted border-gray-300 ml-1 h-5"></div>

            {/* 도착지 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="text-sm">{destName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- 최적 경로 탭 ---------------------- */}
      <div className="flex justify-center gap-3 mt-5">
        {routeTabs.map((label, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`px-4 py-[6px] rounded-full border text-sm transition ${
              selectedIndex === index
                ? "bg-main text-white border-main"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ---------------------- 🔵 지도 placeholder ---------------------- */}
      <div className="mx-4 mt-6 h-48 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
        (지도는 나중에 연결 예정)
      </div>

      {/* ---------------------- 🔵 상세 경로 카드 ---------------------- */}
      <div className="mx-4 mt-6 bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between mb-3">
          <div className="font-semibold text-base">{originName}</div>
          <div className="text-main font-semibold text-sm">
            {routeData.total_duration}분
          </div>
        </div>

        <div className="text-sm text-gray-700 leading-[1.6]">
          도보 418m · 7분 <br />
          문화예비군입구역 승차
          <div className="mt-1 flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
              8호선
            </span>
            <span className="text-xs text-gray-500">1정거장 이동</span>
          </div>
          <br />
          왕십리나루공원하단역 하차 <br />
          도보 216m · 4분 <br />
          {destName}
        </div>
      </div>

      {/* ---------------------- 하단 네비 ---------------------- */}
      <BottomBar />
    </div>
  );
}
