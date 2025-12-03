/**
 * 국민체력100 동영상 API 응답 최상위 DTO
 * 백엔드 FitnessVideoResponseDTO 매핑
 */
export interface FitnessVideoResponse {
  response: FitnessVideoResponseData;
}

/**
 * 응답 데이터 래퍼 (Header + Body)
 * 백엔드 FitnessVideoResponseDTO.Response 매핑
 */
export interface FitnessVideoResponseData {
  header: FitnessVideoHeader;
  body: FitnessVideoBody;
}

/**
 * API 응답 헤더 (결과 코드 및 메시지)
 * 백엔드 FitnessVideoResponseDTO.Header 매핑
 */
export interface FitnessVideoHeader {
  resultCode: string;
  resultMsg: string;
}

/**
 * API 응답 바디 (페이징 정보 및 아이템 목록)
 * 백엔드 FitnessVideoResponseDTO.Body 매핑
 */
export interface FitnessVideoBody {
  pageNo: number; // 페이지 번호
  totalCount: number; // 전체 결과 수
  numOfRows: number; // 한 페이지당 결과 수
  items: FitnessVideoItems; // 아이템 리스트 래퍼
}

/**
 * 동영상 아이템 리스트 래퍼
 * 백엔드 FitnessVideoResponseDTO.Items 매핑
 */
export interface FitnessVideoItems {
  item: FitnessVideoDetail[];
}

/**
 * 개별 동영상 상세 정보
 * 백엔드 FitnessVideoResponseDTO.Item 매핑
 */
export interface FitnessVideoDetail {
  rptt_tcnt_nm: string; // 반복 횟수 명칭 (예: 1회)
  file_url: string; // 파일 기본 URL (경로)
  vdo_desc: string; // 동영상 설명
  file_sz: number; // 파일 크기 (int)
  fps_cnt: number; // FPS (double)
  row_num: number; // 행 번호 (int)
  resolution: string; // 해상도
  tool_nm: string; // 도구 명칭
  aggrp_nm: string; // 연령대 명칭
  frme_no: number; // 프레임 번호 (int)
  img_file_nm: string; // 썸네일 이미지 파일명
  fbctn_yr: string; // 제작 년도
  vdo_len: string; // 영상 길이
  lang: string; // 언어
  trng_nm: string; // 운동 명칭 (트레이닝명)
  job_ymd: string; // 작업 일자
  ftns_fctr_nm: string; // 체력 요인 명칭 (예: 근력, 유연성)
  vdo_ttl_nm: string; // 동영상 제목
  snap_tm: number; // 스냅 타임 (double)
  file_type_nm: string; // 파일 타입 (예: mp4)
  file_nm: string; // 파일명 (확장자 포함)
  img_file_url: string; // 썸네일 이미지 URL
  img_file_sn: number; // 이미지 파일 순번 (int)
  data_type: string; // 데이터 타입
  chck_se_nm: string; // 검사 구분 명칭
  msrmt_part_nm: string; // 측정 부위 명칭
}
