/**
 * Fitness Video 관련 API 모듈
 */

import { axiosConfig } from "./axios.config";
import type { FitnessVideoResponse } from "../types/video";
import type { ApiResponse } from "../types/api";

/**
 * 국민체력100 동영상 목록 조회 API
 *
 * @param fitnessFactor 검색할 운동 키워드 (예: "근력", "유연성")
 * @param pageNo 페이지 번호 (기본값: 1)
 * @param numOfRows 한 페이지당 결과 수 (기본값: 10)
 * @returns ApiResponse<FitnessVideoResponse>
 */
export const getFitnessVideos = async (
  fitnessFactor: string,
  pageNo: number = 1,
  numOfRows: number = 10
): Promise<ApiResponse<FitnessVideoResponse>> => {
  const res = await axiosConfig.get("/api/video", {
    params: {
      fitnessFactor,
      pageNo,
      numOfRows,
    },
  });
  return res.data;
};

/**
 * 동영상 스트리밍 URL 생성 함수
 * * 주의: 이 함수는 실제 네트워크 요청을 보내지 않습니다.
 * <video> 태그의 src 속성에 넣을 '주소 문자열'만 생성합니다.
 * 백엔드에서 url 파라미터로 file_url과 file_nm을 합친 전체 URL을 받습니다.
 *
 * @param fileUrl API 응답의 file_url (파일 기본 경로)
 * @param fileNm API 응답의 file_nm (파일명)
 * @returns 백엔드 스트리밍 엔드포인트 URL 문자열
 */
export const getVideoStreamUrl = (fileUrl: string, fileNm: string): string => {
  // 1. 공공데이터 API의 두 값을 합쳐 전체 외부 URL 생성
  // (가끔 API 데이터에 공백이 있을 수 있으니 trim 처리)
  const fullRemoteUrl = `${fileUrl.trim()}${fileNm.trim()}`;

  // 2. URL 인코딩 (필수! URL 안에 /, : 등이 들어있기 때문)
  const encodedUrl = encodeURIComponent(fullRemoteUrl);

  // 3. 현재 프론트엔드가 바라보는 백엔드 API 주소(baseURL)와 결합
  // 예: http://localhost:8080/api/video/stream?url=http%3A%2F%2F...
  const baseURL = axiosConfig.defaults.baseURL || "";

  // 4. 인증 토큰이 필요한 경우 쿼리 파라미터로 추가
  // video 태그는 자동으로 Authorization 헤더를 보낼 수 없으므로
  const token = localStorage.getItem("accessToken");
  const tokenParam = token ? `&token=${encodeURIComponent(token)}` : "";

  return `${baseURL}/api/video/stream?url=${encodedUrl}${tokenParam}`;
};
