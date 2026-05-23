import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  label: string;
  id: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  options?: string[];
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options = [],
}) => {
  const baseStyles = "w-full bg-[#121212] border border-fyn-border text-fyn-text rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-fyn-pink/60 transition-colors duration-200 placeholder-fyn-text-muted/65 font-barlow";
  
  return (
    <div className="flex flex-col space-y-2 w-full text-left font-barlow">
      <label htmlFor={id} className="text-xs uppercase tracking-widest font-semibold text-fyn-text-muted">
        {label} {required && <span className="text-fyn-pink">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={cn(baseStyles, "resize-none", error && "border-red-500/50")}
        />
      ) : type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={cn(baseStyles, "appearance-none", error && "border-red-500/50")}
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
          }}
        >
          <option value="" disabled className="text-fyn-text-muted bg-[#121212]">
            {placeholder || "Select an option"}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#121212] text-fyn-text">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={cn(baseStyles, error && "border-red-500/50")}
        />
      )}

      {error && (
        <span className="text-xs text-red-400 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};
