import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { STORAGE_KEY } from "./constants";

try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.data)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
} catch {
  localStorage.removeItem(STORAGE_KEY);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);