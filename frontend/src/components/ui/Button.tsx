"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "outline"; // 色のパターン
  className?: string; // 追加のスタイリング用
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
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
