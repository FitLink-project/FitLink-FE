/**
 * 국민 체력 100 평가 요청 DTO
 * 백엔드 FitnessKookminRequestDTO 매핑
 */
export interface FitnessKookminRequest {
  // Step 1: 기본 정보
  sex: "M" | "F";
  birthDate: string; // YYYYMMDD
  height: number | null;
  weight: number | null;

  // Step 2: 체력 측정 세부 항목
  gripStrength: number | null; // 악력
  shuttleRun: number | null; // 왕복오래달리기
  sprint: number | null; // 왕복달리기
  standingLongJump: number | null; // 제자리멀리뛰기
  sitAndReach: number | null; // 앉아윗몸앞으로굽히기
  sitUp: number | null; // 윗몸말아올리기
  crossSitUp: number | null; // 교차윗몸일으키기
}

/**
 * 간단 체력 평가 요청 DTO
 * 백엔드 FitnessGeneralRequestDTO 매핑
 */
export interface FitnessGeneralRequest {
  // Step 1: 기본 정보
  sex: "M" | "F";
  birthDate: string; // YYYYMMDD
  height: number | null;
  weight: number | null;

  // 체력 측정 세부 항목
  sitUp: number | null; // 윗몸말아올리기
  sitAndReach: number | null; // 앉아윗몸앞으로굽히기
  ymcaStepTest: number | null; // YMCA 스텝 테스트
  sliderStrength: number | null; // 슬라이더 근력
  sliderPower: number | null; // 슬라이더 순발력
  sliderAgility: number | null; // 슬라이더 민첩성
}

/**
 * 체력 평가 결과 응답 DTO
 * 백엔드 FitnessResponseDTO 매핑
 */
export interface FitnessResponse {
  // 1. 체력 점수
  strength: number | null; // 근력
  muscular: number | null; // 근지구력
  flexibility: number | null; // 유연성
  cardiopulmonary: number | null; // 심폐지구력
  agility: number | null; // 민첩성
  quickness: number | null; // 순발력

  // 2. 포함된 객체 정보
  average: FitnessAverage | null; // 대한민국 평균 데이터
  userInfo: UserInfo | null; // 사용자 신체 정보

  // 3. 상세 측정 기록
  testKookmin: TestKookminData | null; // 국민체력 100 상세 기록
  testGeneral: TestGeneralData | null; // 간단 체력 상세 기록
}

/**
 * 대한민국 평균 측정값
 * FitnessResponseDTO.FitnessAverage
 */
export interface FitnessAverage {
  gripStrength: number | null;
  sitUp: number | null;
  sitAndReach: number | null;
  shuttleRun: number | null;
  sprint: number | null;
  standingLongJump: number | null;
}

/**
 * 사용자 신체 정보
 * FitnessResponseDTO.UserInfo
 */
export interface UserInfo {
  sex: "M" | "F";
  birthDate: string; // YYYYMMDD
  height: number | null;
  weight: number | null;
}

/**
 * 국민체력 100 상세 기록
 * FitnessResponseDTO.TestKookminDTO 매핑
 */
export interface TestKookminData {
  gripStrength: number | null; // 악력
  sitUp: number | null; // 윗몸일으키기
  sitAndReach: number | null; // 앉아윗몸앞으로굽히기
  shuttleRun: number | null; // 왕복오래달리기
  sprint: number | null; // 왕복달리기
  standingLongJump: number | null; // 제자리멀리뛰기
}

/**
 * 간단 체력 상세 기록
 * FitnessResponseDTO.TestGeneralDTO 매핑
 */
export interface TestGeneralData {
  sliderStrength: number | null; // 슬라이더 근력
  sitUp: number | null; // 윗몸일으키기
  sitAndReach: number | null; // 앉아윗몸앞으로굽히기
  ymcaStepTest: number | null; // YMCA 스텝 테스트
  sliderAgility: number | null; // 슬라이더 민첩성
  sliderPower: number | null; // 슬라이더 순발력
}
