import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import ProgressBar from "../../components/Fitness/ProgressBar";
import Step1 from "./steps/kookmin/Step1";
import Step2 from "./steps/kookmin/Step2";
import Step3 from "./steps/kookmin/Step3";

export default function FitnessKookminPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 3;

  const renderForm = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          <Step1 setCurrentStep={setCurrentStep} NEXT_STEP={currentStep + 1} />
        );
      case 2:
        return (
          <Step2 setCurrentStep={setCurrentStep} NEXT_STEP={currentStep + 1} />
        );
      case 3:
        return <Step3 />;
    }
  };

  return (
    <>
      {/* 헤더 */}
      <PageHeader title="국민체력 100 결과 입력" />

      {/* 프로그레스 바 */}
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <div className="flex justify-center bg-white">
        <div className="w-full max-w-sm">
          {/* 각 단계에 맞는 입력 폼 */}
          {renderForm(currentStep)}
        </div>
      </div>

      {/* 하단 바 */}
    </>
  );
}
