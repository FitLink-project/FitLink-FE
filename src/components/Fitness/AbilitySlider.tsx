import { useState } from "react";
import type { ChangeEvent } from "react";

interface AbilitySliderProps {
  label?: string; // 예: 근력
  min?: number;
  max?: number;
  defaultValue?: number;
  leftLabel?: string; // 예: 약함
  centerLabel?: string; // 예: 보통
  rightLabel?: string; // 예: 강함
  onChange?: (value: number) => void;
}

export default function AbilitySlider({
  label = "근력",
  min = 0,
  max = 100,
  defaultValue = 50,
  leftLabel = "☹️",
  centerLabel = "50",
  rightLabel = "😊",
  onChange,
}: AbilitySliderProps) {
  const [value, setValue] = useState(defaultValue);

  const getPercent = () => ((value - min) / (max - min)) * 100;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="w-full">
      {/* 라벨 */}
      <h3 className="text-lg font-bold text-gray-800 mb-6">{label}</h3>

      {/* 슬라이더 영역 */}
      <div className="p-2">
        <div className="relative w-full h-8 mb-2 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          />

          {/* 트랙 배경 */}
          <div className="absolute w-full h-3 bg-graphGray rounded-full overflow-hidden z-0">
            <div
              className="h-full bg-blue-500 rounded-l-full transition-all duration-100 ease-out"
              style={{ width: `${getPercent()}%` }}
            />
          </div>

          {/* 핸들 */}
          <div
            className="absolute w-10 h-10 bg-white border-2 border-blue-200 rounded-full flex items-center justify-center text-blue-500 font-bold shadow text-sm z-10 pointer-events-none transition-all duration-100 ease-out"
            style={{
              left: `${getPercent()}%`,
              transform: "translateX(-50%)",
            }}
          >
            {value}
          </div>
        </div>
      </div>

      {/* 하단 눈금 */}
      <div className="flex justify-between text-sm text-darkGray">
        <div className="flex flex-col items-center ">
          <div className="w-[1px] h-2 bg-graphGray"></div>
          <span>{leftLabel}</span>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-[1px] h-2 bg-graphGray"></div>
          <span>25</span>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-[1px] h-2 bg-graphGray"></div>
          <span>{centerLabel}</span>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-[1px] h-2 bg-graphGray"></div>
          <span>75</span>
        </div>
        <div className="flex flex-col items-center ">
          <div className="w-[1px] h-2 bg-graphGray"></div>
          <span>{rightLabel}</span>
        </div>
      </div>
    </div>
  );
}
