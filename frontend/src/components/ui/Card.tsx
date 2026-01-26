"use client";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`
        bg-[#fdfbf9] 
        p-8 
        rounded-2xl 
        shadow-[20px_20px_60px_rgba(0,0,0,0.03),-10px_-10px_60px_rgba(255,255,255,0.8)] 
        border border-[#ede7de] 
        transition-all 
        duration-500
        ${className}
      `}
    >
      {title && (
        <h2
          className="
          text-xl 
          font-serif 
          italic 
          tracking-wide 
          mb-6 
          pb-3 
          border-b 
          border-[#cb997e]/30 
          text-[#3f4238]
        "
        >
          {title}
        </h2>
      )}
      <div className="text-[#6b705c] leading-relaxed">{children}</div>
    </div>
  );
}
