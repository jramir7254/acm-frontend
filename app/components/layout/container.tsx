import React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'



export function Container({
    children,
    className,
    classNameMobile,
    hideInMobile,
}: {
    children: React.ReactNode,
    className?: string,
    classNameMobile?: string,
    hideInMobile?: boolean,
}) {
    const isMobile = useIsMobile()

    if (hideInMobile && isMobile) return null

    return (
        <div className={isMobile ? classNameMobile : className}>
            {children}
        </div>
    )
}
