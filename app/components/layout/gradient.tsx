import React from 'react'
import { cn } from '@/lib/utils'


export default function Gradient({
    children,
    className,
    from = 'rgba(99,110,155,0.15)',
    via = 'rgba(255,255,255,0.15)',
    to = 'rgba(62,93,161,0.15)'
}: {
    children: React.ReactNode,
    className?: string,
    from?: string,
    via?: string,
    to?: string,

}) {
    return (
        <div className={cn(`
            backdrop-blur-[10px] bg-gradient-to-r 
            from-[${from}] 
            via-[${via}] 
            to-[${to}] 
            rounded-[12px] shadow-lg`, className)
        }>
            {children}
        </div>
    )
}
