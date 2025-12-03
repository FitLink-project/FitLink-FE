import { useState, useEffect } from "react";                 // ✅ useEffect 추가
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { StrengthGraphCard } from "../../components/graph/StrengthGraphCard";
import { getFitnessResult } from "../../api/fitness";        // ✅ API import 추가
import type { FitnessResponse } from "../../types/fitness";

interface HomePageLoggedInProps {
  hasFitnessResult: boolean; // ✅ 체력진단 기록 여부
}

export default function HomePageLoggedIn({
  hasFitnessResult,
}: HomePageLoggedInProps) {
  const navigate = useNavigate();
  const [fitness, setFitness] = useState<FitnessResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ 결과 있을 때만 서버에서 가져오기
  useEffect(() => {
    if (!hasFitnessResult) return;

    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await getFitnessResult(); // ApiResponse<FitnessResponse>
        if (res.isSuccess && res.result) {
          setFitness(res.result);
        }
      } catch (e) {
        console.error("체력 결과 조회 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [hasFitnessResult]);

  // ✅ hasFitnessResult 에 따라 분기 (프롬프트는 그대로)
  if (!hasFitnessResult) {
    return (
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
          onClick={() => navigate("/fitness-landing")}
        >
          체력진단하고 나에게 맞는 운동 확인하기
        </Button>
      </div>
    );
  }

  
  // ✅ 여기서부터는 hasFitnessResult === true 인 경우

  
  // ✅ 1) 로딩 중 & 아직 fitness 없음
  if (loading && !fitness) {
    return <div className="w-full">체력 진단 결과를 불러오는 중입니다...</div>;
  }

  // ✅ 2) 로딩은 끝났는데 fitness를 못 가져온 경우 (에러 등)
  if (!fitness) {
    return (
      <div className="w-full mb-[40px]">
        <p className="text-sm text-gray mb-4">
          체력 진단 결과를 불러오지 못했습니다. 다시 시도해 주세요.
        </p>
        <Button
          variant="main"
          className="w-full h-[54px]"
          onClick={() => navigate("/fitness-landing")}
        >
          체력진단 다시 하기
        </Button>
      </div>
    );
  }

  // ✅ 3) 이제서야 fitness가 null 아님이 보장되므로 안전하게 접근 가능
  const metrics = [
    { name: "근력", key: "strength", value: fitness.strength },
    { name: "근지구력", key: "muscular", value: fitness.muscular },
    { name: "유연성", key: "flexibility", value: fitness.flexibility },
    { name: "심폐지구력", key: "cardiopulmonary", value: fitness.cardiopulmonary },
    { name: "민첩성", key: "agility", value: fitness.agility },
    { name: "순발력", key: "quickness", value: fitness.quickness },
  ].filter(m => m.value != null) as {
    name: string;
    key: keyof FitnessResponse;
    value: number;
  }[];

  // ✅ 등급별 평균(예: grade2 기준)을 metrics와 같은 순서로 매핑
  const grade2 = fitness.standard?.grade2 ?? null;
  const metricsStandard = metrics.map(m => {
    let avg: number | null = null;

    if (grade2) {
      switch (m.key) {
        case "strength":
          avg = grade2.gripStrength;
          break;
        case "muscular":
          avg = grade2.sitUp;
          break;
        case "flexibility":
          avg = grade2.sitAndReach;
          break;
        case "cardiopulmonary":
          avg = grade2.shuttleRun;
          break;
        case "agility":
          avg = grade2.sprint;
          break;
        case "quickness":
          avg = grade2.standingLongJump;
          break;
      }
    }

    return { ...m, average: avg };       // ✅ 평균값을 average로 붙임
  });

// 생일(YYYYMMDD) 기준 나이 계산
const getAgeFromBirthDate = (birthDate: string | null): number | null => {
  if (!birthDate || birthDate.length !== 8) return null;
  const year = Number(birthDate.slice(0, 4));
  const month = Number(birthDate.slice(4, 6));
  const day = Number(birthDate.slice(6, 8));

  const today = new Date();
  let age = today.getFullYear() - year;

  const hasHadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
};

// ✅ 나이대 문자열 만들기 (앞뒤 2살)
const age = getAgeFromBirthDate(fitness.userInfo?.birthDate ?? null);
let ageRangeText = "나와 비슷한 연령대";
if (age !== null) {
  const start = Math.max(age - 2, 0);
  const end = age + 2;
  ageRangeText = `${start}~${end}세`;
}
  const fitnessData = {
    ageRange: ageRangeText,
    comparison: "전반적인 체력 수준이에요",
    metrics: metricsStandard.map(m => ({
      name: m.name,
      value: m.value.toFixed(1),
      average: m.average ?? null,        // ✅ 평균값 문자열/nullable
      isMain: m.average != null ? m.value < m.average : false,
    })),
  };
  // 지표별 최대값 정의 (예시 값, 백엔드 기준에 맞게 수정)
const MAX_BY_KEY: Record<string, number> = {
  strength: 80,
  muscular: 60,
  flexibility: 100,
  cardiopulmonary: 100,
  agility: 100,
  quickness: 200,
};

const bars = metricsStandard.map(m => {
  const max = MAX_BY_KEY[m.key] ?? 1;

  const barPercent = (m.value / max) * 100;
  const avgPercent =
    m.average != null ? (m.average / max) * 100 : null;

  return {
    ...m,
    barWidthPercent: Math.min(barPercent, 100),
    averagePercent: avgPercent !== null ? Math.min(avgPercent, 100) : null,
    // ✅ 평균보다 낮은 항목 표시용 플래그
    isMain: m.average != null ? m.value < m.average : false,
  };
});




  // ✅ 체력진단 결과가 있을 때 기존 결과 카드
  return (
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
          <div className="w-full flex flex-col items-center relative">
            <div className="w-[129px] h-[10px] bg-red opacity-35 mb-3 absolute bottom-[10px]" />
            <p className="text-base font-semibold text-softBlack font-pretendard leading-[150%] text-center">
              {fitnessData.ageRange} 평균에 비해
              <br />
              {fitnessData.comparison}
            </p>
          </div>

          {/* 체력 지표 + 막대 그래프 */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex justify-between items-center">
              {/* 왼쪽: 지표 이름 */}
              <div className="flex flex-col gap-3">
                {fitnessData.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-sm font-semibold text-right font-pretendard leading-[150%]"
                  >
                    <span className={metric.isMain ? "text-main" : "text-gray"}>
                      {metric.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* 가운데: 값 */}
              <div className="flex flex-col items-center gap-3">
                {fitnessData.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-sm font-semibold font-pretendard leading-[150%]"
                  >
                    <span className={metric.isMain ? "text-main" : "text-gray"}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* 오른쪽: 막대 + 평균선 (bars 사용) */}
              <div className="flex-1 flex flex-col gap-3 relative ml-3">
                {bars.map((bar, index) => (
                  <div key={index} className="relative h-[14px]">
                    {/* 회색 배경 바 */}
                    <div className="absolute inset-0 bg-graphGray opacity-60 rounded-full" />

                    {/* 내 점수 바 */}
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full ${
                         bar.isMain   ? "bg-main" : "bg-graphBlue"
                      }`}
                      style={{ width: `${bar.barWidthPercent}%` }}
                    />

                    {/* 세로 빨간 점선: standard(grade2)에 따라 위치 변경 */}
                    {bar.averagePercent !== null && (
                      <div
                        className="absolute top-0 bottom-0 border-l-2 border-dashed border-red-500"
                        style={{
                          left: `${bar.averagePercent}%`,
                          transform: "translateX(-1px)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="main"
        className="w-full mt-[18px] mb-[38px]"
        onClick={() => navigate("/report")}
      >
        나에게 맞는 운동은?
      </Button>
    </div>
  );


}
