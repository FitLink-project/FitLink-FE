/**
 * API 응답 타입
 * @param T 실제 데이터(DTO) 타입
 * @returns ApiResponse<T>
 */
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
}
