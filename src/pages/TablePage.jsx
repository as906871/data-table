import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { EditableTable } from "../components/table";
import { Toast } from "../components/common";

export const TablePage = () => {
  const unsavedCount = useSelector((s) => s.table.unsavedIds?.length ?? 0);
  useEffect(() => {
    const handler = (e) => {
      const editingRows = Object.keys({});
      if (unsavedCount > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [unsavedCount]);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100">
      <header className="px-6 py-5 border-b border-ink-800 bg-ink-900/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl text-ink-50 tracking-tight">
              Data Table
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-acid-400 animate-pulse-soft" />
            <span className="text-xs text-ink-500 font-mono">live</span>
          </div>
        </div>
      </header>
      <main className="px-4 py-6 max-w-screen-2xl mx-auto">
        <EditableTable />
      </main>
      <Toast />
    </div>
  );
};
