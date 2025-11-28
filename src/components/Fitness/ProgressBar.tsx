interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  // 진행률 계산
  const percent = (currentStep / totalSteps) * 100;

  return (
    // 배경색 (회색)
    <div className="w-full h-1 bg-gray-200">
      {/* 채워지는 색 (파란색) & 애니메이션 */}
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
