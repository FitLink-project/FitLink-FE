import { useNavigate,useLocation  } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import SearchBar from "../../components/SearchBar";
import CurrentLocationButton from "../../components/CurrentLocationButton";
import MapContainer from "../../components/MapContainer";
import { useFacilityStore } from "../../stores/facilityStore";

export default function FacilityMapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { facilities, fetchFacilities } = useFacilityStore();

  const [myLocation, setMyLocation] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  // GPS → 시설 API 호출
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setMyLocation({ lat, lng });
        await fetchFacilities(lat, lng);
      },
      () => console.warn("GPS 허용 안됨"),
      { enableHighAccuracy: true }
    );
  }, []);

// 검색 페이지에서 넘어온 위치(center) 처리
  useEffect(() => {
    if (location.state?.center) {
      const { lat, lng } = location.state.center;

      setMyLocation({ lat, lng });
      fetchFacilities(lat, lng);
    }
  }, [location.state]);



  return (
    <div className="w-full h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-30">
        <TopBar isLoggedIn={true} />
      </div>

      <div className="flex-1 mt-[60px] mb-[70px] relative overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <SearchBar
            type="default"
            placeholder="내 주변 체육시설 어디 있지?"
            onClick={() => navigate("/facility/search")}
          />
        </div>

        <div className="absolute inset-0">
          <MapContainer
            center={myLocation}
            facilities={facilities}
            selectedFacility={location.state?.selectedFacility || null}
          />

        </div>

        <div className="absolute bottom-24 right-4 z-20">
          <CurrentLocationButton 
            onClick={() => {
                console.log("내 위치로 이동!");
                // 이후 여기에 myLocation 업데이트 함수 넣을 예정
            }} 
            />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <BottomBar />
      </div>
    </div>
  );
}
