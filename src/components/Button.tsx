import React from "react";
import clsx from "clsx";

export type ButtonVariant =
  | "lightBlue"
  | "backgroundGray"
  | "main"
  | "measurement"
  | "white";
export type ButtonState = "default" | "hover";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  state?: ButtonState;
  className?: string | string[] | (string | undefined | null | false)[];
}

export default function Button({
  children,
  variant = "main",
  state = "default",
  className,
  ...props
}: ButtonProps) {
  const baseStyles = [
    "box-border",
    "w-[345px]",
    "h-[52px]",
    "px-4",
    "py-[10px]",
    "rounded-[10px]",
    "font-mplus1",
    "text-base",
    "font-semibold",
    "leading-[1.193359375em]",
    "transition-all",
    "focus:outline-none",
  ];

  const variantStyles = {
    lightBlue: {
      default: [
        "bg-lightBlue",
        "text-main",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.06)]",
        "hover:opacity-80",
      ],
      hover: [
        "bg-lightBlue",
        "text-main",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.06)]",
        "opacity-80",
      ],
    },
    backgroundGray: {
      default: [
        "bg-backgroundGray",
        "text-darkGray",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]",
        "hover:opacity-80",
      ],
      hover: [
        "bg-backgroundGray",
        "text-darkGray",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]",
        "opacity-80",
      ],
    },
    main: {
      default: [
        "bg-main",
        "text-softWhite",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]",
        "hover:opacity-90",
        "active:opacity-80",
      ],
      hover: [
        "bg-main",
        "text-softWhite",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.1)]",
        "opacity-90",
      ],
    },
    measurement: {
      default: [
        "bg-white",
        "text-darkGray",
        "!h-auto",
        "!w-full",
        "!rounded-[20px]",
        "!px-0 !py-6",
        "flex flex-col items-center justify-center",
        "shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)]",
        "hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]",
      ],
      hover: [
        "bg-white",
        "text-darkGray",
        "!h-auto",
        "!w-full",
        "!rounded-[20px]",
        "!px-0 !py-6",
        "flex flex-col items-center justify-center",
        "shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]",
      ],
    },
    white: {
      default: [
        "bg-white",
        "text-darkGray",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.08)]",
        "border",
        "border-lineGray",
        "hover:opacity-80",
        "active:opacity-80",
      ],
      hover: [
        "text-darkGray",
        "shadow-[0px_0px_4px_0px_rgba(34,34,34,0.08)]",
        "border",
        "border-lineGray",
      ],
    },
  };

  const allClasses = clsx(baseStyles, variantStyles[variant][state], className);

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
}
