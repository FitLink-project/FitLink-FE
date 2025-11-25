import React from 'react';
import clsx from 'clsx';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string | string[] | (string | undefined | null | false)[];
  error?: boolean;
}

export default function Input({
  className,
  error = false,
  style,
  ...props
}: InputProps) {
  const baseStyles = [
    'w-[345px]',
    'h-[47px]',
    'px-4',
    'py-3',
    'rounded-[10px]',
    'bg-white',
    'border',
    'border-lineGray',
    'outline-none',
    'transition-all',
    'font-mplus1',
    'text-sm',
    'font-medium',
    'leading-[100%]',
    'placeholder:text-[#888]',
    'focus:ring-2',
    'focus:ring-main',
    'focus:border-main',
  ];

  const errorStyles = error
    ? ['border-2', 'border-red', 'focus:ring-red', 'focus:border-red']
    : [];

  const allClasses = clsx(baseStyles, errorStyles, className);

  return (
    <input
      className={allClasses}
      style={style}
      {...props}
    />
  );
}

