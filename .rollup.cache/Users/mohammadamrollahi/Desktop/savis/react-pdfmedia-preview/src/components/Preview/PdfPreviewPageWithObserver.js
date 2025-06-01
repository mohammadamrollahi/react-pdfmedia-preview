import { __assign, __read, __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useIntersectionObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useState } from "react";
import { Page } from "react-pdf";
export function PageWithObserver(_a) {
    var pageNumber = _a.pageNumber, setPageVisibility = _a.setPageVisibility, setPageRef = _a.setPageRef, otherProps = __rest(_a, ["pageNumber", "setPageVisibility", "setPageRef"]);
    var _b = __read(useState(null), 2), page = _b[0], setPage = _b[1];
    var observerConfig = {
        threshold: 0.5,
    };
    var onIntersectionChange = useCallback(function (_a) {
        var _b = __read(_a, 1), entry = _b[0];
        setPageVisibility(pageNumber, entry.isIntersecting);
    }, [pageNumber, setPageVisibility]);
    useIntersectionObserver(page, observerConfig, onIntersectionChange);
    return (_jsx("div", { ref: function (el) { return setPageRef === null || setPageRef === void 0 ? void 0 : setPageRef(pageNumber, el); }, children: _jsx(Page, __assign({ className: "my-5", canvasRef: setPage, pageNumber: pageNumber, loading: false }, otherProps)) }));
}
//# sourceMappingURL=PdfPreviewPageWithObserver.js.map