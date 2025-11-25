import { 
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
  formData.append('agreements', JSON.stringify(signupData.agreements));
  
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

