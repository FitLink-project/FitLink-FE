interface StrengthGraphItemProps {
  label: string;
  valueText: string;
  userScr: number;
  avgScr: number;
  MAX_SCORE?: number;
  totalWidth?: number;
  highlight?: boolean;
}

export function StrengthGraphItem({
  label,
  valueText,
  userScr,
  avgScr,
  totalWidth = 240,
  highlight = false,
}: StrengthGraphItemProps) {
  const MAX_SCORE = 100;

  // 값 안전 처리 (undefined/null/음수 방지)
  const safeAvgScr = typeof avgScr === "number" && avgScr >= 0 ? avgScr : 0;
  const safeUserScr = typeof userScr === "number" && userScr >= 0 ? userScr : 0;
  const safeMaxScore =
    typeof MAX_SCORE === "number" && MAX_SCORE > 0 ? MAX_SCORE : 1;

  // (값 / 기준값) * 전체 폭
  const myPixelWidth = (safeUserScr / safeMaxScore) * totalWidth;
  const avgPixelWidth = (safeAvgScr / safeMaxScore) * totalWidth;

  return (
    <div className="w-full flex items-center justify-between">
      {/* 지표 이름 */}
      <div className="text-sm font-semibold font-pretendard leading-[150%] text-left w-[50px]">
        <span className={highlight ? "text-main" : "text-gray"}>{label}</span>
      </div>

      {/* 그래프 바 영역 */}
      <div className="flex-1 flex flex-col gap-3 relative mx-3">
        {/* 바 높이 설정 */}
        <div className="relative h-[14px]">
          {/* 1. 배경 바 (회색) */}
          <div
            className="absolute inset-y-0 left-0 bg-lineGray opacity-60 rounded-full"
            style={{ width: `${totalWidth}px` }}
          />

          {/* 3. 평균 바 (평균 점수, 세로 실선) */}
          <div
            className="absolute top-0 z-20"
            style={{
              left: `${avgPixelWidth}px`,
              width: "0px",
              height: "100%",
              borderLeft: "2px dashed #ff0000",
              opacity: 0.8,
            }}
          />

          {/* 2. 데이터 바 (내 점수) */}
          <div
            className={
              "absolute inset-y-0 left-0 rounded-full z-10 " +
              (myPixelWidth < avgPixelWidth ? "bg-main" : "bg-graphBlue")
            }
            style={{ width: `${myPixelWidth}px` }}
          />
        </div>
      </div>

      {/* 수치 텍스트 */}
      <div className="flex flex-col items-center">
        <div
          className={
            "text-sm font-semibold font-pretendard leading-[150%] " +
            (highlight ? "text-main" : "text-gray")
          }
        >
          {valueText}
        </div>
      </div>
    </div>
  );
}
