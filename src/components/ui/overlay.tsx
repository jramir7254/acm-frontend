import React, { useState, createContext, useContext } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogPortal,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/primitives/dialog";

// 1. Define the context type
type OverlayContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 2. Create the context with an initial undefined
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// 3. Safe hook that enforces provider usage
export const useOverlay = (): OverlayContextType => {
    const ctx = useContext(OverlayContext);
    if (!ctx) {
        throw new Error("useOverlay must be used within <Overlay>");
    }
    return ctx;
};

export function Overlay({
    children,
    trigger,
    title,
    className,
    description,
    container,
}: {
    children: React.ReactNode;
    trigger: React.ReactNode;
    title?: string;
    className?: string;
    description?: string;
    container?: Element | DocumentFragment | null | undefined;
}) {
    const [open, setOpen] = useState(false);

    return (
        <OverlayContext.Provider value={{ open, setOpen }}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogPortal container={container}>
                    <DialogContent className={`bg-accent ${className ?? ""}`}>
                        <DialogHeader>
                            <DialogTitle className="md:text-xl">{title}</DialogTitle>
                            <DialogDescription>{description}</DialogDescription>
                        </DialogHeader>
                        {children}
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </OverlayContext.Provider>
    );
}
