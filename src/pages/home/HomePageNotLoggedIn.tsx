import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { StrengthGraphCard } from "../../components/graph/StrengthGraphCard";

export default function HomePageNotLoggedIn() {
  const navigate = useNavigate();

  return (
    <>
      {/* 체력진단 프롬프트 섹션 */}
      <div className="w-full mb-[40px]">
        <h3 className="text-[18px] font-semibold text-softBlack font-pretendard leading-[150%] mb-[10px]">
          내 체력을 진단해 보세요 🔬
        </h3>
        <p className="text-sm font-medium text-gray font-pretendard leading-[1.193em] mb-[10px]">
          체력 데이터를 기반으로 맞춤 운동 및 주변 체육시설을 알려드려요
        </p>
        <div className="w-full h-[135px] overflow-hidden bg-softWhite rounded-[10px] px-[10px] py-[20px] shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)] blur-[1.5px]">
          <StrengthGraphCard />
        </div>
        <Button
          variant="main"
          className="w-full h-[54px] rounded-t-none"
          onClick={() => navigate("/login")}
        >
          로그인하고 나에게 맞는 운동 확인하기
        </Button>
      </div>
    </>
  );
}

