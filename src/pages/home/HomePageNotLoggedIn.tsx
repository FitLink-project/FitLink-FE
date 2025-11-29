import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function HomePageNotLoggedIn() {
  const navigate = useNavigate();

  return (
    <>
      {/* 체력진단 프롬프트 섹션 */}
      <div className="w-full">
        <h3 className="text-[18px] font-semibold text-softBlack font-pretendard leading-[150%] mb-[10px]">
          내 체력을 진단해 보세요 🔬
        </h3>
        <p className="text-sm font-medium text-gray font-pretendard leading-[1.193em] mb-[10px]">
          체력 데이터를 기반으로 맞춤 운동 및 주변 체육시설을 알려드려요
        </p>
        <div className="w-full bg-softWhite rounded-[10px] p-[10px] shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)] blur-[3.5px]">
          <div className="flex flex-col items-center gap-5">
            <div className="w-full flex flex-col items-center">
              <div className="w-[111px] h-[10px] bg-red opacity-35 mb-3"></div>
              <p className="text-base font-semibold text-softBlack font-pretendard leading-[150%] text-center">
                O0~OO 평균에 비해
                <br />
                ??이 부족해요
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <div className="text-sm font-semibold text-main font-pretendard leading-[150%] text-right">
                  근력
                </div>
                <div className="text-sm font-semibold text-gray font-pretendard leading-[150%] text-right">
                  근지구력
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-semibold text-main font-pretendard leading-[150%]">
                  ??
                </div>
                <div className="text-sm font-semibold text-gray font-pretendard leading-[150%]">
                  ??
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 relative ml-3">
                <div className="relative h-[14px]">
                  <div className="absolute inset-0 bg-lineGray opacity-60 rounded-full"></div>
                  <div className="absolute inset-0 bg-graphBlue rounded-full w-[151px]"></div>
                </div>
                <div className="relative h-[14px]">
                  <div className="absolute inset-0 bg-lineGray opacity-60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="main"
          className="w-full mt-[58px] h-[54px]"
          onClick={() => navigate("/login")}
        >
          로그인하고 나에게 맞는 운동 확인하기
        </Button>
      </div>
    </>
  );
}

