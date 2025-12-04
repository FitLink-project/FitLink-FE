import warningIcon from "../assets/warning.svg";

interface NoMatchingWarningProps {
  userName?: string;
}

export default function NoMatchingWarning({ userName }: NoMatchingWarningProps) {
  return (
    <div className="text-center py-8 text-gray font-mplus1">
      <div className="flex flex-col items-center gap-2">
        <img src={warningIcon} alt="warning" className="w-12 h-12 mb-2" />
        <div className="text-sm font-medium text-softBlack font-mplus1">
          현재 {userName ?? "회원"}님께 적합한 영상이 준비되지 않았어요
        </div>
        <div className="text-xs text-gray mt-1 font-mplus1">
          먼저 맞춤 운동들을 통해 유동을 시작해 보세요!
        </div>
      </div>
    </div>
  );
}
