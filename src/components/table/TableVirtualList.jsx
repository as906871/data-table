import React, { useMemo } from "react";
import { List } from "react-window";
import { TableRow } from "./TableRow";

const ROW_HEIGHT = 52;

const VirtualRow = React.memo(({ index, style, rows }) => {
  const row = rows?.[index];
  if (!row) return null;
  return <TableRow row={row} style={style} />;
});

VirtualRow.displayName = "VirtualRow";

export const TableVirtualList = React.memo(({ data, height = 520 }) => {
  const rowProps = useMemo(() => ({ rows: data }), [data]);

  return (
    <List
      defaultHeight={height}
      rowComponent={VirtualRow}
      rowCount={data.length}
      rowHeight={ROW_HEIGHT}
      rowProps={rowProps}
      overscanCount={10}
      style={{ width: "100%" }}
    />
  );
});

TableVirtualList.displayName = "TableVirtualList";