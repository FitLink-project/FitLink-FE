import Card from "../../../components/report/Card";
import SectionHeader from "../../../components/report/SectionHeader";
import HexagonGraph from "../../../components/HexogonGraph";
import defaultProfile from "../../../assets/profile/default-profile.png";
import type { FitnessResponse } from "../../../types/fitness";
import TriangleGraph from "../../../components/TriangleGraph";
import StrengthGraphList from "../../../components/report/StrengthGraphList";
import { useUser } from "../../../contexts/UserContext";

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
  weakFactors: string[];
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

export default function FitnessBalance({
  data,
  age,
  weakFactors = [],
}: FitnessBalanceProps) {
  // 데이터가 없을 경우 안전 처리
  if (!data) return null;

  const { user } = useUser();
  const { userInfo, standard, ...rawMetrics } = data;

  // 그래프용 데이터
  const graphData: Record<string, number> = {};

  // testGeneral이면 근지구력, 유연성, 심폐지구력만 포함
  if (data.testGeneral) {
    // FitnessGeneralRequest 3개 분석
    const testGen = data.testGeneral;
    if (typeof testGen.sitUp === "number") {
      graphData["근지구력"] = testGen.sitUp;
    }
    if (typeof testGen.sitAndReach === "number") {
      graphData["유연성"] = testGen.sitAndReach;
    }
    if (typeof testGen.ymcaStepTest === "number") {
      graphData["심폐지구력"] = testGen.ymcaStepTest;
    }
  } else {
    Object.entries(rawMetrics).forEach(([key, value]) => {
      // 해당 키에 맞는 한글 라벨 찾기
      const koreanLabel = LABEL_MAP[key];
      if (typeof value === "number" && koreanLabel) {
        graphData[koreanLabel] = value;
      }
    });
  }

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
      <section>
        <SectionHeader
          title="나의 체력 밸런스는?"
          description="체력 데이터를 바탕으로 분석한 결과예요"
        />

      <div className="grid grid-cols-3 gap-4">
        {/* 왼쪽: 프로필 + 키·체중 (col 1) */}
        <div className="col-span-1 flex flex-col gap-4">
          <Card className="flex flex-col items-center justify-center h-[131px]">
              <img
                  src={user?.profileUrl ? user.profileUrl : defaultProfile}
                  alt="프로필 이미지"
                  className="w-[59px] h-[59px] rounded-[50%] object-cover"
                />
              <p className="font-mplus1 text-xs">
                {user?.name ?? "회원"} | {age}세
              </p>
            </Card>

            {/* 2. 신체 정보 카드 */}
            <Card className="flex flex-col gap-4 py-8">
              <div className="flex justify-between font-mplus1 text-sm">
                <span className="text-darkGray">키</span>
                <span>{userInfo?.height ?? "-"} cm</span>
              </div>
              <div className="flex justify-between items-center font-mplus1 text-sm">
                <span className="text-darkGray">체중</span>
                <span>{userInfo?.weight ?? "-"} kg</span>
              </div>
            </Card>
          </div>

          {/* [오른쪽 영역] 그래프 및 분석 멘트 */}
        <Card className="col-span-2 flex flex-col items-center justify-start  px-4 h-[268px] relative py-0">
          <div className="w-full max-w-xs mx-auto">
            {data.testKookmin && <HexagonGraph data={graphData} />}
            {data.testGeneral && <TriangleGraph data={graphData} />}
          </div>

            {/* 하단 텍스트 */}
            <div className="font-mplus1 text-center text-sm absolute bottom-6 px-4 w-full">
              {user?.name ?? "회원"}님은{" "}
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
          <StrengthGraphList data={data} age={age} weakFactors={weakFactors} />
        </Card>
      </section>
    </>
  );
}
