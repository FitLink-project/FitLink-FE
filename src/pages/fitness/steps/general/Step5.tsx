import Button from "../../../../components/Button";
import FormTitle from "../../../../components/FormTitle";
import { useFitnessGeneralStore } from "../../../../stores/FitnessGeneralStore";
import { useState } from "react";
import AbilitySlider from "../../../../components/Fitness/AbilitySlider";
import LoadingOverlay from "../../../../components/Fitness/LoadingOverlay";
import { postGeneralFitness } from "../../../../api/fitness";
import { useNavigate } from "react-router-dom";

export default function Step5() {
  const { formData, setFormData } = useFitnessGeneralStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // 최종 제출 처리
  const handleSubmit = async () => {
    console.log("보낼 데이터:", formData);
    setIsSubmitted(true);

    try {
      // API 호출
      const response = await postGeneralFitness(formData);
      console.log("서버 응답:", response);

      // 결과 페이지로 이동 (응답 값 전달)
      navigate("/report", {
        state: { result: response },
      });
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("제출에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitted(false);
    }
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

        {/* 제출 버튼 */}
        <Button type="button" variant="main" onClick={handleSubmit}>
          결과 보기
        </Button>
      </form>

      {isSubmitted && <LoadingOverlay />}
    </>
  );
}
