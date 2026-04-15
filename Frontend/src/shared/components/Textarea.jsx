import React from "react";

const Textarea = React.forwardRef(
  ({ label, placeholder, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-sm font-medium text-text-muted mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-4 py-2.5 bg-bg-surface border rounded-xl outline-none transition-all duration-200 text-sm text-text placeholder:text-text-muted/50 resize-none ${
            error
              ? "border-error ring-1 ring-error/50 focus:ring-2 focus:ring-error"
              : "border-border focus:ring-2 focus:ring-ring"
          }`}
          {...props}
        />
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

Textarea.displayName = "Textarea";

export default Textarea;
