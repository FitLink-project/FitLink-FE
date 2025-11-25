import type { 
  ApiResponse, 
  ApiError,
  SignupRequest, 
  LoginRequest, 
  SignupResponse, 
  LoginResponse 
} from '../types/user';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.fitlink1207.store';

/**
 * 회원가입 API
 * @param signupData 회원가입 데이터
 * @returns 회원가입 응답
 */
export async function signup(signupData: SignupRequest): Promise<ApiResponse<SignupResponse>> {
  const formData = new FormData();
  
  formData.append('name', signupData.name);
  formData.append('email', signupData.email);
  formData.append('password', signupData.password);
  
  // agreements 객체의 각 필드를 개별적으로 append
  formData.append('agreements.privacy', String(signupData.agreements.privacy));
  formData.append('agreements.service', String(signupData.agreements.service));
  formData.append('agreements.over14', String(signupData.agreements.over14));
  if (signupData.agreements.location !== undefined) {
    formData.append('agreements.location', String(signupData.agreements.location));
  }
  
  if (signupData.img) {
    formData.append('Img', signupData.img);
  }

  const response = await fetch(`${BASE_URL}/api/user/join`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      isSuccess: false,
      code: 'COMMON500',
      message: '서버 에러, 관리자에게 문의 바랍니다.',
      result: null,
    }));
    throw errorData;
  }

  return response.json();
}

/**
 * 로그인 API
 * @param loginData 로그인 데이터
 * @returns 로그인 응답
 */
export async function login(loginData: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(`${BASE_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      isSuccess: false,
      code: 'COMMON500',
      message: '서버 에러, 관리자에게 문의 바랍니다.',
      result: null,
    }));
    throw errorData;
  }

  return response.json();
}

