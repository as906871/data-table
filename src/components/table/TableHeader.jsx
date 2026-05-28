import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowUpLine, RiArrowDownLine, RiArrowUpDownLine } from "react-icons/ri";
import { toggleSort } from "../../redux/slices/tableSlice";
import { COLUMNS } from "../../constants";

const SortIcon = ({ colKey, sort }) => {
  if (sort.key !== colKey) return <RiArrowUpDownLine className="text-ink-600 group-hover:text-ink-400" size={13} />;
  return sort.direction === "asc"
    ? <RiArrowUpLine className="text-acid-400" size={13} />
    : <RiArrowDownLine className="text-acid-400" size={13} />;
};

export const TableHeader = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((s) => s.table.sort);

  const handleSort = useCallback((key) => dispatch(toggleSort(key)), [dispatch]);

  return (
    <div
      role="row"
      className="flex items-center bg-ink-900 border-b border-ink-700 sticky top-0 z-10"
    >
      {COLUMNS.map((col) => (
        <div
          key={col.key}
          role="columnheader"
          aria-sort={sort.key === col.key ? sort.direction : "none"}
          onClick={() => handleSort(col.key)}
          className="group flex items-center gap-1.5 px-3 py-3 text-xs font-display font-semibold uppercase tracking-widest text-ink-400 cursor-pointer select-none hover:text-ink-200 flex-shrink-0 transition-colors"
          style={{ width: col.width, minWidth: col.width }}
        >
          {col.label}
          <SortIcon colKey={col.key} sort={sort} />
        </div>
      ))}
      <div className="px-3 py-3 text-xs font-display font-semibold uppercase tracking-widest text-ink-400 sticky right-0 bg-ink-900 border-l border-ink-800/60" style={{ minWidth: 140 }}>
        Actions
      </div>
    </div>
  );
});

TableHeader.displayName = "TableHeader";
