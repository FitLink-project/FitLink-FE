import { Link } from "react-router-dom";
import logoBlue from "../assets/Full_Logo/logo-blue.png";

interface TopBarProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function TopBar({ isLoggedIn = false, onLogout }: TopBarProps) {
  return (
    <div className="w-full h-[60px] flex items-center justify-between px-4 bg-softWhite shadow-[0px_0px_6px_0px_rgba(34,34,34,0.18)] fixed top-0 left-0 z-30">
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
  );
}
