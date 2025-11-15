import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "https://www.fitlink1207.store";

export default function OAuth2Redirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("처리 중...");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const errorMessage = searchParams.get("message");
    const needsEmailUpdate = searchParams.get("needsEmailUpdate") === "true";

    // 에러 처리
    if (error) {
      console.error("OAuth2 로그인 실패:", error, errorMessage);
      setStatus("로그인에 실패했습니다.");
      
      setTimeout(() => {
        navigate("/login?error=oauth2_failed");
      }, 2000);
      return;
    }

    // 토큰이 없는 경우
    if (!token) {
      console.error("토큰이 없습니다.");
      setStatus("토큰을 받지 못했습니다.");
      
      setTimeout(() => {
        navigate("/login?error=no_token");
      }, 2000);
      return;
    }

    // 토큰 저장
    try {
      localStorage.setItem("accessToken", token);
      console.log("로그인 성공! 토큰 저장 완료");

      // 이메일 업데이트가 필요한 경우
      if (needsEmailUpdate) {
        setStatus("이메일 입력이 필요합니다...");
        
        setTimeout(() => {
          navigate("/auth/email-required");
        }, 1000);
      } else {
        // 정상 로그인 완료
        setStatus("로그인 성공! 메인 페이지로 이동합니다...");
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.error("토큰 저장 오류:", err);
      setStatus("토큰 저장 중 오류가 발생했습니다.");
      
      setTimeout(() => {
        navigate("/login?error=token_save_failed");
      }, 2000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto"
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
        </div>
        <p className="text-gray-700 text-lg">{status}</p>
      </div>
    </div>
  );
}

