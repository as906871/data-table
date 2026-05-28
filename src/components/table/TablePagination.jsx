import React from "react";
import {
  RiArrowLeftSLine, RiArrowRightSLine,
  RiSkipLeftLine, RiSkipRightLine,
} from "react-icons/ri";
import { PAGE_SIZE_OPTIONS } from "../../constants";
import { Button } from "../common/Button";

export const TablePagination = React.memo(({
  page, pageSize, totalPages, totalRows, goFirst, goPrev, goNext, goLast, changeSize,
}) => {
  const start = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-ink-900/60 border-t border-ink-800">
      <span className="text-xs text-ink-500 font-mono">
        {totalRows === 0 ? "No rows" : `${start}–${end} of ${totalRows.toLocaleString()} rows`}
      </span>

      <div className="flex items-center gap-1">
        <Button size="xs" variant="ghost" onClick={goFirst}  disabled={page <= 1} icon={<RiSkipLeftLine size={13}  />} title="First page" />
        <Button size="xs" variant="ghost" onClick={goPrev}   disabled={page <= 1} icon={<RiArrowLeftSLine size={13} />} title="Previous page" />
        <span className="px-3 py-0.5 text-xs text-ink-300 font-mono bg-ink-800 border border-ink-700 rounded">
          {page} / {totalPages}
        </span>
        <Button size="xs" variant="ghost" onClick={goNext}  disabled={page >= totalPages} icon={<RiArrowRightSLine size={13} />} title="Next page" />
        <Button size="xs" variant="ghost" onClick={goLast}  disabled={page >= totalPages} icon={<RiSkipRightLine size={13}   />} title="Last page" />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-500">Rows:</span>
        <select
          value={pageSize}
          onChange={(e) => changeSize(Number(e.target.value))}
          className="bg-ink-800 border border-ink-700 rounded px-2 py-0.5 text-xs text-ink-200 outline-none focus:border-acid-400/50"
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

TablePagination.displayName = "TablePagination";
