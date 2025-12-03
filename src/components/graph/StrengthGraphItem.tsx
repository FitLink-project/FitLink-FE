interface StrengthGraphItemProps {
  label: string;
  valueText: string;
  userScr: number;
  avgScr: number;
  maxScore?: number;
  /** 픽셀 보정의 기본값 (기존에 고정으로 빼던 값) */
  offsetBase?: number;
  totalWidth?: number;
  highlight?: boolean;
}

export function StrengthGraphItem({
  label,
  valueText,
  userScr,
  avgScr,
  maxScore = 100,
  totalWidth = 220,
  highlight = false,
}: StrengthGraphItemProps) {
  // 비율 기반 픽셀 폭 계산
  const rawUserPixel = (userScr / maxScore) * totalWidth;
  const rawAvgPixel = (avgScr / maxScore) * totalWidth;

  // 100 이상이면 100을 빼고, 미만이면 그대로
  const userPixelWidth = rawUserPixel >= 50 ? rawUserPixel - 50 : rawUserPixel;
  const avgPixelWidth = rawAvgPixel >= 50 ? rawAvgPixel - 50 : rawAvgPixel;

  return (
    <div className="w-full flex items-center justify-between">
      {/* 지표 이름 */}
      <div className="text-xs font-pretendard leading-[150%] text-left w-[70px]">
        <span className={highlight ? "text-main" : "text-gray"}>{label}</span>
      </div>

      {/* 그래프 바 영역 */}
      <div className="flex-1 relative mx-3">
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
              left: `${
                avgPixelWidth < totalWidth ? avgPixelWidth : totalWidth
              }px`,
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
              (userPixelWidth < avgPixelWidth ? "bg-main" : "bg-graphBlue")
            }
            style={{
              width: `${
                userPixelWidth < totalWidth ? userPixelWidth : totalWidth
              }px`,
            }}
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
