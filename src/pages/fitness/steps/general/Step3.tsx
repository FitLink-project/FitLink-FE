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

export default function Step3({ setCurrentStep, NEXT_STEP }: StepProps) {
  const { formData, setFormData } = useFitnessGeneralStore();

  // 에러 상태
  const [errors, setErrors] = useState({
    sitAndReach: false,
  });

  // 에러 표시 여부
  const [showErrors, setShowErrors] = useState(false);

  // 다음 버튼 클릭
  const handleNext = () => {
    const newErrors = {
      sitAndReach: formData.sitAndReach === null,
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
          title="앉아윗몸앞으로굽히기 결과를 입력해주세요"
          description="아래 설명을 참고하여 앉아윗몸앞으로굽히기를 진행해주세요"
        />
      </section>

      <form
        className="grid grid-cols-1 gap-x-4 gap-y-8 w-[345px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 앉아윗몸앞으로굽히기 */}
        <MeasurementInput
          label="앉아윗몸앞으로굽히기"
          value={formData.sitAndReach}
          onChange={handleChange("sitAndReach")}
          isError={showErrors && errors.sitAndReach}
          errorMessage="앉아윗몸앞으로굽히기 결과를 입력해주세요"
          unit="cm"
        />

        {/* 가이드 */}
        <GuideCard
          title="앉아윗몸앞으로굽히기 간단 측정 방법 🌟"
          supplies="줄자 또는 막대자"
          steps={[
            "무릎을 펴고 앉아주세요",
            "발뒤꿈치 부위에 줄자의 30cm 시작점이 오도록 하여, 줄자를 양발 사이에 놓습니다",
            "무릎을 굽히지 않고 허리를 숙이며 양손을 앞으로 뻗어주세요",
            "양손이 줄자에 닿은 지점을 기록합니다",
            "기준선(30cm)을 넘으면 양수, 기준선을 넘지 못하면 음수로 기록합니다",
          ]}
          examples={[
            "ex) 실제 값: 33cm → 기록 값: 3cm",
            "ex) 실제 값: 28cm → 기록 값: -2cm",
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
