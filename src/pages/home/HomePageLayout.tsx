import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import logoBlue from "../../assets/Full_Logo/logo-blue.png";
import HomeGauge from "../../assets/Gauge/home-guage.png";
import BottomBar from "../../components/BottomBar";
import MapContainer from "../../components/MapContainer";

interface HomePageLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
  onLogout?: () => void;
  showLocationButton?: boolean;
  onLocationClick?: () => void;

  center: { lat: number; lng: number };
  facilities?: any[];
  selectedFacility?: any | null;
  onSelectFacility?: (facility: any) => void;
  userAddress?: string;
}

export default function HomePageLayout({
  children,
  isLoggedIn,
  onLogout,
  onLocationClick,
  center,
  facilities,
  selectedFacility,
  onSelectFacility,
  userAddress,
}: HomePageLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-softWhite">
      {/* TopBar */}
      <div className="w-full h-[60px] flex items-center justify-between px-4 bg-softWhite shadow-[0px_0px_6px_0px_rgba(34,34,34,0.18)]">
        <img src={logoBlue} alt="FitLink" className="w-[103px] h-[25px]" />
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="text-base font-medium text-gray font-pretendard leading-[150%]"
          >
            로그아웃
          </button>
        ) : (
          <Link
            to="/login"
            className="text-base font-medium text-gray font-pretendard leading-[150%]"
          >
            로그인
          </Link>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full px-4 pt-[31px] pb-[80px]">
        <div className="w-full max-w-[361px] mx-auto flex flex-col gap-[31px]">
          {/* 배너 */}
          <button
            type="button"
            onClick={() => window.open("https://nfa.kspo.or.kr/beforeReserve.kspo", "_blank")}
            className="w-full h-[102px] bg-main rounded-[10px] p-[14px] relative overflow-hidden shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)]
                      transition-transform duration-150 ease-out
                      hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative z-10 flex flex-col gap-[10px] text-left">
              <h3 className="text-[18px] font-bold text-softWhite font-pretendard leading-[150%]">
                FitLink 체력진단 결과를 더 정확하게!
              </h3>
              <p className="text-[13px] font-medium text-softWhite font-pretendard leading-[1.193em]">
                체력인증센터 예약하고 국민체력 100 측정하기
              </p>
            </div>

            <div className="absolute inset-0 opacity-60">
              <img
                src={HomeGauge}
                alt=""
                className="w-[161px] h-[75px] absolute right-0 bottom-0"
              />
            </div>
          </button>


          {/* 지도 섹션 */}
          <div className="w-full h-[253px] bg-softWhite rounded-[10px] p-[10px] shadow">
            <h3 className="text-base font-semibold mb-[10px]">FitLink가 찾은 주변 공공체육시설 🔥</h3>

            <div className="flex justify-between items-center mb-[10px]">
              <p className="text-xs text-gray">
                {userAddress || "위치 정보를 불러오는 중입니다..."}
              </p>

              <button
                className="px-3 py-[6px] rounded-[30px] border border-lineGray text-xs"
                onClick={onLocationClick}
              >
                내위치
              </button>
            </div>

            {/* 지도 실제 삽입 */}
            <div className="w-full h-[175px] rounded-[10px] overflow-hidden bg-backgroundGray">
              <MapContainer
                center={center}
                facilities={facilities}
                selectedFacility={selectedFacility}
                onSelectFacility={onSelectFacility}
              />
            </div>
          </div>

          {/* 체력진단 결과/프롬프트 섹션 */}
          {children}
        </div>
      </div>

      {/* BottomBar */}
      <BottomBar />
    </div>
  );
}

