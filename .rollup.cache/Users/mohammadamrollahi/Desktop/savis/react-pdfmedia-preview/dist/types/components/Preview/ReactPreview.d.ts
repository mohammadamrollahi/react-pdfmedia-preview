import React from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
type Props = {
    url: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    downloadButtonClassName?: string;
};
export declare const ReactPreview: ({ url, open, setOpen, downloadButtonClassName }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
