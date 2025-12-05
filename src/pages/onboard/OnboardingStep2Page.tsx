// src/pages/onboard/OnboardingStep2Page.tsx
import { useNavigate } from "react-router-dom";
import step2Top from "../../assets/onboarding/step2-top.png";
import step2Illust from "../../assets/onboarding/step2-illust.png";
import Button from "../../components/Button";

const renderWithBr = (text: string) =>
  text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

export default function OnboardingStep2Page() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col px-4 pt-12 pb-8 bg-gradient-to-b from-[#F9FAFB] to-[#E3EFFF]">
      <div className="flex justify-center mb-8">
        <img src={step2Top} alt="onboarding indicator" className="w-[120px] h-auto" />
      </div>

      <div className="flex justify-center mb-10">
        <img src={step2Illust} alt="onboarding illust" className="w-[260px] h-auto" />
      </div>

      <div className="text-center px-4 mb-8">
        <h1 className="font-semibold text-[20px] leading-[1.6] text-[#18181B] mb-4">
          {renderWithBr("내 주변에는 어떤 운동 기회가 있을까?")}
        </h1>
        <p className="font-medium text-[14px] leading-[1.8] text-black/60">
          {renderWithBr(
            "주변시설 기능으로 가까운 공공체육시설과\n운영 프로그램, 최적 경로까지 한눈에 확인해 보세요."
          )}
        </p>
      </div>

      <div className="mt-auto">
        <Button onClick={() => navigate("/onboarding/3")}>다음</Button>
      </div>
    </div>
  );
}
