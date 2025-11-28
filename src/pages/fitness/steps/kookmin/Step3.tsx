import Button from "../../../../components/Button";
import FormTitle from "../../../../components/FormTitle";
import LoadingOverlay from "../../../../components/Fitness/LoadingOverlay";
import MeasurementInput from "../../../../components/Fitness/MeasurementInput";
import { useFitnessKookminStore } from "../../../../stores/FitnessKookminStore";
import { useState } from "react";
import ErrorMessage from "../../../../components/ErrorMessage";

export default function Step2() {
  const { formData, setFormData } = useFitnessKookminStore();

  // 제출 상태
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 에러
  const [showError, setShowError] = useState(false);

  // 숫자 입력 처리 함수
  const handleChange =
    (key: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value)) {
        setFormData({ [key]: value });

        // 다른 입력 필드는 하나만 입력되면 비활성화
        const otherKey = key === "sitUp" ? "crossSitUp" : "sitUp";
        if (value > 0) {
          setFormData({ [otherKey]: null }); // 다른 필드 초기화
        }
      }
    };

  // 다음 버튼 클릭
  const handleNext = () => {
    // 둘 다 비어있으면 에러
    if (!formData.sitUp && !formData.crossSitUp) {
      setShowError(true);
      return;
    }

    // 에러 없으면 초기화
    console.log(formData);
    setIsSubmitted(true);
  };

  // 둘 중 하나라도 입력되어 있는지에 따라 다른 필드 disabled
  const isSitUpDisabled = !!formData.crossSitUp;
  const isCrossSitUpDisabled = !!formData.sitUp;

  return (
    <>
      <section className="my-8 px-4">
        <FormTitle
          title="국민체력 100 결과를 입력해 주세요"
          description="윗몸말아올리기 또는 교차윗몸일으키기 중 하나를 선택해 입력해 주세요"
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
          isError={showError}
          unit="회"
          disabled={isSitUpDisabled}
        />

        <div className="grid gap-2">
          {/* 교차윗몸일으키기 */}
          <MeasurementInput
            label="교차윗몸일으키기"
            value={formData.crossSitUp}
            onChange={handleChange("crossSitUp")}
            unit="회"
            disabled={isCrossSitUpDisabled}
          />

          {/* 에러 메시지 */}
          {showError && (
            <ErrorMessage
              message="윗몸말아올리기 또는 교차윗몸일으키기 중 하나만 입력해주세요"
              className="text-xs"
            />
          )}
        </div>

        {/* 다음 버튼 */}
        <Button type="button" variant="main" onClick={handleNext}>
          다음
        </Button>
      </form>

      {/* 로딩 애니메이션 */}
      {isSubmitted && <LoadingOverlay />}
    </>
  );
}
