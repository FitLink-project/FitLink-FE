import Button from "../../components/Button";

interface LocationAgreementModalProps {
  onAgree: () => void;
  onLater: () => void;
}

export default function LocationAgreementModal({
  onAgree,
  onLater,
}: LocationAgreementModalProps) {
  return (
    <div className="fixed inset-0 bg-darkGray bg-opacity-60 z-50 flex items-center justify-center px-[38px]">
      <div className="w-full max-w-[318px] bg-softWhite rounded-[10px] p-[32px]">
        <div className="flex flex-col items-center gap-3 mb-6">
          <h2 className="text-[20px] font-semibold text-main font-pretendard leading-[150%] text-center">
            서비스 제공을 위해
            <br />
            위치정보 수집에 동의해 주세요!
          </h2>
          <p className="text-sm font-medium text-gray font-pretendard leading-[160%] text-center">
            위치정보 데이터를 기반으로
            <br />
            주변 체육시설을 알려드려요
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="main"
            className="w-full h-[39px]"
            onClick={onAgree}
          >
            동의하고 시작하기
          </Button>
          <Button
            variant="backgroundGray"
            className="w-full h-[39px]"
            onClick={onLater}
          >
            다음에 하기
          </Button>
        </div>
        <p className="text-xs font-medium text-red font-pretendard leading-[150%] text-center mt-4">
          위치정보 제공에 동의하지 않을 경우,
          <br />
          서비스 이용이 불가능합니다
        </p>
      </div>
    </div>
  );
}

