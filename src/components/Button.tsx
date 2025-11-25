import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'lightBlue' | 'backgroundGray' | 'main';
export type ButtonState = 'default' | 'hover';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  state?: ButtonState;
  className?: string | string[] | (string | undefined | null | false)[];
}

export default function Button({
  children,
  variant = 'main',
  state = 'default',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = [
    'px-4 py-3.5',
    'rounded-[10px]',
    'font-mplus1',
    'text-base',
    'font-semibold',
    'leading-[1.193359375em]',
    'transition-all',
    'focus:outline-none',
  ];

  const variantStyles = {
    lightBlue: {
      default: [
        'bg-lightBlue',
        'text-main',
        'shadow-[0px_0px_4px_0px_rgba(34,34,34,0.06)]',
      ],
      hover: [
        'bg-lightBlue',
        'text-main',
        'shadow-[0px_0px_4px_0px_rgba(34,34,34,0.06)]',
        'opacity-80',
      ],
    },
    backgroundGray: {
      default: [
        'bg-backgroundGray',
        'text-darkGray',
        'shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]',
      ],
      hover: [
        'bg-backgroundGray',
        'text-darkGray',
        'shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]',
        'opacity-80',
      ],
    },
    main: {
      default: [
        'bg-main',
        'text-softWhite',
        'shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]',
      ],
      hover: [
        'bg-main',
        'text-softWhite',
        'shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]',
        'opacity-90',
      ],
    },
  };

  const allClasses = clsx(
    baseStyles,
    variantStyles[variant][state],
    className
  );

  return (
    <button
      className={allClasses}
      {...props}
    >
      {children}
    </button>
  );
}

