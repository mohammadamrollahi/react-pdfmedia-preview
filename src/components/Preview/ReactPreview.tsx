import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Document, pdfjs } from "react-pdf";
import { PageWithObserver } from "./PdfPreviewPageWithObserver";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Dialog } from "../dialog/Dialog";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  downloadButtonClassName?: string;
};

export const ReactPreview = ({
  url,
  open,
  setOpen,
  downloadButtonClassName,
}: Props) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [visiblePages, setVisiblePages] = useState<Record<number, boolean>>({});
  const [visiblePage, setVisiblePage] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.95);
  const [inputNumber, setInputNumber] = useState<number | "">("");
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isImage = ["png", "jpeg", "jfif", "jpg"].includes(
    url?.split("?")[0].split(".").pop()?.toLowerCase() || ""
  );

  const handleOpen = () => setOpen(!open);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const setPageVisibility = useCallback(
    (pageNumber: number, isIntersecting: boolean) => {
      setVisiblePages((prev) => {
        if (prev[pageNumber] === isIntersecting) return prev;
        return { ...prev, [pageNumber]: isIntersecting };
      });
    },
    []
  );

  useEffect(() => {
    const lastVisible = +(
      Object.entries(visiblePages)
        .filter(([_, isVisible]) => isVisible)
        .at(-1)?.[0] ?? 0
    );
    if (lastVisible && lastVisible !== visiblePage) {
      setVisiblePage(lastVisible);
    }
  }, [visiblePages, visiblePage]);

  useEffect(() => {
    setInputNumber(visiblePage);
  }, [visiblePage]);

  const scrollToPage = (pageNumber: number) => {
    const element = pageRefs.current[pageNumber];
    if (element && pdfContainerRef.current) {
      const containerTop = pdfContainerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset =
        elementTop - containerTop + pdfContainerRef.current.scrollTop;
      pdfContainerRef.current.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const setPageRef = (pageNumber: number, el: HTMLDivElement | null) => {
    pageRefs.current[pageNumber] = el;
  };

  return (
    <Dialog
      open={open}
      setOpen={handleOpen}
      className="h-full overflow-scroll no-scrollbar !bg-transparent shadow-none flex justify-center items-center !m-0 max-h-screen !py-0"
    >
      <>
        {isImage ? (
          <div className="w-[70vh] h-[70vh] flex justify-center items-center">
            <img
              src={url}
              alt="Preview Image"
              className="object-contain max-w-[1000px]"
              style={{ transform: `scale(${scale})` }}
            />
          </div>
        ) : (
          <div
            ref={pdfContainerRef}
            className="w-fit h-full overflow-auto no-scrollbar mt-4"
          >
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p className="p-2 text-white">در حال بارگذاری...</p>}
            >
              {Array.from(new Array(numPages || 0), (_, index) => (
                <PageWithObserver
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  setPageVisibility={setPageVisibility}
                  scale={scale}
                  setPageRef={setPageRef}
                />
              ))}
            </Document>
          </div>
        )}
      </>

      {/* Toolbar */}
      <div
        style={{ backgroundColor: "#4d4d4dc4", opacity: "95%" }}
        className={clsx(
          isImage
            ? "w-[175px] right-[calc(50%-87.5px)]"
            : "right-[calc(50%-200px)] w-[400px]",
          "fixed bottom-2 flex items-center rounded-3xl px-6 py-4 justify-between transition-opacity duration-500 z-50"
        )}
      >
        {!isImage && (
          <div className="flex items-center">
            <p className="text-white text-[22px] mx-2 font-medium">صفحه</p>
            <input
              type="text"
              inputMode="numeric"
              value={inputNumber}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setInputNumber("");
                } else if (!isNaN(+val)) {
                  setInputNumber(+val);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && typeof inputNumber === "number") {
                  const target = Math.max(
                    1,
                    Math.min(inputNumber, numPages || 1)
                  );
                  scrollToPage(target);
                  setInputNumber(target);
                }
              }}
              className="px-2 rounded font-medium text-[22px] bg-[#424040] text-white w-[37px] h-10 outline-none text-center mx-2"
            />
            <p className="text-white text-[22px] font-medium">/ {numPages}</p>
          </div>
        )}
        <div className="flex gap-3">
          {/* Zoom In */}
          <svg
            className="cursor-pointer"
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r="23.3333"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M35 28H21M28 21V35"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {/* Zoom Out */}
          <svg
            className="cursor-pointer"
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r="23.3333"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M35 28H21"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/** Close Circle */}
      <svg
        onClick={() => setOpen(false)}
        className="fixed top-12 right-12 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
      >
        <circle
          cx="28"
          cy="28"
          r="23.3333"
          stroke="#E9EAEB"
          stroke-width="1.5"
        />
        <path
          d="M33.8332 22.1667L22.1666 33.8333M22.1666 22.1666L33.8332 33.8332"
          stroke="#E9EAEB"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      {/** */}
      {/* download button in preview */}
      <a
        href={url}
        download
        className={clsx(
          "fixed top-12 left-12 flex py-4 px-6 items-center justify-center gap-2 border-[1px] border-black text-black bg-white rounded-lg cursor-pointer transition-opacity duration-500 outline-none",
          downloadButtonClassName
        )}
      >
        <span className="icon-Download-Minimalistic text-2xl" />
        <span className="whitespace-nowrap">دانلود فایل</span>
      </a>
      {/** */}
    </Dialog>
  );
};
