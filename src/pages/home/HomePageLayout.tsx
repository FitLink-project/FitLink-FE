import { Link } from "react-router-dom";
import { ReactNode } from "react";
import logoBlue from "../../assets/Full_Logo/logo-blue.png";
import HomeGauge from "../../assets/Gauge/home-guage.png";

interface HomePageLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
  onLogout?: () => void;
  showLocationButton?: boolean;
}

export default function HomePageLayout({
  children,
  isLoggedIn,
  onLogout,
  showLocationButton = false,
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
          <div className="w-full h-[102px] bg-main rounded-[10px] p-[14px] relative overflow-hidden shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)]">
            <div className="relative z-10 flex flex-col gap-[10px]">
              <h3 className="text-[18px] font-bold text-softWhite font-pretendard leading-[150%]">
                FitLink 체력진단 결과를 더 정확하게!
              </h3>
              <p className="text-[13px] font-medium text-softWhite font-pretendard leading-[1.193em]">
                체력인증센터 예약하고 국민체력 100 측정하기
              </p>
            </div>
            {/* 배경 이미지 효과 */}
            <div className="absolute inset-0 opacity-60 ">
              <img src={HomeGauge} alt="" className="w-[161px] h-[75px] absolute right-0 bottom-0" />
            </div>
          </div>

          {/* 지도 섹션 */}
          <div className="w-full h-[253px] bg-softWhite rounded-[10px] p-[10px] shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)]">
            <div className="flex items-center justify-between mb-[24px]">
              <h3 className="text-base font-semibold text-softBlack font-pretendard leading-[150%]">
                FitLink가 찾은 주변 공공체육시설 🔥
              </h3>
            </div>
            <p className="text-xs font-medium text-gray font-pretendard leading-[1.193em] mb-[10px]">
              서울 용산구 한강대로 345
            </p>
            {showLocationButton && (
              <div className="flex justify-end mb-[10px]">
                <button className="flex items-center gap-1 px-3 py-[6px] rounded-[30px] border border-lineGray">
                  <span className="text-xs font-medium text-darkGray font-pretendard leading-[1.193em]">
                    내위치
                  </span>
                </button>
              </div>
            )}
            {/* 지도 영역 */}
            <div className="w-full h-[175px] bg-backgroundGray rounded-[10px] relative">
              {/* 지도 이미지 또는 지도 컴포넌트가 들어갈 자리 */}
              <div className="absolute top-[60px] left-[112px] w-[44px] h-[44px] bg-main rounded-full flex items-center justify-center shadow-[0px_0px_8px_0px_rgba(60,125,255,1)]">
                {/* 위치 마커 아이콘 */}
              </div>
            </div>
          </div>

          {/* 체력진단 결과/프롬프트 섹션 */}
          {children}
        </div>
      </div>

      {/* BottomBar */}
      <div className="fixed bottom-0 left-0 right-0 w-full h-[80px] bg-softWhite shadow-[0px_0px_6px_0px_rgba(34,34,34,0.18)]">
        <div className="w-full h-full flex items-center justify-center px-[35px]">
          <div className="w-full max-w-[323px] flex justify-between items-center">
            <Link to="/" className="flex flex-col items-center gap-[7px]">
              <div className="w-6 h-6 bg-main rounded"></div>
              <span className="text-sm font-medium text-main font-pretendard leading-[1.193em]">
                홈
              </span>
            </Link>
            <Link to="/gym" className="flex flex-col items-center gap-[7px]">
              <div className="w-6 h-6 bg-gray rounded"></div>
              <span className="text-sm font-medium text-gray font-pretendard leading-[1.193em]">
                주변시설
              </span>
            </Link>
            <Link to="/fitness" className="flex flex-col items-center gap-[7px]">
              <div className="w-6 h-6 bg-gray rounded"></div>
              <span className="text-sm font-medium text-gray font-pretendard leading-[1.193em]">
                체력진단
              </span>
            </Link>
            <Link to="/report" className="flex flex-col items-center gap-[7px]">
              <div className="w-6 h-6 bg-gray rounded"></div>
              <span className="text-sm font-medium text-gray font-pretendard leading-[1.193em]">
                리포트
              </span>
            </Link>
            <Link to="/my" className="flex flex-col items-center gap-[7px]">
              <div className="w-6 h-6 bg-gray rounded"></div>
              <span className="text-sm font-medium text-gray font-pretendard leading-[1.193em]">
                My
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

