import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TablePage } from "./pages/TablePage";

export default function App() {
  return (
    <Provider store={store}>
      <TablePage />
    </Provider>
  );
}
