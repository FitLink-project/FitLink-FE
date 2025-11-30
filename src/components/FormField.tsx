import React from "react";
import clsx from "clsx";
import ErrorMessage from "./ErrorMessage";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string | string[] | (string | undefined | null | false)[];
  labelClassName?: string | string[] | (string | undefined | null | false)[];
  errorClassName?: string | string[] | (string | undefined | null | false)[];
}

export default function FormField({
  label,
  required = false,
  error = false,
  errorMessage,
  children,
  className,
  // 체력 진단 결과 입력 폼에서 라벨과 에러 메시지가 튀어 나가는 이슈 때문에 해당 클래스들을 추가
  labelClassName,
  errorClassName,
}: FormFieldProps) {
  const containerStyles = ["flex", "flex-col", "items-center"];

  const labelStyles = [
    "w-[345px]",
    "mb-1",
    "text-sm",
    "font-semibold",
    "text-softBlack",
    "font-mplus1",
  ];

  const errorStyles = ["w-[345px]", "mb-1", "text-sm", "font-mplus1"];

  const allContainerClasses = clsx(containerStyles, className);
  const allLabelClasses = clsx(labelStyles, labelClassName);
  const allErrorClasses = clsx(errorStyles, errorClassName);

  return (
    <div className={allContainerClasses}>
      <div className={allLabelClasses}>
        <label>
          {label}{" "}
          {required && (
            <span className="text-xs text-[#888888] leading-[100%]">
              *필수 입력 항목입니다
            </span>
          )}
        </label>
      </div>
      {children}
      {error && errorMessage && (
        <div className={allErrorClasses}>
          <div className="w-[345px] mt-2">
            <ErrorMessage
              message={errorMessage}
              style={{ justifyContent: "flex-start" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
