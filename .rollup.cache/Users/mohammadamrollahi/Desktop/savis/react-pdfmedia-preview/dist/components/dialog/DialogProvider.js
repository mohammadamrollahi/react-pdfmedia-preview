import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
var DialogContext = createContext(null);
export var DialogProvider = function (_a) {
    var children = _a.children;
    return (_jsx(DialogContext.Provider, { value: null, children: children }));
};
export var useDialogContext = function () { return useContext(DialogContext); };
//# sourceMappingURL=DialogProvider.js.map