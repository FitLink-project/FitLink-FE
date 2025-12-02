import type { AIPrescriptionResponse } from "../../types/aiPrescription";

interface PrescriptionResultProps {
  data: AIPrescriptionResponse | null;
}

const PrescriptionResult = ({ data }: PrescriptionResultProps) => {
  if (!data) return null;

  // 렌더링을 위한 데이터 구조화
  const steps = [
    {
      id: "warmup",
      title: "준비운동",
      items: data.warmup,
      dotColor: "border-blue-200", // 연한 파랑
      ringColor: "bg-blue-50",
    },
    {
      id: "main",
      title: "본운동",
      items: data.mainExercise,
      dotColor: "border-blue-400", // 중간 파랑
      ringColor: "bg-blue-100",
    },
    {
      id: "cooldown",
      title: "정리운동",
      items: data.cooldown,
      dotColor: "border-blue-600", // 진한 파랑
      ringColor: "bg-blue-200",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex flex-col space-y-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4 relative">
            {/* 타임라인 영역 (왼쪽) */}
            <div className="flex flex-col items-center">
              {/* 원형 인디케이터 */}
              <div
                className={`z-10 w-6 h-6 rounded-full border-4 bg-white flex-shrink-0 ${step.dotColor}`}
              />
              {/* 점선 (마지막 아이템이 아니면 표시) */}
              {index !== steps.length - 1 && (
                <div className="h-full w-0 border-l-2 border-dashed border-gray-300 absolute top-6 left-3 -ml-[1px]" />
              )}
            </div>

            {/* 카드 영역 (오른쪽) */}
            <div className="flex-1 pb-8">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 shadow-[0_4px_20px_rgba(59,130,246,0.1)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.items && step.items.length > 0
                    ? step.items.join(", ")
                    : "추천 운동이 없습니다."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionResult;
