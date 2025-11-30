import React from "react";
import clsx from "clsx";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  className?: string | string[] | (string | undefined | null | false)[];
  error?: boolean;
}

export default function Select({
  className,
  error = false,
  style,
  ...props
}: SelectProps) {
  const baseStyles = [
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
    "focus:ring-2",
    "focus:ring-secondGray",
    "focus:border-secondGray",
    "appearance-none",
  ];

  const errorStyles = error
    ? ["border-1", "border-red", "focus:ring-red", "focus:border-red"]
    : [];

  const allClasses = clsx(baseStyles, errorStyles, className);

  return <select className={allClasses} style={style} {...props} />;
}
