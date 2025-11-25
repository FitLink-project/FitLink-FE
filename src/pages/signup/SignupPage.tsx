import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import FormField from "../../components/FormField";
import PageHeader from "../../components/PageHeader";
import Checkbox from "../../components/Checkbox";
import { signup } from "../../api/user";
import { ERROR_CODES, type ApiError } from "../../types/user";
import addProfileIcon from "../../assets/profile/add-profile.png";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const [termsErrorMessage, setTermsErrorMessage] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [serviceAgree, setServiceAgree] = useState(false);
  const [over14Agree, setOver14Agree] = useState(false);
  const [locationAgree, setLocationAgree] = useState(false);
  const [allAgree, setAllAgree] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAllAgreeChange = (checked: boolean) => {
    setAllAgree(checked);
    setPrivacyAgree(checked);
    setServiceAgree(checked);
    setOver14Agree(checked);
    setLocationAgree(checked);
    if (termsError) setTermsError(false);
  };

  const handleIndividualAgreeChange = () => {
    if (termsError) setTermsError(false);
  };

  // 4개 약관이 모두 선택되면 전체 동의도 자동 선택
  useEffect(() => {
    const allChecked = privacyAgree && serviceAgree && over14Agree && locationAgree;
    setAllAgree(allChecked);
  }, [privacyAgree, serviceAgree, over14Agree, locationAgree]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setNameError(false);
    setNameErrorMessage("");
    setEmailError(false);
    setEmailErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMessage("");
    setTermsError(false);
    setTermsErrorMessage("");

    // 유효성 검사 - 각 필드별로 개별 검사
    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      setNameErrorMessage("이름을 입력해주세요");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError(true);
      setEmailErrorMessage("이메일을 입력해주세요");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError(true);
      setEmailErrorMessage("올바른 이메일 형식이 아닙니다");
      hasError = true;
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호를 입력해주세요");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 8자 이상이어야 합니다");
      hasError = true;
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 영문과 숫자를 포함해야 합니다");
      hasError = true;
    }

    if (!confirmPassword) {
      // 비밀번호가 입력되어 있는데 재입력이 비어있으면 에러 메시지 표시
      if (password) {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage("비밀번호를 한 번 더 입력해주세요");
        hasError = true;
      } else {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage("");
        hasError = true;
      }
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("비밀번호가 일치하지 않습니다");
      hasError = true;
    }

    if (!privacyAgree || !serviceAgree || !over14Agree) {
      setTermsError(true);
      setTermsErrorMessage("필수 약관에 동의해주세요");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        agreements: {
          privacy: privacyAgree,
          service: serviceAgree,
          over14: over14Agree,
          location: locationAgree,
        },
        img: profileImage || undefined,
      });

      if (response.isSuccess) {
        navigate("/signup/complete");
      }
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = "회원가입에 실패했습니다. 다시 시도해주세요.";

      switch (apiError.code) {
        case ERROR_CODES.COMMON400:
          errorMessage = "잘못된 요청입니다.";
          break;
        case ERROR_CODES.USER4001:
          errorMessage = "올바른 이메일 형식이 아닙니다.";
          setEmailError(true);
          break;
        case ERROR_CODES.USER4002:
          errorMessage = "올바른 비밀번호 형식이 아닙니다.";
          setPasswordError(true);
          break;
        case ERROR_CODES.USER4031:
          errorMessage = "중복된 이메일입니다.";
          setEmailError(true);
          break;
        case ERROR_CODES.COMMON500:
          errorMessage = "서버 에러, 관리자에게 문의 바랍니다.";
          break;
        default:
          errorMessage = apiError.message || "회원가입에 실패했습니다.";
      }

      setValidationError(errorMessage);
      console.error("회원가입 실패:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-sm mx-auto">
        <div className="animate-slideUpFadeIn">
          {/* 헤더 */}
          <PageHeader title="회원가입" />

          {/* 프로필 이미지 */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative"
            >
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="프로필"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <img
                  src={addProfileIcon}
                  alt="프로필 추가"
                  className="w-24 h-24"
                />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </button>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSubmit} noValidate className="mb-6 flex flex-col items-center">
            <div className="flex flex-col gap-2 w-full">
              {/* 이름 입력 */}
              <FormField
                label="이름"
                required
                error={nameError}
                errorMessage={nameErrorMessage}
              >
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                    if (nameError) {
                      setNameError(false);
                      setNameErrorMessage("");
                    }
                  }}
                  placeholder="이름을 입력해 주세요"
                  disabled={isLoading}
                  error={nameError}
                />
              </FormField>

              {/* 이메일 입력 */}
              <FormField
                label="이메일"
                required
                error={emailError}
                errorMessage={emailErrorMessage}
              >
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    if (emailError) {
                      setEmailError(false);
                      setEmailErrorMessage("");
                    }
                  }}
                  placeholder="example@example.com"
                  disabled={isLoading}
                  error={emailError}
                />
              </FormField>

              {/* 비밀번호 입력 및 확인 */}
              <div className="flex flex-col items-center">
                <div className="w-[345px] mb-1">
                  <label htmlFor="password" className="text-sm font-semibold text-softBlack font-mplus1">
                    비밀번호 <span className="text-xs text-[#888888] leading-[100%]">*필수 입력 항목입니다</span>
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    if (passwordError) {
                      setPasswordError(false);
                      setPasswordErrorMessage("");
                    }
                  }}
                    placeholder="영문/숫자/특수문자 혼합, 8자 이상"
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

                {/* 비밀번호 확인 입력 */}

                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) {
                      setConfirmPasswordError(false);
                      setConfirmPasswordErrorMessage("");
                    }
                  }}
                    placeholder="비밀번호를 한 번 더 입력해 주세요"
                    disabled={isLoading}
                    error={confirmPasswordError}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-gray-400 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {/* 에러 메시지 - 비밀번호 에러가 있으면 비밀번호 에러만, 없으면 비밀번호 확인 에러만 표시 */}
                {passwordError && passwordErrorMessage && (
                  <div className="w-[345px] mt-2">
                    <ErrorMessage message={passwordErrorMessage} style={{ justifyContent: 'flex-start' }} />
                  </div>
                )}
                {!passwordError && confirmPasswordError && confirmPasswordErrorMessage && (
                  <div className="w-[345px] mt-2">
                    <ErrorMessage message={confirmPasswordErrorMessage} style={{ justifyContent: 'flex-start' }} />
                  </div>
                )}
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="w-[345px] mt-4 mb-4">
              <div className="mb-3">
                <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <span className="text-lg font-semibold text-softBlack font-mplus1 leading-[150%]">약관 전체 동의</span>
                  <Checkbox
                    checked={allAgree}
                    onChange={handleAllAgreeChange}
                    error={termsError && !allAgree}
                  />
                </label>
              </div>
              <div className="border-t border-lineGray mb-3"></div>
              <div className="space-y-2 pl-3">
                <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <span className="text-sm text-gray font-mplus1 leading-[100%]">
                    <span className="underline">개인정보 수집/이용</span> <span className="text-gray"> 동의(필수)</span>
                  </span>
                  <Checkbox
                    checked={privacyAgree}
                    onChange={(checked) => {
                      setPrivacyAgree(checked);
                      handleIndividualAgreeChange();
                    }}
                    error={termsError && !privacyAgree}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <span className="text-sm text-gray font-mplus1 leading-[100%]">
                  서비스<span className="underline"> 이용약관</span> <span className="text-gray">(필수)</span>
                  </span>
                  <Checkbox
                    checked={serviceAgree}
                    onChange={(checked) => {
                      setServiceAgree(checked);
                      handleIndividualAgreeChange();
                    }}
                    error={termsError && !serviceAgree}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <span className="text-sm text-gray font-mplus1 leading-[100%]">
                    <span >만 14세 이상 서비스 이용 동의</span> <span className="text-gray">(필수)</span>
                  </span>
                  <Checkbox
                    checked={over14Agree}
                    onChange={(checked) => {
                      setOver14Agree(checked);
                      handleIndividualAgreeChange();
                    }}
                    error={termsError && !over14Agree}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <span className="text-sm text-gray font-mplus1 leading-[100%]">
                    <span className="underline">위치기반 서비스</span> <span className="text-gray"> 이용약관(필수)</span>
                  </span>
                  <Checkbox
                    checked={locationAgree}
                    onChange={(checked) => {
                      setLocationAgree(checked);
                      handleIndividualAgreeChange();
                    }}
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

            {/* 에러 메시지 */}
            {validationError && !validationError.includes("비밀번호") && !validationError.includes("약관") && (
              <div className="w-[345px] mb-4">
                <ErrorMessage message={validationError} className="justify-start" />
              </div>
            )}

            {/* 완료 버튼 */}
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
                    회원가입 중...
                  </span>
                ) : (
                  "완료"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
