import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import logoBlue from "../../assets/Full_Logo/logo-blue.png";

export default function SignupCompletePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/");
  };

  return (
    <div>
      <PageHeader title="회원가입" showBackButton={false} />
      
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="animate-slideUpFadeIn flex flex-col items-center">
            {/* FitLink 로고 */}
            <div className="mb-10">
              <img src={logoBlue} alt="FitLink" className="w-[204px] h-[50px]" />
            </div>

            {/* 완료 메시지 */}
            <div className="text-center mb-12">
              <h2 className="text-[20px] font-semibold text-softBlack mb-3 font-pretendard leading-[150%] tracking-normal">
                회원가입이 완료되었습니다!
              </h2>
              <p className="w-[196px] mx-auto text-base font-medium text-gray font-pretendard leading-[150%] tracking-normal">
                지금부터 FitLink와 함께 운동 기회를 손쉽게 탐색해 봐요
              </p>
            </div>

          </div>
        </div>
            {/* 시작하기 버튼 */}
            <div className="w-full">
              <Button
                type="button"
                variant="main"
                state="default"
                onClick={handleStart}
                className="w-full"
              >
                시작하기
              </Button>
            </div>
      </div>
    </div>
  );
}

