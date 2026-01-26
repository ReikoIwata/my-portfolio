"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "outline"; // 色のパターン
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  // 基本の形（共通スタイル）
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition duration-200 active:scale-95";

  // バリアントごとの色設定
  const variants = {
    primary: "bg-sky-400 text-white hover:bg-sky-300",
    danger: "bg-rose-400 text-white hover:bg-rose-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  //  無効化時のスタイル
  const disabledStyle = "disabled:opacity-50 disabled:cursor-not-allowed";

  //  Button の class
  const sizeClasses = {
    small: "px-1.5 py-0.5 text-[10px] leading-tight",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
