import React from "react";
import { HiChevronDown } from "react-icons/hi2";

const Select = React.forwardRef(
  ({ label, options = [], error, placeholder = "Select an option", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-sm font-medium text-text-muted mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-4 py-2.5 bg-bg-surface border rounded-xl outline-none transition-all duration-200 text-sm text-text appearance-none cursor-pointer ${
              error
                ? "border-error ring-1 ring-error/50 focus:ring-2 focus:ring-error"
                : "border-border focus:ring-2 focus:ring-ring"
            }`}
            defaultValue=""
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value || option} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-muted">
            <HiChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p className="text-[10px] font-bold text-error mt-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-error" />
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
