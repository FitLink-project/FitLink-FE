// HomePage.tsx
import { useState, useEffect } from "react";
import HomePageLayout from "./HomePageLayout";
import HomePageLoggedIn from "./HomePageLoggedIn";
import HomePageNotLoggedIn from "./HomePageNotLoggedIn";
import LocationAgreementModal from "./LocationAgreementModal";
import { editProfile } from "../../api/user";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLocationAgreed, setIsLocationAgreed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const locationAgreed = localStorage.getItem("locationAgreed") === "true";
    setIsLocationAgreed(locationAgreed);

    // 아직 동의 안 했으면 모달 띄우기 (로그인 여부 상관 없음)
    if (!locationAgreed) {
      setShowLocationModal(true);
    }
  }, []);

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
      // 비로그인 상태에서 동의만 로컬에 저장할지, 로그인 강제할지는 UX에 따라
      localStorage.setItem("locationAgreed", "true");
      setIsLocationAgreed(true);
      setShowLocationModal(false);
      return;
    }

    // 서버에 위치 동의(true)로 업데이트
    await editProfile(
      {
        agreements: {
          location: true,
          // 다른 동의 항목들(privacy, service, over14 등)을 서버가 필요로 하면 같이 넣기
          // privacy: true,
          // service: true,
          // over14: true,
        },
      },
      accessToken
    );

    // 서버 업데이트 성공하면 로컬도 동기화
    localStorage.setItem("locationAgreed", "true");
    setIsLocationAgreed(true);
    setShowLocationModal(false);
  } catch (e) {
    console.error("위치 동의 업데이트 실패:", e);
    // 필요하면 에러 토스트 / 알럿
  }
};


  const handleLocationLater = () => {
    setShowLocationModal(false);
  };

  const openLocationModal = () => {
    setShowLocationModal(true); // 내위치 버튼 눌렀을 때 호출
  };

  return (
    <>
      <HomePageLayout
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        showLocationButton={!isLocationAgreed} // 동의했으면 버튼 숨기기 등
        onLocationClick={openLocationModal}
      >
        {isLoggedIn ? (
          <HomePageLoggedIn onLogout={handleLogout}   hasFitnessResult={false}/>
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
