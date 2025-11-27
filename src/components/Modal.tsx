import React from "react";
import clsx from "clsx";
import Button, { type ButtonVariant } from "./Button";

// 버튼 설정을 위한 인터페이스
interface ModalButtonConfig {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
}

export interface ConfirmModalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  primaryButton: ModalButtonConfig; // 상단 버튼 (주요 액션)
  secondaryButton: ModalButtonConfig; // 하단 버튼 (보조 액션)
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  primaryButton,
  secondaryButton,
  className,
  style,
  ...props
}: ConfirmModalProps) {
  if (!isOpen) return null;

  // 배경 스타일
  const backdropStyles = [
    "fixed",
    "inset-0",
    "z-50",
    "flex",
    "items-center",
    "justify-center",
    "bg-black/50",
    "backdrop-blur-[2px]",
  ];

  // 모달 박스 스타일
  const modalContainerStyles = [
    "w-[300px]", // 모달 너비
    "bg-white",
    "rounded-[16px]",
    "p-6",
    "flex",
    "flex-col",
    "items-center",
    "text-center",
    "shadow-xl",
    "font-mplus1",
  ];

  const titleStyles = ["text-[#3B82F6]", "font-bold", "text-lg", "mb-3"];
  const descriptionStyles = [
    "text-[#888]",
    "text-xs",
    "leading-relaxed",
    "mb-6",
  ];

  return (
    <div className={clsx(backdropStyles)}>
      <div
        className={clsx(modalContainerStyles, className)}
        style={style}
        {...props}
      >
        {/* Title */}
        <h2 className={clsx(titleStyles)}>{title}</h2>

        {/* Description */}
        <div className={clsx(descriptionStyles)}>{description}</div>

        {/* Primary Button (로그인 등) */}
        <Button
          variant={primaryButton.variant || "main"}
          onClick={primaryButton.onClick}
          className="!w-full !h-[44px] mb-2 text-sm"
        >
          {primaryButton.text}
        </Button>

        {/* Secondary Button (다음에 하기 등) */}
        <Button
          variant={secondaryButton.variant || "backgroundGray"}
          onClick={secondaryButton.onClick}
          className="!w-full !h-[44px] text-sm"
        >
          {secondaryButton.text}
        </Button>
      </div>
    </div>
  );
}

/** 사용 예시
 * <Modal
        isOpen={showModal}
        title="로그인 후 진행해 주세요"
        description={
          <>
            FitLink의 체력진단 및 리포트
            <br />
            결과 제공을 위해 로그인이 필요해요
          </>
        }
        primaryButton={{
          text: "로그인하기",
          onClick: () => console.log("로그인 이동"),
          // variant: 'main' (생략 시 기본값)
        }}
        secondaryButton={{
          text: "다음에 하기",
          onClick: () => setShowModal(false),
          // variant: 'backgroundGray' (생략 시 기본값)
        }}
      />
 */
