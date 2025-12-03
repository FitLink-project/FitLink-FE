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
      userScr: data.testGeneral?.sitUp,
      avgScr: data.standard?.grade2?.sitUp,
    },
    {
      key: "flexibility", // 유연성
      label: "유연성",
      userScr: data.testGeneral?.sitAndReach,
      avgScr: data.standard?.grade2?.sitAndReach,
    },
    {
      key: "cardiopulmonary", // 심폐지구력
      label: "심폐지구력",
      userScr: data.testGeneral?.ymcaStepTest,
      avgScr: data.standard?.grade2?.shuttleRun, // 예시
    },
  ];

  // FULL_LIST: 국민체력100(TestKookminData, FitnessAverage) 기반
  const FULL_LIST = [
    {
      key: "strength", // 근력
      label: "근력",
      userScr: data.testKookmin?.gripStrength,
      avgScr: data.standard?.grade2?.gripStrength,
    },
    {
      key: "muscular", // 근지구력
      label: "근지구력",
      userScr: data.testKookmin?.sitUp,
      avgScr: data.standard?.grade2?.sitUp,
    },
    {
      key: "flexibility", // 유연성
      label: "유연성",
      userScr: data.testKookmin?.sitAndReach,
      avgScr: data.standard?.grade2?.sitAndReach,
    },
    {
      key: "cardiopulmonary", // 심폐지구력
      label: "심폐지구력",
      userScr: data.testKookmin?.shuttleRun,
      avgScr: data.standard?.grade2?.shuttleRun,
    },
    {
      key: "agility", // 민첩성
      label: "민첩성",
      userScr: data.testKookmin?.sprint,
      avgScr: data.standard?.grade2?.sprint,
    },
    {
      key: "quickness", // 순발력
      label: "순발력",
      userScr: data.testKookmin?.standingLongJump,
      avgScr: data.standard?.grade2?.standingLongJump,
    },
  ];

  const renderList = data.testGeneral ? GENERAL_KEYS : FULL_LIST;

  return (
    <div className="flex flex-col gap-3">
      {renderList.map(({ key, label, userScr, avgScr }) => {
        let maxScoreValue = 100;
        if (data.standard?.grade1) {
          switch (key) {
            case "strength":
              maxScoreValue = data.standard.grade1.gripStrength ?? 100;
              break;
            case "muscular":
              maxScoreValue = data.standard.grade1.sitUp ?? 100;
              break;
            case "flexibility":
              maxScoreValue = data.standard.grade1.sitAndReach ?? 100;
              break;
            case "cardiopulmonary":
              maxScoreValue = data.standard.grade1.shuttleRun ?? 100;
              break;
            case "agility":
              maxScoreValue = data.standard.grade1.sprint ?? 100;
              break;
            case "quickness":
              maxScoreValue = data.standard.grade1.standingLongJump ?? 100;
              break;
            default:
              maxScoreValue = 100;
          }
        }
        return (
          <StrengthGraphItem
            key={key}
            label={label}
            valueText={typeof userScr === "number" ? `${userScr}` : "-"}
            userScr={typeof userScr === "number" ? userScr : 0}
            avgScr={typeof avgScr === "number" ? avgScr : 0}
            maxScore={maxScoreValue}
          />
        );
      })}
    </div>
  );
}

export default StrengthGraphList;
