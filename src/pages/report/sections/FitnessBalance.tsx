import Card from "../../../components/report/Card";
import SectionHeader from "../../../components/report/SectionHeader";
import HexagonGraph from "../../../components/HexogonGraph";
import defaultProfile from "../../../assets/profile/default-profile.png";
import type { FitnessResponse } from "../../../types/fitness";
import TriangleGraph from "../../../components/TriangleGraph";
import StrengthGraphList from "../../../components/report/StrengthGraphList";

// 영어 키를 한글로 변환하기 위한 맵핑 객체
const LABEL_MAP: Record<string, string> = {
  strength: "근력",
  muscular: "근지구력",
  flexibility: "유연성",
  cardiopulmonary: "심폐지구력",
  agility: "민첩성",
  quickness: "순발력",
  balance: "평형성",
};

interface FitnessBalanceProps {
  data?: FitnessResponse;
  age: number;
}

/**
 * 나이를 입력받아 19~24, 25~30 형식의 연령대 문자열을 반환.
 * @param age 나이 (number)
 * @returns "19~24" | "25~30" ...
 */
export const getAgeRange = (age: number): string => {
  if (age < 19) return "19세 미만";

  const BASE_AGE = 19;
  const RANGE_SIZE = 6;

  // 그룹 인덱스 계산 (0: 19~24, 1: 25~30, ...)
  const groupIndex = Math.floor((age - BASE_AGE) / RANGE_SIZE);

  // 시작 나이와 끝 나이 계산
  const start = BASE_AGE + groupIndex * RANGE_SIZE;
  const end = start + (RANGE_SIZE - 1); // 예: 19 + 5 = 24

  return `${start}~${end}`;
};

export default function FitnessBalance({ data, age }: FitnessBalanceProps) {
  // 데이터가 없을 경우 안전 처리
  if (!data) return null;

  const { userInfo, standard, ...rawMetrics } = data;

  // 그래프용 데이터
  const graphData: Record<string, number> = {};

  // testGeneral이면 근지구력, 유연성, 심폐지구력만 포함
  const GENERAL_KEYS = ["muscular", "flexibility", "cardiopulmonary"];

  Object.entries(rawMetrics).forEach(([key, value]) => {
    // data.testGeneral이 있으면 GENERAL_KEYS만, 아니면 기존대로 모두
    if (data.testGeneral) {
      if (!GENERAL_KEYS.includes(key)) return;
    }
    // 해당 키에 맞는 한글 라벨 찾기
    const koreanLabel = LABEL_MAP[key];

    if (typeof value === "number" && koreanLabel) {
      graphData[koreanLabel] = value;
    }
  });

  // 최댓값/최솟값 계산 및 라벨링
  const validScores = Object.values(graphData);
  const maxScore = validScores.length > 0 ? Math.max(...validScores) : 0;
  const minScore = validScores.length > 0 ? Math.min(...validScores) : 0;

  // 최댓값에 해당하는 키 찾기 (예: 'strength')
  const maxKey = Object.keys(graphData).find(
    (key) => graphData[key] === maxScore
  );
  // 최솟값에 해당하는 키 찾기
  const minKey = Object.keys(graphData).find(
    (key) => graphData[key] === minScore
  );

  // 키를 한글로 변환
  const maxLabel = maxKey ? LABEL_MAP[maxKey] || maxKey : "측정 불가";
  const minLabel = minKey ? LABEL_MAP[minKey] || minKey : "측정 불가";

  return (
    <>
      {/* 첫 번째 섹션 */}
      <section className="my-8">
        <SectionHeader
          title="나의 체력 밸런스는?"
          description="체력 데이터를 바탕으로 분석한 결과예요"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* 1. 프로필 카드 */}
            <Card className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full mb-4">
                <img
                  src={defaultProfile}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-mplus1 text-sm">
                {/* 이름 정보는 현재 데이터에 없으므로 '회원' 등으로 대체 */}
                김OO | {age}세 ({userInfo?.sex === "M" ? "남" : "여"})
              </p>
            </Card>

            {/* 2. 신체 정보 카드 */}
            <Card className="flex flex-col gap-4 py-16">
              <div className="flex justify-between items-center font-mplus1 text-sm">
                <span className="font-mplus1 text-darkGray">키</span>
                <span className="font-mplus1 font-bold">
                  {userInfo?.height ?? "-"} cm
                </span>
              </div>
              <div className="flex justify-between items-center font-mplus1 text-sm">
                <span className="font-mplus1 text-darkGray">체중</span>
                <span className="font-mplus1 font-bold">
                  {userInfo?.weight ?? "-"} kg
                </span>
              </div>
            </Card>
          </div>

          {/* [오른쪽 영역] 그래프 및 분석 멘트 */}
          <Card className="md:col-span-2 flex flex-col items-center justify-center gap-4">
            <div className="w-full h-auto rounded-lg flex items-center justify-center">
              {data.testKookmin && <HexagonGraph data={graphData} />}
              {data.testGeneral && <TriangleGraph data={graphData} />}
            </div>

            {/* 하단 텍스트 */}
            <div className="font-mplus1 text-center text-sm">
              OO 님 은{" "}
              <span className="bg-[linear-gradient(transparent_60%,rgba(59,130,246,0.4)_60%)] px-1 font-bold">
                {maxLabel}
              </span>
              에 강하고,
              <br />
              <span className="bg-[linear-gradient(transparent_60%,rgba(239,68,68,0.4)_60%)] px-1 font-bold">
                {minLabel}
              </span>
              에 약한 편이에요
            </div>
          </Card>
        </div>
      </section>

      {/* 두 번째 섹션 */}
      <section>
        <SectionHeader
          title="또래와 비교한 나의 체력은?"
          description="비슷한 연령대 데이터를 기준으로 비교했어요"
        />
        <Card>
          <StrengthGraphList data={data} />
        </Card>
      </section>
    </>
  );
}
