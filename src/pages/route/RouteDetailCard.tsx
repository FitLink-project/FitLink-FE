import { Fragment } from "react";
import ClickLocationIcon from "../../assets/Icon/Click-Location.png";
import UserLocationIcon from "../../assets/Icon/User-Location.png";

interface RouteStep {
  mode: "walk" | "bus" | "subway";
  instruction: string;
  duration: number;
  busNumber?: string;
  stationName?: string;
}

interface RouteDetailProps {
  startName: string;
  endName: string;
  route: {
    total_duration: number;
    routes: RouteStep[];
  };
}

export default function RouteDetailCard({ startName, endName, route }: RouteDetailProps) {
  const lastIdx = route.routes.length - 1;

  return (
    <div className="px-4">
      <div className="bg-white rounded-xl shadow p-5">

        {/* 상단: 출발지 + 총 소요시간 */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-semibold flex items-center gap-2">
            {/* 출발지 아이콘 */}
            <img
              src={UserLocationIcon}
              alt="start"
              className="w-4 h-auto object-contain"
            />
            {startName}
          </span>

          <span className="text-blue-600 font-bold text-lg">
            {route.total_duration}분
          </span>
        </div>

        <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

        {/* 중간 경로 상세 설명 */}
        <div className="flex flex-col">
          {route.routes.map((step, idx) => {
            const isMiddle = idx !== 0 && idx !== lastIdx;

            return (
              <Fragment key={idx}>
                <div className="flex gap-3 items-start relative">

                  {/* Timeline 왼쪽 라인 + 점 */}
                  <div className="flex flex-col items-center">
                    <div className="w-[2px] h-4 bg-gray-300"></div>

                    {/* 중간 스텝 점 */}
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isMiddle ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    ></div>

                    <div className="w-[2px] h-6 bg-gray-300"></div>
                  </div>

                  {/* 경로 안내 텍스트 */}
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-700">{step.instruction}</p>
                    <p className="text-xs text-gray-500 mt-1">{step.duration}분</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>

        {/* 도착지 */}
        <div className="flex gap-2 items-center mt-1">

          {/* 도착 아이콘 */}
          <img
            src={ClickLocationIcon}
            alt="end"
            className="w-4 h-auto object-contain"
          />

          <p className="text-sm font-semibold leading-none text-gray-800">
            {endName}
          </p>
        </div>

      </div>
    </div>
  );
}
