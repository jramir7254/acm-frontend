import React, { type JSX } from 'react'
import { useIsMobile, useIsMacRatio } from '@/hooks'
import { cn } from '@/lib/utils'

type HeadingProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    className?: string;

} & React.ComponentPropsWithoutRef<T>;

export function Heading<T extends React.ElementType = "h2">({
    as,
    children,
    className,
    ...props
}: HeadingProps<T>) {
    const isMobile = useIsMobile()
    const isMac = useIsMacRatio()

    const Tag = as || "h2";
    const type = isMobile ? 'mobile' : isMac ? 'mac' : 'default'
    return (
        <Tag className={cn(headingStyles[String(Tag)][type], className)} {...props}>
            {children}
        </Tag>
    );
}


const headingStyles: Record<string, Record<string, string>> = {
    h1: {
        default: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        mobile: '',
        mac: '',
    },
    h2: {
        default: "font-monts text-lg font-semibold tracking-tight",
        mobile: 'font-monts text-sm font-medium',
        mac: 'font-monts text-[1.15rem]/6 font-semibold tracking-tight',
    },
    h3: {
        default: "scroll-m-20 text-2xl font-semibold tracking-tight",
        mobile: '',
        mac: '',
    }
};