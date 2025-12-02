import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import logoBlue from "../../assets/Full_Logo/logo-blue.png";
import HomeGauge from "../../assets/Gauge/home-guage.png";
import BottomBar from "../../components/BottomBar";
import DefaultProfile from "../../assets/profile/default-profile.png";
import GoIcon from '../../assets/Icon/Terms/Go.png';
import LocationServiceIcon from '../../assets/Icon/Terms/LocationService.png';
import LogoutIcon from '../../assets/Icon/Terms/Logout.png';
import PersonalIcon from '../../assets/Icon/Terms/Personal.png';
import ServiceIcon from '../../assets/Icon/Terms/Service.png';
import UnregisterIcon from '../../assets/Icon/Terms/Unregister.png';


export default function MyPage() {
  const { user, logout } = useUser();

  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.name ?? "게스트";
  const displayEmail = user?.email ?? "example@example.com";
  const profileImgSrc = user?.profileUrl ? user.profileUrl : DefaultProfile;

  return (
    <div className="w-full min-h-screen bg-softWhite pb-[80px]">
      {/* TopBar */}
      <div className="w-full h-[60px] flex items-center justify-between px-4 bg-softWhite shadow-[0px_0px_6px_0px_rgba(34,34,34,0.18)]">
        <img src={logoBlue} alt="FitLink" className="w-[103px] h-[25px]" />
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
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
      <div className="w-full px-4 pt-[31px]">
        <div className="w-full max-w-[361px] mx-auto flex flex-col gap-[24px]">
          {/* 프로필 섹션 */}
          <div className="w-full flex flex-col items-center gap-3">
            <img
              src={profileImgSrc}
              alt="프로필 이미지"
              className="w-[90px] h-[90px] rounded-full object-cover"
            />

            {isLoggedIn ? (
              <>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[20px] font-semibold text-softBlack font-pretendard leading-[150%]">
                    {displayName}
                  </span>
                  <span className="text-sm font-medium text-secondGray font-pretendard leading-[150%]">
                    {displayEmail}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 rounded-[10px] bg-[#E2EDFF] text-main text-sm font-medium font-pretendard leading-[150%]"
                >
                  프로필 편집
                </button>
              </>
            ) : (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-3 flex items-center gap-1"
                >
                  <span className="text-[20px] font-semibold text-softBlack font-pretendard leading-[150%]">
                    로그인 후 이용해 주세요
                  </span>
                  <img src={GoIcon} alt="Go" className="w-[20px] h-[20px]" />
                </button>
            )}
          </div>

          {/* 배너 */}
          <button
            type="button"
            onClick={() =>
              window.open("https://nfa.kspo.or.kr/beforeReserve.kspo", "_blank")
            }
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
        </div>
        {/* 약관/로그아웃 리스트 카드 */}
        <div className="w-full mt-[16px] rounded-[10px] bg-backgroundGray shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)]">
          {/* 개인정보 수집/이용 동의 */}
          <button
            type="button"
            onClick={() => navigate("/privacy-agreement")}
            className="w-full flex items-center justify-between px-5 h-[44px]"
          >
            <div className="flex items-center gap-2">
              <img src={PersonalIcon} alt="Personal" className="w-[20px] h-20px]"/>
              <span className="text-sm font-medium text-softBlack font-pretendard leading-[150%]">
                개인정보 수집/이용 동의
              </span>
            </div>
            <img src={GoIcon} alt="Go" className="w-[20px] h-[20px]" />
          </button>

          {/* 서비스 이용약관 */}
          <button
            type="button"
            onClick={() => navigate("/service-terms")}
            className="w-full flex items-center justify-between px-5 h-[44px]"
          >
            <div className="flex items-center gap-2">
             <img src={ServiceIcon} alt="Service" className="w-[20px] h-[20px]" />
            <span className="text-sm font-medium text-softBlack font-pretendard leading-[150%]">
              서비스 이용약관
            </span>
            </div>
            <img src={GoIcon} alt="Go" className="w-[20px] h-[20px]" />
          </button>

          {/* 위치기반 서비스 이용 약관 */}
          <button
            type="button"
            onClick={() => navigate("/location-service")}
            className="w-full flex items-center justify-between px-5 h-[44px]"
          >
            
            <div className="flex items-center gap-2">
              <img src={LocationServiceIcon} alt="Location service" className="w-[20px] h-[20px]" />
              <span className="text-sm font-medium text-softBlack font-pretendard leading-[150%]">
                위치기반 서비스 이용 약관
              </span>
            </div>
            <img src={GoIcon} alt="Go" className="w-[20px] h-[20px]" />
          </button>

          {/* 로그아웃 */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center px-5 h-[44px]"
          >
            <div className="flex items-center gap-2">
            <img src={LogoutIcon} alt="Logout" className="w-[20px] h-[20px]" />
            <span className="text-sm font-medium text-softBlack font-pretendard leading-[150%]">
              로그아웃
            </span>
            </div>
          </button>

          {/* 회원탈퇴 */}
          <button
            type="button"
            onClick={() => navigate("/withdraw")}
            className="w-full flex items-center px-5 h-[44px]"
          >
            <div className="flex items-center gap-2">
            <img src={UnregisterIcon} alt="Unregister" className="w-[20px] h-[20px]" />
            <span className="text-sm font-medium text-softBlack font-pretendard leading-[150%]">
              회원탈퇴
            </span>
            </div>
          </button>
        </div>

      </div>

      <BottomBar />
    </div>
  );
}
