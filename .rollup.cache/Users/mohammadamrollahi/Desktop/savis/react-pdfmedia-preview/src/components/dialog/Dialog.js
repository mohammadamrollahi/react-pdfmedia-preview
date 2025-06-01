import { jsx as _jsx } from "react/jsx-runtime";
// components/Dialog.tsx
import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from 'react-dom';
export var Dialog = function (_a) {
    var open = _a.open, setOpen = _a.setOpen, children = _a.children, className = _a.className;
    useEffect(function () {
        var handleEsc = function (e) {
            if (e.key === "Escape")
                setOpen(false);
        };
        document.addEventListener("keydown", handleEsc);
        return function () { return document.removeEventListener("keydown", handleEsc); };
    }, [setOpen]);
    if (!open)
        return null;
    return createPortal(_jsx("div", { className: "fixed inset-0 z-50 flex  justify-center bg-black/40", onClick: function () { return setOpen(false); }, children: _jsx("div", { className: clsx("bg-white rounded-xl p-6 shadow-lg min-w-[300px] max-w-[90%]", className), onClick: function (e) { return e.stopPropagation(); }, children: children }) }), document.body);
};
//# sourceMappingURL=Dialog.js.map