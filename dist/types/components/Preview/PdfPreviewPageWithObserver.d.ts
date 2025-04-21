type PageWithObserverProps = {
    pageNumber: number;
    setPageVisibility: (pageNumber: number, isVisible: boolean) => void;
    setPageRef?: (pageNumber: number, el: HTMLDivElement | null) => void;
    [key: string]: any;
};
export declare function PageWithObserver({ pageNumber, setPageVisibility, setPageRef, ...otherProps }: PageWithObserverProps): import("react/jsx-runtime").JSX.Element;
export {};
