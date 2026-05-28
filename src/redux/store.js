import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./slices/tableSlice";
import { STORAGE_KEY } from "../constants";

export const store = configureStore({
  reducer: { table: tableReducer },
});

let persistTimer = null;
store.subscribe(() => {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    const { table } = store.getState();
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: table.data,
          filters: table.filters,
          sort: table.sort,
          pagination: table.pagination,
          viewMode: table.viewMode,
        }),
      );
    } catch (fallbackError) {
      console.error("Fallback storage also failed:", fallbackError);
    }
  }, 500);
});
