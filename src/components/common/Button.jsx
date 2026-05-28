import React from "react";

const VARIANTS = {
  primary:  "bg-acid-400 text-ink-900 hover:bg-acid-300 active:bg-acid-500",
  ghost:    "bg-transparent text-ink-300 hover:bg-ink-800 hover:text-ink-100 border border-ink-700",
  danger:   "bg-coral-500/10 text-coral-400 hover:bg-coral-500/20 border border-coral-500/30",
  success:  "bg-acid-400/10 text-acid-400 hover:bg-acid-400/20 border border-acid-400/30",
  subtle:   "bg-ink-800 text-ink-300 hover:bg-ink-700 hover:text-ink-100",
};

const SIZES = {
  xs: "px-2 py-0.5 text-xs rounded",
  sm: "px-2.5 py-1 text-xs rounded",
  md: "px-3.5 py-1.5 text-sm rounded-md",
  lg: "px-5 py-2 text-sm rounded-md",
};

export const Button = React.memo(({
  children, onClick, variant = "ghost", size = "md",
  disabled = false, loading = false, icon, title, className = "", type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    title={title}
    aria-label={title}
    className={`btn-base ${VARIANTS[variant] ?? VARIANTS.ghost} ${SIZES[size] ?? SIZES.md} ${className}`}
  >
    {loading ? (
      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : icon ? (
      <span className="flex-shrink-0">{icon}</span>
    ) : null}
    {children}
  </button>
));

Button.displayName = "Button";
