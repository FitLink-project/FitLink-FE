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
      filledWidth: data.testGeneral?.sitUp,
      averageWidth: data.average?.sitUp,
    },
    {
      key: "flexibility", // 유연성
      label: "유연성",
      filledWidth: data.testGeneral?.sitAndReach,
      averageWidth: data.average?.sitAndReach,
    },
    {
      key: "cardiopulmonary", // 심폐지구력
      label: "심폐지구력",
      filledWidth: data.testGeneral?.ymcaStepTest,
      averageWidth: data.average?.shuttleRun, // 평균값 없음
    },
  ];

  // FULL_LIST: 국민체력100(TestKookminData, FitnessAverage) 기반
  const FULL_LIST = [
    {
      key: "strength", // 근력
      label: "근력",
      filledWidth: data.testKookmin?.gripStrength,
      averageWidth: data.average?.gripStrength,
    },
    {
      key: "muscular", // 근지구력
      label: "근지구력",
      filledWidth: data.testKookmin?.sitUp,
      averageWidth: data.average?.sitUp,
    },
    {
      key: "flexibility", // 유연성
      label: "유연성",
      filledWidth: data.testKookmin?.sitAndReach,
      averageWidth: data.average?.sitAndReach,
    },
    {
      key: "cardiopulmonary", // 심폐지구력
      label: "심폐지구력",
      filledWidth: data.testKookmin?.shuttleRun,
      averageWidth: data.average?.shuttleRun,
    },
    {
      key: "agility", // 민첩성
      label: "민첩성",
      filledWidth: data.testKookmin?.sprint,
      averageWidth: data.average?.sprint,
    },
    {
      key: "quickness", // 순발력
      label: "순발력",
      filledWidth: data.testKookmin?.standingLongJump,
      averageWidth: data.average?.standingLongJump,
    },
  ];

  const renderList = data.testGeneral ? GENERAL_KEYS : FULL_LIST;

  return (
    <>
      {renderList.map(({ key, label, filledWidth, averageWidth }) => (
        <StrengthGraphItem
          key={key}
          label={label}
          valueText={typeof filledWidth === "number" ? `${filledWidth}` : "-"}
          filledWidth={typeof filledWidth === "number" ? filledWidth : 0}
          averageWidth={typeof averageWidth === "number" ? averageWidth : 0}
        />
      ))}
    </>
  );
}

export default StrengthGraphList;
