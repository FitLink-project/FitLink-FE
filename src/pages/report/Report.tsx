import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import BottomBar from "../../components/BottomBar";
import Modal from "../../components/Modal";
import { getFitnessResult } from "../../api/fitness";
import FitnessBalance from "./sections/FitnessBalance";
import type { AIPrescriptionRequest } from "../../types/aiPrescription";
import AIContainer from "./sections/AIContainer";
import QuickStartExercises from "./sections/QuickStartExercises";

export default function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn] = useState(() => !!localStorage.getItem("accessToken"));
  const [showModal] = useState(!isLoggedIn);

  const [fitnessData, setFitnessData] = useState(() => {
    const stateData = location.state?.result;
    if (!stateData) return null;

    return stateData.result ? stateData.result : stateData;
  });

  // 데이터 조회
  useEffect(() => {
    if (!isLoggedIn) return;
    if (fitnessData) return; // 이미 데이터 있으면 API 호출 안함

    const fetchData = async () => {
      try {
        const response = await getFitnessResult();

        if (response.isSuccess) {
          setFitnessData(response.result);
        } else {
          alert(response.message);
          navigate("/fitness-landing");
        }
      } catch (error) {
        console.error("데이터 조회 실패:", error);
        navigate("/fitness-landing");
      }
    };

    fetchData();
  }, [isLoggedIn, fitnessData, navigate]);

  // 데이터 로딩 중 렌더링 방지
  if (isLoggedIn && !fitnessData) return null;

  console.log(fitnessData);

  // 나이 계산 로직 (YYYYMMDD -> 나이)
  const calculateAge = (birthDate?: string) => {
    if (!birthDate || birthDate.length !== 8) return "-";
    const year = parseInt(birthDate.substring(0, 4), 10);
    const currentYear = new Date().getFullYear();
    return currentYear - year; // 한국식 연 나이 계산 (만 나이 필요 시 로직 변경)
  };

  const age = calculateAge(fitnessData?.userInfo?.birthDate);

  const AIRequest: AIPrescriptionRequest = {
    age: typeof age === "number" ? age : Number(age),
    gender: fitnessData?.userInfo?.gender ?? 0,
    height: fitnessData?.userInfo?.height ?? 0,
    weight: fitnessData?.userInfo?.weight ?? 0,
  };

  // 부족한 체력 요소 찾기 (fitnessData.standard.grade2 보다 못한 항목)
  // 부족한 체력 요소 찾기 (fitnessData.standard.grade2 보다 못한 항목)
const weakFactors: string[] = [];
const standard = fitnessData?.standard?.grade2;

// fitnessData나 standard가 없으면 기본값만 사용하고, 아래 비교 로직은 건너뛰기
if (!fitnessData || !standard) {
  weakFactors.push("유연성");
} else {
  if (fitnessData.testGeneral) {
    // 간단 체력 검사 기준
    if (
      typeof fitnessData.testGeneral.sitUp === "number" &&
      typeof standard.sitUp === "number" &&
      fitnessData.testGeneral.sitUp < standard.sitUp
    ) {
      weakFactors.push("근지구력");
    }
    if (
      typeof fitnessData.testGeneral.sitAndReach === "number" &&
      typeof standard.sitAndReach === "number" &&
      fitnessData.testGeneral.sitAndReach < standard.sitAndReach
    ) {
      weakFactors.push("유연성");
    }
    if (
      typeof fitnessData.testGeneral.ymcaStepTest === "number" &&
      typeof standard.shuttleRun === "number" &&
      fitnessData.testGeneral.ymcaStepTest < standard.shuttleRun
    ) {
      weakFactors.push("심폐지구력");
    }
  } else {
    // 국민체력100 기준
    if (
      typeof fitnessData.testKookmin?.gripStrength === "number" &&
      typeof standard.gripStrength === "number" &&
      fitnessData.testKookmin!.gripStrength < standard.gripStrength
    ) {
      weakFactors.push("근력");
    }
    if (
      typeof fitnessData.testKookmin?.sitUp === "number" &&
      typeof standard.sitUp === "number" &&
      fitnessData.testKookmin!.sitUp < standard.sitUp
    ) {
      weakFactors.push("근지구력");
    }
    if (
      typeof fitnessData.testKookmin?.sitAndReach === "number" &&
      typeof standard.sitAndReach === "number" &&
      fitnessData.testKookmin!.sitAndReach < standard.sitAndReach
    ) {
      weakFactors.push("유연성");
    }
    if (
      typeof fitnessData.testKookmin?.shuttleRun === "number" &&
      typeof standard.shuttleRun === "number" &&
      fitnessData.testKookmin!.shuttleRun < standard.shuttleRun
    ) {
      weakFactors.push("심폐지구력");
    }
    if (
      typeof fitnessData.testKookmin?.sprint === "number" &&
      typeof standard.sprint === "number" &&
      fitnessData.testKookmin!.sprint < standard.sprint
    ) {
      weakFactors.push("민첩성");
    }
    if (
      typeof fitnessData.testKookmin?.standingLongJump === "number" &&
      typeof standard.standingLongJump === "number" &&
      fitnessData.testKookmin!.standingLongJump < standard.standingLongJump
    ) {
      weakFactors.push("순발력");
    }
  }
}


  return (
    <>
      <PageHeader title="체력 리포트" />

      <div className="flex justify-center bg-white">
        <div className="w-full  mb-32 px-[20px]">
          {isLoggedIn && fitnessData && (
            <div className="flex flex-col gap-16 py-16">
              <FitnessBalance
                data={fitnessData}
                age={Number(age)}
                weakFactors={weakFactors}
              />
              <AIContainer data={AIRequest} />
              <QuickStartExercises
                data={fitnessData}
                weakFactors={weakFactors}
              />
            </div>
          )}
        </div>
      </div>

      {/* 하단 바 */}
      <BottomBar />

      {/* 로그인 모달 */}
      <Modal
        isOpen={showModal}
        title="로그인 후 진행해 주세요"
        description={
          <>
            FitLink의 체력진단 및 리포트
            <br />
            결과 제공을 위해 로그인이 필요해요
          </>
        }
        primaryButton={{
          text: "로그인하기",
          onClick: () => navigate("/login"),
        }}
        secondaryButton={{
          text: "다음에 하기",
          onClick: () => navigate("/"),
        }}
      />
    </>
  );
}
