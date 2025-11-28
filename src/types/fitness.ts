export interface FitnessKookminRequest {
  // Step 1: 기본 정보
  gender: string;
  birthDate: string; // YYYYMMDD
  height: number;
  weight: number;

  // Step 2: 체력 측정 세부 항목
  grip_strength: number; // 악력 (decimal)
  shuttle_run: number; // 왕복오래달리기 (int)
  sprint: number; // 왕복달리기 (decimal)
  standing_long_jump: number; // 제자리멀리뛰기 (decimal)
  sit_and_reach: number; // 앉아윗몸앞으로굽히기 (decimal)

  // Step 3: 근지구력
  sit_up: number; // 윗몸말아올리기 (int)
}
