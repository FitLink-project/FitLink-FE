import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/report/SectionHeader";
import { useUser } from "../../../contexts/UserContext";
import { getFitnessVideos } from "../../../api/video";
import type { FitnessVideoDetail } from "../../../types/video";
import type { FitnessResponse } from "../../../types/fitness";
import NoMatchingWarning from "../../../components/report/NoMatchingWarning";

interface QuickStartExercisesProps {
  data?: FitnessResponse;
  weakFactors: string[];
}

export default function QuickStartExercises({
  data,
  weakFactors,
}: QuickStartExercisesProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<FitnessVideoDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);

        // 모든 부족한 체력 요소로 영상 가져오기
        if (weakFactors.length === 0) {
          setExercises([]);
          return;
        }

        console.log("부족한 요소:", weakFactors);

        // 각 부족 요소별로 개별 요청을 보냄(쉼표로 합치지 않음)
        const requests = weakFactors.map((f) => getFitnessVideos(f, 1, 20));
        const settled = await Promise.allSettled(requests);
        console.log("getFitnessVideos settled:", settled);

        const collected: FitnessVideoDetail[] = [];
        settled.forEach((r, idx) => {
          if (r.status === "fulfilled") {
            console.log(`영상 API 응답 (${weakFactors[idx]}):`, r.value.result);
            const item = r.value.result?.response?.body?.items?.item;
            if (item) {
              if (Array.isArray(item)) {
                collected.push(...item);
              } else {
                collected.push(item);
              }
            }
          } else {
            console.warn("영상 API 실패:", weakFactors[idx], r.reason);
          }
        });

        console.log("collected videos:", collected);

        // file_nm 기준으로 중복 제거
        const unique = collected.filter(
          (v, i, a) => a.findIndex((t) => t.file_nm === v.file_nm) === i
        );

        console.log("unique videos:", unique);

        // 항상 최대 4개까지만 화면에 표시
        const toShow = unique.slice(0, 4);
        console.log("setting exercises (max 4):", toShow);
        setExercises(toShow);

        // 로그 그룹 닫기
        if (console.groupEnd) console.groupEnd();
      } catch (error) {
        if (console.groupEnd) console.groupEnd();
        console.error("운동 영상을 가져오는 중 오류 발생:", error);
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
        description={
          <>
            {user?.name ?? "회원"}님의 부족한 체력을 보완할 수 있는
            <br />
            국민체력 100 영상을 준비했어요
          </>
        }
      />

      {loading ? (
        <div className="text-center py-8 text-gray font-mplus1">
          운동 영상을 불러오는 중...
        </div>
      ) : exercises.length === 0 ? (
        <NoMatchingWarning
          description={
            <>
              현재 {user?.name ?? "회원"}님께 적합한 영상이 준비되지 않았어요
              <br />
              먼저 맞춤 운동을 통해 운동을 시작해 보세요!
            </>
          }
        />
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
