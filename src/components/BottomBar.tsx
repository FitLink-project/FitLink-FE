import { Link } from "react-router-dom";

export default function BottomBar() {
  return (
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
  );
}
