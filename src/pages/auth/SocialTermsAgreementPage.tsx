import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import TermsAgreement from "../../components/TermsAgreement";
import { useUser } from "../../contexts/UserContext";
import { editProfile } from "../../api/user";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export default function SocialTermsAgreementPage() {
  const [allAgreed, setAllAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [serviceAgreed, setServiceAgreed] = useState(false);
  const [over14Agreed, setOver14Agreed] = useState(false);
  const [locationAgreed, setLocationAgreed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [termsErrorMessage, setTermsErrorMessage] = useState("");

  const { setTokenAndLoadUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAllAgree = (checked: boolean) => {
    setAllAgreed(checked);
    setPrivacyAgreed(checked);
    setServiceAgreed(checked);
    setOver14Agreed(checked);
    setLocationAgreed(checked);
    if (termsError) {
      setTermsError(false);
      setTermsErrorMessage("");
    }
  };

  const handlePrivacyAgreeChange = (checked: boolean) => {
    setPrivacyAgreed(checked);
    if (termsError) {
      setTermsError(false);
      setTermsErrorMessage("");
    }
  };

  const handleServiceAgreeChange = (checked: boolean) => {
    setServiceAgreed(checked);
    if (termsError) {
      setTermsError(false);
      setTermsErrorMessage("");
    }
  };

  const handleOver14AgreeChange = (checked: boolean) => {
    setOver14Agreed(checked);
    if (termsError) {
      setTermsError(false);
      setTermsErrorMessage("");
    }
  };

  const handleLocationAgreeChange = (checked: boolean) => {
    setLocationAgreed(checked);
    if (termsError) {
      setTermsError(false);
      setTermsErrorMessage("");
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 필수 항목 체크
  if (!privacyAgreed || !serviceAgreed || !over14Agreed) {
    setTermsError(true);
    setTermsErrorMessage("필수 약관에 동의해주세요");
    return;
  }

  setIsLoading(true);

  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // 🔹 프로필 수정 API 호출 (약관만 수정)
    await editProfile(
      {
        agreements: {
          privacy: privacyAgreed,
          service: serviceAgreed,
          over14: over14Agreed,
          location: locationAgreed,
        },
      },
      token,
    );

    await setTokenAndLoadUser(token);
    navigate("/signup/complete");
  } catch (err) {
    console.error("약관 동의 실패:", err);
    setTermsError(true);
    if (!termsErrorMessage) {
      setTermsErrorMessage("약관 동의 처리 중 오류가 발생했습니다.");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="w-full">
      <PageHeader title="회원가입" />
      
      <div className="min-h-[calc(100vh-60px)] w-full flex items-center justify-center bg-backgroundGray px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-lg p-6 animate-slideUpFadeIn">
            {/* 제목 */}
            <div className="text-center mb-6 mt-4">
              <h2 className="text-[20px] font-semibold text-softBlack font-pretendard leading-[150%] tracking-normal">
                <span className="text-main">FitLink의 약관에 동의해 주세요</span>
              </h2>
            </div>

            {/* 약관 동의 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <TermsAgreement
                  allAgree={allAgreed}
                  privacyAgree={privacyAgreed}
                  serviceAgree={serviceAgreed}
                  over14Agree={over14Agreed}
                  locationAgree={locationAgreed}
                  onAllAgreeChange={handleAllAgree}
                  onAllAgreeSync={(checked: boolean) => {
                    setAllAgreed(checked);
                  }}
                  onPrivacyAgreeChange={handlePrivacyAgreeChange}
                  onServiceAgreeChange={handleServiceAgreeChange}
                  onOver14AgreeChange={handleOver14AgreeChange}
                  onLocationAgreeChange={handleLocationAgreeChange}
                  termsError={termsError}
                  termsErrorMessage={termsErrorMessage}
                  className="w-full"
                />

              {/* 다음 버튼 */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="main"
                  state={isLoading ? "default" : "default"}
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
                    "다음"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

