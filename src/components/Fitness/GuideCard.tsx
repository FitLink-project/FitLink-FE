interface GuideCardProps {
  title?: string;
  supplies?: string;
  steps?: string[];
  examples?: string[];
}

export default function GuideCard({
  title = "앉아윗몸앞으로굽히기 간단 측정 방법",
  supplies = "줄자 또는 막대자",
  steps = [
    "무릎을 펴고 앉아주세요",
    "발뒤꿈치 부위에 줄자의 30cm 시작점이 오도록 하여, 줄자를 양발 사이에 놓습니다",
    "무릎을 굽히지 않고 허리를 숙이며 양손을 앞으로 뻗어주세요",
    "양손이 줄자에 닿은 지점을 기록합니다",
    "기준선(30cm)을 넘으면 양수,\n기준선을 넘지 못하면 음수로 기록합니다",
  ],
  examples = [
    "ex) 실제 값: 33cm → 기록 값: 3cm",
    "ex) 실제 값: 28cm → 기록 값: -2cm",
  ],
}: GuideCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-1 mb-3">
        <h3 className="font-bold text-darkGray leading-tight">{title}</h3>
        <span className="text-xl">✨</span>
      </div>

      <div className="text-xs mb-6">
        <span className="text-secondBlue font-bold mr-2">준비물 |</span>
        <span className="text-secondBlue">{supplies}</span>
      </div>

      <div className="flex flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={index} className="flex gap-4 relative">
              <div className="flex flex-col items-center min-w-[24px]">
                <div className="w-6 h-6 rounded-full bg-secondBlue text-white text-xs font-bold flex items-center justify-center z-10 shrink-0">
                  {index + 1}
                </div>
                {!isLast && (
                  <div className="w-[2px] bg-secondBlue h-full absolute top-6 bottom-0 left-[11px] -translate-x-1/2"></div>
                )}
              </div>
              <p className="text-darkGray text-xs pb-6 leading-relaxed whitespace-pre-line break-keep">
                {step}
              </p>
            </div>
          );
        })}
      </div>

      {examples && examples.length > 0 && (
        <div className="bg-white rounded-lg p-3 text-xs text-darkGray space-y-1">
          {examples.map((ex, i) => (
            <p key={i}>{ex}</p>
          ))}
        </div>
      )}
    </div>
  );
}
