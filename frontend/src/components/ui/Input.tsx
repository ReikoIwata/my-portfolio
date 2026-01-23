"use client";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-bold mb-1">{label}</label>}
      <input ref={ref} {...props} className={`... ${className}`} />
    </div>
  ),
);
Input.displayName = "Input";
