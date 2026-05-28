import React from "react";
import { useSelector } from "react-redux";
import { useFilteredSortedData } from "../../hooks/useFilteredSortedData";
import { usePagination } from "../../hooks/usePagination";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { TableToolbar } from "./TableToolbar";
import { Loader, EmptyState } from "../common";


export const EditableTable = () => {
  const loading = useSelector((s) => s.table.loading);
  const totalRows = useSelector((s) => s.table.data.length);

  const filteredData = useFilteredSortedData();
  const pagination = usePagination(filteredData);

  return (
    <div className="flex flex-col rounded-xl border border-ink-800 overflow-hidden shadow-2xl bg-ink-950 animate-fade-in">
      <TableToolbar filteredData={filteredData} totalRows={totalRows} />
      <TableFilters />

      <div className="overflow-x-auto">
        <div style={{ minWidth: 900 }}>
          <TableHeader />

          {loading ? (
            <Loader rows={10} />
          ) : filteredData.length === 0 ? (
            <EmptyState
              message="No results found"
              sub="Try adjusting your filters or search query"
            />
          ) : (
            <div role="rowgroup">
              {pagination.pageData.map((row) => (
                <TableRow key={row.id} row={row} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredData.length > 0 && (
        <TablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalPages={pagination.totalPages}
          totalRows={filteredData.length}
          goFirst={pagination.goFirst}
          goPrev={pagination.goPrev}
          goNext={pagination.goNext}
          goLast={pagination.goLast}
          changeSize={pagination.changeSize}
        />
      )}
    </div>
  );
};