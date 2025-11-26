import { Link } from 'react-router-dom';
import clsx from 'clsx';

export interface LinkMoveProps {
  text: string;
  to?: string;
  className?: string | string[] | (string | undefined | null | false)[];
}

export default function LinkMove({ 
  text, 
  to = "/signup",
  className 
}: LinkMoveProps) {
  const baseStyles = [
    'font-semibold',
    'underline',
    'transition-colors',
    'text-xs',
    'leading-[100%]',
    'font-mplus1',
    'text-[#888888]',
    'hover:text-main',
  ];

  const allClasses = clsx(baseStyles, className);

  return (
    <Link
      to={to}
      className={allClasses}
    >
      {text}
    </Link>
  );
}

