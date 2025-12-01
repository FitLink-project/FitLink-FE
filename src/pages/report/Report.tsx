import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import BottomBar from "../../components/BottomBar";
import SectionHeader from "../../components/report/SectionHeader";
import Card from "../../components/report/Card";
import Modal from "../../components/Modal";
import { getFitnessResult } from "../../api/fitness";
import defaultProfile from "../../assets/profile/default-profile.png";
import HexagonGraph from "../../components/HexogonGraph";

export default function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn] = useState(() => !!localStorage.getItem("accessToken"));
  const [showModal, setShowModal] = useState(!isLoggedIn);

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

  // 최댓값/최솟값 계산
  const data = {
    근력: fitnessData?.strength,
    근지구력: fitnessData?.muscular,
    유연성: fitnessData?.flexibility,
    심폐지구력: fitnessData?.cardiopulmonary,
    민첩성: fitnessData?.agility,
    순발력: fitnessData?.quickness,
  };

  // undefined나 null을 제외하고 숫자만 추출
  const validScores = Object.values(data).filter(
    (v): v is number => typeof v === "number"
  );

  const maxScore = validScores.length > 0 ? Math.max(...validScores) : 0;
  const minScore = validScores.length > 0 ? Math.min(...validScores) : 0;

  const maxLabel = Object.keys(data).find(
    (key) => data[key as keyof typeof data] === maxScore
  );
  const minLabel = Object.keys(data).find(
    (key) => data[key as keyof typeof data] === minScore
  );

  return (
    <>
      <PageHeader title="체력 리포트" />

      <div className="flex justify-center bg-white">
        <div className="w-full max-w-sm mb-16">
          {isLoggedIn && fitnessData && (
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
                    <p className="font-mplus1 text-sm">김OO | 23세</p>
                  </Card>

                  {/* 2. 신체 정보 카드 */}
                  <Card className="flex flex-col gap-4 py-16">
                    <div className="flex justify-between items-center font-mplus1 text-sm">
                      <span className="font-mplus1 text-darkGray">키</span>
                      <span className="font-mplus1 font-bold">
                        {fitnessData?.userInfo?.height} cm
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-mplus1 text-sm">
                      <span className="font-mplus1 text-darkGray">체중</span>
                      <span className="font-mplus1 font-bold">
                        {fitnessData?.userInfo?.weight} kg
                      </span>
                    </div>
                  </Card>
                </div>

                {/* [오른쪽 영역] 3칸 중 2칸 차지 (col-span-2) */}
                <Card className="md:col-span-2 flex flex-col items-center justify-center gap-4">
                  <div className="w-full h-auto rounded-lg flex items-center justify-center">
                    <HexagonGraph data={data} />
                  </div>

                  {/* 하단 텍스트 */}
                  <div className="font-mplus1 text-center text-sm">
                    OO 님 은{" "}
                    <span className="bg-[linear-gradient(transparent_60%,rgba(59,130,246,0.4)_60%)] px-1">
                      {maxLabel}
                    </span>
                    에 강하고,
                    <br />
                    <span className="bg-[linear-gradient(transparent_60%,rgba(239,68,68,0.4)_60%)] px-1">
                      {minLabel}
                    </span>
                    에 약한 편이에요
                  </div>
                </Card>
              </div>
            </section>
          )}
        </div>
      </div>

      <BottomBar />

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
