// 회원가입 관련 타입
export interface Agreements {
  privacy: boolean;
  service: boolean;
  over14: boolean;
  location?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  agreements: Agreements;
  img?: File;
}

// 로그인 관련 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 공통 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
}

// API 에러 타입
export interface ApiError {
  isSuccess: false;
  code: string;
  message: string;
  result: null;
}

// 에러 코드 상수
export const ERROR_CODES = {
  // 공통 에러
  COMMON400: 'COMMON400',
  COMMON500: 'COMMON500',
  
  // 사용자 에러
  USER4001: 'USER4001', // 올바른 이메일 형식이 아닙니다
  USER4002: 'USER4002', // 올바른 비밀번호 형식이 아닙니다
  USER4011: 'USER4011', // 이메일 또는 비밀번호가 올바르지 않습니다
  USER4031: 'USER4031', // 중복된 이메일입니다
  USER4032: 'USER4032', // 비활성화된 사용자입니다
  USER4041: 'USER4041', // 사용자를 찾을 수 없습니다
} as const;

// 회원가입 응답 타입
export interface SignupResponse {
  userId: number;
  createdAt: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  userId: number;
  accessToken: string;
}

//프로필 수정 요청 (부분 업데이트)
export interface EditProfileRequest {
  name?: string;
  email?: string;
  password?: string;
  agreements?: {
    privacy?: boolean;
    service?: boolean;
    over14?: boolean;
    location?: boolean;
  };
  img?: File;
}

// 프로필 수정 결과 (백엔드 result와 동일)
export interface EditProfileResult {
  userId: number;
  email: string;
  name: string;
  profileUrl: string;
  isActive: boolean;
  regDate: string;
  provider: string;
  deleteDate: string | null;
  agreements: {
    privacy: boolean;
    service: boolean;
    over14: boolean;
    location: boolean;
  };
}

// 프로필 수정 응답 타입
export type EditProfileResponse = ApiResponse<EditProfileResult>;

// 프로필 조회 결과 타입
export interface ProfileResult {
  userId: number;
  email: string;
  name: string;
  profileUrl: string;
  isActive: boolean;
  regDate: string;
  provider: string;
  deleteDate: string | null;
  agreements: {
    privacy: boolean;
    service: boolean;
    over14: boolean;
    location: boolean;
  };
  //users_info에서 오는 추가 필드
  height: number | null;
  weight: number | null;
  birthDate: string | null; // "YYYYMMDD"
  sex: "M" | "F" | null;
}

export type ProfileResponse = ApiResponse<ProfileResult>;

// 회원탈퇴 결과 타입
export interface DeleteUserResult {
  userId: number;
  email: string;
  isActive: boolean;
  regDate: string;
  provider: string;
  deleteDate: string | null;
}

export type DeleteUserResponse = ApiResponse<DeleteUserResult>;
