import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function PrivacyAgreementPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    if (agreed) {
      // TODO: 실제 API 호출로 대체
      // const response = await submitPrivacyAgreement();
      navigate(-1); // 이전 페이지로 돌아가기
    }
  };

  const handleDisagree = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="animate-slideUpFadeIn">
          {/* 헤더 - FitLink 로고 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-blue-500">Fit</span>
              <span className="text-gray-900">Link</span>
            </h1>
            <p className="text-lg text-gray-600 mt-2">개인정보 수집 및 이용 동의</p>
          </div>

          {/* 개인정보 수집 동의 내용 */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <section>
                <h3 className="font-semibold text-base text-gray-900 mb-2">
                  1. 수집하는 개인정보 항목
                </h3>
                <p>
                  FitLink는 회원가입, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>필수항목: 이메일, 비밀번호</li>
                  <li>선택항목: 닉네임, 프로필 사진</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base text-gray-900 mb-2">
                  2. 개인정보의 수집 및 이용 목적
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>회원 가입 및 관리: 회원 식별, 서비스 이용에 따른 본인 확인</li>
                  <li>서비스 제공: 운동 기록 관리, 커뮤니티 서비스 제공</li>
                  <li>서비스 개선: 신규 서비스 개발, 맞춤 서비스 제공</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base text-gray-900 mb-2">
                  3. 개인정보의 보유 및 이용 기간
                </h3>
                <p>
                  회원 탈퇴 시까지 보유하며, 탈퇴 시 즉시 파기합니다.
                  단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base text-gray-900 mb-2">
                  4. 개인정보의 제3자 제공
                </h3>
                <p>
                  FitLink는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
                  다만, 아래의 경우에는 예외로 합니다.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base text-gray-900 mb-2">
                  5. 동의 거부 권리 및 불이익
                </h3>
                <p>
                  귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
                  다만, 필수 항목에 대한 동의를 거부하실 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.
                </p>
              </section>
            </div>
          </div>

          {/* 동의 체크박스 */}
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 transition-all ${
                agreed
                  ? "bg-main border-main"
                  : "bg-white border-gray-300"
              }`}>
                {agreed && (
                  <svg className="w-3.5 h-3.5 text-softWhite" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">
                위 개인정보 수집 및 이용에 동의합니다.
              </span>
            </label>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="backgroundGray"
              state="hover"
              onClick={handleDisagree}
              className="flex-1"
            >
              거부
            </Button>
            <Button
              type="button"
              variant="main"
              state={agreed ? "hover" : "default"}
              onClick={handleAgree}
              disabled={!agreed}
              className="flex-1"
            >
              동의
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

