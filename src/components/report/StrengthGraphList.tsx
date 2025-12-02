import type { FitnessResponse } from "../../types/fitness";
import { StrengthGraphItem } from "../graph/StrengthGraphItem";

interface StrengthGraphListProps {
  data: FitnessResponse;
}

function StrengthGraphList({ data }: StrengthGraphListProps) {
  // GENERAL_KEYS: 간단 체력(TestGeneralData), FitnessAverage. 평균값 없는 것은 0 처리
  const GENERAL_KEYS = [
    {
      key: "muscular", // 근지구력
      label: "근지구력",
      userScr: data.testGeneral?.sitUp as number | null,
      avgScr: data.standard?.grade1?.sitUp as number | null,
      maxValue: 43, // 예시(최대 43회, 실제 max는 도메인에 따라 조정)
    },
    {
      key: "flexibility", // 유연성
      label: "유연성",
      userScr: data.testGeneral?.sitAndReach as number | null,
      avgScr: data.standard?.grade1?.sitAndReach as number | null,
      maxValue: 50, // 예시(50cm)
    },
    {
      key: "cardiopulmonary", // 심폐지구력
      label: "심폐지구력",
      userScr: data.testGeneral?.ymcaStepTest as number | null,
      avgScr: data.standard?.grade1?.shuttleRun as number | null,
      maxValue: 120, // 예시(120회, 도메인확인 필요)
    },
  ];

  // FULL_LIST: 국민체력100(TestKookminData, FitnessAverage) 기반
  const FULL_LIST = [
    {
      key: "strength", // 근력
      label: "근력",
      userScr: data.testKookmin?.gripStrength as number | null,
      avgScr: data.standard?.grade1?.gripStrength as number | null,
      maxValue: 70, // 예시(70kg)
    },
    {
      key: "muscular", // 근지구력
      label: "근지구력",
      userScr: data.testKookmin?.sitUp as number | null,
      avgScr: data.standard?.grade1?.sitUp as number | null,
      maxValue: 43, // 예시
    },
    {
      key: "flexibility", // 유연성
      label: "유연성",
      userScr: data.testKookmin?.sitAndReach as number | null,
      avgScr: data.standard?.grade1?.sitAndReach as number | null,
      maxValue: 50, // 예시
    },
    {
      key: "cardiopulmonary", // 심폐지구력
      label: "심폐지구력",
      userScr: data.testKookmin?.shuttleRun as number | null,
      avgScr: data.standard?.grade1?.shuttleRun as number | null,
      maxValue: 120, // 예시
    },
    {
      key: "agility", // 민첩성
      label: "민첩성",
      userScr: data.testKookmin?.sprint as number | null,
      avgScr: data.standard?.grade1?.sprint as number | null,
      maxValue: 30, // 예시(30초, 도메인확인 필요)
    },
    {
      key: "quickness", // 순발력
      label: "순발력",
      userScr: data.testKookmin?.standingLongJump as number | null,
      avgScr: data.standard?.grade1?.standingLongJump as number | null,
      maxValue: 200, // 예시(200cm)
    },
  ];

  const renderList = data.testGeneral ? GENERAL_KEYS : FULL_LIST;

  return (
    <>
      {renderList.map(({ key, label, userScr, avgScr }) => (
        <StrengthGraphItem
          key={key}
          label={label}
          valueText={typeof userScr === "number" ? `${userScr}` : "-"}
          userScr={typeof userScr === "number" ? userScr : 0}
          avgScr={typeof avgScr === "number" ? avgScr : 0}
        />
      ))}
    </>
  );
}

export default StrengthGraphList;
