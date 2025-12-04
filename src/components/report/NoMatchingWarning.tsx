import warningIcon from "../../assets/Icon/warning-gray.png";

interface NoMatchingWarningProps {
  description?: string;
}

export default function NoMatchingWarning({
  description,
}: NoMatchingWarningProps) {
  return (
    <div className="text-center py-8 text-gray font-mplus1">
      <div className="flex flex-col items-center gap-2">
        <img src={warningIcon} alt="warning" className="w-12 h-12 mb-2" />
        <div className="text-sm text-center font-medium text-gray font-mplus1">
          {description}
          <br />
          먼저 맞춤 운동을 통해 운동을 시작해 보세요!
        </div>
      </div>
    </div>
  );
}
