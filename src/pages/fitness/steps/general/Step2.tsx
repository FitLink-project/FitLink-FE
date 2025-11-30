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

export default function Step2({ setCurrentStep, NEXT_STEP }: StepProps) {
  const { formData, setFormData } = useFitnessGeneralStore();

  // 에러 상태
  const [errors, setErrors] = useState({
    sitUp: false,
  });

  // 에러 표시 여부
  const [showErrors, setShowErrors] = useState(false);

  // 다음 버튼 클릭
  const handleNext = () => {
    const newErrors = {
      sitUp: formData.sitUp === null,
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
          title="윗몸말아올리기 결과를 입력해주세요"
          description="아래 설명을 참고하여 윗몸말아올리기를 진행해주세요"
        />
      </section>

      <form
        className="grid grid-cols-1 gap-x-4 gap-y-8 w-[345px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 윗몸말아올리기 */}
        <MeasurementInput
          label="윗몸말아올리기"
          value={formData.sitUp}
          onChange={handleChange("sitUp")}
          isError={showErrors && errors.sitUp}
          errorMessage="횟수를 입력해주세요"
          unit="회"
        />

        {/* 가이드 */}
        <GuideCard
          title="윗몸말아올리기 간단 측정 방법 🌟"
          supplies="요가매트"
          steps={[
            "무릎을 굽혀 세우고 등을 바닥에 대고 누워주세요",
            "팔은 곧게 뻗고, 손바닥을 허벅지 위에 올려둡니다",
            "허벅지를 따라 손을 올리며 상체를 말아 올리고, 3초 후 천천히 머리가 바닥에 닿게 내려옵니다",
            "머리가 바닥에 닿았을 때 1회로 인정하며, 발바닥이 땅에서 떨어지거나 3초 전에 내려오면 그 시점까지의 총횟수를 기록한 후 측정을 종료합니다",
            "익숙하지 않은 동작이므로 측정 전 누운 자세와 말아 올린자세에 대한 연습을 하고 측정을 시작해주세요",
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
