"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "outline" | "secondary";
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
  size = "medium",
}: ButtonProps) {
  // 基本スタイル
  const baseStyle =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95 tracking-wide shadow-sm";

  // バリアントごとの色設定
  const variants = {
    primary: "bg-[#6b705c] text-white hover:bg-[#3f4238] shadow-[#6b705c]/20",
    secondary: "bg-[#cb997e] text-white hover:bg-[#b07d62] shadow-[#cb997e]/20",
    danger: "bg-[#a47148] text-white hover:bg-[#7f5539]",
    outline:
      "border-2 border-[#ddbea9] text-[#6b705c] hover:bg-[#fcfaf8] hover:border-[#cb997e]",
  };

  // サイズ
  const sizeClasses = {
    small: "px-4 py-1.5 text-xs",
    medium: "px-6 py-2.5 text-sm",
    large: "px-10 py-4 text-base",
  };

  const disabledStyle =
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:grayscale disabled:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${variants[variant]} 
        ${sizeClasses[size]} 
        ${disabledStyle} 
        ${className}
      `}
    >
      {children}
    </button>
  );
}
