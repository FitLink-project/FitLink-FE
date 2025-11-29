interface StrengthGraphItemProps {
  label: string;
  valueText: string;
  filledWidth: number;   // 채워진 바 길이(px)
  totalWidth?: number;   // 전체 바 길이(px)
  highlight?: boolean;   // 메인 지표인지
}

export function StrengthGraphItem({
  label,
  valueText,
  filledWidth,
  totalWidth = 240,
  highlight = false,
}: StrengthGraphItemProps) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* 지표 이름 */}
      <div className="text-sm font-semibold font-pretendard leading-[150%] text-left w-[50px]">
        <span className={highlight ? "text-main" : "text-gray" }>{label}</span>
      </div>

      {/* 그래프 바 */}
      <div className="flex-1 flex flex-col gap-3 relative mx-3">
        <div className="relative h-[14px]">
          <div
            className="absolute inset-0 bg-lineGray opacity-60 rounded-full"
            style={{ width: totalWidth }}
          />
          <div
            className={
              "absolute inset-0 rounded-full " +
              (highlight ? "bg-main" : "bg-graphBlue")
            }
            style={{ width: filledWidth }}
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
