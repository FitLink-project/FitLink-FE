// HomePage.tsx
import { useState, useEffect } from "react";
import HomePageLayout from "./HomePageLayout";
import HomePageLoggedIn from "./HomePageLoggedIn";
import HomePageNotLoggedIn from "./HomePageNotLoggedIn";
import LocationAgreementModal from "./LocationAgreementModal";
import { editProfile, getProfile, getAddressFromLocation } from "../../api/user";
import { useUser } from "../../contexts/UserContext";
import { getNearbyFacilities } from "../../api/facility";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLocationAgreed, setIsLocationAgreed] = useState(false);

  const { user } = useUser();  // ⬅ context에서 프로필 사용
  const navigate = useNavigate();
  const hasFitnessResult =
    !!user &&
    user.height !== null &&
    user.weight !== null &&
    user.birthDate !== null &&
    user.sex !== null;

  // ⭐ 온보딩 완료 여부 localStorage 플래그
  const hasOnboardedLS =
    typeof window !== "undefined" &&
    localStorage.getItem("hasOnboarded") === "true";


  //지도 관련 상태 추가
  const [center, setCenter] = useState({
    lat: 37.542197,
    lng: 126.967426,
  });

  const [facilities, setFacilities] = useState([]);

  const [selectedFacility, setSelectedFacility] = useState<any | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);

    if (!loggedIn && !hasOnboardedLS) {
      navigate("/onboarding");                                // ✅ 추가 위치 1
      return;
    }
    // 1) 비로그인인 경우: localStorage만 사용
    if (!loggedIn) {
      const locationAgreedLocal = localStorage.getItem("locationAgreed") === "true";
      setIsLocationAgreed(locationAgreedLocal);
      setShowLocationModal(!locationAgreedLocal);
      return;
    }

    // 2) 로그인 + user 이미 로드된 경우: context 우선
    if (user) {
      const locationAgreedServer = user.agreements.location === true;
      setIsLocationAgreed(locationAgreedServer);
      setShowLocationModal(!locationAgreedServer);
      return;
    }

    // 3) 로그인인데 user가 아직 없으면: 직접 프로필 조회 후 판단
    (async () => {
      try {
        if (!token) return;
        const res = await getProfile(token);
        if (res.isSuccess && res.result) {
          const locationAgreedServer = res.result.agreements.location === true;
          setIsLocationAgreed(locationAgreedServer);
          setShowLocationModal(!locationAgreedServer);
        } else {
          // 프로필 못 가져오면 보수적으로 모달 띄우기
          setIsLocationAgreed(false);
          setShowLocationModal(true);
        }
      } catch (e) {
        console.error("프로필 조회 실패:", e);
        setIsLocationAgreed(false);
        setShowLocationModal(true);
      }
    })();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);

    // 위치 동의는 유지 → locationAgreed 지우지 않음
    if (!isLocationAgreed) {
      setShowLocationModal(true);
    }
  };


  const handleLocationAgree = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        localStorage.setItem("locationAgreed", "true");
        setIsLocationAgreed(true);
        setShowLocationModal(false);

        // ⭐ GPS 요청
        requestGPSAndLoadFacilities();
        return;
      }

      await editProfile(
        { agreements: { location: true } },
        accessToken
      );

      localStorage.setItem("locationAgreed", "true");
      setIsLocationAgreed(true);
      setShowLocationModal(false);

      // ⭐ GPS 요청
      requestGPSAndLoadFacilities();

    } catch (e) {
      console.error("위치 동의 업데이트 실패:", e);
    }
  };


  const handleLocationLater = () => {
    setShowLocationModal(false);
  };

  const openLocationModal = () => {
    setShowLocationModal(true); // 내위치 버튼 눌렀을 때 호출
  };

  const requestGPSAndLoadFacilities = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("GPS 위치:", lat, lng);

        setCenter({ lat, lng });

        /** 주소 가져오기 추가 */
        try {
      

          const url = `${import.meta.env.VITE_API_BASE_URL}/api/maps/reverse?lat=${lat}&lon=${lng}`;
       
          const response = await fetch(url, { method: "GET" });

          const rawText = await response.text();

          // JSON으로 파싱
          let parsed;
          try {
            parsed = JSON.parse(rawText);
          } catch (jsonErr) {
            console.error("JSON 파싱 실패 – HTML 가능성 높음:", jsonErr);
            throw new Error("JSON parse fail (HTML 응답 가능)");
          }

          if (parsed.isSuccess && parsed.result) {
            setUserAddress(parsed.result.fullAddress);
          }
        } catch (e) {
          console.error("주소 변환 전체 실패 로그:", e);
        }


        /** 시설 로드 */
        const res = await getNearbyFacilities(lat, lng);
        if (!res.isSuccess) return;

        const list = Array.isArray(res.result) ? res.result : [];
        setFacilities(list);
        setSelectedFacility(null);
      },
      (err) => {
        console.error("GPS 오류:", err);
        alert("GPS 권한을 허용해야 위치 기반 추천을 받을 수 있어요!");
      }
    );
  };


  return (
    <>
      <HomePageLayout
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        showLocationButton={!isLocationAgreed} // 동의했으면 버튼 숨기기 등
        onLocationClick={openLocationModal}

        center={center}
        facilities={facilities}
        selectedFacility={selectedFacility}
        onSelectFacility={setSelectedFacility}
        userAddress={userAddress}
      >
        {isLoggedIn ? (
          <HomePageLoggedIn hasFitnessResult={hasFitnessResult} />
        ) : (
          <HomePageNotLoggedIn />
        )}
      </HomePageLayout>


      {showLocationModal && (
        <LocationAgreementModal
          onAgree={handleLocationAgree}
          onLater={handleLocationLater}
        />
      )}
    </>
  );
}
