import { useNavigate } from "react-router-dom";
import MapContainer from "@/components/MapContainer";
import SearchBar from "@/components/SearchBar";
import FacilityList from "@/components/FacilityList";
import CurrentLocationButton from "@/components/CurrentLocationButton";


export default function FacilityMapPage() {
  return (
    <div className="relative w-full h-screen">

      {/* 검색창 */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
        <SearchBar
          type="default"
          placeholder="내 주변 체육시설 어디 있지?"
          onClick={() => navigate("/facility/search")}
        />
      </div>

      {/* 지도 */}
      <MapContainer />

      {/* 현재 위치 버튼 */}
      <div className="absolute bottom-28 right-4 z-20">
        <CurrentLocationButton />
      </div>

      {/* 하단 리스트 */}
      <div className="absolute bottom-0 z-20 w-full">
        <FacilityList />
      </div>
    </div>
  );
}
