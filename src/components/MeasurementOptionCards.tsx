import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Modal from "./Modal";
import arcGauge from "../assets/Gauge/arc-gauge.png";
import rainbowGauge from "../assets/Gauge/rainbow-gauge.png";

export default function MeasurementOptionCards() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(() => !!localStorage.getItem("accessToken"));
  const [showModal, setShowModal] = useState(!isLoggedIn);

  return (
    <div className="flex gap-4 items-center justify-center">
      {/* 1. 국민체력 측정 결과가 있는 경우 (O) */}
      <Button
        variant="measurement"
        onClick={() => {
          if (!isLoggedIn) {
            setShowModal(true);
          } else {
            navigate("/fitness-kookmin");
          }
        }}
      >
        {/* 텍스트 영역 */}
        <div className="px-2">
          <div className="font-mplus text-gray text-[0.7em] my-2">
            <p>국민체력 100</p>
            <p>측정 결과가 있으신가요?</p>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="font-mplus1 font-bold text-[0.8em]">
              국민체력 100 결과 입력
            </span>
            <svg
              width="0.375rem"
              height="0.625rem"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[0.375rem] h-[0.625rem]"
            >
              <path
                d="M1 9L5 5L1 1"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* 파란색 와이파이 모양 그래프 */}
        <img
          src={rainbowGauge}
          alt="Rainbow Gauge"
          className="w-full h-auto px-8 py-2"
        />
      </Button>

      {/* 2. 국민체력 측정 결과가 없는 경우 (X) */}
      <Button
        variant="measurement"
        onClick={() => {
          if (!isLoggedIn) {
            setShowModal(true);
          } else {
            navigate("/fitness-general");
          }
        }}
      >
        {/* 텍스트 영역 */}
        <div className="px-2">
          <div className="font-mplus text-gray text-[0.7em] my-2">
            <p>국민체력 100</p>
            <p>측정 결과가 없으신가요?</p>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="font-mplus1 font-bold text-[0.8em]">
              간단 체력측정으로 시작
            </span>
            <svg
              width="0.375rem"
              height="0.625rem"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[0.375rem] h-[0.625rem]"
            >
              <path
                d="M1 9L5 5L1 1"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* 파란색 아치 모양 그래프 */}
        <img
          src={arcGauge}
          alt="Arc Gauge"
          className="w-full h-auto px-8 py-2"
        />
      </Button>

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
          // variant: 'main' (생략 시 기본값)
        }}
        secondaryButton={{
          text: "다음에 하기",
          onClick: () => setShowModal(false),
          // variant: 'backgroundGray' (생략 시 기본값)
        }}
      />
    </div>
  );
}
