// components/Dialog.tsx
import clsx from "clsx";
import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

type DialogProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: ReactNode;
  className?: string;
};

export const Dialog = ({ open, setOpen, children, className }: DialogProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setOpen(false)}
    >
      <div
        className={clsx(
          "bg-white rounded-xl p-6 shadow-lg min-w-[300px] max-w-[90%]",
          className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop close
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
