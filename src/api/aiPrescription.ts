import type { ApiResponse } from "../types/api";
import type {
  AIPrescriptionRequest,
  AIPrescriptionResponse,
} from "../types/aiPrescription";
import { axiosConfig } from "./axios.config";

/**
 * AI 기반 운동 처방 생성 API
 * 사용자의 신체 정보(나이, 성별, 키, 몸무게)를 기반으로 맞춤형 운동 처방을 요청합니다.
 *
 * @param data AIPrescriptionRequest
 * @returns ApiResponse<AIPrescriptionResponse>
 */
export const postAIPrescription = async (
  data: AIPrescriptionRequest
): Promise<ApiResponse<AIPrescriptionResponse>> => {
  const res = await axiosConfig.post("/api/ai/prescription", data);
  return res.data;
};
