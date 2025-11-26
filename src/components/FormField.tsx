import React from 'react';
import clsx from 'clsx';
import ErrorMessage from './ErrorMessage';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string | string[] | (string | undefined | null | false)[];
}

export default function FormField({
  label,
  required = false,
  error = false,
  errorMessage,
  children,
  className,
}: FormFieldProps) {
  const containerStyles = [
    'flex',
    'flex-col',
    'items-center',
  ];

  const labelStyles = [
    'w-[345px]',
    'mb-1',
    'text-sm',
    'font-semibold',
    'text-softBlack',
    'font-mplus1',
  ];

  const allContainerClasses = clsx(containerStyles, className);

  return (
    <div className={allContainerClasses}>
      <div className={clsx(labelStyles)}>
        <label>
          {label}{' '}
          {required && (
            <span className="text-xs text-[#888888] leading-[100%]">*필수 입력 항목입니다</span>
          )}
        </label>
      </div>
      {children}
      {error && errorMessage && (
        <div className="w-[345px] mt-2">
          <ErrorMessage message={errorMessage} style={{ justifyContent: 'flex-start' }} />
        </div>
      )}
    </div>
  );
}

