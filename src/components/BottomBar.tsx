import { Link, useLocation } from "react-router-dom";
import GymClick from "../assets/BottomNav/Gym-Click.png";
import GymDefault from "../assets/BottomNav/Gym-Default.png";
import HomeClick from "../assets/BottomNav/Home-Click.png";
import HomeDefault from "../assets/BottomNav/Home-Default.png";
import LinkClick from "../assets/BottomNav/Link-Click.png";
import LinkDefault from "../assets/BottomNav/Link-Default.png";
import MyClick from "../assets/BottomNav/My-Click.png";
import MyDefault from "../assets/BottomNav/My-Default.png";
import ReportClick from "../assets/BottomNav/Report-Click.png";
import ReportDefault from "../assets/BottomNav/Report-Default.png";

export default function BottomBar() {
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[80px] bg-softWhite shadow-[0px_0px_6px_0px_rgba(34,34,34,0.18)] z-50">
      <div className="w-full h-full flex items-center justify-center px-[35px]">
        <div className="w-full max-w-[323px] flex justify-between items-center">
          <Link to="/" className="flex flex-col items-center gap-[7px]">
            <img
              src={isActive("/") ? HomeClick : HomeDefault}
              alt="홈"
              className="w-[21px] h-[24px]"
            />
            <span
              className={
                "text-sm font-medium font-pretendard leading-[1.193em] " +
                (isActive("/") ? "text-main" : "text-gray")
              }
            >
              홈
            </span>
          </Link>

          <Link to="/facility" className="flex flex-col items-center gap-[7px]">
            <img
              src={isActive("/facility") ? GymClick : GymDefault}
              alt="주변시설"
              className="w-[21px] h-[24px]"
            />
            <span
              className={
                "text-sm font-medium font-pretendard leading-[1.193em] " +
                (isActive("/gym") ? "text-main" : "text-gray")
              }
            >
              주변시설
            </span>
          </Link>

          <Link
            to="/fitness-landing"
            className="flex flex-col items-center gap-[7px]"
          >
            <img
              src={isActive("/fitness-landing") ? LinkClick : LinkDefault}
              alt="체력진단"
              className="w-[21px] h-[24px]"
            />
            <span
              className={
                "text-sm font-medium font-pretendard leading-[1.193em] " +
                (isActive("/fitness-landing") ? "text-main" : "text-gray")
              }
            >
              체력진단
            </span>
          </Link>

          <Link to="/report" className="flex flex-col items-center gap-[7px]">
            <img
              src={isActive("/report") ? ReportClick : ReportDefault}
              alt="리포트"
              className="w-[21px] h-[24px]"
            />
            <span
              className={
                "text-sm font-medium font-pretendard leading-[1.193em] " +
                (isActive("/report") ? "text-main" : "text-gray")
              }
            >
              리포트
            </span>
          </Link>

          <Link to="/my" className="flex flex-col items-center gap-[7px]">
            <img
              src={isActive("/my") ? MyClick : MyDefault}
              alt="My"
              className="w-[21px] h-[24px]"
            />
            <span
              className={
                "text-sm font-medium font-pretendard leading-[1.193em] " +
                (isActive("/my") ? "text-main" : "text-gray")
              }
            >
              My
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
