import React from 'react'
import { useIsMobile, useIsMacRatio } from '@/hooks'
import { cn } from '@/lib/utils'


export function Container({
    children,
    className,
    classNameMac,
    classNameLarge,
    classNameMobile,
    hideInMac,
    hideInLarge,
    hideInMobile,
}: {
    children: React.ReactNode,
    className?: string,
    classNameMac?: string,
    classNameLarge?: string,
    classNameMobile?: string,
    hideInMac?: boolean,
    hideInMobile?: boolean,
    hideInLarge?: boolean,
}) {
    const isMobile = useIsMobile()
    const isMac = useIsMacRatio()


    if (hideInMac && isMac) return null
    if (hideInMobile && isMobile) return null
    if (hideInLarge && !isMobile) return null

    const setClassName = isMobile ? classNameMobile : isMac ? classNameMac : classNameLarge

    return (
        <div className={cn(className, setClassName)}>
            {children}
        </div>
    )
}
