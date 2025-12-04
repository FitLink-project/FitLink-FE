import { StrengthGraphItem } from "./StrengthGraphItem";

export function StrengthGraphCard() {
  return (
    <div className="w-full blur-[1.5px]">
      <div className="flex flex-col items-center gap-5">
        {/* 상단 문구 */}
        <div className="w-full flex flex-col items-center relative">
          <div className="w-[101px] h-[10px] bg-red opacity-35 mb-3 absolute top-[10px] left-[100px]" />
          <p className="text-base font-semibold text-softBlack font-pretendard leading-[150%] text-center">
            O0~OO 평균에 비해
            <br />
            <span className="text-main">??</span>이 부족해요
          </p>
        </div>

        {/* 그래프 리스트 */}
        <div className="w-[320px] flex flex-col gap-3 mt-[0px]">
          <StrengthGraphItem
            label="근력"
            valueText="151"
            userScr={151}
            avgScr={130}
            totalWidth={220}
            highlight
          />
          <StrengthGraphItem
            label="근지구력"
            valueText="191"
            userScr={191}
            avgScr={210}
            totalWidth={220}
          />
        </div>
      </div>
    </div>
  );
}
