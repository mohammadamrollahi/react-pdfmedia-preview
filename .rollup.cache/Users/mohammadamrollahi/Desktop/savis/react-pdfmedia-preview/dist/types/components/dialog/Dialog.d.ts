import { ReactNode } from "react";
type DialogProps = {
    open: boolean;
    setOpen: (val: boolean) => void;
    children: ReactNode;
    className?: string;
};
export declare const Dialog: ({ open, setOpen, children, className }: DialogProps) => import("react").ReactPortal | null;
export {};
