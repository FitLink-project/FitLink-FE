import { useState, useEffect } from "react";
import { postAIPrescription } from "../../../api/aiPrescription";
import type {
  AIPrescriptionRequest,
  AIPrescriptionResponse,
} from "../../../types/aiPrescription";
import PrescriptionResult from "../../../components/report/PrescriptionResult";
import SectionHeader from "../../../components/report/SectionHeader";
import { useUser } from "../../../contexts/UserContext";

export default function AIContainer({ data }: { data: AIPrescriptionRequest }) {
  const { user } = useUser();
  const [prescription, setPrescription] =
    useState<AIPrescriptionResponse | null>(null);

  // 컴포넌트 마운트 시 또는 data 변경 시 자동 실행
  useEffect(() => {
    const fetchPrescription = async () => {
      // 데이터가 유효한지 확인 (필요에 따라 조건 강화 가능)
      if (!data) return;

      try {
        const res = await postAIPrescription(data);
        if (res.isSuccess) {
          setPrescription(res.result);
        }
      } catch (error) {
        console.error("운동 처방을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPrescription();
  }, [data]); // data가 바뀔 때마다 재실행

  return (
    <section>
      <SectionHeader
        title="나의 체력에는 어떤 운동을 해야할까?"
        description={`FitLink가 ${user?.name ?? "회원"} 님의 체력 밸런스를 바탕으로 맞춤 운동을 추천해 드려요`}
      />
      {/* 결과가 있을 때만 컴포넌트 렌더링 */}
      {prescription && <PrescriptionResult data={prescription} />}
    </section>
  );
}
