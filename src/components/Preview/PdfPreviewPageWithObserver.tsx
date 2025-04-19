import { useIntersectionObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useState } from "react";
import { Page } from "react-pdf";

// Assuming observerConfig is defined elsewhere
declare const observerConfig: IntersectionObserverInit;

type PageWithObserverProps = {
  pageNumber: number;
  setPageVisibility: (pageNumber: number, isVisible: boolean) => void;
  setPageRef?: (pageNumber: number, el: HTMLDivElement | null) => void;
  [key: string]: any;
};

export function PageWithObserver({
  pageNumber,
  setPageVisibility,
  setPageRef,
  ...otherProps
}: PageWithObserverProps) {
  const [page, setPage] = useState<HTMLElement | null>(null);
  const observerConfig = {
    threshold: 0.5,
  };

  const onIntersectionChange = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setPageVisibility(pageNumber, entry.isIntersecting);
    },
    [pageNumber, setPageVisibility]
  );

  useIntersectionObserver(page, observerConfig, onIntersectionChange);

  return (
    <div ref={(el) => setPageRef?.(pageNumber, el)}>
      <Page
        className={"my-5"}
        canvasRef={setPage}
        pageNumber={pageNumber}
        loading={false}
        {...otherProps}
      />
    </div>
  );
}
