import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissToast } from "../../redux/slices/tableSlice";
import { RiCheckLine, RiInformationLine, RiCloseLine } from "react-icons/ri";

const ICONS = {
  success: <RiCheckLine className="text-acid-400" size={16} />,
  info:    <RiInformationLine className="text-ink-300" size={16} />,
  error:   <RiCloseLine className="text-coral-400" size={16} />,
};

const BORDERS = {
  success: "border-acid-400/30",
  info:    "border-ink-600",
  error:   "border-coral-500/40",
};

export const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((s) => s.table.toast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(dismissToast()), 3000);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 bg-ink-900 border ${BORDERS[toast.type] ?? BORDERS.info}
        px-4 py-3 rounded-lg shadow-2xl text-sm text-ink-200 animate-slide-down max-w-xs`}
      role="alert"
    >
      {ICONS[toast.type]}
      <span>{toast.message}</span>
      <button onClick={() => dispatch(dismissToast())} className="ml-2 text-ink-500 hover:text-ink-200">
        <RiCloseLine size={14} />
      </button>
    </div>
  );
};
