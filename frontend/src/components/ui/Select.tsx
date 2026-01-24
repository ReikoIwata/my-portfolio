"use client";
import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className = "", ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-bold mb-1">{label}</label>}
      <select
        ref={ref}
        {...props}
        className={`w-full p-2 border rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  ),
);
Select.displayName = "Select";
