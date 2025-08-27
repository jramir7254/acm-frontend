import { cn } from "@/lib/utils";
import * as React from "react";

type GradientProps = {
    children: React.ReactNode;
    className?: string;
    from?: React.HTMLAttributes<HTMLElement>["className"];
    via?: React.HTMLAttributes<HTMLElement>["className"];
    to?: React.HTMLAttributes<HTMLElement>["className"];
};



export default function Gradient({
    children,
    className,
    from = "rgba(99,110,155,0.15)",
    via = "rgba(255,255,255,0.10)",
    to = "rgba(62,93,161,0.15)",
}: GradientProps) {
    return (
        <div
            className={cn("rounded-[12px] shadow-lg backdrop-blur-[10px]", className)}
            style={{
                backgroundImage: `linear-gradient(to right, ${from}, ${via}, ${to})`,
            }}
        >
            {children}
        </div>
    );
}
