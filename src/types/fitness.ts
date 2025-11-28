export interface FitnessKookminRequest {
  // Step 1: 기본 정보
  gender: "M" | "F";
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

export interface FitnessGeneralRequest {
  // Step 1: 기본 정보
  gender: "M" | "F";
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
