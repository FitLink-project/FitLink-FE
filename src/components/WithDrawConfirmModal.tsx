import Button from "./Button";


interface WithdrawConfirmModalProps {
  onConfirm: () => void; // 탈퇴하기
  onCancel: () => void;  // 계속 이용하기
}

export default function WithdrawConfirmModal({
  onConfirm,
  onCancel,
}: WithdrawConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-darkGray bg-opacity-60 z-50 flex items-center justify-center px-[24px]">
      <div className="w-full max-w-[320px] bg-softWhite rounded-[20px] px-[24px] pt-[28px] pb-[20px]">
        {/* 제목/설명 */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <h2 className="text-[20px] font-semibold text-main font-pretendard leading-[150%] text-center">
            정말 FitLink를 탈퇴하실건가요?
          </h2>
          <p className="text-sm font-medium text-gray font-pretendard leading-[160%] text-center">
            탈퇴하시면 체력진단 및
            <br />
            맞춤 운동 추천 서비스 이용이 불가능해요
          </p>
        </div>

        {/* 버튼 두 개 */}
        <div className="flex flex-col gap-2">
          <Button
            variant="main"
            className="w-full h-[44px]"
            onClick={onConfirm}
          >
            탈퇴하기
          </Button>
          <Button
            variant="backgroundGray"
            className="w-full h-[44px]"
            onClick={onCancel}
          >
            계속 이용하기
          </Button>
        </div>
      </div>
    </div>
  );
}
