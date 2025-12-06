import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postAIPrescription } from "../../../api/aiPrescription";
import {
  getNearbyFacilities,
  getFacilityPrograms,
} from "../../../api/facility";
import type {
  AIPrescriptionRequest,
  AIPrescriptionResponse,
} from "../../../types/aiPrescription";
import type { FacilityDetail } from "../../../types/facilityTypes";
import PrescriptionResult from "../../../components/report/PrescriptionResult";
import SectionHeader from "../../../components/report/SectionHeader";
import { FacilityCard } from "../../../components/FacilityCard";
import { useUser } from "../../../contexts/UserContext";
import NoMatchingWarning from "../../../components/report/NoMatchingWarning";

export default function AIContainer({ data }: { data: AIPrescriptionRequest }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [prescription, setPrescription] =
    useState<AIPrescriptionResponse | null>(null);
  const [facilities, setFacilities] = useState<FacilityDetail[]>([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);
  const [programDetails, setProgramDetails] = useState<
    Record<number, { homepage: string; programNames: string[] }>
  >({});

  // 1. AI 운동 처방 데이터 가져오기
  useEffect(() => {
    const fetchPrescription = async () => {
      // 로그 그룹 시작
      console.log("1. 전달받은 data:", data);

      // 데이터 유효성 검사 로그
      if (!data) {
        console.warn("2. 데이터가 비어있어 요청을 건너뜁니다.");
        return;
      }

      try {
        console.log("2. API 요청 시작 (postAIPrescription)");
        const res = await postAIPrescription(data);

        console.log("3. API 응답 수신:", res);

        if (res.isSuccess) {
          console.log("4. 처방 데이터 설정 완료:", res.result);
          setPrescription(res.result);
        } else {
          console.warn("4. API 요청 실패 (Business Logic):", res.message);
        }
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
      }
    };

    fetchPrescription();
  }, [data]);

  // 2. 주변 체육시설 조회
  useEffect(() => {
    const fetchFacilities = async () => {
      setFacilitiesLoading(true);

      // 공통으로 사용할 API 호출 함수
      const callApi = async (
        lat: number,
        lng: number,
        type: "GPS" | "DEFAULT"
      ) => {
        try {
          console.log(`[${type}] 좌표로 시설 조회 시도:`, lat, lng);
          const res = await getNearbyFacilities(lat, lng);

          if (res.isSuccess && res.result) {
            const facilitiesData = Array.isArray(res.result)
              ? res.result
              : [res.result];
            console.log(`[${type}] 시설 조회 성공:`, facilitiesData);
            setFacilities(facilitiesData);
          } else {
            console.warn(`[${type}] 시설 조회 실패/데이터 없음:`, res);
            setFacilities([]);
          }
        } catch (err) {
          console.error(`[${type}] API 에러:`, err);
          setFacilities([]);
        }
      };

      // 위치 권한 확인 및 로직 실행
      if (navigator.geolocation) {
        console.log("1. Geolocation 지원 확인됨, 위치 요청 시작");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("2. 위치 권한 허용됨");
            callApi(position.coords.latitude, position.coords.longitude, "GPS");
            setFacilitiesLoading(false);
            console.groupEnd();
          },
          (error) => {
            console.warn("2. 위치 권한 거부 또는 에러:", error.message);
            console.log("3. 기본 위치(서울)로 조회 전환");
            callApi(37.5665, 126.978, "DEFAULT"); // 서울 시청 좌표
            setFacilitiesLoading(false);
          }
        );
      } else {
        console.warn("1. Geolocation 미지원 브라우저");
        callApi(37.5665, 126.978, "DEFAULT");
        setFacilitiesLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  // 시설별 프로그램 정보 가져오기
  useEffect(() => {
    if (facilities.length === 0) return;
    const fetchProgramDetails = async () => {
      const results = await Promise.all(
        facilities.map(async (facility) => {
          try {
            const res = await getFacilityPrograms(facility.facilityId);
            if (res.isSuccess && res.result) {
              return {
                facilityId: facility.facilityId,
                homepage: res.result.homepage,
                programNames: Array.isArray(res.result.programs)
                  ? res.result.programs.map((p) => p.name)
                  : [],
              };
            }
          } catch (e) {
            /* 무시 */
          }
          // 실패 시 빈 정보
          return {
            facilityId: facility.facilityId,
            homepage: "",
            programNames: [],
          };
        })
      );
      // 객체로 변환
      const programObj = results.reduce((acc, cur) => {
        acc[cur.facilityId] = {
          homepage: cur.homepage,
          programNames: cur.programNames,
        };
        return acc;
      }, {} as Record<number, { homepage: string; programNames: string[] }>);
      setProgramDetails(programObj);
    };
    fetchProgramDetails();
  }, [facilities]);

  return (
    <>
      {/* 나의 체력에는 어떤 운동을 해야할까? */}
      <section>
        <SectionHeader
          title="나의 체력에는 어떤 운동을 해야할까?"
          description={
            <>
              FitLink가 {user?.name ?? "회원"} 님의 데이터를 바탕으로 <br />{" "}
              맞춤 운동을 추천해 드려요
            </>
          }
        />
        {prescription && <PrescriptionResult data={prescription} />}
      </section>

      {/* 맞춤 운동, 주변에서 할 수 있을까? */}
      <section>
        <SectionHeader
          title="맞춤 운동, 주변에서 할 수 있을까?"
          description={`추천 운동 프로그램을 운영하는 공공체육시설이에요`}
        />
        {facilitiesLoading ? (
          <div className="text-center py-8 text-gray font-mplus1">
            체육시설을 불러오는 중...
          </div>
        ) : facilities.length === 0 ? (
          <NoMatchingWarning
            description={
              <>
                현재 {user?.name ?? "회원"}님의 주변에 적합한 시설이 없어요{" "}
                <br />
                맞춤 운동을 참고해 간단한 운동부터 시작해 보세요!
              </>
            }
          />
        ) : (
          (() => {
            const filteredFacilities = facilities.filter((facility) => {
              const tags =
                programDetails[facility.facilityId]?.programNames || [];
              const mainExercises = prescription?.mainExercise || [];
              // prescription 각 운동명과 tags(프로그램명) 부분 포함 매칭
              return mainExercises.some((exercise) =>
                tags.some((tag) => tag.includes(exercise))
              );
            });
            if (filteredFacilities.length === 0) {
              return (
                <NoMatchingWarning
                  description={
                    <>
                      현재 {user?.name ?? "회원"}님의 주변에 적합한 시설이
                      없어요 <br />
                      맞춤 운동을 참고해 간단한 운동부터 시작해 보세요!
                    </>
                  }
                />
              );
            }
            return (
              <div className="space-y-3">
                {filteredFacilities.map((facility) => (
                  <FacilityCard
                    key={facility.facilityId}
                    title={facility.facilityName}
                    address={facility.address}
                    tags={
                      programDetails[facility.facilityId]?.programNames || []
                    }
                    prescription={prescription?.mainExercise || []}
                    homepageUrl={
                      programDetails[facility.facilityId]?.homepage || ""
                    }
                    onViewDetails={() => {
                      navigate(`/facility/${facility.facilityId}/programs`);
                    }}
                  />
                ))}
              </div>
            );
          })()
        )}
      </section>
    </>
  );
}
