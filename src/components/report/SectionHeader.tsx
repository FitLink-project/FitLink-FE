import React from "react";
import clsx from "clsx";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export default function SectionHeader({
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "mb-6",
        "font-mplus1",
        {
          "text-center": align === "center",
          "text-left": align === "left",
          "text-right": align === "right",
        },
        className
      )}
      {...props}
    >
      {/* 제목 */}
      <h2 className="text-[20px] font-bold text-[#111] leading-tight mb-2">
        {title}
      </h2>

      {/* 설명 */}
      {description && (
        <div className="text-[13px] text-[#767676] leading-relaxed whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
}
