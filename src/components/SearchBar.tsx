import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  type?: "default" | "input";
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onClear?: () => void;
}

export default function SearchBar({
  type = "default",
  value,
  placeholder = "검색어를 입력하세요",
  onChange,
  onClick,
  onClear,
}: SearchBarProps) {
  const navigate = useNavigate();

  return (
    <div
      className="w-[345px] h-[47px] bg-white rounded-full shadow flex items-center px-4"
      onClick={type === "default" ? onClick : undefined}
    >
      {/* 왼쪽 아이콘 */}
      {type === "default" ? (
        <img
          src="/assets/Icon/Terms/Search-Black.png"
          alt="search"
          className="w-5 h-5 mr-3"
        />
      ) : (
        <img
          src="/assets/Icon/Terms/Back-Default.png"
          alt="back"
          className="w-5 h-5 mr-3 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      )}

      {/* 입력창 */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={type === "default"}
        className="flex-1 text-sm outline-none"
      />

      {/* X 버튼 */}
      {value && (
        <button onClick={onClear}>
          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
            <img
              src="/assets/Icon/Terms/Delete-Default.png"
              alt="clear"
              className="w-3 h-3"
            />
          </div>
        </button>
      )}
    </div>
  );
}
