import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_DATA } from "../../utils/generateData";
import { PAGE_SIZE_OPTIONS, STORAGE_KEY, VIEW_MODES } from "../../constants";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const buildInitialState = () => {
  const saved = loadFromStorage();
  return {
    data: saved?.data ?? INITIAL_DATA,
    originalData: INITIAL_DATA,
    filters: saved?.filters ?? { global: "", columns: {} },
    sort: saved?.sort ?? { key: null, direction: null },
    pagination: saved?.pagination ?? { page: 1, pageSize: PAGE_SIZE_OPTIONS[1] },
    viewMode: saved?.viewMode ?? VIEW_MODES.PAGINATED,
    editingRows: {},  
    editErrors: {}, 
    undoStack: {},   
    unsavedIds: [],  
    loading: false,
    toast: null,
  };
};

const tableSlice = createSlice({
  name: "table",
  initialState: buildInitialState(),

  reducers: {
    startEditing(state, { payload: rowId }) {
      const row = state.data.find((r) => r.id === rowId);
      if (row) {
        state.editingRows[rowId] = { ...row };
        if (!state.undoStack[rowId]) {
          state.undoStack[rowId] = { ...row };
        }
      }
    },

    updateDraft(state, { payload: { rowId, field, value } }) {
      if (state.editingRows[rowId]) {
        state.editingRows[rowId][field] = value;
      }
    },

    saveRow(state, { payload: { rowId, validatedRow } }) {
      const idx = state.data.findIndex((r) => r.id === rowId);
      if (idx !== -1) {
        state.data[idx] = { ...validatedRow };
      }
      delete state.editingRows[rowId];
      delete state.editErrors[rowId];
      delete state.undoStack[rowId];
      if (!state.unsavedIds.includes(rowId)) {
        state.unsavedIds.push(rowId);
      }
      state.toast = { message: "Row saved successfully", type: "success" };
    },

    cancelEditing(state, { payload: rowId }) {
      delete state.editingRows[rowId];
      delete state.editErrors[rowId];
    },

    undoRow(state, { payload: rowId }) {
      if (state.undoStack[rowId]) {
        const idx = state.data.findIndex((r) => r.id === rowId);
        if (idx !== -1) state.data[idx] = { ...state.undoStack[rowId] };
        delete state.editingRows[rowId];
        delete state.editErrors[rowId];
        delete state.undoStack[rowId];
        state.unsavedIds = state.unsavedIds.filter((id) => id !== rowId);
      }
    },

    setEditErrors(state, { payload: { rowId, errors } }) {
      state.editErrors[rowId] = errors;
    },

    setGlobalFilter(state, { payload }) {
      state.filters.global = payload;
      state.pagination.page = 1;
    },

    setColumnFilter(state, { payload: { key, value } }) {
      state.filters.columns[key] = value;
      state.pagination.page = 1;
    },

    clearFilters(state) {
      state.filters = { global: "", columns: {} };
      state.pagination.page = 1;
    },

    toggleSort(state, { payload: key }) {
      if (state.sort.key === key) {
        if (state.sort.direction === "asc") state.sort.direction = "desc";
        else { state.sort.key = null; state.sort.direction = null; }
      } else {
        state.sort.key = key;
        state.sort.direction = "asc";
      }
    },

    setPage(state, { payload }) { state.pagination.page = payload; },
    setPageSize(state, { payload }) {
      state.pagination.pageSize = payload;
      state.pagination.page = 1;
    },

    setViewMode(state, { payload }) { state.viewMode = payload; },

    dismissToast(state) { state.toast = null; },
    setLoading(state, { payload }) { state.loading = payload; },

    resetTable(state) {
      state.data = INITIAL_DATA;
      state.filters = { global: "", columns: {} };
      state.sort = { key: null, direction: null };
      state.pagination = { page: 1, pageSize: PAGE_SIZE_OPTIONS[1] };
      state.editingRows = {};
      state.editErrors = {};
      state.undoStack = {};
      state.unsavedIds = [];
      state.toast = { message: "Table reset to original data", type: "info" };
    },
  },
});

export const {
  startEditing, updateDraft, saveRow, cancelEditing, undoRow, setEditErrors,
  setGlobalFilter, setColumnFilter, clearFilters,
  toggleSort, setPage, setPageSize, setViewMode,
  dismissToast, setLoading, resetTable,
} = tableSlice.actions;

export default tableSlice.reducer;