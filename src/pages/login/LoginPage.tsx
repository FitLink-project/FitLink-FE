import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import LinkMove from "../../components/LinkMove";
import { login } from "../../api/user";
import { ERROR_CODES, type ApiError } from "../../types/user";
import logoBlue from "../../assets/Full_Logo/logo-blue.png";
import kakaoIcon from "../../assets/SocialIcon/kakao-icon.png";
import kakaoIconClicked from "../../assets/SocialIcon/kakao-icon-clicked.png";
import googleIcon from "../../assets/SocialIcon/google-icon.png";
import googleIconClicked from "../../assets/SocialIcon/google-icon-clicked.png";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "https://www.fitlink1207.store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [kakaoClicked, setKakaoClicked] = useState(false);
  const [googleClicked, setGoogleClicked] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL 파라미터에서 에러 확인
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      if (urlError === "oauth2_failed") {
        setError("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
      } else if (urlError === "no_token") {
        setError("토큰을 받지 못했습니다. 다시 로그인해주세요.");
      } else if (urlError === "token_save_failed") {
        setError("토큰 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationError("");
    setEmailError(false);
    setPasswordError(false);

    // 간단한 유효성 검사
    const hasEmail = email.trim() !== "";
    const hasPassword = password.trim() !== "";
    const isValidEmail = hasEmail && email.includes("@");

    // 에러 메시지 및 필드 에러 상태 결정
    let errorMessage = "";
    if (!hasEmail && !hasPassword) {
      errorMessage = "이메일과 비밀번호를 정확히 입력해주세요";
      setEmailError(true);
      setPasswordError(true);
    } else if (!hasEmail) {
      errorMessage = "이메일을 입력해주세요";
      setEmailError(true);
    } else if (!isValidEmail) {
      errorMessage = "올바른 이메일 형식을 입력해주세요";
      setEmailError(true);
    } else if (!hasPassword) {
      errorMessage = "비밀번호를 입력해주세요";
      setPasswordError(true);
    }

    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ email, password });
      
      if (response.isSuccess && response.result) {
        // accessToken 저장
        localStorage.setItem('accessToken', response.result.accessToken);
        // 홈으로 이동
        navigate("/");
      }
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = "① 이메일과 비밀번호를 정확히 입력해주세요";
      
      // 에러 코드에 따라 다른 메시지 표시
      switch (apiError.code) {
        case ERROR_CODES.COMMON400:
          errorMessage = "① 잘못된 요청입니다.";
          break;
        case ERROR_CODES.USER4001:
          errorMessage = "① 올바른 이메일 형식이 아닙니다.";
          setEmailError(true);
          break;
        case ERROR_CODES.USER4011:
          errorMessage = "① 이메일 또는 비밀번호가 올바르지 않습니다.";
          setEmailError(true);
          setPasswordError(true);
          break;
        case ERROR_CODES.USER4032:
          errorMessage = "① 비활성화된 사용자입니다.";
          break;
        case ERROR_CODES.USER4041:
          errorMessage = "① 사용자를 찾을 수 없습니다.";
          setEmailError(true);
          break;
        case ERROR_CODES.COMMON500:
          errorMessage = "① 서버 에러, 관리자에게 문의 바랍니다.";
          break;
        default:
          errorMessage = apiError.message || "① 로그인에 실패했습니다.";
      }
      
      setValidationError(errorMessage);
      console.error("로그인 실패:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="animate-slideUpFadeIn">
          {/* 헤더 - FitLink 로고 */}
          <div className="text-center mb-10">
            <img
              src={logoBlue}
              alt="FitLink"
              className="mx-auto"
              style={{ width: '204px', height: '50px' }}
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 flex justify-center">
              <ErrorMessage message={error} />
            </div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
            <div className="flex flex-col gap-2">
              {/* 이메일 입력 */}
              <div className="flex flex-col items-center">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    if (validationError) setValidationError("");
                    if (emailError) setEmailError(false);
                  }}
                  placeholder="이메일"
                  disabled={isLoading}
                  error={emailError}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                      if (validationError) setValidationError("");
                      if (passwordError) setPasswordError(false);
                    }}
                    placeholder="비밀번호"
                    disabled={isLoading}
                    error={passwordError}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {validationError && (
                  <div className="w-[345px]">
                    <ErrorMessage message={validationError} />
                  </div>
                )}
              </div>
            </div>

            {/* 로그인 버튼 */}
            <div className="mt-4">
            <Button
              type="submit"
              variant="main"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  로그인 중...
                </span>
              ) : (
                "로그인"
              )}
            </Button>
            </div>
          </form>

          {/* 회원가입 링크 */}
          <div className="mb-6 text-center">
            <p className="text-xs text-[#888888] font-medium leading-[100%] font-mplus1">
              아직 회원이 아니신가요?{" "}
              <LinkMove text="회원가입하기" />
            </p>
          </div>

          {/* 또는 구분선 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lineGray"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-secondGray">또는</span>
            </div>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="flex justify-center gap-8">
            {/* 카카오톡 로그인 */}
            <button
              type="button"
              onClick={handleKakaoLogin}
              onMouseDown={() => setKakaoClicked(true)}
              onMouseUp={() => setKakaoClicked(false)}
              onMouseLeave={() => setKakaoClicked(false)}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 transition-opacity disabled:opacity-50 group"
            >
              <img
                src={kakaoIcon}
                alt="카카오톡"
                className={`w-12 h-12 ${kakaoClicked ? 'hidden' : 'block group-hover:hidden'}`}
              />
              <img
                src={kakaoIconClicked}
                alt="카카오톡"
                className={`w-12 h-12 ${kakaoClicked ? 'block' : 'hidden group-hover:block'}`}
              />
              <span className="text-xs text-[#888888] font-medium leading-[100%] font-mplus1">카카오톡</span>
            </button>

            {/* 구글 로그인 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              onMouseDown={() => setGoogleClicked(true)}
              onMouseUp={() => setGoogleClicked(false)}
              onMouseLeave={() => setGoogleClicked(false)}
              disabled={isLoading}
              className="flex flex-col items-center gap-2 transition-opacity disabled:opacity-50 group"
            >
              <img
                src={googleIcon}
                alt="구글"
                className={`w-12 h-12 ${googleClicked ? 'hidden' : 'block group-hover:hidden'}`}
              />
              <img
                src={googleIconClicked}
                alt="구글"
                className={`w-12 h-12 ${googleClicked ? 'block' : 'hidden group-hover:block'}`}
              />
              <span className="text-xs text-[#888888] font-medium leading-[100%] font-mplus1">구글</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

