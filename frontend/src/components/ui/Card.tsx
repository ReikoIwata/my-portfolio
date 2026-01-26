"use client";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string; // 追加でスタイルを調整したい時用
};

export default function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
