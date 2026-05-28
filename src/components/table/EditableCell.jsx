import React, { useCallback } from "react";
import { STATUS_OPTIONS } from "../../constants";

export const EditableCell = React.memo(({ col, value, isEditing, onChange, error }) => {
  const handleChange = useCallback(
    (e) => onChange(col.key, e.target.value),
    [onChange, col.key]
  );

  // ── Display mode ─────
  if (!isEditing || !col.editable) {
    if (col.key === "status") {
      const colors = {
        Active:   "bg-acid-400/15 text-acid-400 border-acid-400/30",
        Inactive: "bg-ink-700/50 text-ink-400 border-ink-600",
        Pending:  "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
        "On Leave": "bg-blue-500/15 text-blue-400 border-blue-500/30",
      };
      return (
        <span className={`inline-flex px-2 py-0.5 rounded border text-xs font-medium ${colors[value] ?? colors.Inactive}`}>
          {value}
        </span>
      );
    }
    if (col.key === "salary") {
      return <span className="font-mono text-acid-400/80">${Number(value).toLocaleString()}</span>;
    }
    if (col.key === "id") {
      return <span className="font-mono text-ink-500 text-xs">#{value}</span>;
    }
    return <span className="truncate block max-w-[200px]">{value}</span>;
  }

  // ── Edit mode ──────
  const baseClass = `table-cell-edit ${error ? "border-coral-500/70 focus:border-coral-400" : ""}`;

  if (col.key === "status") {
    return (
      <div>
        <select value={value} onChange={handleChange} className={baseClass}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {error && <p className="text-coral-400 text-xs mt-0.5">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <input
        type={col.type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={handleChange}
        className={baseClass}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${col.key}` : undefined}
      />
      {error && <p id={`err-${col.key}`} className="text-coral-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
});

EditableCell.displayName = "EditableCell";
