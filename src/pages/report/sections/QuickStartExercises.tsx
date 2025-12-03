import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/report/SectionHeader";
import { useUser } from "../../../contexts/UserContext";
import { getFitnessVideos } from "../../../api/video";
import type { FitnessVideoDetail } from "../../../types/video";
import type { FitnessResponse } from "../../../types/fitness";

interface QuickStartExercisesProps {
  data?: FitnessResponse;
}

export default function QuickStartExercises({
  data,
}: QuickStartExercisesProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<FitnessVideoDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // 부족한 체력 요소 찾기 (최솟값을 가진 항목)
  const getWeakFitnessFactors = (): string[] => {
    if (!data) return ["유연성"]; // 기본값

    const factors: Record<string, number> = {};

    // testGeneral이면 근지구력, 유연성, 심폐지구력만
    if (data.testGeneral) {
      const testGen = data.testGeneral;
      if (typeof testGen.sitUp === "number") {
        factors["근지구력"] = testGen.sitUp;
      }
      if (typeof testGen.sitAndReach === "number") {
        factors["유연성"] = testGen.sitAndReach;
      }
      if (typeof testGen.ymcaStepTest === "number") {
        factors["심폐지구력"] = testGen.ymcaStepTest;
      }
    } else {
      // 국민체력100의 경우 모든 체력 요소
      if (typeof data.strength === "number") factors["근력"] = data.strength;
      if (typeof data.muscular === "number")
        factors["근지구력"] = data.muscular;
      if (typeof data.flexibility === "number")
        factors["유연성"] = data.flexibility;
      if (typeof data.cardiopulmonary === "number")
        factors["심폐지구력"] = data.cardiopulmonary;
      if (typeof data.agility === "number") factors["민첩성"] = data.agility;
      if (typeof data.quickness === "number")
        factors["순발력"] = data.quickness;
    }

    if (Object.keys(factors).length === 0) return ["유연성"];

    // 최솟값 찾기
    const values = Object.values(factors);
    const minValue = Math.min(...values);

    // 최솟값과 같은 체력 요소들 찾기
    const weakFactors = Object.entries(factors)
      .filter(([, value]) => value === minValue)
      .map(([key]) => key);

    return weakFactors.length > 0 ? weakFactors : ["유연성"];
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const weakFactors = getWeakFitnessFactors();

        // 첫 번째 부족한 체력 요소로 영상 가져오기
        const factor = weakFactors[0] || "유연성";
        const response = await getFitnessVideos(factor, 1, 4);

        if (response.result?.response?.body?.items?.item) {
          console.log(response.result);
          setExercises(response.result.response.body.items.item);
        }
      } catch (error) {
        console.error("운동 영상을 가져오는 중 오류 발생:", error);
        // 에러가 발생해도 빈 배열로 설정하여 섹션은 보이도록 함
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    if (data) {
      fetchExercises();
    } else {
      // data가 없어도 기본값으로 유연성 영상 가져오기
      fetchExercises();
    }
  }, [data]);

  const handleExerciseClick = () => {
    if (exercises.length > 0 && exercises[0].file_nm) {
      // 가장 처음의 비디오의 파일 이름을 path variable로 사용
      const firstExerciseId = exercises[0].file_nm.replace(/\.[^/.]+$/, "");
      navigate(`/video/${firstExerciseId}`, {
        state: {
          exercises, // 전체 영상 목록 전달
        },
      });
    }
  };

  return (
    <section>
      <SectionHeader
        title="바로 시작할 수 있는 운동은 없을까?"
        description={`${
          user?.name ?? "회원"
        } 님의 부족한 체력을 보완할 수 있는 국민체력 100 영상을 준비했어요`}
      />

      {loading ? (
        <div className="text-center py-8 text-gray font-mplus1">
          운동 영상을 불러오는 중...
        </div>
      ) : exercises.length === 0 ? (
        <div className="text-center py-8 text-gray font-mplus1">
          운동 영상을 준비 중입니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {exercises.map((exercise, index) => (
            <button
              key={`${
                exercise.file_nm ??
                exercise.vdo_ttl_nm ??
                exercise.trng_nm ??
                index
              }-${index}`}
              onClick={handleExerciseClick}
              className="text-left"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-backgroundGray">
                {exercise.img_file_url && exercise.img_file_nm ? (
                  <img
                    src={`${exercise.img_file_url}${exercise.img_file_nm}`}
                    alt={exercise.vdo_ttl_nm || exercise.trng_nm || "운동"}
                    className="w-full h-full object-cover"
                  />
                ) : exercise.img_file_url ? (
                  <img
                    src={exercise.img_file_url}
                    alt={exercise.vdo_ttl_nm || exercise.trng_nm || "운동"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray text-xs">
                    이미지 없음
                  </div>
                )}
                {exercise.ftns_fctr_nm && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-lightBlue text-main text-xs font-medium rounded-full font-mplus1">
                      {exercise.ftns_fctr_nm}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium text-softBlack font-mplus1 line-clamp-1">
                  {exercise.vdo_ttl_nm || exercise.trng_nm || "운동"}
                </div>
                <div className="text-xs text-gray mt-1 font-mplus1">
                  {exercise.tool_nm || "준비물 없음"} | 1인 이상
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
