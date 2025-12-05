// OnboardingStep1Page.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import step1Top from "../../assets/onboarding/step1-top.png";
import step1Illust from "../../assets/onboarding/step1-illust.png";
import Button from "../../components/Button";

const renderWithBr = (text: string) =>
  text.split("\n").map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

export default function OnboardingStep1Page() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col px-4 pt-12 pb-8 bg-gradient-to-b from-[#E3EFFF] to-[#F9FAFB]"
      initial={{ opacity: 0, y: 30 }}     // 🔽 아래에서
      animate={{ opacity: 1, y: 0 }}      // 중앙으로
      exit={{ opacity: 0, y: -30 }}       // 🔼 위로 사라지게 (원하면 유지)
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex justify-center mb-8">
        <img src={step1Top} alt="onboarding indicator" className="w-[67px] h-[22px]" />
      </div>

      <div className="flex justify-center mb-10">
        <img src={step1Illust} alt="onboarding illust" className="w-[331px] h-[235px] mt-[20px] mb-[20px]" />
      </div>

      <div className="text-center px-4 mb-8">
        <h1 className="font-semibold text-[20px] leading-[1.6] text-[#18181B] mb-4">
          {renderWithBr("운동을 시작하고 싶지만,\n어디서부터 시작해야 할지 막막한가요?")}
        </h1>
        <p className="font-medium text-[14px] leading-[1.8] text-black/60">
          {renderWithBr(
            "FitLink가 여러분의 의지와 체육시설, 체력 분석,\n맞춤 운동을 연결해 운동의 시작을 손쉽게 도와드려요."
          )}
        </p>
      </div>

      <div className="mt-[20px] flex justify-center items-center">
        <Button onClick={() => navigate("/onboarding/2")}>다음</Button>
      </div>
    </motion.div>
  );
}
