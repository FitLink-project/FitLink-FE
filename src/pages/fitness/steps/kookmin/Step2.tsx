import Button from "../../../../components/Button";
import FormTitle from "../../../../components/FormTitle";
import MeasurementInput from "../../../../components/Fitness/MeasurementInput";
import { useFitnessKookminStore } from "../../../../stores/FitnessKookminStore";
import { useState } from "react";

interface StepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  NEXT_STEP: number;
}

export default function Step2({ setCurrentStep, NEXT_STEP }: StepProps) {
  const { formData, setFormData } = useFitnessKookminStore();

  // 에러 상태
  const [errors, setErrors] = useState({
    gripStrength: false,
    shuttleRun: false,
    sprint: false,
    standingLongJump: false,
    sitAndReach: false,
  });

  // 에러 표시 여부
  const [showErrors, setShowErrors] = useState(false);

  // 다음 버튼 클릭
  const handleNext = () => {
    const newErrors = {
      gripStrength: formData.gripStrength === null,
      shuttleRun: formData.shuttleRun === null,
      sprint: formData.sprint === null,
      standingLongJump: formData.standingLongJump === null,
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
          title="국민체력 100 결과를 입력해 주세요"
          description="모두 입력해주세요"
        />
      </section>

      <form
        className="grid grid-cols-2 gap-x-4 gap-y-8 w-[345px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 악력 */}
        <MeasurementInput
          label="악력"
          value={formData.gripStrength}
          onChange={handleChange("gripStrength")}
          isError={showErrors && errors.gripStrength}
          errorMessage="악력을 입력해주세요"
          unit="kg"
        />

        {/* 왕복오래달리기 */}
        <MeasurementInput
          label="왕복오래달리기"
          value={formData.shuttleRun}
          onChange={handleChange("shuttleRun")}
          isError={showErrors && errors.shuttleRun}
          errorMessage="횟수를 입력해주세요"
          unit="회"
          placeholder="00"
        />

        {/* 왕복달리기 */}
        <MeasurementInput
          label="왕복달리기"
          value={formData.sprint}
          onChange={handleChange("sprint")}
          isError={showErrors && errors.sprint}
          errorMessage="시간을 입력해주세요"
          unit="초"
        />

        {/* 제자리멀리뛰기 */}
        <MeasurementInput
          label="제자리멀리뛰기"
          value={formData.standingLongJump}
          onChange={handleChange("standingLongJump")}
          isError={showErrors && errors.standingLongJump}
          errorMessage="거리를 입력해주세요"
          unit="cm"
        />

        <div className="col-span-2">
          {/* 앉아윗몸앞으로굽히기 */}
          <MeasurementInput
            label="앉아윗몸앞으로굽히기"
            value={formData.sitAndReach}
            onChange={handleChange("sitAndReach")}
            isError={showErrors && errors.sitAndReach}
            errorMessage="거리를 입력해주세요"
            unit="cm"
          />
        </div>

        {/* 다음 버튼 */}
        <Button type="button" variant="main" onClick={handleNext}>
          다음
        </Button>
      </form>
    </>
  );
}
