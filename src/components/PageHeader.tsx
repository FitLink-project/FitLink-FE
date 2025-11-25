import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/Icon/Back-Default.png';

export interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function PageHeader({ 
  title, 
  showBackButton = true,
  onBack 
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center h-[60px]"
      style={{ boxShadow: '0 1px 6px 0 rgba(34, 34, 34, 0.18)' }}
    >
      {showBackButton && (
        <button
          onClick={handleBack}
          className="absolute left-0 p-2 ml-2"
        >
          <img src={backIcon} alt="뒤로가기" className="w-[14px] h-[14px]" />
        </button>
      )}
      <h1 className="text-base font-medium text-softBlack font-mplus1 leading-[150%]">{title}</h1>
    </div>
  );
}

