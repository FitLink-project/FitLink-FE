import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Check } from "react-feather";

export default function SocialTermsAgreementPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAllAgree = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setTermsAgreed(newValue);
    setPrivacyAgreed(newValue);
    setMarketingAgreed(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAgreed || !privacyAgreed) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: 실제 API 호출로 대체
      // const response = await submitTermsAgreement({ termsAgreed, privacyAgreed, marketingAgreed });
      
      // 임시: 1초 후 회원가입 완료 페이지로 이동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/signup/complete");
    } catch (err) {
      console.error("약관 동의 실패:", err);
      alert("약관 동의 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
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
            <p className="text-lg text-gray-600 mt-2">추가 약관 동의</p>
          </div>

          {/* 약관 동의 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* 전체 동의 */}
            <div className="pb-4 border-b border-gray-200">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allAgreed}
                  onChange={handleAllAgree}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-6 h-6 rounded border-2 mr-3 transition-all ${
                  allAgreed
                    ? "bg-main border-main"
                    : "bg-white border-gray-300"
                }`}>
                  {allAgreed && <Check className="w-4 h-4 text-softWhite" />}
                </div>
                <span className="text-base font-semibold text-gray-900">
                  전체 동의
                </span>
              </label>
            </div>

            {/* 필수 약관 */}
            <div className="space-y-3">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => {
                    setTermsAgreed(e.target.checked);
                    if (!e.target.checked) setAllAgreed(false);
                  }}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 mt-0.5 transition-all flex-shrink-0 ${
                  termsAgreed
                    ? "bg-main border-main"
                    : "bg-white border-gray-300"
                }`}>
                  {termsAgreed && <Check className="w-3.5 h-3.5 text-softWhite" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-700">
                    서비스 이용약관 동의
                  </span>
                  <span className="text-sm text-red-500 ml-1">(필수)</span>
                  <button
                    type="button"
                    className="text-xs text-gray-500 ml-2 underline hover:text-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: 약관 상세 보기 모달 또는 페이지로 이동
                    }}
                  >
                    보기
                  </button>
                </div>
              </label>

              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => {
                    setPrivacyAgreed(e.target.checked);
                    if (!e.target.checked) setAllAgreed(false);
                  }}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 mt-0.5 transition-all flex-shrink-0 ${
                  privacyAgreed
                    ? "bg-main border-main"
                    : "bg-white border-gray-300"
                }`}>
                  {privacyAgreed && <Check className="w-3.5 h-3.5 text-softWhite" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-700">
                    개인정보 수집 및 이용 동의
                  </span>
                  <span className="text-sm text-red-500 ml-1">(필수)</span>
                  <button
                    type="button"
                    className="text-xs text-gray-500 ml-2 underline hover:text-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/privacy-agreement");
                    }}
                  >
                    보기
                  </button>
                </div>
              </label>
            </div>

            {/* 선택 약관 */}
            <div className="pt-2">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingAgreed}
                  onChange={(e) => {
                    setMarketingAgreed(e.target.checked);
                    if (!e.target.checked) setAllAgreed(false);
                  }}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 mt-0.5 transition-all flex-shrink-0 ${
                  marketingAgreed
                    ? "bg-main border-main"
                    : "bg-white border-gray-300"
                }`}>
                  {marketingAgreed && <Check className="w-3.5 h-3.5 text-softWhite" />}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-700">
                    마케팅 정보 수신 동의
                  </span>
                  <span className="text-sm text-gray-500 ml-1">(선택)</span>
                </div>
              </label>
            </div>

            {/* 동의 버튼 */}
            <div className="w-full pt-4">
              <Button
                type="submit"
                variant="main"
                state={isLoading ? "default" : "hover"}
                disabled={isLoading || !termsAgreed || !privacyAgreed}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-softWhite"
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
                    처리 중...
                  </span>
                ) : (
                  "동의하고 계속하기"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

