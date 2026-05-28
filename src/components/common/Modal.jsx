import React, { useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "./Button";

export const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-ink-900 border border-ink-700 rounded-xl shadow-2xl w-full max-w-md animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-800">
          <h2 className="font-display font-semibold text-ink-100">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} icon={<RiCloseLine size={16} />} title="Close" />
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 px-5 py-4 border-t border-ink-800">{footer}</div>
        )}
      </div>
    </div>
  );
};
