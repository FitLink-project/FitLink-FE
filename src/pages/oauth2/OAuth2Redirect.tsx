import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export default function OAuth2Redirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("처리 중...");

  useEffect(() => {
    // 디버깅: 현재 URL과 모든 파라미터 출력
    console.log("현재 URL:", window.location.href);
    console.log("Location:", location);
    console.log("모든 URL 파라미터:", Object.fromEntries(searchParams.entries()));

    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const errorMessage = searchParams.get("message");
    const needsEmailUpdate = searchParams.get("needsEmailUpdate") === "true";

    console.log("토큰:", token ? "있음" : "없음");
    console.log("에러:", error);
    console.log("에러 메시지:", errorMessage);

    // 에러 처리
    if (error) {
      console.error("OAuth2 로그인 실패:", error, errorMessage);
      setStatus(`로그인에 실패했습니다: ${errorMessage || error}`);
      
      setTimeout(() => {
        navigate("/login?error=oauth2_failed");
      }, 3000);
      return;
    }

    // 토큰이 없는 경우
    if (!token) {
      console.error("토큰이 없습니다. URL 파라미터를 확인하세요.");
      console.log("전체 URL:", window.location.href);
      setStatus("토큰을 받지 못했습니다. 잠시 후 로그인 페이지로 이동합니다...");
      
      setTimeout(() => {
        navigate("/login?error=no_token");
      }, 3000);
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

  const handleRetry = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
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
        <p className="text-gray-700 text-lg mb-4">{status}</p>
        {status.includes("받지 못했습니다") && (
          <button
            onClick={handleRetry}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            로그인 페이지로 돌아가기
          </button>
        )}
        <p className="text-sm text-gray-500 mt-4">
          문제가 계속되면 브라우저 개발자 도구(F12)의 콘솔을 확인해주세요.
        </p>
      </div>
    </div>
  );
}

