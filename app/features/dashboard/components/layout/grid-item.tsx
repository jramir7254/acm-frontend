import React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
export default function GridItem({
    children,
    className,
    hideInMobile,
}: {
    children: React.ReactNode,
    className?: string,
    hideInMobile?: boolean,
}) {
    const isMobile = useIsMobile()

    if (hideInMobile && isMobile) return null

    return (
        <div className={className}>
            {children}
        </div>
    )
}
