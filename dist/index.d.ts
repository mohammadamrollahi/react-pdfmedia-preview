import * as React from 'react';
import React__default, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type DialogProps = {
    open: boolean;
    setOpen: (val: boolean) => void;
    children: ReactNode;
    className?: string;
};
declare const Dialog: ({ open, setOpen, children, className }: DialogProps) => React.ReactPortal | null;

type Props = {
    url: string;
    open: boolean;
    setOpen: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    downloadButtonClassName?: string;
};
declare const ReactPreview: ({ url, open, setOpen, downloadButtonClassName }: Props) => react_jsx_runtime.JSX.Element;

export { Dialog, ReactPreview };
