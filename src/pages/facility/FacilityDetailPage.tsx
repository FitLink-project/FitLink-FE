import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import MapContainer from "../../components/MapContainer";
import SearchBar from "../../components/SearchBar"; 
import { getFacilityDetail } from "../../api/facility";

import CopyDefault from "../../assets/Icon/Copy-Default.png";
import CopyHover from "../../assets/Icon/Copy-Hover.png";

export default function FacilityDetailPage() {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState<any>(null);
  const [copyHover, setCopyHover] = useState(false);

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

  // 주소 복사
  const handleCopy = () => {
    navigator.clipboard.writeText(facility.address);
    alert("주소가 복사되었습니다!");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-softWhite relative">

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 w-full z-40 bg-white">
        <TopBar isLoggedIn={true} />
      </div>

      {/* SEARCH BAR */}
      <div className="fixed top-[60px] left-0 w-full z-40 bg-white px-4 pb-2">
        <SearchBar />
      </div>

      {/* 지도 — SearchBar 높이 고려해서 위치 조정 */}
      <div className="flex-1 mt-[120px] relative">
        <MapContainer
          center={{ lat: facility.latitude, lng: facility.longitude }}
          facilities={[facility]}
          selectedFacility={facility}
        />
      </div>

      {/* 상세 카드 */}
      <div className="absolute bottom-[70px] left-0 w-full px-4 z-30">
        <div className="w-full bg-white shadow-lg rounded-xl px-5 py-5">

          {/* 이름 + 주소 + 복사 버튼 */}
          <h2 className="text-xl font-semibold text-softBlack">
            {facility.facilityName}
          </h2>

          <div className="flex items-center mt-1 gap-2">
            <p className="text-gray">{facility.address}</p>

            {/* 주소 복사 아이콘 */}
            <img
              src={copyHover ? CopyHover : CopyDefault}
              onMouseEnter={() => setCopyHover(true)}
              onMouseLeave={() => setCopyHover(false)}
              onClick={handleCopy}
              alt="copy"
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          {/* 프로그램 */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-softBlack">운영 프로그램</h3>

            {facility.programNames?.length > 0 ? (
              <ul className="list-disc pl-5 text-gray">
                {facility.programNames.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray">등록된 프로그램이 없습니다.</p>
            )}
          </div>

         {/* 홈페이지 버튼 */}
          {facility.homepageUrl && (
            <div className="flex mt-5 gap-2">
              <button
                onClick={() => window.open(facility.homepageUrl)}
                className="flex-1 py-3 bg-lightBlue rounded-lg text-main font-semibold"
              >
                홈페이지
              </button>

              <button
                onClick={() => alert("프로그램 상세보기 기능은 추가 예정!")}
                className="flex-1 py-3 bg-main rounded-lg text-white font-semibold"
              >
                프로그램 상세보기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <BottomBar />
    </div>
  );
}
