import React from 'react'
import { Skeleton } from '../primitives/skeleton'
import { useIsDev } from '@/hooks'

export function Unfinished({ children, ...props }) {
    return (
        <div {...props}>{children}</div>
    )
}


export function Tape({
    rotate = 'none',
    top = 0,
    height = '32px',
    width = '105%'
}: {
    rotate?: string,
    top?: string | number
    height?: string
    width?: string
}) {

    return (
        <div
            aria-hidden
            style={{ rotate, top, height, width }}
            className="
                pointer-events-none absolute left-1/2 -translate-x-1/2
                rounded
                bg-[repeating-linear-gradient(135deg,#171717_0_14px,#262626_14px_28px)]
                ring-4 ring-black/20 shadow-2xl
            "
        >
            <span className="sr-only">Under construction</span>
        </div>
    );
}


export function UnderConstruction({
    children,
    className = "",
    text = ""
}: {
    children?: React.ReactNode
    className?: string,
    text?: string,
}) {
    return (
        <div className={"relative " + className}>
            <div className='absolute inset-0 m-auto w-fit h-fit z-10'>
                <h2
                    className="
                    text-5xl font-semibold font-bebas 
                    text-muted-foreground tracking-wide text-shadow-lg/90"
                >
                    {text}
                </h2>
            </div>
            {children}
        </div>
    );
}

export function UnderConstructionCard({
    children,
    className = "",
    text = ""
}: {
    children?: React.ReactNode
    className?: string,
    text?: string,
}) {
    const isDev = useIsDev()
    if (children && false) return children

    return (
        <div className={"relative hover:opacity-90 bg-[repeating-linear-gradient(135deg,#171717_0_30px,#262626_30px_60px)] cursor-not-allowed " + className}>
            <div className='absolute inset-0 m-auto w-fit h-fit z-10'>
                <h2
                    className="
                    text-5xl font-semibold font-bebas 
                    text-muted-foreground tracking-wide text-shadow-lg/90"
                >
                    {text}
                </h2>
            </div>
            {/* {children} */}
        </div>
    );
}

