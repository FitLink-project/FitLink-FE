import { useEffect } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import ErrorMessage from "./ErrorMessage";

export interface TermsAgreementProps {
  allAgree: boolean;
  privacyAgree: boolean;
  serviceAgree: boolean;
  over14Agree: boolean;
  locationAgree: boolean;
  onAllAgreeChange: (checked: boolean) => void;
  onPrivacyAgreeChange: (checked: boolean) => void;
  onServiceAgreeChange: (checked: boolean) => void;
  onOver14AgreeChange: (checked: boolean) => void;
  onLocationAgreeChange: (checked: boolean) => void;
  termsError?: boolean;
  termsErrorMessage?: string;
  className?: string;
}

export default function TermsAgreement({
  allAgree,
  privacyAgree,
  serviceAgree,
  over14Agree,
  locationAgree,
  onAllAgreeChange,
  onPrivacyAgreeChange,
  onServiceAgreeChange,
  onOver14AgreeChange,
  onLocationAgreeChange,
  termsError = false,
  termsErrorMessage = "",
  className = "",
}: TermsAgreementProps) {
  // 4개 약관이 모두 선택되면 전체 동의도 자동 선택
  useEffect(() => {
    const allChecked = privacyAgree && serviceAgree && over14Agree && locationAgree;
    if (allChecked !== allAgree) {
      onAllAgreeChange(allChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [privacyAgree, serviceAgree, over14Agree, locationAgree]);

  return (
    <div className={`w-[345px] mt-4 mb-4 ${className}`}>
      <div className="mb-3">
        <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <span className="text-lg font-semibold text-softBlack font-mplus1 leading-[150%]">약관 전체 동의</span>
          <Checkbox
            checked={allAgree}
            onChange={onAllAgreeChange}
            error={termsError && !allAgree}
          />
        </label>
      </div>
      <div className="border-t border-lineGray mb-3"></div>
      <div className="space-y-2 pl-3">
        <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <span className="text-sm text-gray font-mplus1 leading-[100%]">
            <Link to="/privacy-agreement" className="underline" onClick={(e) => e.stopPropagation()}>개인정보 수집/이용</Link> <span className="text-gray"> 동의(필수)</span>
          </span>
          <Checkbox
            checked={privacyAgree}
            onChange={onPrivacyAgreeChange}
            error={termsError && !privacyAgree}
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <span className="text-sm text-gray font-mplus1 leading-[100%]">
            서비스<Link to="/service-terms" className="underline" onClick={(e) => e.stopPropagation()}> 이용약관</Link> <span className="text-gray">(필수)</span>
          </span>
          <Checkbox
            checked={serviceAgree}
            onChange={onServiceAgreeChange}
            error={termsError && !serviceAgree}
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <span className="text-sm text-gray font-mplus1 leading-[100%]">
            <span>만 14세 이상 서비스 이용 동의</span> <span className="text-gray">(필수)</span>
          </span>
          <Checkbox
            checked={over14Agree}
            onChange={onOver14AgreeChange}
            error={termsError && !over14Agree}
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
          <span className="text-sm text-gray font-mplus1 leading-[100%]">
            <Link to="/location-service" className="underline" onClick={(e) => e.stopPropagation()}>위치기반 서비스</Link> <span className="text-gray"> 이용약관(필수)</span>
          </span>
          <Checkbox
            checked={locationAgree}
            onChange={onLocationAgreeChange}
            error={false}
          />
        </label>
      </div>
      {termsError && termsErrorMessage && (
        <div className="mt-4">
          <ErrorMessage message={termsErrorMessage} style={{ justifyContent: 'flex-start' }} />
        </div>
      )}
    </div>
  );
}

