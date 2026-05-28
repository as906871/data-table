import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiRefreshLine } from "react-icons/ri";
import { resetTable } from "../../redux/slices/tableSlice";
import { Button } from "../common/Button";
import { CSVExportButton } from "./CSVExportButton";


export const TableToolbar = React.memo(({ filteredData, totalRows }) => {
  const dispatch = useDispatch();
  const unsavedCount = useSelector((s) => s.table.unsavedIds?.length ?? 0);

  const handleReset = useCallback(() => {
    if (window.confirm("Reset table to original data? All unsaved changes will be lost.")) {
      dispatch(resetTable());
    }
  }, [dispatch]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-ink-900 border-b border-ink-800">
      <div className="flex items-center gap-3">
        <span className="font-display font-semibold text-ink-100 text-sm">
          {filteredData.length.toLocaleString()}
          <span className="text-ink-500 font-normal ml-1">/ {totalRows.toLocaleString()} rows</span>
        </span>
        {unsavedCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-acid-400/10 text-acid-400 text-xs border border-acid-400/20 font-mono">
            {unsavedCount} unsaved
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <CSVExportButton filteredData={filteredData} />
        <Button size="sm" variant="ghost" onClick={handleReset} icon={<RiRefreshLine size={14} />} title="Reset table">
          Reset
        </Button>
      </div>
    </div>
  );
});

TableToolbar.displayName = "TableToolbar";