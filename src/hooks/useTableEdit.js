import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import {
  startEditing, updateDraft, saveRow, cancelEditing, undoRow, setEditErrors,
} from "../redux/slices/tableSlice";
import { validateRow, isValid } from "../utils/validation";

const EMPTY_ERRORS = {};

const makeSelectDraft = (rowId) =>
  createSelector(
    (s) => s.table.editingRows,
    (editingRows) => editingRows[rowId]
  );

const makeSelectErrors = (rowId) =>
  createSelector(
    (s) => s.table.editErrors,
    (editErrors) => editErrors[rowId] ?? EMPTY_ERRORS
  );

export const useTableEdit = (rowId) => {
  const dispatch = useDispatch();

  const selectDraft  = useMemo(() => makeSelectDraft(rowId),  [rowId]);
  const selectErrors = useMemo(() => makeSelectErrors(rowId), [rowId]);

  const draft  = useSelector(selectDraft);
  const errors = useSelector(selectErrors);
  const isEditing = draft !== undefined;

  const draftRef = useRef(draft);
  draftRef.current = draft;

  const handleStartEdit = useCallback(
    () => dispatch(startEditing(rowId)),
    [dispatch, rowId]
  );

  const handleChange = useCallback(
    (field, value) => dispatch(updateDraft({ rowId, field, value })),
    [dispatch, rowId]
  );

  const handleSave = useCallback(() => {
    const currentDraft = draftRef.current;
    if (!currentDraft) return false;

    const validationErrors = validateRow(currentDraft);
    if (!isValid(validationErrors)) {
      dispatch(setEditErrors({ rowId, errors: validationErrors }));
      return false;
    }

    dispatch(saveRow({ rowId, validatedRow: currentDraft }));
    return true;
  }, [dispatch, rowId]); 

  const handleCancel = useCallback(
    () => dispatch(cancelEditing(rowId)),
    [dispatch, rowId]
  );

  const handleUndo = useCallback(
    () => dispatch(undoRow(rowId)),
    [dispatch, rowId]
  );

  return {
    draft,
    errors,
    isEditing,
    handleStartEdit,
    handleChange,
    handleSave,
    handleCancel,
    handleUndo,
  };
};