/**
 * Fitness 관련 API 모듈
 */

import { axiosConfig } from "./axios.config";
import type {
  FitnessKookminRequest,
  FitnessGeneralRequest,
  FitnessResponse,
} from "../types/fitness";
import type { ApiResponse } from "../types/api";

/**
 * 국민체력100 인증 기반 측정 결과 계산 API
 * @param data FitnessKookminRequest
 * @returns FitnessResponse
 */
export const postKookminFitness = async (
  data: FitnessKookminRequest
): Promise<FitnessResponse> => {
  const res = await axiosConfig.post("/api/fitness/kookmin", data);
  return res.data;
};

/**
 * 간단 체력 측정 결과 계산 API
 * @param data FitnessGeneralRequest
 * @returns FitnessResponse
 */
export const postGeneralFitness = async (
  data: FitnessGeneralRequest
): Promise<FitnessResponse> => {
  const res = await axiosConfig.post("/api/fitness/general", data);
  return res.data;
};

/**
 * 체력 측정 결과 가져오기 API
 * @returns ApiResponse<FitnessResponse>
 */
export const getFitnessResult = async (): Promise<
  ApiResponse<FitnessResponse>
> => {
  const res = await axiosConfig.get("/api/fitness/result");
  return res.data;
};
