import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar";
import { getFacilityDetail } from "../../api/facility";
import BackIcon from "../../assets/Icon/Back-Default.png";

export default function ProgramDetailPage() {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      if (facilityId) {
        const data = await getFacilityDetail(Number(facilityId));
        setFacility(data);
      }
    }
    loadData();
  }, [facilityId]);

  if (!facility) return <div>불러오는 중...</div>;

  return (
    <div className="w-full min-h-screen bg-softWhite flex flex-col">

      {/* 상단바 */}
      <div className="fixed top-0 left-0 w-full z-30 flex items-center px-4 h-[60px] bg-white shadow">
        <button onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="back" className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center font-semibold text-[16px]">
          프로그램 정보
        </div>
      </div>

      <div className="mt-[60px] px-4 pb-24">

        {/* 시설 정보 */}
        <div className="bg-white rounded-xl shadow px-4 py-4 mb-4">
          <div className="text-lg font-semibold">{facility.facilityName}</div>
          <div className="text-sm text-gray mt-1">{facility.address}</div>

          <button
            onClick={() => window.open(facility.homepageUrl)}
            className="text-main underline text-sm mt-2"
          >
            홈페이지 →
          </button>
        </div>

        {/* 프로그램 탭 (전체 / 카테고리 등) — 지금은 전체만 */}
        <h3 className="font-semibold text-[16px] mb-3">프로그램 정보</h3>

        {/* 프로그램 카드 목록 */}
        {facility.programs?.length > 0 ? (
          facility.programs.map((p: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-4 mb-4"
            >
              <div className="text-main font-semibold text-[15px] mb-2">
                {p.name}
              </div>
              <div className="text-sm text-gray">대상: {p.target}</div>
              <div className="text-sm text-gray">요일: {p.days}</div>
              <div className="text-sm text-gray">시간대: {p.time}</div>
              <div className="text-sm text-gray">모집인원: {p.capacity}</div>
              <div className="text-sm font-semibold mt-1">
                가격: {p.price?.toLocaleString()}원
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray text-sm">등록된 프로그램이 없습니다.</div>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
