import { __assign, __read } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Document, pdfjs } from "react-pdf";
import { PageWithObserver } from "./PdfPreviewPageWithObserver";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Dialog } from "../dialog/Dialog";
pdfjs.GlobalWorkerOptions.workerSrc = "//unpkg.com/pdfjs-dist@".concat(pdfjs.version, "/build/pdf.worker.min.mjs");
export var ReactPreview = function (_a) {
    var _b;
    var url = _a.url, open = _a.open, setOpen = _a.setOpen, downloadButtonClassName = _a.downloadButtonClassName;
    var _c = __read(useState(null), 2), numPages = _c[0], setNumPages = _c[1];
    var _d = __read(useState({}), 2), visiblePages = _d[0], setVisiblePages = _d[1];
    var _e = __read(useState(1), 2), visiblePage = _e[0], setVisiblePage = _e[1];
    var _f = __read(useState(0.95), 2), scale = _f[0], setScale = _f[1];
    var _g = __read(useState(""), 2), inputNumber = _g[0], setInputNumber = _g[1];
    var pdfContainerRef = useRef(null);
    var pageRefs = useRef({});
    var isImage = ["png", "jpeg", "jfif", "jpg"].includes(((_b = url === null || url === void 0 ? void 0 : url.split("?")[0].split(".").pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "");
    var handleOpen = function () { return setOpen(!open); };
    var onDocumentLoadSuccess = function (_a) {
        var numPages = _a.numPages;
        setNumPages(numPages);
    };
    var setPageVisibility = useCallback(function (pageNumber, isIntersecting) {
        setVisiblePages(function (prev) {
            var _a;
            if (prev[pageNumber] === isIntersecting)
                return prev;
            return __assign(__assign({}, prev), (_a = {}, _a[pageNumber] = isIntersecting, _a));
        });
    }, []);
    useEffect(function () {
        var _a, _b;
        var lastVisible = +((_b = (_a = Object.entries(visiblePages)
            .filter(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], isVisible = _b[1];
            return isVisible;
        })
            .at(-1)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0);
        if (lastVisible && lastVisible !== visiblePage) {
            setVisiblePage(lastVisible);
        }
    }, [visiblePages, visiblePage]);
    useEffect(function () {
        setInputNumber(visiblePage);
    }, [visiblePage]);
    var scrollToPage = function (pageNumber) {
        var element = pageRefs.current[pageNumber];
        if (element && pdfContainerRef.current) {
            var containerTop = pdfContainerRef.current.getBoundingClientRect().top;
            var elementTop = element.getBoundingClientRect().top;
            var scrollOffset = elementTop - containerTop + pdfContainerRef.current.scrollTop;
            pdfContainerRef.current.scrollTo({
                top: scrollOffset,
                behavior: "smooth",
            });
        }
    };
    var setPageRef = function (pageNumber, el) {
        pageRefs.current[pageNumber] = el;
    };
    return (_jsxs(Dialog, { open: open, setOpen: handleOpen, className: "h-full overflow-scroll no-scrollbar !bg-transparent shadow-none flex justify-center items-center !m-0 max-h-screen !py-0", children: [_jsx(_Fragment, { children: isImage ? (_jsx("div", { className: "w-[70vh] h-[70vh] flex justify-center items-center", children: _jsx("img", { src: url, alt: "Preview Image", className: "object-contain max-w-[1000px]", style: { transform: "scale(".concat(scale, ")") } }) })) : (_jsx("div", { ref: pdfContainerRef, className: "w-fit h-full overflow-auto no-scrollbar mt-4", children: _jsx(Document, { file: url, onLoadSuccess: onDocumentLoadSuccess, loading: _jsx("p", { className: "p-2 text-white", children: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC..." }), children: Array.from(new Array(numPages || 0), function (_, index) { return (_jsx(PageWithObserver, { pageNumber: index + 1, setPageVisibility: setPageVisibility, scale: scale, setPageRef: setPageRef }, "page_".concat(index + 1))); }) }) })) }), _jsxs("div", { className: clsx(isImage
                    ? "w-[175px] right-[calc(50%-87.5px)]"
                    : "right-[calc(50%-200px)] w-[400px]", "fixed bottom-2 flex items-center bg-[#4d4d4dc4] opacity-95 rounded-3xl px-6 py-4 justify-between transition-opacity duration-500 z-50"), children: [!isImage && (_jsxs("div", { className: "flex items-center", children: [_jsx("p", { className: "text-white text-[22px] mx-2 font-medium", children: "\u0635\u0641\u062D\u0647" }), _jsx("input", { type: "text", inputMode: "numeric", value: inputNumber, onChange: function (e) {
                                    var val = e.target.value;
                                    if (val === "") {
                                        setInputNumber("");
                                    }
                                    else if (!isNaN(+val)) {
                                        setInputNumber(+val);
                                    }
                                }, onKeyDown: function (e) {
                                    if (e.key === "Enter" && typeof inputNumber === "number") {
                                        var target = Math.max(1, Math.min(inputNumber, numPages || 1));
                                        scrollToPage(target);
                                        setInputNumber(target);
                                    }
                                }, className: "px-2 rounded font-medium text-[22px] bg-[#424040] text-white w-[37px] h-10 outline-none text-center mx-2" }), _jsxs("p", { className: "text-white text-[22px] font-medium", children: ["/ ", numPages] })] })), _jsxs("div", { className: "flex gap-3", children: [_jsxs("svg", { className: "cursor-pointer", onClick: function () { return setScale(function (prev) { return Math.min(prev + 0.1, 2); }); }, xmlns: "http://www.w3.org/2000/svg", width: "56", height: "56", viewBox: "0 0 56 56", fill: "none", children: [_jsx("circle", { cx: "28", cy: "28", r: "23.3333", stroke: "white", strokeWidth: "1.5" }), _jsx("path", { d: "M35 28H21M28 21V35", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })] }), _jsxs("svg", { className: "cursor-pointer", onClick: function () { return setScale(function (prev) { return Math.max(prev - 0.1, 0.5); }); }, xmlns: "http://www.w3.org/2000/svg", width: "56", height: "56", viewBox: "0 0 56 56", fill: "none", children: [_jsx("circle", { cx: "28", cy: "28", r: "23.3333", stroke: "white", strokeWidth: "1.5" }), _jsx("path", { d: "M35 28H21", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })] })] })] }), _jsxs("svg", { onClick: function () { return setOpen(false); }, className: "fixed top-12 right-12 cursor-pointer", xmlns: "http://www.w3.org/2000/svg", width: "56", height: "56", viewBox: "0 0 56 56", fill: "none", children: [_jsx("circle", { cx: "28", cy: "28", r: "23.3333", stroke: "#E9EAEB", "stroke-width": "1.5" }), _jsx("path", { d: "M33.8332 22.1667L22.1666 33.8333M22.1666 22.1666L33.8332 33.8332", stroke: "#E9EAEB", "stroke-width": "1.5", "stroke-linecap": "round" })] }), _jsxs("a", { href: url, download: true, className: clsx("fixed top-12 left-12 flex py-4 px-6 items-center justify-center gap-2 border-[1px] border-black text-black bg-white rounded-lg cursor-pointer transition-opacity duration-500 outline-none", downloadButtonClassName), children: [_jsx("span", { className: "icon-Download-Minimalistic text-2xl" }), _jsx("span", { className: "whitespace-nowrap", children: "\u062F\u0627\u0646\u0644\u0648\u062F \u0641\u0627\u06CC\u0644" })] })] }));
};
//# sourceMappingURL=ReactPreview.js.map