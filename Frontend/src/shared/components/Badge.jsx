import React from "react";

const variants = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-bg-muted text-text-muted border-border",
  success: "bg-success/10 text-success border-success/20",
  error: "bg-error/10 text-error border-error/20",
  outline: "bg-transparent text-text border-border",
  dark: "bg-text text-bg border-text",
};

const Badge = ({ children, variant = "primary", className = "" }) => {
  const variantClasses = variants[variant] || variants.primary;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
