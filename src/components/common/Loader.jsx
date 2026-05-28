import React from "react";

const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-4 py-3 border-b border-ink-800/60">
    {[70, 160, 200, 130, 100, 80, 100, 90].map((w, i) => (
      <div key={i} className="skeleton rounded h-4" style={{ width: w, minWidth: w }} />
    ))}
  </div>
);


export const Loader = ({ rows = 10 }) => (
  <div className="animate-fade-in">
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);


export const EmptyState = ({ message = "No data found", sub }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-ink-800 flex items-center justify-center mb-4">
      <span className="text-3xl">📭</span>
    </div>
    <p className="text-ink-300 font-display font-semibold text-lg">{message}</p>
    {sub && <p className="text-ink-500 text-sm mt-1">{sub}</p>}
  </div>
);
