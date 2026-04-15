import React from "react";

const Checkbox = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className="peer appearance-none w-5 h-5 rounded-md border border-border bg-bg-surface checked:bg-primary checked:border-primary transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-ring ring-offset-2 ring-offset-bg"
            {...props}
          />
          <svg
            className="absolute w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {label && (
          <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors duration-200">
            {label}
          </span>
        )}
      </label>
      {error && (
        <p className="text-[10px] font-bold text-error mt-1 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-error" />
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
