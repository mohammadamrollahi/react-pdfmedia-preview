import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Document, Page } from "react-pdf";
import { PageWithObserver } from "./PdfPreviewPageWithObserver";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Dialog } from "../dialog/Dialog";
type Props = {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  downloadButtonClassName?: string;
};
const Preview = ({ url, open, setOpen, downloadButtonClassName }: Props) => {
  const [numPages, setNumPages] = useState(null);
  const [visiblePages, setVisiblePages] = useState<object>({});
  const [visiblePage, setVisiblePage] = useState<number>(1);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1.0); // Zoom state
  const isImage = ["png", "jpeg", "jfif", "jpg"].includes(
    url?.split("?")[0].split(".").pop() as string
  );
  const handleOpen = () => setOpen(!open);
  const [inputNumber, setInputNumber] = useState<number | "">("");
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  //set visible page
  const setPageVisibility = useCallback(
    (pageNumber: number, isIntersecting: boolean) => {
      setVisiblePages((prevVisiblePages) => {
        if (prevVisiblePages[pageNumber] === isIntersecting) {
          return prevVisiblePages; // No change, no update
        }
        return {
          ...prevVisiblePages,
          [pageNumber]: isIntersecting,
        };
      });
    },
    []
  );
  useEffect(() => {
    const lastVisible = +(
      Object.entries(visiblePages)
        .filter(([_, value]) => value)
        .at(-1)?.[0] ?? 0
    );
    if (lastVisible && lastVisible !== visiblePage) {
      setVisiblePage(lastVisible);
    }
  }, [visiblePages, visiblePage]);
  useEffect(() => {
    setInputNumber(visiblePage);
  }, [visiblePage]);
  /** */

  //scroll to page
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
      className="bg-transparent shadow-none flex justify-center items-center !m-0 max-h-screen overflow-hidden"
    >
      {/* <DialogBody className={clsx("p-0 h-screen no-scrollbar flex items-center justify-center")}> */}
      <>
        {isImage ? (
          <div className="w-[70vh] h-[70vh] flex justify-center items-center">
            <img
              src={url}
              alt="Example Image"
              className="object-contain max-w-[1000px] "
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
              {Array.from(new Array(numPages), (el, index) => (
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
      {/* </DialogBody> */}
      {/* toolbar */}
      <div
        className={clsx(
          isImage
            ? "w-[175px] right-[calc(50%-87.5px)]"
            : "right-[calc(50%-200px)] w-[400px]",
          "fixed bottom-2  flex items-center bg-neutral-5 opacity-95  rounded-3xl  px-6 py-4 justify-between transition-opacity duration-500 z-50"
        )}
      >
        {/** pdf page navigation */}
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
              onKeyDown={(event) => {
                if (event.key === "Enter" && typeof inputNumber === "number") {
                  if (inputNumber > Number(numPages)) {
                    setInputNumber(Number(numPages));
                    scrollToPage(Number(numPages));
                  }
                  if (inputNumber >= 1 && inputNumber <= (numPages || 0)) {
                    scrollToPage(inputNumber);
                  }
                }
              }}
              className="px-2 rounded font-medium text-[22px] bg-neutral-1 text-white w-[37px] h-10 outline-none text-center mx-2"
            />
            <p className="text-white text-[22px] font-medium">/ {numPages}</p>
          </div>
        )}
        <div className="flex gap-4 ">
          <p
            className="text-white cursor-pointer w-[56px] h-[56px] border border-white rounded-full flex justify-center items-center text-2xl"
            onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
          >
            <span className="icon-plus text-lg"></span>
          </p>
          <p
            className="text-white cursor-pointer w-[56px] h-[56px] border border-white rounded-full flex justify-center items-center text-2xl"
            onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
          >
            <span className="icon-minus text-lg"></span>
          </p>
        </div>
      </div>
      {/* close circle */}
      <p
        className={clsx(
          "text-white cursor-pointer w-[56px] h-[56px] border border-white rounded-full flex justify-center items-center text-4xl fixed top-12 right-12 left transition-opacity duration-500"
        )}
      >
        <span
          onClick={() => setOpen(false)}
          className="icon-Close-Circle1"
        ></span>
      </p>
      {/* download button in preview */}
      <a
        href={url}
        download
        className={clsx(
          "fixed top-12 left-12 flex py-4 px-6 items-center justify-center gap-2 border-[1px] border-primary-6 text-primary-6 bg-primary-14 rounded-lg cursor-pointer transition-opacity duration-500 outline-none",
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

export default Preview;
