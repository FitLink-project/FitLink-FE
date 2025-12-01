import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white",
        "rounded-[10px]",
        "shadow-[0_4px_16px_rgba(0,0,0,0.05)]",
        "p-5",
        "font-mplus1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
