import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { CheckCircle } from "react-feather";

export default function SignupCompletePage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="animate-slideUpFadeIn">
          {/* 헤더 - FitLink 로고 */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-blue-500">Fit</span>
              <span className="text-gray-900">Link</span>
            </h1>
          </div>

          {/* 완료 메시지 */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-main rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-softWhite" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              회원가입이 완료되었습니다
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              FitLink에 오신 것을 환영합니다!
              <br />
              이제 로그인하여 서비스를 이용하실 수 있습니다.
            </p>
          </div>

          {/* 확인 버튼 */}
          <div className="w-full">
            <Button
              type="button"
              variant="main"
              state="hover"
              onClick={handleComplete}
              className="w-full"
            >
              로그인하러 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

