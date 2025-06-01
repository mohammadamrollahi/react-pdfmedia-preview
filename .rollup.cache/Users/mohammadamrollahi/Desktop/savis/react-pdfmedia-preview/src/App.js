import { __read } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./App.css";
import { ReactPreview } from "./components/Preview/ReactPreview";
function App() {
    var _a = __read(useState(false), 2), open = _a[0], setOpen = _a[1];
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: function () { return setOpen(true); }, children: "open dialog" }), _jsx(ReactPreview, { open: open, setOpen: setOpen, url: "https://apollo.omaxplatform.com/app/api/v1/buckets/amian/files/b754b6e0-b033-4a67-95ac-47911b1d999e.png" })] }));
}
export default App;
//# sourceMappingURL=App.js.map