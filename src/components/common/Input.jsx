import React from "react";

export const Input = React.memo(({
  value, onChange, placeholder, type = "text",
  label, error, icon, className = "", ...rest
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && (
      <label className="text-xs text-ink-400 font-medium uppercase tracking-wider">{label}</label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full bg-ink-800 border rounded px-3 py-1.5 text-sm text-ink-100 
          placeholder:text-ink-600 outline-none transition-colors
          ${icon ? "pl-8" : ""}
          ${error
            ? "border-coral-500/70 focus:border-coral-400 focus:ring-1 focus:ring-coral-400/20"
            : "border-ink-700 focus:border-acid-400/60 focus:ring-1 focus:ring-acid-400/20"}
        `}
        {...rest}
      />
    </div>
    {error && <span className="text-xs text-coral-400">{error}</span>}
  </div>
));

Input.displayName = "Input";
