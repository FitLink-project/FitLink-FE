
import clsx from 'clsx';
import warningIcon from '../assets/Icon/Warning.png';

export interface ErrorMessageProps {
  message: string;
  className?: string | string[] | (string | undefined | null | false)[];
}

export default function ErrorMessage({ message, className }: ErrorMessageProps) {
  const baseStyles = [
    'flex',
    'items-center',
    'justify-center',
    'bg-white',
    'text-red',
    'text-sm',
    'font-mplus1',
    'font-medium'
  ];

  const allClasses = clsx(baseStyles, className);

  return (
    <div className={allClasses}>
      <img
        src={warningIcon}
        alt="Warning"
        className="w-4 h-4 flex-shrink-0 mr-1"
      />
      <span>{message}</span>
    </div>
  );
}

