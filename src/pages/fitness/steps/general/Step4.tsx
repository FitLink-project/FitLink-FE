import Button from "../../../../components/Button";
import FormTitle from "../../../../components/FormTitle";
import MeasurementInput from "../../../../components/Fitness/MeasurementInput";
import { useFitnessGeneralStore } from "../../../../stores/FitnessGeneralStore";
import { useState } from "react";
import GuideCard from "../../../../components/Fitness/GuideCard";

interface StepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  NEXT_STEP: number;
}

export default function Step4({ setCurrentStep, NEXT_STEP }: StepProps) {
  const { formData, setFormData } = useFitnessGeneralStore();

  // 에러 상태
  const [errors, setErrors] = useState({
    ymcaStepTest: false,
  });

  // 에러 표시 여부
  const [showErrors, setShowErrors] = useState(false);

  // 다음 버튼 클릭
  const handleNext = () => {
    const newErrors = {
      ymcaStepTest: formData.ymcaStepTest === null,
    };

    setErrors(newErrors);
    setShowErrors(true);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    console.log(formData);
    setCurrentStep(NEXT_STEP);
  };

  // 숫자 입력 처리 함수
  const handleChange =
    (key: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value)) setFormData({ [key]: value });
    };

  return (
    <>
      <section className="my-8 px-4">
        <FormTitle
          title="스텝검사 결과를 입력해주세요"
          description="아래 설명을 참고하여 앉아윗몸앞으로굽히기를 진행해주세요"
        />
      </section>

      <form
        className="grid grid-cols-1 gap-x-4 gap-y-8 w-[345px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 스텝검사 */}
        <MeasurementInput
          label="스텝검사"
          value={formData.ymcaStepTest}
          onChange={handleChange("ymcaStepTest")}
          isError={showErrors && errors.ymcaStepTest}
          errorMessage="횟수를 입력해주세요"
          unit="회"
          placeholder="0"
        />

        {/* 가이드 */}
        <GuideCard
          title="스텝검사 간단 측정 방법 🌟"
          supplies="30cm 높이의 스탭박스 또는 비슷한 규격의 계단, 난간, 기구"
          steps={[
            "가벼운 스트레칭 후, 호흡이 거칠어지지 않은 상태에서 실시해주세요",
            "3분간 96bpm 속도에 맞춰 계단을 올라갔다가 내려오는 동작을 반복합니다",
            "3분간 측정을 하고 1분간 휴식 후 손목(요골동맥)을 짚어 10초간 심박수를 세주세요",
            "심박수 횟수에 6을 곱한 값을 기록해주세요 (6을 곱한 값은 1분간 심박수 기록을 의미합니다)",
          ]}
        />

        {/* 다음 버튼 */}
        <Button type="button" variant="main" onClick={handleNext}>
          다음
        </Button>
      </form>
    </>
  );
}
