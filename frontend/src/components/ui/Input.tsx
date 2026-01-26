"use client";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-bold text-[#3f4238] tracking-wider ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`
          w-full 
          p-3 
          bg-[#fcfaf8] 
          border-2 
          rounded-xl 
          text-[#6b705c] 
          placeholder:text-[#a5a58d]/60
          transition-all 
          duration-300 
          outline-none 
          ${
            error
              ? "border-[#a47148]/50 focus:border-[#a47148]"
              : "border-[#e9e4db] focus:border-[#cb997e] focus:ring-4 focus:ring-[#cb997e]/5"
          } 
          ${className}
        `}
      />
      {error && (
        <p className="text-[#a47148] text-xs italic font-medium ml-1">
          {error}
        </p>
      )}
    </div>
  ),
);
Input.displayName = "Input";
