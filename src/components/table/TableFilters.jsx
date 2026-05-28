import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { setGlobalFilter, setColumnFilter, clearFilters } from "../../redux/slices/tableSlice";
import { COLUMNS } from "../../constants";
import { Input } from "../common/Input";
import { Button } from "../common/Button";


export const TableFilters = React.memo(() => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.table.filters);

  const handleGlobal = useCallback(
    (e) => dispatch(setGlobalFilter(e.target.value)),
    [dispatch]
  );

  const handleColumn = useCallback(
    (key) => (e) => dispatch(setColumnFilter({ key, value: e.target.value })),
    [dispatch]
  );

  const hasFilters =
    filters.global.trim() ||
    Object.values(filters.columns).some((v) => v?.trim());

  return (
    <div className="space-y-3 p-4 bg-ink-900/60 border-b border-ink-800">
      <div className="flex items-center gap-3">
        <Input
          value={filters.global}
          onChange={handleGlobal}
          placeholder="Search all columns…"
          icon={<RiSearchLine size={14} />}
          className="flex-1 max-w-sm"
        />
        {hasFilters && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(clearFilters())}
            icon={<RiCloseLine size={14} />}
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {COLUMNS.filter((c) => c.key !== "id" && c.key !== "status").map((col) => (
          <input
            key={col.key}
            value={filters.columns[col.key] ?? ""}
            onChange={handleColumn(col.key)}
            placeholder={`Filter ${col.label}…`}
            className="bg-ink-800 border border-ink-700 rounded px-2.5 py-1 text-xs text-ink-200 placeholder:text-ink-600 outline-none focus:border-acid-400/50 w-36"
          />
        ))}
      </div>
    </div>
  );
});

TableFilters.displayName = "TableFilters";
