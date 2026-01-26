"use client";
import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-bold text-[#3f4238] tracking-wider ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={`
            w-full 
            p-2.5 
            bg-[#fcfaf8] 
            border-2 
            border-[#e9e4db] 
            rounded-xl 
            text-[#6b705c] 
            text-sm
            appearance-none
            cursor-pointer
            transition-all 
            duration-300
            focus:border-[#cb997e] 
            focus:ring-2 
            focus:ring-[#cb997e]/10 
            outline-none 
            ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}
            ${className}
          `}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white text-[#6b705c]"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* カスタム矢印アイコン */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#a5a58d]">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-xs text-[#a47148] italic ml-1 font-medium">
          {error}
        </p>
      )}
    </div>
  ),
);
Select.displayName = "Select";
