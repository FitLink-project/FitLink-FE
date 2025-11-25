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
    <div className="relative flex items-center justify-center mb-8">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="absolute left-0 p-2 -ml-2"
        >
          <img src={backIcon} alt="뒤로가기" className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-lg font-semibold text-softBlack font-mplus1">{title}</h1>
    </div>
  );
}

