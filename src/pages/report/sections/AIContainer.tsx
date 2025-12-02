import { useState } from "react";
import { postAIPrescription } from "../../../api/aiPrescription";
import type {
  AIPrescriptionRequest,
  AIPrescriptionResponse,
} from "../../../types/aiPrescription";
import PrescriptionResult from "../../../components/report/PrescriptionResult";

export default function AIContainer({ data }: { data: AIPrescriptionRequest }) {
  const [prescription, setPrescription] =
    useState<AIPrescriptionResponse | null>(null);

  const handleAnalyze = async () => {
    const res = await postAIPrescription(data);
    if (res.isSuccess) {
      setPrescription(res.result);
    }
  };

  return (
    <div>
      {/* 입력 폼 영역 */}
      <button onClick={handleAnalyze}>분석하기</button>

      {/* 변경된 Prop 이름 사용 */}
      {prescription && <PrescriptionResult data={prescription} />}
    </div>
  );
}
