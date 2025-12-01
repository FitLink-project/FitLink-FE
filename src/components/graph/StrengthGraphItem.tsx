interface StrengthGraphItemProps {
  label: string;
  valueText: string;
  filledWidth: number; // 점수 (0 ~ 100)
  totalWidth?: number; // 전체 바 길이 (px)
  highlight?: boolean;
  averageWidth?: number; // 평균 점수 (0 ~ 100)
}

export function StrengthGraphItem({
  label,
  valueText,
  filledWidth,
  totalWidth = 240, // 기본 길이 240px
  highlight = false,
  averageWidth,
}: StrengthGraphItemProps) {
  const MAX_SCORE = 100;

  // 1. [점수 -> 픽셀 변환]
  // filledWidth가 30이면 -> (30 / 100) * 240 = 72px
  const myPixelWidth = (filledWidth / MAX_SCORE) * totalWidth;

  // averageWidth가 70이면 -> (70 / 100) * 240 = 168px
  // 값이 없을 경우를 대비해 (averageWidth || 0) 처리를 하되, 괄호로 감싸야 함
  const avgPixelPosition = ((averageWidth || 0) / MAX_SCORE) * totalWidth;

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

          {/* 3. 평균 바 (평균 점수) */}
          <div
            className="absolute inset-y-0 left-0 rounded-full z-20 bg-red opacity-30"
            style={{
              width: `${
                avgPixelPosition < totalWidth ? averageWidth : totalWidth
              }px`,
            }}
          />

          {/* 2. 데이터 바 (내 점수) */}
          <div
            className={
              "absolute inset-y-0 left-0 rounded-full z-10 " +
              (myPixelWidth < avgPixelPosition ? "bg-main" : "bg-graphBlue")
            }
            style={{
              width: `${
                myPixelWidth < totalWidth ? myPixelWidth : totalWidth
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
