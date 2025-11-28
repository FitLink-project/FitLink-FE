import PageHeader from "../../components/PageHeader";
import MeasurementOptionCards from "../../components/MeasurementOptionCards";
import TriangleGraph from "../../components/TriangleGraph";
import Button from "../../components/Button";

export default function FitnessLandingPage() {
  return (
    <>
      <PageHeader title="체력 측정 방법 선택" />
      <div className="min-h-screen flex justify-center bg-white">
        <div className="w-full max-w-sm">
          {/* 파란 섹션 */}
          <section className="text-center bg-main py-16">
            <div className="space-y-2 font-mplus1 font-bold text-softWhite text-lg">
              <p>체력 데이터를 입력하고</p>
              <p>맞춤 운동을 확인해 보세요!</p>
            </div>
          </section>

          {/* 회색 섹션 */}
          <section className="text-center bg-backgroundGray p-4 text-gray">
            {/* 국민체력100 또는 간단 체력 측정 결과 이동 카드(나란히)*/}
            <MeasurementOptionCards />

            {/* 간단 체력 측정 설명 및 폴리곤 요소 */}
            <section className="my-8 p-4">
              <h1 className="font-mplus1 font-bold text-lg my-8">
                간단 체력측정이란?
              </h1>
              <div className="space-y-1 font-mplus1 text-xs my-8">
                <p>윗몸말아올리기, 앉아윗몸앞으로굽히기, 스텝검사를 통해</p>
                <p>집에서 간단하게 체력을 측정할 수 있어요</p>
              </div>
              <p className="font-mplus1 text-xs">
                측정 방법은 간단 체력측정 입력 화면에서 자세히 알려드려요
              </p>

              <div className="mt-8 h-[18rem]">
                <TriangleGraph
                  data={{ 심폐지구력: 80, 근지구력: 60, 유연성: 90 }}
                />
              </div>

              <div className="space-y-1 font-mplus1 text-xs">
                <p>측정한 체력을 기반으로</p>
                <p>근지구력・유연성・심폐지구력의 체력 밸런스,</p>
                <p>연령대 평균 비교, 맞춤 운동 추천 등을 확인할 수 있어요</p>
              </div>
            </section>

            {/* 국민 체력 100 측정 설명 및 이동 버튼 */}
            <section>
              <div className="mt-8 p-4">
                <h1 className="font-mplus1 font-bold text-lg my-8">
                  보다 정밀한 체력 분석이 필요하다면?
                </h1>
                <div className="font-mplus1 text-xs my-8">
                  <p>체력인증센터 예약을 통해 국민체력 100을 측정해 보세요</p>
                </div>
              </div>

              <Button
                variant="main"
                onClick={() => {
                  window.open(
                    "https://nfa.kspo.or.kr/beforeReserve.kspo",
                    "_blank"
                  );
                }}
              >
                국민체력 100 예약하러 가기
              </Button>

              <div className="space-y-1 font-mplus1 text-xs my-8 p-4">
                <p>국민체력 100 결과를 입력하면</p>
                <p>근력・근지구력・유연성・심폐지구력・민첩성・순발력의</p>
                <p>체력 분석 결과 및 맞춤 운동 추천 등을 확인할 수 있어요</p>
              </div>
            </section>

            {/* 하단 바 */}
          </section>
        </div>
      </div>
    </>
  );
}
