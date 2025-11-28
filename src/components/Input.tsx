import React from "react";
import clsx from "clsx";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  className?: string | string[] | (string | undefined | null | false)[];
  error?: boolean;
  disabled?: boolean;
}

export default function Input({
  className,
  error = false,
  disabled = false,
  style,
  ...props
}: InputProps) {
  const baseStyles = [
    "w-full",
    "h-[47px]",
    "px-4",
    "py-3",
    "rounded-[10px]",
    "bg-white",
    "border",
    "border-lineGray",
    "outline-none",
    "transition-all",
    "font-mplus1",
    "text-sm",
    "font-medium",
    "leading-[100%]",
    "placeholder:text-[#888]",
    "focus:ring-1",
    "focus:ring-secondGray",
    "focus:border-secondGray",
  ];

  const errorStyles = error
    ? ["border-1", "border-red", "focus:ring-red", "focus:border-red"]
    : [];

  const disabledStyles = disabled
    ? ["bg-graphGray", "cursor-not-allowed", "hover:opacity-100"]
    : [];

  const allClasses = clsx(baseStyles, errorStyles, disabledStyles, className);

  return (
    <input
      className={allClasses}
      style={style}
      disabled={disabled}
      {...props}
    />
  );
}
