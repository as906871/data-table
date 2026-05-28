import React from "react";
import {
  RiEdit2Line, RiSaveLine, RiCloseLine, RiArrowGoBackLine,
} from "react-icons/ri";
import { useTableEdit } from "../../hooks/useTableEdit";
import { COLUMNS } from "../../constants";
import { EditableCell } from "./EditableCell";
import { Button } from "../common/Button";
import { useSelector } from "react-redux";

export const TableRow = React.memo(({ row, style }) => {
  const { draft, errors, isEditing, handleStartEdit, handleChange, handleSave, handleCancel, handleUndo } =
    useTableEdit(row.id);

  const hasUndo = useSelector((s) => !!s.table.undoStack[row.id]);
  const isUnsaved = useSelector((s) => s.table.unsavedIds?.includes?.(row.id));
  const displayRow = isEditing ? draft : row;

  return (
    <div
      role="row"
      style={style}
      className={`
        flex items-center border-b border-ink-800/60 transition-colors duration-150
        ${isEditing ? "bg-ink-800/80" : "bg-transparent hover:bg-ink-900/60"}
        ${isUnsaved && !isEditing ? "border-l-2 border-l-acid-400/40" : ""}
        group
      `}
    >
      {COLUMNS.map((col) => (
        <div
          key={col.key}
          role="cell"
          className="flex items-center px-3 py-2.5 text-sm text-ink-200 flex-shrink-0 overflow-hidden"
          style={{ width: col.width, minWidth: col.width }}
        >
          <EditableCell
            col={col}
            value={displayRow?.[col.key]}
            isEditing={isEditing}
            onChange={handleChange}
            error={errors[col.key]}
          />
        </div>
      ))}

      <div
        className="flex items-center gap-1 px-3 py-2 ml-auto sticky right-0 bg-ink-900 border-l border-ink-800/60 flex-shrink-0"
        style={{ minWidth: 140 }}
      >
        {!isEditing ? (
          <>
            <Button size="xs" variant="ghost" onClick={handleStartEdit} icon={<RiEdit2Line size={13} />} title="Edit row">
              Edit
            </Button>
            {hasUndo && (
              <Button size="xs" variant="subtle" onClick={handleUndo} icon={<RiArrowGoBackLine size={13} />} title="Undo changes" />
            )}
          </>
        ) : (
          <>
            <Button size="xs" variant="success" onClick={handleSave} icon={<RiSaveLine size={13} />} title="Save row">
              Save
            </Button>
            <Button size="xs" variant="danger" onClick={handleCancel} icon={<RiCloseLine size={13} />} title="Cancel">
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
});

TableRow.displayName = "TableRow";
