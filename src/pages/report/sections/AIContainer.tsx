import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postAIPrescription } from "../../../api/aiPrescription";
import { getNearbyFacilities } from "../../../api/facility";
import type {
  AIPrescriptionRequest,
  AIPrescriptionResponse,
} from "../../../types/aiPrescription";
import type { FacilityDetail } from "../../../types/facilityTypes";
import PrescriptionResult from "../../../components/report/PrescriptionResult";
import SectionHeader from "../../../components/report/SectionHeader";
import { FacilityCard } from "../../../components/FacilityCard";
import { useUser } from "../../../contexts/UserContext";

export default function AIContainer({ data }: { data: AIPrescriptionRequest }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [prescription, setPrescription] =
    useState<AIPrescriptionResponse | null>(null);
  const [facilities, setFacilities] = useState<FacilityDetail[]>([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);

  // 컴포넌트 마운트 시 또는 data 변경 시 자동 실행
  useEffect(() => {
    const fetchPrescription = async () => {
      // 데이터가 유효한지 확인 (필요에 따라 조건 강화 가능)
      if (!data) return;

      try {
        const res = await postAIPrescription(data);
        if (res.isSuccess) {
          setPrescription(res.result);
        }
      } catch (error) {
        console.error("운동 처방을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPrescription();
  }, [data]); // data가 바뀔 때마다 재실행

  // 주변 체육시설 조회
  useEffect(() => {
    const fetchNearbyFacilities = async () => {
      try {
        setFacilitiesLoading(true);

        // 사용자의 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              const res = await getNearbyFacilities(latitude, longitude);
              console.log("주변 체육시설 응답:", res);

              if (res.isSuccess && res.result) {
                const facilitiesData = Array.isArray(res.result)
                  ? res.result
                  : [res.result];
                setFacilities(facilitiesData);
              } else {
                setFacilities([]);
              }
              setFacilitiesLoading(false);
            },
            (error) => {
              console.error("위치 권한 거부 또는 오류:", error);
              // 위치 추적 실패 시 기본값 사용
              fetchWithDefaultLocation();
            }
          );
        } else {
          console.error("Geolocation을 지원하지 않습니다.");
          fetchWithDefaultLocation();
        }
      } catch (error) {
        console.error("주변 체육시설 조회 실패:", error);
        setFacilities([]);
        setFacilitiesLoading(false);
      }
    };

    // 기본 좌표로 조회하는 함수
    const fetchWithDefaultLocation = async () => {
      try {
        const latitude = 37.5665; // 서울 중심
        const longitude = 126.978;

        const res = await getNearbyFacilities(latitude, longitude);
        console.log("기본 위치로 주변 체육시설 응답:", res);

        if (res.isSuccess && res.result) {
          const facilitiesData = Array.isArray(res.result)
            ? res.result
            : [res.result];
          setFacilities(facilitiesData);
        } else {
          setFacilities([]);
        }
      } catch (error) {
        console.error("기본 위치 조회 실패:", error);
        setFacilities([]);
      } finally {
        setFacilitiesLoading(false);
      }
    };

    fetchNearbyFacilities();
  }, []);

  return (
    <>
      {/* 나의 체력에는 어떤 운동을 해야할까? */}
      <section>
        <SectionHeader
          title="나의 체력에는 어떤 운동을 해야할까?"
          description={`FitLink가 ${
            user?.name ?? "회원"
          } 님의 체력 밸런스를 바탕으로 맞춤 운동을 추천해 드려요`}
        />
        {/* 결과가 있을 때만 컴포넌트 렌더링 */}
        {prescription && <PrescriptionResult data={prescription} />}
      </section>

      {/* 맞춤 운동, 주변에서 할 수 있을까? */}
      <section>
        <SectionHeader
          title="맞춤 운동, 주변에서 할 수 있을까?"
          description={`추천 운동 프로그램을 운영하는 공공체육시설이에요 ${
            user?.name ?? "회원"
          }님의 체력 밸런스를 바탕으로 맞춤 운동을 추천해 드려요`}
        />
        {facilitiesLoading ? (
          <div className="text-center py-8 text-gray font-mplus1">
            체육시설을 불러오는 중...
          </div>
        ) : facilities.length === 0 ? (
          <div className="text-center py-8 text-gray font-mplus1">
            주변 체육시설 정보를 준비 중입니다.
          </div>
        ) : (
          <div className="space-y-3">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.facilityId}
                title={facility.facilityName}
                address={facility.address}
                tags={facility.programNames || []}
                homepageUrl={facility.homepageUrl}
                onViewDetails={() => {
                  navigate(`/facility/${facility.facilityId}`);
                }}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
