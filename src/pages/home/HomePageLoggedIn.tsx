import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface HomePageLoggedInProps {
  onLogout: () => void;
}

export default function HomePageLoggedIn({ onLogout }: HomePageLoggedInProps) {
  const navigate = useNavigate();

  // 체력진단 결과 데이터
  const fitnessData = {
    ageRange: "20~24세 여성",
    comparison: "근력・유연성이 부족해요",
    metrics: [
      { name: "근력", value: "41.2", isMain: true },
      { name: "근지구력", value: "21", isMain: false },
      { name: "유연성", value: "4.0", isMain: true },
      { name: "심폐지구력", value: "33", isMain: false },
      { name: "민첩성", value: "12.8", isMain: false },
      { name: "순발력", value: "156.0", isMain: false },
    ],
  };

  return (
    <>
      {/* 체력진단 결과 섹션 */}
      <div className="w-full">
        <h3 className="text-[18px] font-semibold text-softBlack font-pretendard leading-[150%] mb-[10px]">
          체력 진단 결과 🏅
        </h3>
        <p className="text-sm font-medium text-gray font-pretendard leading-[1.193em] mb-[10px]">
          OO 님의 체력 데이터를 기반으로 연령대 평균과 비교한 결과예요
        </p>
        <div className="w-full bg-softWhite rounded-[10px] p-[10px] shadow-[0px_0px_12px_0px_rgba(34,34,34,0.08)]">
          <div className="flex flex-col items-center gap-5">
            {/* 비교 결과 */}
            <div className="w-full flex flex-col items-center">
              <div className="w-[129px] h-[10px] bg-red opacity-35 mb-3"></div>
              <p className="text-base font-semibold text-softBlack font-pretendard leading-[150%] text-center">
                {fitnessData.ageRange} 평균에 비해
                <br />
                {fitnessData.comparison}
              </p>
            </div>

            {/* 체력 지표 */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  {fitnessData.metrics.map((metric, index) => (
                    <div key={index} className="text-sm font-semibold text-right font-pretendard leading-[150%]">
                      <span className={metric.isMain ? "text-main" : "text-gray"}>
                        {metric.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-3">
                  {fitnessData.metrics.map((metric, index) => (
                    <div key={index} className="text-sm font-semibold font-pretendard leading-[150%]">
                      <span className={metric.isMain ? "text-main" : "text-gray"}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-3 relative ml-3">
                  {fitnessData.metrics.map((metric, index) => (
                    <div key={index} className="relative h-[14px]">
                      <div className="absolute inset-0 bg-graphGray opacity-60 rounded-full"></div>
                      <div
                        className={`absolute inset-0 rounded-full ${
                          metric.isMain ? "bg-graphBlue" : "bg-graphGray opacity-60"
                        }`}
                        style={{
                          width: `${(parseFloat(metric.value) / 200) * 100}%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="main"
          className="w-full mt-[58px]"
          onClick={() => navigate("/report")}
        >
          나에게 맞는 운동은?
        </Button>
      </div>
    </>
  );
}

