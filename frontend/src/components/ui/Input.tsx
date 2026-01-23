"use client";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold mb-1 text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all ${className}`}
      />
    </div>
  );
}
