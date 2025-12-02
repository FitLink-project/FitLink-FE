import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import BottomBar from "../../components/BottomBar";
import Modal from "../../components/Modal";
import { getFitnessResult } from "../../api/fitness";
import FitnessBalance from "./sections/FitnessBalance";
import type { AIPrescriptionRequest } from "../../types/aiPrescription";
import AIContainer from "./sections/AIContainer";

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

  return (
    <>
      <PageHeader title="체력 리포트" />

      <div className="flex justify-center bg-white">
        <div className="w-full max-w-sm mb-64">
          {isLoggedIn && fitnessData && (
            <div className="flex flex-col gap-16 py-16">
              <FitnessBalance data={fitnessData} age={Number(age)} />
              <AIContainer data={AIRequest} />
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
