import Button from "../../../../components/Button";
import FormTitle from "../../../../components/FormTitle";
import { useFitnessGeneralStore } from "../../../../stores/FitnessGeneralStore";
import { useState } from "react";
import AbilitySlider from "../../../../components/Fitness/AbilitySlider";
import LoadingOverlay from "../../../../components/Fitness/LoadingOverlay";

export default function Step5() {
  const { formData, setFormData } = useFitnessGeneralStore();

  // 제출 상태
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 다음 버튼 클릭
  const handleNext = () => {
    setFormData({
      sliderStrength: formData.sliderStrength ?? 50,
      sliderAgility: formData.sliderAgility ?? 50,
      sliderPower: formData.sliderPower ?? 50,
    });

    // 최종 데이터 확인용 로그
    console.log({
      ...formData,
    });

    setIsSubmitted(true);
  };

  return (
    <>
      <section className="my-8 px-4">
        <FormTitle
          title="슬라이더를 움직여 체감 정도를 선택해주세요"
          description="체감 정도에 따라 맞춤 운동 동영상을 알려드려요"
        />
      </section>

      <form
        className="grid grid-cols-1 gap-x-4 gap-y-8 w-[345px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 근력 */}
        <AbilitySlider
          label="근력"
          leftLabel="☹️"
          rightLabel="😊"
          onChange={(val) => setFormData({ sliderStrength: val })}
        />

        {/* 민첩성 */}
        <AbilitySlider
          label="민첩성"
          leftLabel="☹️"
          rightLabel="😊"
          onChange={(val) => setFormData({ sliderAgility: val })}
        />

        {/* 순발력 */}
        <AbilitySlider
          label="순발력"
          leftLabel="☹️"
          rightLabel="😊"
          onChange={(val) => setFormData({ sliderPower: val })}
        />

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
