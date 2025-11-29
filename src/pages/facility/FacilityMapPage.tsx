import { useNavigate } from "react-router-dom";
import MapContainer from "../../components/MapContainer";
import SearchBar from "../../components/SearchBar";
import CurrentLocationButton from "../../components/CurrentLocationButton";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";

export default function FacilityMapPage() {
  const navigate = useNavigate();


  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">

      {/* TOP BAR (60px 고정) */}
      <div className="fixed top-0 left-0 w-full z-30 h-[60px]">
        <TopBar isLoggedIn={true} />
      </div>

      {/* 콘텐츠 영역 height 정확히 계산 */}
      <div
        className="relative"
        style={{
          height: "calc(100vh - 60px - 70px)", // TopBar + BottomBar 제외한 높이
          marginTop: "60px",
          marginBottom: "70px",
        }}
      >

        {/* 검색창 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <SearchBar
            type="default"
            placeholder="내 주변 체육시설 어디 있지?"
            onClick={() => navigate("/facility/search")}
          />
        </div>

        {/* 지도 */}
        <div className="absolute inset-0">
          <MapContainer />
        </div>

        {/* 현재 위치 버튼 */}
        <div className="absolute bottom-[110px] right-4 z-20">
          <CurrentLocationButton onClick={() => console.log("move my location")} />
        </div>

      </div>

      {/* BOTTOM BAR (70px 고정) */}
      <div className="fixed bottom-0 left-0 w-full z-30 h-[70px]">
        <BottomBar />
      </div>
    </div>
  );
}
