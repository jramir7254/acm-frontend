import React from 'react'
import { cn } from '@/lib/utils'
interface Props {
    children: React.ReactNode,
    className?: string
}

export default function Page({ children, className }: Props) {
    return (
        <div className={cn('flex-1 mt-16', className)}>{children}</div>
    )
}
