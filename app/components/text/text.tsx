import React, { type JSX } from 'react'
import { useIsMobile, useIsMacRatio } from '@/hooks'
import { cn } from '@/lib/utils'

type TextProps = React.HTMLAttributes<HTMLParagraphElement>;


export function Text({ children, className = "", ...props }: TextProps) {

    const isMobile = useIsMobile()
    const isMac = useIsMacRatio()

    const type = isMobile ? 'mobile' : isMac ? 'mac' : 'default'
    return (
        <p className={cn(textStyles[type], className)} {...props}>
            {children}
        </p>
    );
}


const textStyles: Record<string, string> = {
    default: "text-sm",
    mobile: 'text-[0.50rem]',
    mac: 'text-xs',
}
