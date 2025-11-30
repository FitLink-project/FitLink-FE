interface FormTitleProps {
  title: string;
  description?: string;
}

export default function FormTitle({ title, description }: FormTitleProps) {
  return (
    <div className="mb-6">
      {/* 큰 제목 (검정색, 볼드) */}
      <h2 className="text-xl font-bold text-gray-900 leading-tight">{title}</h2>

      {/* 작은 설명 (파란색) */}
      {description && (
        <p className="text-sm text-blue-500 mt-2 font-medium">{description}</p>
      )}
    </div>
  );
}
