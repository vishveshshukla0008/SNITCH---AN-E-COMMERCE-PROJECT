import React from "react";
import { CgSpinner } from "react-icons/cg";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98]",
  secondary: "bg-bg-muted text-text hover:bg-bg-border",
  outline: "bg-transparent border border-border text-text hover:bg-bg-muted",
  ghost: "bg-transparent text-text hover:bg-bg-muted",
  danger: "bg-error text-white shadow-lg shadow-error/20 hover:shadow-error/40",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-semibold",
  md: "px-4 py-2.5 text-sm font-bold",
  lg: "px-6 py-4 text-base font-bold",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  type = "button",
  disabled,
  ...props
}) => {
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClasses = fullWidth ? "w-full" : "w-auto";
  const disabledClasses =
    disabled || isLoading
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "cursor-pointer";

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 rounded-md transition-all duration-300 ${variantClasses} ${sizeClasses} ${widthClasses} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <CgSpinner className="animate-spin h-5 w-5" />
          <span className="opacity-70">Please wait...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex items-center shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
