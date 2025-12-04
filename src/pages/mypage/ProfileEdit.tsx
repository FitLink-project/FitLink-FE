import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import FormField from "../../components/FormField";
import PageHeader from "../../components/PageHeader";
import TermsAgreement from "../../components/TermsAgreement";
import { editProfile, getProfile } from "../../api/user";
import { ERROR_CODES, type ApiError, type ProfileResult } from "../../types/user";
import addProfileIcon from "../../assets/profile/default-profile.png";

export default function ProfileEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [initialProfile, setInitialProfile] = useState<ProfileResult | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await getProfile(token);
        if (res.isSuccess && res.result) {
          const p = res.result;
          setInitialProfile(p);
          setName(p.name ?? "");
          setEmail(p.email ?? "");
          setPrivacyAgree(p.agreements?.privacy ?? false);
          setServiceAgree(p.agreements?.service ?? false);
          setOver14Agree(p.agreements?.over14 ?? false);
          setLocationAgree(p.agreements?.location ?? false);
          setAllAgree(Boolean(p.agreements?.privacy && p.agreements?.service && p.agreements?.over14 && (p.agreements?.location ?? true)));
          setProfilePreview(p.profileUrl ?? null);
        }
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      }
    };

    loadProfile();
  }, [navigate]);

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

  const handlePrivacyAgreeChange = (checked: boolean) => {
    setPrivacyAgree(checked);
    if (termsError) setTermsError(false);
  };

  const handleServiceAgreeChange = (checked: boolean) => {
    setServiceAgree(checked);
    if (termsError) setTermsError(false);
  };

  const handleOver14AgreeChange = (checked: boolean) => {
    setOver14Agree(checked);
    if (termsError) setTermsError(false);
  };

  const handleLocationAgreeChange = (checked: boolean) => {
    setLocationAgree(checked);
    if (termsError) setTermsError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    // 유효성 검사 - 이메일과 비밀번호만 필수
    let hasError = false;

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
      if (password) {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage("비밀번호를 한 번 더 입력해주세요");
        hasError = true;
      }
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("비밀번호가 일치하지 않습니다");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      // Build patch payload only with changed fields
      const payload: Record<string, any> = {};

      if (initialProfile) {
        if (name.trim() !== (initialProfile.name ?? "")) payload.name = name.trim();
        if (email.trim() !== (initialProfile.email ?? "")) payload.email = email.trim();
        // password is required per request — include if provided
        if (password) payload.password = password;

        const agreementsPayload: Record<string, boolean> = {};
        if ((initialProfile.agreements?.privacy ?? false) !== privacyAgree) agreementsPayload.privacy = privacyAgree;
        if ((initialProfile.agreements?.service ?? false) !== serviceAgree) agreementsPayload.service = serviceAgree;
        if ((initialProfile.agreements?.over14 ?? false) !== over14Agree) agreementsPayload.over14 = over14Agree;
        if ((initialProfile.agreements?.location ?? false) !== locationAgree) agreementsPayload.location = locationAgree;
        if (Object.keys(agreementsPayload).length) payload.agreements = agreementsPayload;
      } else {
        if (name.trim()) payload.name = name.trim();
        if (email.trim()) payload.email = email.trim();
        if (password) payload.password = password;
        payload.agreements = {
          privacy: privacyAgree,
          service: serviceAgree,
          over14: over14Agree,
          location: locationAgree,
        };
      }

      if (profileImage) payload.img = profileImage;

      // If nothing changed (except maybe password which is required), still send password if present
      if (Object.keys(payload).length === 0) {
        // nothing to update
        setIsLoading(false);
        navigate("/my");
        return;
      }

      const response = await editProfile(payload, token);

      if (response.isSuccess) {
        navigate("/my");
      }
    } catch (err) {
      const apiError = err as ApiError;

      switch (apiError.code) {
        case ERROR_CODES.COMMON400:
          setNameErrorMessage("잘못된 요청입니다.");
          setNameError(true);
          break;
        case ERROR_CODES.USER4001:
          setEmailErrorMessage("올바른 이메일 형식이 아닙니다.");
          setEmailError(true);
          break;
        case ERROR_CODES.USER4002:
          setPasswordErrorMessage("올바른 비밀번호 형식이 아닙니다.");
          setPasswordError(true);
          break;
        case ERROR_CODES.USER4031:
          setEmailErrorMessage("중복된 이메일입니다.");
          setEmailError(true);
          break;
        case ERROR_CODES.COMMON500:
          setNameErrorMessage("서버 에러, 관리자에게 문의 바랍니다.");
          setNameError(true);
          break;
        default:
          setNameErrorMessage(apiError.message || "프로필 수정에 실패했습니다.");
          setNameError(true);
      }

      console.error("프로필 수정 실패:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  return (<>
              {/* 헤더 */}
              <PageHeader title="프로필 수정" />
    <div className="min-h-screen bg-white px-4 pt-8 pb-8">
      <div className="w-full max-w-sm mx-auto">
        <div className="animate-slideUpFadeIn">


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
              <div className="w-[20px] h-[20px] rounded-full absolute bottom-[10px] right-[0px] bg-[#c4c4c4] border-[2px] border-white flex items-center justify-center">
                     {/* 세로 막대 */}
  <div className="absolute inset-0 m-auto w-[1.5px] h-[9px] bg-white" />
  {/* 가로 막대 */}
  <div className="absolute inset-0 m-auto w-[9px] h-[1.5px] bg-white" />
                </div>
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
            <TermsAgreement
              allAgree={allAgree}
              privacyAgree={privacyAgree}
              serviceAgree={serviceAgree}
              over14Agree={over14Agree}
              locationAgree={locationAgree}
              onAllAgreeChange={handleAllAgreeChange}
              onAllAgreeSync={(checked: boolean) => setAllAgree(checked)}
              onPrivacyAgreeChange={handlePrivacyAgreeChange}
              onServiceAgreeChange={handleServiceAgreeChange}
              onOver14AgreeChange={handleOver14AgreeChange}
              onLocationAgreeChange={handleLocationAgreeChange}
              termsError={termsError}
              termsErrorMessage={termsErrorMessage}
            />


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
                    저장 중...
                  </span>
                  ) : (
                  "저장"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
