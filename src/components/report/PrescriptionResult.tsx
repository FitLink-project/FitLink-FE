import type { AIPrescriptionResponse } from "../../types/aiPrescription";

interface PrescriptionResultProps {
  data: AIPrescriptionResponse | null;
}

const PrescriptionResult = ({ data }: PrescriptionResultProps) => {
  if (!data) return null;

  const steps = [
    {
      id: "warmup",
      title: "준비운동",
      items: data.warmup,
      dotColor: "bg-white",
      borderColor: "border-blue-300",
      neon: "shadow-[0_0_8px_#60a5faAA]",
    },
    {
      id: "main",
      title: "본운동",
      items: data.mainExercise,
      dotColor: "bg-white",
      borderColor: "border-blue-400",
      neon: "shadow-[0_0_16px_#3b82f6BB]",
    },
    {
      id: "cooldown",
      title: "정리운동",
      items: data.cooldown,
      dotColor: "bg-white",
      borderColor: "border-blue-500",
      neon: "shadow-[0_0_20px_#60a5faAA]",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex flex-col relative">
        {/* 점선 타임라인 (전체 배경) */}
        <div
          className="absolute left-3 top-0 bottom-0 w-0 border-l-2 border-dashed border-blue-200"
          style={{ zIndex: 0 }}
        />

        {steps.map((step) => (
          <div key={step.id} className="flex gap-4 relative mb-6 last:mb-0">
            {/* 타임라인 영역 (왼쪽) */}
            <div
              className="flex flex-col items-center relative"
              style={{ width: "24px" }}
            >
              {/* 동그라미 인디케이터 - 카드 중앙에 위치 */}
              <div
                className={`absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 ${step.borderColor} ${step.dotColor} z-10`}
                style={{ marginLeft: "-3px" }}
              />
            </div>

            {/* 카드 (오른쪽) */}
            <div className="flex-1">
              <div
                className={`bg-white rounded-2xl px-5 py-4 ${step.neon} min-h-[80px] flex flex-col justify-center font-msplus1`}
              >
                <h3 className="text-base text-darkGray mb-2">{step.title}</h3>
                {/* 쉼표로 구분된 항목을 각각 줄바꿈 */}
                <div className="text-gray text-sm leading-relaxed">
                  {step.items && step.items.length > 0 ? (
                    step.items.map((item, i) => (
                      <span key={i}>
                        {item}
                        {i < step.items.length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    <span>추천 운동이 없습니다.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionResult;
