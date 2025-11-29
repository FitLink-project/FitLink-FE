import { useState, useEffect } from "react";
import HomePageLayout from "./HomePageLayout";
import HomePageLoggedIn from "./HomePageLoggedIn";
import HomePageNotLoggedIn from "./HomePageNotLoggedIn";
import LocationAgreementModal from "./LocationAgreementModal";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    
    // 비로그인 상태이고 위치 동의가 없으면 모달 표시
    if (!token) {
      const locationAgreed = localStorage.getItem("locationAgreed");
      if (!locationAgreed) {
        setShowLocationModal(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("locationAgreed");
    setIsLoggedIn(false);
    setShowLocationModal(true);
  };

  const handleLocationAgree = () => {
    localStorage.setItem("locationAgreed", "true");
    setShowLocationModal(false);
  };

  const handleLocationLater = () => {
    setShowLocationModal(false);
  };

  return (
    <>
      <HomePageLayout
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        showLocationButton={!isLoggedIn}
      >
        {isLoggedIn ? (
          <HomePageLoggedIn onLogout={handleLogout} />
        ) : (
          <HomePageNotLoggedIn />
        )}
      </HomePageLayout>

      {/* 위치 동의 모달 */}
      {showLocationModal && (
        <LocationAgreementModal
          onAgree={handleLocationAgree}
          onLater={handleLocationLater}
        />
      )}
    </>
  );
}
