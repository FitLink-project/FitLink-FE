// src/pages/onboard/OnboardingStep3Page.tsx
import { useNavigate } from "react-router-dom";
import step3Top from "../../assets/onboarding/step3-top.png";
import step3Illust from "../../assets/onboarding/step3-illust.png";
import Button from "../../components/Button";

const renderWithBr = (text: string) =>
  text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

export default function OnboardingStep3Page() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem("hasOnboarded", "true");
    navigate("/login");
  };

  const handleStartWithoutLogin = () => {
    // 온보딩 여부는 그대로 true 처리할지, 안 할지는 기획에 맞게 선택
    localStorage.setItem("hasOnboarded", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col px-4 pt-12 pb-8 bg-gradient-to-b from-[#E3EFFF] to-[#F9FAFB]">
      <div className="flex justify-center mb-8">
        <img src={step3Top} alt="onboarding indicator" className="w-[67px] h-[22px]" />
      </div>

      <div className="flex justify-center mb-10">
        <img src={step3Illust} alt="onboarding illust" className="w-[303px] h-[267px] mt-[20px] mb-[20px]" />
      </div>

      <div className="text-center px-4 mb-8">
        <h1 className="font-semibold text-[20px] leading-[1.6] text-[#18181B] mb-4">
          {renderWithBr("내 체력 상태와 맞춤 운동은?")}
        </h1>
        <p className="font-medium text-[14px] leading-[1.8] text-black/60">
          {renderWithBr(
            "간단 체력측정 또는 국민체력 100을 기반으로\n분석 결과를 확인하고, 맞춤 운동 추천까지 받아보세요."
          )}
        </p>
      </div>
      <div className="mt-[20px] flex justify-center items-center">
        <Button onClick={handleStart}>시작하기</Button>
      </div>
              <button
          type="button"
          onClick={handleStartWithoutLogin}
          className="text-[14px] font-medium underline mt-[10px]"
          style={{ color: "#888888" }}
        >
          로그인 없이 시작하기
        </button>
    </div>
  );
}
