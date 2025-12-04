/**
 * AI 운동 처방 요청 DTO
 * 백엔드 AIPrescriptionRequestDTO 매핑
 */
export interface AIPrescriptionRequest {
  age: number; // MESURE_AGE_CO → 나이
  gender: 0 | 1; // SEXDSTN_FLAG_CD → 성별 (0: 여자, 1: 남자)
  height: number; // MESURE_IEM_001_VALUE → 키(cm)
  weight: number; // MESURE_IEM_002_VALUE → 몸무게(kg)
}

/**
 * AI 운동 처방 응답 DTO
 * 백엔드 AIPrescriptionResponseDTO 매핑
 */
export interface AIPrescriptionResponse {
  warmup: string[]; // 준비운동 리스트
  mainExercise: string[]; // 본운동 리스트
  cooldown: string[]; // 마무리운동 리스트
}
