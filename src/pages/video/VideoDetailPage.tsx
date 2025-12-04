import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import type { FitnessVideoDetail } from "../../types/video";
import { getVideoStreamUrl, getFitnessVideos } from "../../api/video";

export default function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [exercise, setExercise] = useState<FitnessVideoDetail | null>(null);
  const [relatedExercises, setRelatedExercises] = useState<
    FitnessVideoDetail[]
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stateData, setStateData] = useState<{
    exercise?: FitnessVideoDetail;
    relatedExercises?: FitnessVideoDetail[];
    exercises?: FitnessVideoDetail[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // location.state에서 전달받은 데이터가 있으면 우선 사용
      const currentStateData = location.state as {
        exercise?: FitnessVideoDetail;
        relatedExercises?: FitnessVideoDetail[];
        exercises?: FitnessVideoDetail[]; // QuickStartExercises에서 전달받은 전체 영상 목록
      } | null;

      // stateData 저장 (관련 영상 클릭 시 재사용)
      setStateData(currentStateData);

      // exercises 배열이 전달된 경우 (QuickStartExercises에서 넘어온 경우)
      if (
        currentStateData?.exercises &&
        currentStateData.exercises.length > 0
      ) {
        // 첫 번째 영상을 메인 비디오로 설정
        setExercise(currentStateData.exercises[0]);
        // 나머지 영상들을 관련 운동으로 표시
        setRelatedExercises(currentStateData.exercises.slice(1));
        setLoading(false);
        return;
      }

      // 기존 방식: exercise와 relatedExercises가 개별로 전달된 경우
      if (currentStateData?.exercise) {
        setExercise(currentStateData.exercise);
        // relatedExercises가 있으면 사용하고, 없으면 빈 배열
        setRelatedExercises(currentStateData.relatedExercises || []);
        setLoading(false);
        return;
      }

      // location.state에 데이터가 없으면 file_nm으로 검색
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // fitnessFactor 기본값 "유연성"으로 영상 목록 가져오기
        const response = await getFitnessVideos("유연성", 1, 100);

        if (response.result?.response?.body?.items?.item) {
          const allExercises = response.result.response.body.items.item;

          // file_nm에서 확장자 제거한 값으로 운동 찾기
          const foundExercise = allExercises.find(
            (ex) => ex.file_nm?.replace(/\.[^/.]+$/, "") === id
          );

          if (foundExercise) {
            setExercise(foundExercise);

            // 같은 체력 요인이나 운동 부위를 가진 운동들을 관련 운동으로 표시
            const related = allExercises
              .filter(
                (ex) =>
                  ex.file_nm?.replace(/\.[^/.]+$/, "") !== id &&
                  (ex.ftns_fctr_nm === foundExercise.ftns_fctr_nm ||
                    ex.msrmt_part_nm === foundExercise.msrmt_part_nm ||
                    ex.trng_nm === foundExercise.trng_nm)
              )
              .slice(0, 4);
            setRelatedExercises(related);
          }
        }
      } catch (error) {
        console.error("운동 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, location.state]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <>
        <PageHeader title="운동 상세" />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-gray">로딩 중...</div>
        </div>
      </>
    );
  }

  if (!exercise) {
    return (
      <>
        <PageHeader title="운동 상세" />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-gray">운동 정보를 찾을 수 없습니다.</div>
        </div>
      </>
    );
  }

  // 비디오 URL 생성 (스트리밍 URL 사용)
  const videoUrl =
    exercise.file_url && exercise.file_nm
      ? getVideoStreamUrl(exercise.file_url, exercise.file_nm)
      : exercise.file_url || "";
  // 썸네일 URL 생성 (img_file_url + img_file_nm)
  const thumbnailUrl =
    exercise.img_file_url && exercise.img_file_nm
      ? `${exercise.img_file_url}${exercise.img_file_nm}`
      : exercise.img_file_url || "";

  return (
    <>
      <PageHeader title={exercise.trng_nm || "운동 상세"} />
      <div className="min-h-screen bg-white pb-20">
        <div className="w-full max-w-sm mx-auto">
          {/* 비디오 플레이어 */}
          <div className="relative w-full aspect-video bg-black">
            {!isPlaying && thumbnailUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={thumbnailUrl}
                  alt={exercise.vdo_ttl_nm || exercise.trng_nm || "운동 영상"}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
                >
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-softBlack ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>
            ) : videoUrl ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                비디오를 재생할 수 없습니다.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                영상이 없습니다.
              </div>
            )}
          </div>

          {/* 운동 제목 및 태그 */}
          <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl font-bold text-softBlack font-mplus1">
                {exercise.vdo_ttl_nm || exercise.trng_nm || "운동"}
              </h1>
              {exercise.ftns_fctr_nm && (
                <span className="px-3 py-1 bg-lightBlue text-main text-xs font-medium rounded-full font-mplus1">
                  {exercise.ftns_fctr_nm}
                </span>
              )}
            </div>

            {/* 운동 상세 정보 */}
            <div className="bg-white rounded-lg border border-lineGray p-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {/* 준비물 */}
                {exercise.tool_nm && (
                  <div>
                    <div className="text-xs text-gray mb-1 font-mplus1">
                      준비물
                    </div>
                    <div className="text-sm text-softBlack font-mplus1">
                      {exercise.tool_nm}
                    </div>
                  </div>
                )}

                {/* 적정 인원수 */}
                <div>
                  <div className="text-xs text-gray mb-1 font-mplus1">
                    적정 인원수
                  </div>
                  <div className="text-sm text-softBlack font-mplus1">
                    1인 이상
                  </div>
                </div>

                {/* 연령대 */}
                {exercise.aggrp_nm && (
                  <div>
                    <div className="text-xs text-gray mb-1 font-mplus1">
                      연령대
                    </div>
                    <div className="text-sm text-softBlack font-mplus1">
                      {exercise.aggrp_nm === "공통" || !exercise.aggrp_nm
                        ? "공통"
                        : exercise.aggrp_nm}
                    </div>
                  </div>
                )}

                {/* 운동 부위명 */}
                {exercise.msrmt_part_nm && (
                  <div>
                    <div className="text-xs text-gray mb-1 font-mplus1">
                      운동 부위명
                    </div>
                    <div className="text-sm text-softBlack font-mplus1">
                      {exercise.msrmt_part_nm}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 관련 운동 */}
            {relatedExercises.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-bold text-softBlack mb-4 font-mplus1">
                  관련 운동
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {relatedExercises.map((related, index) => (
                    <button
                      key={
                        related.file_nm
                          ? `${related.file_nm}-${index}`
                          : `${
                              related.vdo_ttl_nm ||
                              related.trng_nm ||
                              "exercise"
                            }-${index}`
                      }
                      onClick={() => {
                        // file_nm에서 확장자 제거한 값을 ID로 사용
                        if (related.file_nm) {
                          const exerciseId = related.file_nm.replace(
                            /\.[^/.]+$/,
                            ""
                          );

                          // 기존 stateData를 기반으로 재정렬
                          if (
                            stateData?.exercises &&
                            stateData.exercises.length > 0
                          ) {
                            // exercises 배열이 있는 경우 (QuickStartExercises에서 온 경우)
                            const reorderedExercises = [
                              related,
                              ...stateData.exercises.filter(
                                (ex) =>
                                  ex.file_nm?.replace(/\.[^/.]+$/, "") !==
                                  exerciseId
                              ),
                            ];
                            navigate(`/video/${exerciseId}`, {
                              state: {
                                exercises: reorderedExercises,
                              },
                            });
                          } else {
                            // 기존 exercise와 relatedExercises를 합쳐서 전달
                            const allExercises = exercise
                              ? [exercise, ...relatedExercises]
                              : relatedExercises;
                            const reorderedExercises = [
                              related,
                              ...allExercises.filter(
                                (ex) =>
                                  ex.file_nm?.replace(/\.[^/.]+$/, "") !==
                                  exerciseId
                              ),
                            ];
                            navigate(`/video/${exerciseId}`, {
                              state: {
                                exercises: reorderedExercises,
                              },
                            });
                          }
                        }
                      }}
                      className="text-left"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-backgroundGray">
                        {related.img_file_url && related.img_file_nm ? (
                          <img
                            src={`${related.img_file_url}${related.img_file_nm}`}
                            alt={
                              related.vdo_ttl_nm || related.trng_nm || "운동"
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : related.img_file_url ? (
                          <img
                            src={related.img_file_url}
                            alt={
                              related.vdo_ttl_nm || related.trng_nm || "운동"
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray text-xs">
                            이미지 없음
                          </div>
                        )}
                        {related.ftns_fctr_nm && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 bg-lightBlue text-main text-xs font-medium rounded-full font-mplus1">
                              {related.ftns_fctr_nm}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="text-sm font-medium text-softBlack font-mplus1 line-clamp-1">
                          {related.vdo_ttl_nm || related.trng_nm || "운동"}
                        </div>
                        <div className="text-xs text-gray mt-1 font-mplus1">
                          {related.tool_nm || "준비물 없음"} | 1인 이상
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
