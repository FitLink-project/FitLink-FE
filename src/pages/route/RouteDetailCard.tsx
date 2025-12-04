// src/pages/route/RouteDetailCard.tsx
import { Fragment } from "react";

interface RouteStep {
  mode: "walk" | "subway" | "bus";
  instruction: string;
  duration: number;
}

interface RouteDetailProps {
  route: {
    total_duration: number;
    routes: RouteStep[];
  };
}

export default function RouteDetailCard({ route }: RouteDetailProps) {
  return (
    <div className="px-4">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-base">상세 경로</h3>
          <span className="text-blue-600 font-bold">
            {route.total_duration}분
          </span>
        </div>

        {/* 스텝 리스트 */}
        <div className="flex flex-col gap-4">
          {route.routes.map((step, idx) => (
            <Fragment key={idx}>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 mt-1 rounded-full bg-gray-400"></div>

                <div>
                  <p className="font-medium text-sm">{step.instruction}</p>
                  <p className="text-xs text-gray-500">{step.duration}분 소요</p>
                </div>
              </div>

              {idx !== route.routes.length - 1 && (
                <div className="border-l ml-[5px] h-6 border-gray-300" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
